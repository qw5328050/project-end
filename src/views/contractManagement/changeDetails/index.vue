<template>
  <div>
    <!-- <div class="box">
      <div class="box1">合同变更详情</div>
       <div class="box2">项目名称：深圳宝安区鸿昌花园幼儿园项目</div> -->
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
              <td class="tableTH">合同编号</td>
              <td class="tableTD">{{ form.contractCode }}</td>
              <td class="tableTH">合同类型</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.contractType, 'contractType') }}
              </td>
            </tr>
            <tr>
              <td class="tableTH">合同甲方</td>
              <td class="tableTD">{{ form.organizationName }}</td>
              <td class="tableTH">合同乙方</td>
              <td class="tableTD">{{ form.supplierName }}</td>
            </tr>
            <tr>
              <td class="tableTH">合同价类型</td>
              <td class="tableTD">
                {{
                  getDictionaryLabel(
                    form.contractAmountType,
                    'contractAmountType'
                  )
                }}
              </td>
              <td class="tableTH">是否关联订单</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.isRefOrder, 'isRefOrder') }}
              </td>
            </tr>
            <tr>
              <td class="tableTH">收货项目</td>
              <td class="tableTD">
                {{ form.receiptProject }}
                <!-- <template slot-scope="{ row }">
                  {{ row.receiptProject || 0 }}
                </template> -->
              </td>
              <td class="tableTH">结算周期</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.periodType, 'periodType') }}
                <span v-if="form.periodType==2" style="margin-left: 10px">本月:{{ form.startDay }}日</span>
                <span v-if="form.periodType==2" style="margin-left: 10px">~</span>
                <span v-if="form.periodType==2" style="margin-left: 10px">次月:{{ form.endDay }}日</span>
              </td>
            </tr>
            <tr>
              <td class="tableTH">结算类型</td>
              <td class="tableTD" colspan="3">
                {{
                  getDictionaryLabel(form.settlementTypeId, 'settlementTypeId')
                }}
              </td>
            </tr>
          </table>
        </div>
        <div class="title" style="font-weight: 600">
          <span>基本信息变更记录</span>
        </div>
        <el-table
          :data="formWZ"
          style="width: 100%"
          max-height="550"
          highlight-current-row
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="modifyTypeName" label="变更项" />
          <el-table-column prop="formerDesc" label="变更前" />
          <el-table-column prop="latterDesc" label="变更后" />
          <el-table-column prop="createUserName" label="操作人" />
          <el-table-column prop="createTime" label="变更时间" />
        </el-table>
        <div class="title">
          <span style="font-weight: 600">其他信息变更记录</span>
        </div>
        <div v-for="(item, index) in formXM" :key="index" class="cardText">
          <div
            style="
              padding-top: 16px;
              padding-left: 40px;
              padding-right: 40px;
              padding-bottom: 16px;
            "
          >
            <div class="table">
              <span>合同超额记录表</span>
            </div>
            <div class="table">
              <span>已结算比例：{{ item.formerDesc }}%</span>
              <span>已变为：</span>
              <span style="color: red">{{ item.latterDesc }}%</span>
              <span v-if="item.latterDesc > 100">,合同已超额</span>
            </div>
            <div class="xian" />
            <div

              style="
                margin-top: 24px;
                margin-bottom: 24px;
                font-size: 14px;
                color: #595959;
              "
            >
              <span>修改人：</span>
              <span>{{ item.createUserName }}</span>
              <span style="margin-left: 200px">修改时间：</span>
              <span>{{ item.createTime }}</span>
              <span style="margin-left: 200px">关联收料单：</span>
              <span>{{ item.refReceipt }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { showModifyInfo } from '@/api/contractManagement/table'
export default {
  name: 'AddAndAdit',
  data() {
    return {
      admin: '管理员', // 修改人
      update: '2022-05-20 05:20:00', // 修改时间
      received: '772635427335', // 关联收料单
      close: '99.61', // 结算比例
      closes: '101.67', // 变更结算比例
      queryParams: {},
      loading: false,
      size: '',
      ruleForm: {},
      form: [],
      formWZ: [],
      formXM: null,
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
    // 详情
    getDetail() {
      this.loading = true
      showModifyInfo(this.$route.query.id).then((res) => {
        this.form = res.data
        this.formWZ = res.data.basePrucContractModifyLogVO
        this.formXM = res.data.otherPrucContractModifyLogVO
        this.loading = false
      })
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
    // 提交按钮
    // submitForm() {
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       if (this.form.id) {
    //         updateBaseUser(this.form).then((res) => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.handleClose();
    //           this.$emit("submitForm");
    //         });
    //       } else {
    //         addBaseUser(this.form).then((res) => {
    //           this.$modal.msgSuccess("保存成功");
    //           this.handleClose();
    //           this.$emit("submitForm");
    //         });
    //       }
    //     }
    //   });
    // },
  }
}
</script>
<style lang="scss" scoped>
.table {
  font-weight: 600;
  font-size: 14px;
  margin-top: 16px;
  // margin-left: 40px;
}
.xian {
  border: 1px dashed #d9d9d9;
  margin-top: 24px;
}
.cardText {
  margin-top: 16px;
  background-color: #fafafa;
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
  padding-right: 16px;
  text-align: right;
  width: 100px;
  height: 45px;
  font-size: 14px;
  font-weight: bold;
  color: #555f73;
  background-color: #f8f8f9;
}
.tableTD {
  padding-left: 16px;
  text-align: left;
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
