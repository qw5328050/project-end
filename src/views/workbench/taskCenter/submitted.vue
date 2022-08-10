<template>
  <div class="totalPlan-container">
    <div class="search-content" :class="{ 'show-height': anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="90px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="业务编号:" prop="type">
                  <el-input
                    v-model.trim="queryParams.businessCode"
                    placeholder="请输入内容"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="业务类型:" prop="type">
                  <el-select
                    v-model="queryParams.processCode"
                    filterable
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('businessStyle')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="审批结果:" prop="type">
                  <el-select filterable
                    v-model="queryParams.business"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('approvalStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select filterable>
                </el-form-item>
              </el-col> -->
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目名称:" prop="type">
                  <el-input
                    v-model.trim="queryParams.projectName"
                    placeholder="请输入内容"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="提交人:" prop="type">
                  <el-input
                    v-model="queryParams.createUserName"
                    placeholder="请输入内容"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="searchTodo">查询</el-button>
              <el-button
                v-if="!anSearch"
                type="text"
                @click="changeAnSearch"
              >展开<i
                class="el-icon-arrow-down"
              /></el-button>
              <el-button
                v-else
                type="text"
                @click="changeAnSearch"
              >收回<i
                class="el-icon-arrow-up"
              /></el-button>
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
            <!-- <el-button @click="exportData">
              <svg-icon icon-class="export" />
              导出</el-button
            > -->
            <!-- <right-toolbar
              :columns="columns"
              @queryTable="getList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            /> -->
          </div>
        </div>
        <el-table
          ref="tableBox"
          v-loading="loading"
          :data="list"
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          max-height="460"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" :show-overflow-tooltip="true" type="selection" width="55" align="center" />
          <el-table-column
            v-if="columns[0].visible"
            key="1"
            :show-overflow-tooltip="true"
            align="center"
            label="序号"
            width="95"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="2"
            :show-overflow-tooltip="true"
            label="业务编号"
            prop="module"
          >
            <template slot-scope="{ row }">
              {{ row.businessCode }}
            </template>
            <!-- <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.planType, "planType") }}
            </template> -->
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="3"
            :show-overflow-tooltip="true"
            label="业务类型"
            prop="business"
          >
            <template slot-scope="{ row }">
              {{ row.businessName }}
            </template>
            <!-- <template slot-scope="{ row }">
              <el-button type="text" @click="toTotalPlanDetails(row)">{{
                row.planCode || "-"
              }}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="4"
            :show-overflow-tooltip="true"
            label="项目名称"
            sortable
            prop="projectName"
            min-width="80"
          />
          <el-table-column
            v-if="columns[4].visible"
            key="5"
            :show-overflow-tooltip="true"
            label="提交人"
            prop="startUserName"
          >
            <!-- <template slot-scope="{ row }">
              <el-button type="text" @click="toViewMonthlyList(row)">
                {{ row.monthPlanQuantity | numValueIsTrue }}
              </el-button>
            </template> -->
          </el-table-column>
          <el-table-column
            v-if="columns[4].visible"
            key="6"
            :show-overflow-tooltip="true"
            label="当前处理人"
            prop="approveUserName"
          >
            <!-- <template slot-scope="{ row }">
              <el-button type="text" @click="toViewMonthlyList(row)">
                {{ row.monthPlanQuantity | numValueIsTrue }}
              </el-button>
            </template> -->
          </el-table-column>
          <el-table-column
            v-if="columns[5].visible"
            key="7"
            :show-overflow-tooltip="true"
            label="提交时间"
            prop="createTime"
            sortable
          >
            <!-- <template slot-scope="{ row }">
              {{ row.createUserNameName || "-" }}
            </template> -->
          </el-table-column>
          <el-table-column key="8" :show-overflow-tooltip="true" width="100" label="操作" fixed="right">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="text"
                @click="handleConfirm(row)"
              >详情</el-button>
              <el-button
                v-if="false"
                size="mini"
                type="text"
                @click="handleConfirm(row)"
              >编辑</el-button>
              <el-button
                v-if="row.revokeStatus == 0"
                size="mini"
                type="text"
                @click="retreatProcess(row)"
              >撤回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            共{{ pageTotal }}条记录 第{{ currentPage }}/{{
              pageTotal > 0
                ? Math.ceil(pageTotal / pageSize)
                : 0
            }}页
          </div>
          <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :current-page="currentPage"
            :page-sizes="selPageSizes"
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
import { myProcess, revokeProcess } from '@/api/waitDeal'
export default {
  name: '',
  filters: {
    numValueIsTrue(val) {
      if (val) {
        return val
      } else {
        return 0
      }
    }
  },
  data() {
    return {
      pageTotal: 0,
      pageSize: 10,
      currentPage: 1,
      selPageSizes: [10, 20, 30, 100, 200, 500] /** 设置每页显示的条数 */,
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `模块`, visible: true },
        { key: 2, label: `业务`, visible: true },
        { key: 3, label: `项目名称`, visible: true },
        { key: 4, label: `提交人`, visible: true },
        { key: 5, label: `录入时间`, visible: true }
      ], // 显隐列
      tableName: '审批列表', // table的名字
      size: 'medium', // 表格的密度
      headerTitle: '', // 头部标题
      title: '', // 标题
      projectName: '深圳宝安区鸿昌花园幼儿园项目', // 项目名称
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      queryParams: {
        // 查询参数
        type: null
      },
      list: [], // 表格数据
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      options: [
        // 测试下拉数据
        { value: 0, label: '全部' },
        { value: 1, label: '测试' }
      ]
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总结算管理'
  },
  async created() {
    this.renderList()
  },
  methods: {
    /** 撤回流程 */
    retreatProcess(row) {
      this.$confirm('此操作将撤回流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          revokeProcess({
            taskId: row.taskId,
            instanceId: row.procInsId,
            processBaseId: row.processBaseId ? row.processBaseId : ''
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '撤回成功!'
              })
              this.renderList()
            })
            .catch(() => {
              // this.$message({
              //   type: "info",
              //   message: "已取撤回",
              // });
            })
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取撤回",
          // });
        })
    },
    /** 重新请求列表数据 */
    async renderList() {
      this.loading = true
      var dealList = await myProcess({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      })
      this.$set(this, 'list', dealList.data.data)
      this.$set(this, 'pageTotal', dealList.data.total)
      // this.list = dealList.data.data;
      // this.pageTotal = dealList.data.total;
      this.loading = false
      console.log(this.list[0])
    },
    async searchTodo() {
      var dealList = await myProcess({
        ...this.queryParams,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      })
      this.list = dealList.data.data
    },
    /** 点击修改页面显示数据条数 */
    changePageSize(val) {
      this.pageSize = val
      this.renderList()
    },
    /** 点击切换页面 */
    handleCurrentChange(val) {
      this.currentPage = val
      this.renderList()
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data.map((item) => {
        return item.id
      })
    },
    // 导出
    exportData() {
      // exportTotalPlan({ ...this.queryParams, ids: this.ids }).then((res) => {})
    },
    // 刷新
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    getList() {
      // 请求数据列表
      console.log('执行了')
      // this.columns = this.columns1
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 重置
    handerReset() {
      this.queryParams = {}
      this.renderList()
    },
    handleConfirm(row) {
      this.$router.push(
        `/workbench/todo/approvalDetail?procDefId=${row.procDefId}&procInsId=${
          row.procInsId
        }&id=${row.businessId}&taskId=${row.taskId}&processCode=${
          row.processCode
        }&isChange=${row.isChange ? row.isChange : ''}&taskDefKey=${
          row.taskDefKey
        }`
      )
    }
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
</style>
