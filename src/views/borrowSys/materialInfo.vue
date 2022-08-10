<template>
  <el-card>
    <div class="material-info">
      <span class="title" style="font-weight: 600">基本信息</span>
      <div class="material-type">
        <el-radio-group v-model="form.type" disabled>
          <el-radio :label="1">仅报停</el-radio>
          <el-radio :label="2">报停并退料</el-radio>
        </el-radio-group>
      </div>
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
          <td class="tableTH">报停单编号</td>
          <td class="tableTD">{{ form.reportStopCode || '-' }}</td>
          <td class="tableTH">收料单编号</td>
          <td class="tableTD">
            {{ form.receiptCode || '-' }}
          </td>
        </tr>
        <tr>
          <td class="tableTH">报停日期</td>
          <td class="tableTD">{{reportStopDate}}</td>
          <td class="tableTH">原因</td>
          <td class="tableTD">{{ form.reason }}</td>
        </tr>
      </table>
      <span class="title" style="font-weight: 600">收货方信息</span>
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
          <td class="tableTH">单位</td>
          <td class="tableTD">{{ form.supplier }}</td>
          <td class="tableTH">联系人</td>
          <td class="tableTD">
            {{ form.contacts }}
          </td>
        </tr>
        <tr>
          <td class="tableTH">联系电话</td>
          <td class="tableTD">{{ form.contactsPhone }}</td>
        </tr>
      </table>
      <div class="title-divider">
        <span>需用物资列表</span>
        <el-divider />
      </div>
      <el-table
        :data="tableData"
        max-height="590"
        :header-row-class-name="() => 'headerClass'"
        style="width: 100%; margin-top: 14px"
      >
        <el-table-column prop="receiptItemId" label="物资名称" />
        <el-table-column prop="specification" label="规格/型号" />
        <el-table-column prop="num" label="退料数量" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="taxIncludeUnitPrice" label="含税单价(元)" />
        <el-table-column prop="taxReduceUnitPrice" label="除税单价(元)" />
        <el-table-column prop="taxRate" label="税率(%)" />
        <el-table-column prop="taxes" label="税金(元)" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </div>
  </el-card>
</template>
<script>
import { prucReportStopDetail } from '@/api/borrowSys/prucReportStop'
export default {
  name: '',
  components: {
  },
  data() {
    return {
      table: true, // 显示tab切换
      headerTitle: '', // 头部标题
      projectName: '深圳宝安区鸿昌花园幼儿园项目', // 项目名称
      activeName: 'first',
      form: {},
      radio: 1,
      tableData: []
    }
  },
  computed: {
    reportStopDate() {
      if (!this.form.reportStopStartDate && this.form.reportStopEndDate) {
        return this.form.reportStopEndDate
      } else if (this.form.reportStopStartDate && !this.form.reportStopEndDate) {
        return this.form.reportStopStartDate
      } else if (this.form.reportStopStartDate && this.form.reportStopEndDate) {
        return this.form.reportStopStartDate + ' ~ ' + this.form.reportStopEndDate
      } else {
        return ''
      }
    }
  },
  mounted() {
  },
  created() {
    this.prucReportStopDetail()
  },
  methods: {
    // getList () {
    //     list().then(res => {
    //         console.log(res)
    //     })
    // },
    prucReportStopDetail() {
      const param = { reportStopCode: this.$route.query.reportStopCode }
      prucReportStopDetail(param).then(res => {
        if (res && res.status === 200) {
          const result = res.data || {}
          this.form = result.reportStop || {}
          this.tableData = result.materialList
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title-divider {
  margin-top: 40px;
  font-weight: bold;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-col {
  margin: 10px 0;
}
.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding: 16px 0;
      display: flex;
      align-items: center;
      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .search-content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: end;
    }
  }
  .show-height {
    height: auto;
  }
  .table-box {
    height: 550px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table-content {
      width: 100%;
      height: 100%;
      padding: 16px 24px 0 24px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .table-title {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
        }
      }
      .pagination {
        width: 97%;
        height: 64px;
        display: flex;
        position: absolute;
        bottom: 0;
        align-items: center;
        justify-content: space-between;
        .pageNumberRecord {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  .footer {
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
}
.material-info {
  .material-type {
    margin: 16px 0;
  }
  .stop-number {
    padding-left: 32px;
    background: #fff;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
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
}
</style>
