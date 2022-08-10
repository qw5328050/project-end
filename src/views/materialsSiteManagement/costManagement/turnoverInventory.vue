<template>
  <div class="totalPlan_container">
    <div class="search_content" :class="{ show_height: anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="90px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目名称:">
                  <el-input
                    v-model="queryParams.project"
                    placeholder="请选择"
                    @click.native="addProject"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="单据状态:">
                  <el-input
                    v-model="queryParams.acceptCompany"
                    placeholder="请选择"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="handleQuery">查询</el-button>
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
    <div class="table_box">
      <div class="table_content">
        <div class="table_header">
          <div class="table_title">周转料具应拆未拆盘点列表</div>
          <div class="table_button">
            <el-button
              v-hasPermi="[
                'xm:menu:bs:material:plan_manage:master_plan:export',
                'isAll',
              ]"
              @click="exportData(1)"
            >
              <svg-icon icon-class="export" />
              导出</el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="addCompensation"
            >新增</el-button>
          </div>
        </div>
        <AllTable
          :table-data="list"
          :bind-data="bindData"
          :query-params="queryParams"
          :is-selection="true"
          :is-index="true"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
          :filters="filterData"
          :styles="styles"
        >
          <template v-slot:operation="scope">
            <el-button size="mini" type="text" @click="toAdd(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="toDetails(scope.row)">撤回</el-button>
          </template>
        </AllTable>
      </div>
    </div>
    <!-- 选择供应商 -->
    <supplierDialog
      :visible.sync="supplierDialogs"
      @submitForm="supplierSubmit"
    />
    <CheckProject
      :visible.sync="projectDialogs"
      title="选择项目"
      @submitForm="projectSupplierSubmit"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/materialsSiteManagement/compensation'
import supplierDialog from '@/components/SupplierDialog/index2'
import CheckProject from '@/components/CheckProject/indexDialog'
import AllTable from '@/components/AllTable'

export default {
  name: 'Compensation',
  components: {
    supplierDialog,
    CheckProject,
    AllTable
  },
  data() {
    return {
      supplierDialogs: false,
      projectDialogs: false,
      info: {},
      projectId: null,
      isShowPrint: false, // 显示弹窗
      checkAllData: false, // 全选的状态
      queryParams: {
        // 查询参数
        page: 1,
        rows: 10,
        total: 0,
        status: '',
        type: ''
      },
      list: [{apge: 1}], // 表格数据
      ids: [],
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      bindData: {
        apge: '应拆未拆编号',
        a1: '项目名称',
        a2: '供应商名称',
        a3: '版本日期',
        a4: '单据状态'
      },
      filterData: {
        a4: [{ text: '草稿', value: 1 }, { text: '生效', value: 2 }]
      },
      styles: {
        operation: { width: 120 }
      }
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  mounted() {
    if (!this.loading) {
      this.getList()
    }
    this.headerTitle = this.$route.name ? this.$route.name : '总计划'
  },
  activated() {
    if (!this.loading) {
      this.getList()
    }
  },
  methods: {
    projectSupplierSubmit(data) {
      this.queryParams.project = data.projectName
      this.queryParams.projectId = data.id
      this.projectDialogs = false
    },
    addProject() {
      this.projectDialogs = true
    },
    // 选择供应商弹窗
    addAcceptCompany() {
      this.supplierDialogs = true
    },
    // 供应商弹窗回显
    supplierSubmit(data) {
      this.queryParams.acceptCompany = data.supplierName
      this.queryParams.acceptCompanyId = data.id
      this.supplierDialogs = false
    },
    // 新增整改数据
    addCompensation(row = null) {
      let query = {
        pageType: 'turnoverInventory'
      }
      this.$router.push({
        path: "/costManagement/add",
        query: query,
      });
    },
    // 详情
    toDetails(row) {
      this.$router.push({
        path: '/materialsSiteManagement/compensationDetails',
        query: { id: row.id }
      })
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data.map((item) => {
        return item.id
      })
    },
    // 导出
    exportData(type) {
      if (this.ids && this.ids.length > 0) {
        if (type === 1) {
          exportTotalPlan({
            ...this.queryParams,
            planIdList: this.ids,
            ...this.projectInformation
          }).then((res) => {})
        } else {
          exportMaterial({
            ...this.queryParams,
            planIdList: this.ids,
            ...this.projectInformation
          }).then((res) => {})
        }
      } else {
        this.$message.warning('请先选择需要导出的总计划')
      }
    },
    // 获取数据
    getList() {
      // this.loading = true
      // getList({
      //   ...this.queryParams,
      //   ...this.projectInformation
      // })
      //   .then((res) => {
      //     const { list, total } = res.data
      //     this.$set(this, 'list', list)
      //     this.$set(this, 'total', total)
      //     this.loading = false
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
      // 请求数据列表
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 重置
    handerReset() {
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        status: '',
        type: ''
      }
      this.handleQuery()
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
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
  .draft {
    background: #bfbfbf;
  }
  .approval {
    background: #1791ff;
  }
  .normal {
    background: #00cc33;
  }
  .rejected {
    background: #faad14;
  }
  .withdraw {
    background: #ff4d4f;
  }
}
.totalPlan_container {
  .totalPlanTop {
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
  .search_content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      display: flex;
      box-sizing: border-box;
      justify-content: flex-end;
    }
  }
  .show_height {
    height: auto;
  }
  .table_box {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table_content {
      width: 100%;
      height: 100%;
      padding: 16px 24px 0 24px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .table_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .table_title {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
        }
        .table_button {
          display: flex;
          align-items: center;
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
</style>
