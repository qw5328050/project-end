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
                <el-form-item label="接收单位:">
                  <el-input
                    v-model="queryParams.acceptCompany"
                    placeholder="请选择"
                    @focus="addAcceptCompany"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="类别:">
                  <el-select
                    v-model="queryParams.type"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('abarbeitungType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="单据状态:">
                  <el-select
                    v-model="queryParams.status"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue(
                        'abarbeitungBillsStatus'
                      )"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="handleQuery">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table_box">
      <div class="table_content">
        <div class="table_header">
          <div class="table_title">整改列表</div>
          <div class="table_button">
            <el-button
              v-hasPermi="[
                'xm:menu:bs:material:plan_manage:master_plan:export',
                'isAll',
              ]"
              @click="exportData(1)"
            >
              <svg-icon icon-class="export" />
              导出</el-button
            >
            <el-button
              type="primary"
              @click="addAbarbeitung"
              icon="el-icon-plus"
              >新增</el-button
            >
          </div>
        </div>
        <el-table
          ref="tableBox"
          v-loading="loading"
          :data="list"
          border
          :header-row-class-name="() => 'headerClass'"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" type="selection" width="55" align="center" />
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="整改单据编号"
            show-overflow-tooltip
            prop="number"
            width="200"
          />
          <el-table-column
            label="项目名称"
            show-overflow-tooltip
            prop="project"
          />
          <el-table-column
            label="接收名称"
            prop="acceptCompany"
            show-overflow-tooltip
          />
          <el-table-column
            label="单据状态"
            prop="status"
            show-overflow-tooltip
            width="120"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.status, "abarbeitungBillsStatus")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
            prop="createTime"
            show-overflow-tooltip
            width="150"
          />
          <el-table-column width="140" label="操作">
            <template slot-scope="{ row }">
              <el-button size="mini" type="text" @click="toDetails(row)"
                >查看</el-button
              >
              <el-button
                v-if="row.status === 1"
                size="mini"
                type="text"
                @click="addAbarbeitung(row)"
                >编辑</el-button
              >
              <el-button
                v-if="row.status === 3"
                size="mini"
                type="text"
                @click="toVerify(row)"
                >验证</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div v-if="total > 0" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams.page }}/{{
              Math.ceil(total / queryParams.rows)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.rows"
            @pagination="getList"
          />
        </div>
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
import { mapGetters } from "vuex";
import { getList } from "@/api/materialsSiteManagement/abarbeitung";
import supplierDialog from "@/components/SupplierDialog/index2";
import CheckProject from "@/components/CheckProject/indexDialog";

export default {
  name: "Abarbeitung",
  components: {
    supplierDialog,
    CheckProject,
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
        status: "",
        type: "",
      },
      total: 0, // 总数
      list: [], // 表格数据
      ids: [],
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
    };
  },
  computed: {
    ...mapGetters(["projectInformation"]),
  },
  mounted() {
    if (!this.loading) {
      this.getList();
    }
    this.headerTitle = this.$route.name ? this.$route.name : "总计划";
  },
  activated() {
    if (!this.loading) {
      this.getList();
    }
  },
  methods: {
    projectSupplierSubmit(data) {
      this.queryParams.project = data.projectName;
      this.queryParams.projectId = data.id;
      this.projectDialogs = false;
    },
    addProject() {
      this.projectDialogs = true;
    },
    // 选择供应商弹窗
    addAcceptCompany() {
      this.supplierDialogs = true;
    },
    // 供应商弹窗回显
    supplierSubmit(data) {
      this.queryParams.acceptCompany = data.supplierName;
      this.queryParams.acceptCompanyId = data.id;
      this.supplierDialogs = false;
    },
    // 新增整改数据
    addAbarbeitung(row = null) {
      this.$router.push({
        path: "/materialsSiteManagement/abarbeitungAdd",
        query: {
          id: row ? row.id : "",
        },
      });
    },
    // 详情
    toDetails(row) {
      this.$router.push({
        path: "/materialsSiteManagement/abarbeitungDetails",
        query: { id: row.id },
      });
    },
    // 验证详情
    toVerify(row) {
      this.$router.push({
        path: "/materialsSiteManagement/abarbeitungVerify",
        query: { id: row.id },
      });
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data.map((item) => {
        return item.id;
      });
    },
    // 导出
    exportData(type) {
      if (this.ids && this.ids.length > 0) {
        if (type === 1) {
          exportTotalPlan({
            ...this.queryParams,
            planIdList: this.ids,
            ...this.projectInformation,
          }).then((res) => {});
        } else {
          exportMaterial({
            ...this.queryParams,
            planIdList: this.ids,
            ...this.projectInformation,
          }).then((res) => {});
        }
      } else {
        this.$message.warning("请先选择需要导出的总计划");
      }
    },
    // 获取数据
    getList() {
      this.loading = true;
      getList({
        ...this.queryParams,
        ...this.projectInformation,
      })
        .then((res) => {
          const { list, total } = res.data;
          this.$set(this, "list", list);
          this.$set(this, "total", total);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
      // 请求数据列表
    },
    // 重置
    handerReset() {
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        status: "",
        type: "",
      };
      this.handleQuery();
    },
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
  },
};
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
    padding-top: 22px;
    box-sizing: border-box;
    min-height: 80px;
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
</style>
