<template>
  <el-card>
    <div class="base-info">
      <div class="info-container">
        <span class="title" style="font-weight: 600">基本信息</span>
        <table
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
            <tr v-if="pageType == 'scrap'">
              <td class="tableTH">报废理由</td>
              <td class="tableTD">{{ form.receiptCode }}</td>
              <td class="tableTH">报废类型</td>
              <td class="tableTD">{{ form.deliveryNo }}</td>
            </tr>
            <tr v-if="pageType == 'allot'">
              <td class="tableTH">调出项目名称</td>
              <td class="tableTD">{{ form.receiptCode }}</td>
              <td class="tableTH">调入项目名称</td>
              <td class="tableTD">{{ form.deliveryNo }}</td>
            </tr>
            <tr v-if="pageType == 'allot'">
              <td class="tableTH">进场时间</td>
              <td class="tableTD">{{ form.receiptCode }}</td>
              <td class="tableTH">调入原因</td>
              <td class="tableTD">{{ form.deliveryNo }}</td>
            </tr>
          </table>
      </div>
      <div class="title" style="font-weight: 600;margin-top: 35px;">{{title}}</div>
      <AllTable
          style="margin-top: 26px"
          :isIndex="true"
          :tableData="tableData"
          :bindData="bindData"
        />
    </div>
  </el-card>
</template>
<script>
import { tellStopList, exportStopsList } from '@/api/borrowSys/prucReportStop'
import AllTable from '@/components/AllTable'
export default {
  name: 'Done',
  data() {
    return {
      form: {},
      tableData: [],
      bindData: {},
      scrapBindData: {
        projectName: '项目名称',
        assets: '资产名称',
        assetsType: '资产类型',
        standards: '规格型号',
        brand: '品牌',
        unit: '单位',
        a3: '采购时间',
        a4: '入库时间',
        a5: '库存数量',
        a6: '采购人',
      },
      allotBindData: {
        assetsType: '资产类型',
        assets: '资产名称',
        standards: '规格型号',
        brand: '品牌',
        unit: '单位',
        num: '闲置数量',
        a: '采购金额',
        a1: '入库时间',
        a2: '调入数量',
        a3: '调入金额'
      },
      pageType: 'allot',
      title: '待报废物资'
    }
  },
  components: {
    AllTable,
  },
  created() {
    this.getList()
    this.pageType = this.$router.query && this.$router.query.pageType
    this.title = this.pageType == 'allot' ? '资产信息' : '待报废物资'
    this.bindData = this.pageType == 'allot' ? this.allotBindData : this.scrapBindData
  },
  mounted() {},
  methods: {
    sureBatchExam() {
      if (this.ids.length <= 0) {
        this.$message.error('请勾选退料')
        return
      }
      const statusList = this.ids.map(v => {
        return v.status
      })
      if (statusList.indexOf(3) !== -1 || statusList.indexOf(2) !== -1) {
        this.$message.error('已退料不可重复选择')
        return
      }
      this.$router.push({ path: '/borrowSys/returnTable', query: {
        reportStopId: this.ids.map(row => { return row.reportStopId }),
        id: this.ids.map(row => { return row.id }),
        pageType: 'stop'
      }})
    },
    changePageSize(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data
    },
    // 导出
    exportData() {
      exportStopsList({ ...this.queryParams, page: this.page, rows: this.rows }).then((res) => {})
    },
    async getList() {
      // 请求数据列表
      var dealList = await tellStopList({
        ...this.queryParams,
        page: this.page,
        rows: this.rows
      })
      this.list = dealList.data.data
      this.pageTotal = dealList.data.total
    },
    // 重置
    handerReset() {
      this.queryParams = {}
      this.renderList()
    },
  }
}
</script>

<style lang="scss" scoped>
.base-info {
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
}
</style>
