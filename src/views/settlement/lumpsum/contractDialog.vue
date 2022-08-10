<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同编号:">
            <el-input
              v-model="form.contractCode"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="合同类型:">
            <el-select
              v-model="queryParams.contractType"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="(item, index) in getDictionaryValue('contractType')"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      height="385"
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
    >
      <el-table-column align="left" prop="id" width="35">
        <template scope="{row}">
          <el-radio
            v-model="radio"
            :label="row.contractId"
            style="color: #fff; margin-right: -25px"
          />
        </template>
      </el-table-column>
      <el-table-column label="合同编号" prop="contractCode" />
      <el-table-column label="合同类型" prop="contractType">
        <template slot-scope="{ row }">
          <span>{{
            getDictionaryLabel(row.contractType, 'contractType')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同价类型" prop="contractAmountType">
        <template slot-scope="{ row }">
          <span>{{
            getDictionaryLabel(row.contractAmountType, 'contractAmountType')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同金额（万元）" prop="contractAmount" />
    </el-table>
    <div class="actionButtons">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
    <!-- </div> -->
  </el-dialog>
</template>

<script>
import { selectContractsBySupplierId } from '@/api/lumpsum/test'
export default {
  name: 'IndexDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    id: {
      type: Number,
      require: true,
      default: null
    }
  },
  data() {
    return {
      radio: '',
      title: '合同列表',
      tableData: [],
      form: {
        pageNum: 1,
        pageSize: 10
      },
      loading: false, // 表格加载
      list: [] // 表格数据
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.id) {
          this.getList()
        }
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    // 确认按钮
    confirm() {
      this.projectLabel = this.tableData.find(
        ({ contractId }) => contractId === this.radio
      )
      this.$emit('contractDialog', this.projectLabel)
      this.$emit('update:visible', false)
    },
    // 获取数据
    getList() {
      this.loading = true
      selectContractsBySupplierId(this.id).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data
          this.loading = false
        }
      })
    },
    resetQuery() {
      this.form = {}
      this.getList()
    },
    handleQuery() {
      // this.queryParams.pageNum = 1
      this.getList()
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.actionButtons {
  margin-left: 85%;
  margin-top: 16px;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-dialog__title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}
.footer {
  // position: absolute;
  width: 100%;
  margin-top: 16px;
  padding-left: 40px;
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}
</style>
