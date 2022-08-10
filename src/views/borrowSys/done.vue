<template>
  <div class="totalPlan-container">
    <div class="search-content">
      <el-form ref="queryForm" :model="queryParams" label-width="90px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="报停单编号:" prop="type">
                  <el-input
                    v-model.trim="queryParams.reportStopCode"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="结算方式:" prop="type">
                  <el-select
                    v-model="queryParams.settlementMode"
                    filterable
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('settlementMethod')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="退料日期:" prop="type">
                  <el-date-picker
                    key="returnDate"
                    v-model="queryParams.returnDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width: 80%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="searchTodo">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-box">
      <div class="table-content">
        <div class="table-header">
          <div class="table-title">{{ tableName }}</div>
          <div class="table-col">
            <el-button @click="exportData">
              <svg-icon icon-class="export" />
              导出</el-button>
            <el-button type="primary" @click="sureBatchExam()">
              <i class="el-icon-edit iconfont" />
              退料</el-button>
          </div>
        </div>
        <el-table
          ref="tableBox"
          v-loading="loading"
          :data="list"
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          border
          stripe
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" type="selection" width="50" align="center" />
          <el-table-column
            key="1"
            align="center"
            label="序号"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            key="2"
            :show-overflow-tooltip="true"
            label="报停单编号"
          >
            <template slot-scope="{ row }">
              <a
                href="javascript:void(0);"
                style="color: #1791ff; cursor: pointer"
                @click="togoOrderDetail(row)"
              >{{ row.reportStopCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
            key="3"
            :show-overflow-tooltip="true"
            label="退料单编号"
          >
            <template slot-scope="{ row }">
              <a
                href="javascript:void(0);"
                style="color: #1791ff; cursor: pointer"
                @click="togoBackDetail(row)"
              >{{ row.returnCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
            key="4"
            :show-overflow-tooltip="true"
            label="类型"
            prop="type"
          >
            <template slot-scope="{ row }">
              {{ row.type === 1 ? '仅报停' : row.type === 2 ? '报停并退料' : row.type === 3 ? '仅退料' : '-' }}
            </template>
          </el-table-column>
          <el-table-column
            key="stopStatus4"
            :show-overflow-tooltip="true"
            label="报停状态"
            prop="stopStatus"
          >
            <template slot-scope="{ row }">
              {{ handleStopStatus(row.stopStatus, row.type !== 3, 'stop' ) }}
            </template>
          </el-table-column>
          <el-table-column
            key="stopStatus5"
            :show-overflow-tooltip="true"
            label="退料状态"
            prop="stopStatus"
          >
            <template slot-scope="{ row }">
              {{ handleStopStatus(row.status, row.type !== 1, 'return') }}
            </template>
          </el-table-column>
          <el-table-column
            key="signStatus"
            :show-overflow-tooltip="true"
            label="退料会签状态"
            prop="signStatus"
          >
            <template slot-scope="{ row }">
              {{ row.signStatus | handleSignStatus }}
            </template>
          </el-table-column>
          <el-table-column
            key="5"
            :show-overflow-tooltip="true"
            label="物资种类"
            prop="materialTypeCount"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.type, 'type') }}
            </template>
          </el-table-column>
          <el-table-column
            key="6"
            label="结算方式"
            prop="settlementMode"
          >
            <template slot-scope="{ row }">
              <span>{{ row.settlementMode == 1 ? "每天":"每月" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            key="7"
            label="报停总价（元）"
            prop="reportStopTotalPrice"
          />
          <el-table-column
            key="8"
            label="材料工程师"
            prop="receiver"
          />
          <el-table-column
            key="9"
            :show-overflow-tooltip="true"
            label="退料日期"
            prop="returnDate"
          />
          <el-table-column
            key="10"
            :show-overflow-tooltip="true"
            label="报停日期"
          >
            <template slot-scope="scope">
              {{ scope.reportStopStartDate }}-{{ scope.reportStopEndDate }}
            </template>
          </el-table-column>
          <el-table-column
            key="11"
            label="状态"
            prop="status"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.status, 'leaseStopStatus') }}
            </template>
          </el-table-column>
          <el-table-column
            key="13"
            label="报停审批"
            prop="status"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.reportStopApprovalStatus, 'approval_status') }}
            </template>
          </el-table-column>
          <el-table-column
            key="14"
            label="报停确认"
            prop="status"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.reportConfirmStatus, 'confirm_status') }}
            </template>
          </el-table-column>
          <el-table-column
            key="15"
            label="退料确认"
            prop="status"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.returnConfirmStatus, 'confirm_status') }}
            </template>
          </el-table-column>
          <el-table-column
            key="12"
            class="cup"
            label="操作"
            fixed="right"
            width="80"
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="row.type === 2 && row.reportConfirmStatus === 2 && row.returnConfirmStatus === null"
                size="mini"
                type="text"
                class="cup"
                @click="backStop(row)"
              >退料</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            共{{ pageTotal }}条记录 第{{ page }}/{{
              pageTotal > 0
                ? Math.ceil(pageTotal / rows)
                : 0
            }}页
          </div>
          <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :current-page="page"
            :page-size="rows"
            :total="pageTotal"
            @size-change="changePageSize"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tellStopList, exportStopsList } from '@/api/borrowSys/prucReportStop'
