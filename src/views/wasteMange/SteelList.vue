<template>
  <div>
    <div class="app-container">
      <div class="search-content" :class="{ 'show-height': anSearch }">
        <el-form ref="queryForm" :model="queryParams" label-width="90px">
          <el-row :gutter="20">
            <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
              <el-row :gutter="20">
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="项目名称:" prop="applyProjectName">
                    <el-input
                      v-model="queryParams.applyProjectName"
                      placeholder="请输入"
                      style="width: 100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="申请人:" prop="createUser">
                    <el-date-picker
                      v-model="date"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 150%"
                      @change="changevalue"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
              <div class="search-btn">
                <el-button
                  @click="handerReset"
                >重置</el-button>
                <!--    v-hasPermi="['xm:menu:bs:material:contract_manage:list:reset']"-->
                <el-button
                  type="primary"
                  @click="handleQuery"
                >查询</el-button>
                <!--     v-hasPermi="['xm:menu:bs:material:contract_manage:list:query']"-->
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-card>
        <div class="table_header">
          <div class="table_title"></div>
          <div class="table_button">
            <el-button
              v-hasPermi="['xm:menu:bs:material:contract_manage:list:export']"
              @click="exportData"
            ><svg-icon icon-class="export" />导出</el-button>
            <right-toolbar
              :size="size"
              :columns="columns"
              @queryTable="getList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <el-table
          v-loading="loading"
          border
          stripe
          :data="tableData"
          element-loading-text="Loading"
          :size="size"
          fit
          highlight-current-row
          :header-row-class-name="() => 'headerClass'"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="left" />
          <el-table-column
            v-if="columns[0].visible"
            key="0"
            align="left"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="项目名称"
            align="left"
            prop="applyProjectName"
          />
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="处理日期"
            align="left"
            prop="applySerial"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
              >{{ scope.row.applySerial }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="申请单编号"
            align="left"
            prop="recordSerial"
          />
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="暂估数量"
            header-align="left"
            align="right"
            prop="filingSerial"
          >
          <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
              >{{ scope.row.contractCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            class-name="status-col"
            label="市场价格"
            align="left"
            prop="useStatus"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            align="left"
            prop="receiptProject"
            label="金额"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="报告批复时间"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[8].visible"
            key="8"
            label="是否招标处理"
            align="left"
            prop="hasChange"
          />
          <el-table-column
            v-if="columns[9].visible"
            key="9"
            label="处理数量"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[10].visible"
            key="10"
            label="累计处理数量"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[11].visible"
            key="11"
            label="处理单价"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[12].visible"
            key="12"
            label="处理金额"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[13].visible"
            key="13"
            label="财务收款收据编号"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[14].visible"
            key="14"
            label="收款人"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[15].visible"
            key="15"
            label="经办人"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[16].visible"
            key="16"
            label="钢筋累计消耗量"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[17].visible"
            key="17"
            label="废钢筋累计产生率"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[18].visible"
            key="18"
            label="备注"
            align="left"
            prop="hasChange"
          >
          </el-table-column>
        </el-table>
        <div v-if="total > 0" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams.pageNum }}/{{
              Math.ceil(total / queryParams.pageSize)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { wasteList } from '@/api/wasteMange/wasteMange'
import { mapGetters } from 'vuex'
import {
  exportContracts,
} from '@/api/contractManagement/table'
export default {
  computed: {
    ...mapGetters(['projectInformation'])
  },
  data() {
    return {
      size: 'small', // 表格的密度
      isIndeterminate: false, // 底部选择的状态
      checkAllData: false, // 全选的状态
      tableData: [],
      total: 0,
      anSearch: false,
      loading: false,
      date:'',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        beginTime: null,
        endTime: null
      },
      // 表单参数
      form: {},
      list: [],
      selPreOrdetData: [],
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `项目名称`, visible: true },
        { key: 2, label: `处理日期`, visible: true },
        { key: 3, label: `申请单编号`, visible: false },
        { key: 4, label: `暂估数量`, visible: false },
        { key: 5, label: `市场价格`, visible: true },
        { key: 6, label: `金额`, visible: true },
        { key: 7, label: `报告批复时间`, visible: true },
        { key: 8, label: `是否招标处理`, visible: true },
        { key: 9, label: `处理数量`, visible: true },
        { key: 10, label: `累计处理数量`, visible: true },
        { key: 11, label: `处理单价`, visible: false },
        { key: 12, label: `处理金额`, visible: false },
        { key: 13, label: `财务收款收据编号`, visible: true },
        { key: 14, label: `收款人`, visible: true },
        { key: 15, label: `经办人`, visible: true },
        { key: 16, label: `钢筋累计消耗量`, visible: false },
        { key: 17, label: `废钢筋累计产生率`, visible: true },
        { key: 18, label: `备注`, visible: true }
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `项目名称`, visible: true },
        { key: 2, label: `处理日期`, visible: true },
        { key: 3, label: `申请单编号`, visible: false },
        { key: 4, label: `暂估数量`, visible: false },
        { key: 5, label: `市场价格`, visible: true },
        { key: 6, label: `金额`, visible: true },
        { key: 7, label: `报告批复时间`, visible: true },
        { key: 8, label: `是否招标处理`, visible: true },
        { key: 9, label: `处理数量`, visible: true },
        { key: 10, label: `累计处理数量`, visible: true },
        { key: 11, label: `处理单价`, visible: false },
        { key: 12, label: `处理金额`, visible: false },
        { key: 13, label: `财务收款收据编号`, visible: true },
        { key: 14, label: `收款人`, visible: true },
        { key: 15, label: `经办人`, visible: true },
        { key: 16, label: `钢筋累计消耗量`, visible: false },
        { key: 17, label: `废钢筋累计产生率`, visible: true },
        { key: 18, label: `备注`, visible: true }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查询时间
    changevalue(e) {
      if (e && e.length > 0) {
        this.queryParams.beginTime = e[0]
        this.queryParams.endTime = e[1]
      } else {
        this.queryParams.beginTime = ''
        this.queryParams.endTime = ''
      }
    },
    handleSelectionChange(val) {
      this.selPreOrdetData = val
    },
    // 导出
    exportData() {
      // if (this.selPreOrdetData === null || this.selPreOrdetData.length === 0) {
      //   this.$message.warning('请选择需要导出的合同信息')
      //   return
      // }
      const ids = []
      this.selPreOrdetData.forEach((item) => {
        ids.push(item.id)
      })

      const obj = delEmtQueryNodes(delEmtQueryNodes(JSON.parse(JSON.stringify(this.queryParams))))
      if (this.queryParams.beginTime == null) {
        delete obj.beginTime
      }
      if (this.queryParams.endTime == null) {
        delete obj.endTime
      }
      obj.contractIds = ids
      delete obj.pageNum
      delete obj.pageSize
      exportContracts(objectToQueryString({ ...obj, orgId: this.projectInformation.orgId === null ? -1 : this.projectInformation.orgId })).then((response) => {
        // const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        // const url = window.URL || window.webkitURL || window.moxURL
        // const downloadHref = url.createObjectURL(blob)
        // const downloadLink = document.createElement('a')
        // downloadLink.href = downloadHref
        // downloadLink.download = `合同列表.xlsx`
        // downloadLink.click()
      })

      // exportContracts(this.ids).then((res) => {})
    },
    // 获取列表数据
    getList() {
      this.loading = true
      wasteList(this.queryParams).then((res) => {
        if(res.status == 200){
          const data = res.data
          this.tableData = data.list
          this.total = data.total
          this.loading = false
        }
      }).catch(() => {
          this.loading = false
      })
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    // 重置
    handerReset() {
      this.queryParams = {
        // 查询参数
        pageNum: 1,
        pageSize: 10
      }
      this.handleQuery()
    },
    handleQuery() {
      this.form.pageNum = 1
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.needPlanTop {
  background: #fff;
  padding-left: 32px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  .project {
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    display: flex;
    padding-bottom: 16px;
    align-items: center;
    .switch_svg {
      margin-left: 8px;
      font-size: 24px;
    }
  }
}
  .popoverIoc {
    margin-left: 8px;
    font-size: 16px;
    color: #1791ff;
  }
  .planStatus {
    display: flex;
    align-items: center;
    .box {
      width: 7px;
      height: 7px;
      box-sizing: border-box;
      border-radius: 50%;
      margin-right: 8px;
    }
    .normal {
      background: #bfbfbf;
    }
    .approval {
      background: #1791ff;
    }
    .draft {
      background: #00cc33;
    }
    .rejected {
      background: #faad14;
    }
    .forbidden {
      background: red;
    }
  }
  .action-box {
    color: #1791ff;
    display: flex;
    justify-content: space-between;
  }
  .action-border {
    width: 1px;
    height: 14px;
    background: #e9e9e9;
  }
  ::v-deep .headerClass th {
    background: #fafafa !important;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  // .box {
  //   background-color: #fff;
  //   padding-bottom: 18px;
  // }
  .box1 {
    margin-left: 32px;
    width: 80px;
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
  .search-content {
    background: #ffffff;
    // margin: 16px;
    margin-bottom: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 70px;
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
  .table_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .table_title {
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }
    .table_button {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  .pagination {
    margin-left: 1%;
    width: 97%;
    height: 64px;
    display: flex;
    // position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    .pageNumberRecord {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .footer {
    // position: absolute;
    width: 100%;
    // margin-top: 16px;
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
