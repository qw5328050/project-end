<template>
  <div class="basicInformation">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-content">
        <el-row>
          <el-col :span="12">项目编号: {{ dataAll.projectCode || '-' }}</el-col>
          <el-col :span="12">项目名称: {{ dataAll.projectName || '-' }}</el-col>
          <el-col
            :span="12"
          >需用计划编号: {{ dataAll.needPlanCode || '-' }}</el-col>
          <el-col
            :span="12"
          >需用计划类型: {{ getDictLabel(dataAll.needPlanType) }}</el-col>
          <el-col
            :span="12"
          >提交人: {{ dataAll.createUserName || '-' }}</el-col>
          <el-col :span="12">提交时间: {{ dataAll.createTime || '-' }}</el-col>
        </el-row>
        <el-table
          :data="list"
          :header-row-class-name="() => 'headerClass'"
          max-height="590"
          style="width: 100%; margin-top: 14px"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="物资名称" />
          <el-table-column
            prop="specification"
            label="规格型号(工料机描述)"
            width="250"
          />
          <el-table-column
            v-if="dataAll.needPlanType !== 1 && dataAll.needPlanType !== 2"
            prop="remark"
            label="工料机补充描述"
          />
          <el-table-column prop="unit" label="单位" />
          <el-table-column prop="useNum" label="进场数量">
            <template slot-scope="{ row }">
              {{ row.useNum.toLocaleString('en-US') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="useTime"
            :label="
              dataAll.needPlanType === 6 ? '计划使用时间' : '计划进场时间'
            "
          />
          <el-table-column prop="usePosition" label="使用部位" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { selectDictDatas } from '@/api/plan/mad'
import { mapGetters } from 'vuex'
export default {
  name: 'BasicInformation',

  props: {
    list: {
      type: Array,
      require: true,
      default: () => []
    },
    dataAll: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      planTypeOption: []
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  mounted() {
    this.getDictValue()
  },
  methods: {
    getDictValue() {
      selectDictDatas('DIC_NEED_PLAN_TYPE').then((res) => {
        if (res.data && res.data.length > 0) {
          const newArray = [...res.data]
          this.addPlanData = res.data
          newArray.unshift({ dataName: '全部', dataValue: null })
          this.planTypeOption = newArray
        }
      })
    },
    getDictLabel(type) {
      let name = ''
      this.planTypeOption.forEach((item) => {
        if (Number(item.dataValue) === type) {
          name = item.dataName
        }
      })
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-col {
  margin: 10px 0;
}
::v-deep .el-card {
  .el-card__header {
    padding: 18px 24px;
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }
  .el-card__body {
    padding: 0;
  }
}
.basicInformation {
  width: 100%;
  .box-card {
    .card-content {
      padding: 14px 24px 24px 24px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