let that
export default {
  name: 'Done',
  data() {
    return {
      ids: [],
      form: { examComment: '' } /** 审批意见 */,
      pageTotal: 0,
      rows: 10,
      page: 1,
      examOpinion: false,
      tableName: '报停退料列表', // table的名字
      size: 'medium', // 表格的密度
      headerTitle: '', // 头部标题
      title: '', // 标题
      checkAll: false, // 全选的状态
      queryParams: {
        reportStopCode: '',
        settlementMode: '',
        returnDate: ''
      },
      list: [], // 表格数据
      loading: false, // 表格加载
      options: [],
      stopStatusList: [
        { label: '草稿', value: 1 },
        { label: '报停待确认', value: 2 },
        { label: '已报停', value: 3 },
      ],
      returnStatusList: [
        { label: '草稿', value: 1 },
        { label: '退料待确认', value: 2 },
        { label: '已退料', value: 3 },
      ],
      signStatusList: [
        { label: '未会签', value: 0 },
        { label: '会签中', value: 1 },
        { label: '会签通过', value: 2 },
        { label: '拒绝', value: 3 },
      ],
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总结算管理'
  },
  created() {
    // Object.keys(this.queryParams).forEach(v => {
    //   this.queryParams[v] = ''
    // })
    that = this
    this.getList()
  },
  filters: {
    handleSignStatus (val) {
      let cur = that.signStatusList.filter(v => {
        return v.value == val
      })
      return cur && cur.length > 0 ? cur[0].label : '-'
    },
  },
  methods: {
    handleStopStatus (val, isType, type) {
      let rules = {
        stop: this.stopStatusList,
        return: this.returnStatusList,
      }
      if (!isType || !val) {
        return '-'
      }
      let arr = rules[type] ? rules[type] : []
      let cur = arr.filter(v => {
        return v.value == val
      })
      return cur && cur.length > 0 ? cur[0].label : '-'
    },
    handleReturnStatus (val, row) {},
    searchTodo() {
      this.getList()
    },

    togoOrderDetail(row) {
      this.$router.push({ path: '/borrowSys/prucReportStop', query: { reportStopCode: row.reportStopCode, processInstanceId: row.processInstanceId }})
    },
    togoBackDetail(row) {
      this.$router.push({ path: '/borrowSys/rejectGoodsDetail', query: { returnCode: row.returnCode }})
    },
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
    backStop(row) {
      this.$router.push({ path: '/borrowSys/returnTable', query: {
        returnCode: row.returnCode,
        reportStopId: row.reportStopId,
        id: row.id,
        pageType: 'stop'
      }})
    },
    returnMater() {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}

.totalPlan-container {
  .search-content {
    background: #ffffff;
    margin: 16px;
    padding-top: 30px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
    }
  }
  .show-height {
    height: auto;
  }
  .table-box {
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
        // position: absolute;
        // bottom: 0;
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
.table-col {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.popoverIoc {
  margin-left: 8px;
  font-size: 16px;
  color: #1791ff;
}
.tablePrimary {
  height: 40px;
  background-color: #fff;
  width: 30px;
}
.buttonRight {
  margin-right: 8px;
}

.cup {
  cursor: pointer;
}
.posr {
  position: relative;
}

.posa {
  position: absolute;
}
.el-table-column {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
