<template>
  <div>
    <!-- <div class="box"> -->
    <!-- <div class="box1">合同详情</div> -->
    <!-- <div class="box2">项目名称：深圳宝安区鸿昌花园幼儿园项目</div> -->
    <!-- <div class="box3">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="合同" name="first" />
          <el-tab-pane label="合同" name="second" />
        </el-tabs>
      </div> -->
    <!-- </div> -->
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <!-- <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div> -->
        <div>
          <span class="title" style="font-weight: 600">基本信息</span>
          <table
            :data="form"
            border="1"
            style="
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              border-color: #dfe6ec;
              margin-top: 10px;
              margin-bottom: 10px;
            "
          >
            <tr>
              <td class="tableTH">合同类型</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.contractType, 'contractType') }}
              </td>
              <td class="tableTH">合同编号</td>
              <td class="tableTD">{{ form.contractCode }}</td>
            </tr>
            <tr>
              <td class="tableTH">合同金额</td>
              <td class="tableTD">{{ form.contractAmount }}元</td>
              <td class="tableTH">合同甲方</td>
              <td class="tableTD">{{ form.organizationName }}</td>
            </tr>
            <tr>
              <td class="tableTH">合同乙方</td>
              <td class="tableTD">{{ form.supplierName }}</td>
              <td class="tableTH">合同价类型</td>
              <td class="tableTD">
                {{
                  getDictionaryLabel(form.contractAmountType,'contractAmountType')
                }}
                <!-- {{ form.contractAmountType }} -->
                <!-- <div v-if="form.contractAmountType == 1">固定价</div>
                  <div v-if="form.contractAmountType == 2">浮动价</div> -->
              </td>
            </tr>
            <tr>
              <td class="tableTH">是否关联订单</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.isRefOrder, 'isRefOrder') }}
              </td>
              <td class="tableTH">结算类型</td>
              <td class="tableTD">
                {{
                  getDictionaryLabel(form.settlementTypeId, 'settlementTypeId')
                }}
              </td>
            </tr>
            <tr>
              <td class="tableTH">税率</td>
              <td class="tableTD">{{ form.taxVal }}%</td>
              <td class="tableTH">税率生效时间</td>
              <td class="tableTD">{{ form.effectDate }}</td>
            </tr>
            <tr>
              <td class="tableTH">结算周期</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.periodType, 'periodType') }}
                <span v-if="form.periodType==2" style="margin-left: 10px">上月:{{ form.startDay }}日</span>
                <span v-if="form.periodType==2" style="margin-left: 10px">~</span>
                <span v-if="form.periodType==2" style="margin-left: 10px">本月:{{ form.endDay }}日</span>
              </td>
              <td class="tableTH">价格类型</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.isExclude, 'isExclude') }}
              </td>
            </tr>
          </table>
        </div>
        <div class="title" style="font-weight: 600">
          <span>物资信息</span>
        </div>
        <el-table
          :data="formWZ"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="big" label="物资大类" />
          <!-- <el-table-column prop="small" label="物资小类" />-->
          <el-table-column prop="itemName" label="物资名称" />
          <el-table-column prop="unit" label="计量单位" />
          <el-table-column prop="specifications" label="规格型号(工料机描述)" />
          <el-table-column prop="extraSpecifications" label="规格型号(工料机补充描述)" />
          <el-table-column
            v-if="( form.contractAmountType === 1 || form.contractAmountType === 2 ) && form.isExclude == 1"
            prop="containTaxPrice"
            label="含税单价(元)"
          />
          <el-table-column
            v-if="(form.contractAmountType === 1 || form.contractAmountType === 2 )&& form.isExclude == 2"
            prop="excludeTaxPrice"
            label="除税单价(元)"
          />
          <el-table-column
            v-if=" form.contractAmountType === 3 && form.isExclude == 1"
            prop="containTaxPrice"
            label="合同约定浮动价(含税)(元)"
          />
          <el-table-column
            v-if="form.contractAmountType === 3 && form.isExclude == 2"
            prop="excludeTaxPrice"
            label="合同约定浮动价(除税)(元)"
          />
          <el-table-column prop="remark" label="备注" />
        </el-table>
        <div class="title" style="font-weight: 600">
          <span>项目信息</span>
        </div>
        <el-table
          :data="formXM"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="name" label="序号">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="projectName" label="关联项目" />
          <el-table-column prop="projectStatus" label="项目状态">
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.projectStatus, 'projectStatus')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="settlementStatus" label="总结算状态">
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.settlementStatus, 'settlementStatus')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createUserName" label="操作人" />
          <el-table-column prop="createTime" label="关联时间" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { selectContractById } from '@/api/contractManagement/table'
export default {
  name: 'AddAndAdit',
  data() {
    return {
      loading: false,
      size: '',
      form: [],
      formWZ: [],
      formXM: [],
      ruleForm: {},
      tableData: [
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' }
      ]
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  methods: {
    getDetail() {
      this.loading = true
      selectContractById(this.$route.query.id).then((res) => {
        this.form = res.data
        // this.form.taxVal = res.data.taxVal * 100
        this.formWZ = res.data.prucContractItemList
        this.formXM = res.data.prucContractProjectList
        this.loading = false
      })
    },
    // 返回颜色
    getClass(row) {
      switch (row.settlementStatus) {
        case 0:
          return 'draft'
        case 1:
          return 'forbidden'
      }
    },
    // 关闭
    handleClose() {
      //   this.form = {};
      //   this.$emit("update:visible", false);
      //   this.$emit("handleClose");
      //   if (this.$refs["form"]) {
      //     this.$refs["form"].clearValidate();
      //   }
    }
  }
}
</script>
<style lang="scss" scoped>
  .settlementStatus {
    display: flex;
    align-items: center;
    .box {
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      border-radius: 50%;
      margin-right: 8px;
    }
    .draft {
      background: #00cc33;
    }
    .forbidden {
      background: red;
    }
  }
  ::v-deep .headerClass th {
    background: #fafafa !important;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .title {
    margin-top: 24px;
    margin-bottom: 16px;
  }
  .tableTH {
    text-align: right;
    padding-right: 16px;
    width: 100px;
    height: 45px;
    font-size: 14px;
    font-weight: bold;
    color: #555f73;
    background-color: #f8f8f9;
  }
  .tableTD {
    text-align: left;
    padding-left: 16px;
    width: 240px;
    color: #606266;
    font-size: 14px;
  }
  .box {
    background-color: #fff;
    padding-bottom: 18px;
  }
  .box1 {
    margin-left: 32px;
    width: 120px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
  }
  .box2 {
    margin-left: 30px;
    margin-top: 8px;
    width: 266px;
    height: 28px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
    line-height: 28px;
  }
  .box3 {
    margin-left: 30px;
    position: relative;
    bottom: -15px;
  }
</style>
