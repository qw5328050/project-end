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
                    v-model.trim="queryParams.createUserName"
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
              <el-button v-if="!anSearch" type="text" @click="changeAnSearch"
                >展开<i class="el-icon-arrow-down"
              /></el-button>
              <el-button v-else type="text" @click="changeAnSearch"
                >收回<i class="el-icon-arrow-up"
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
            <el-button type="primary" @click="sureBatchExam()">
              <i class="el-icon-edit iconfont" />
              审批</el-button
            >
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
          border
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" type="selection" width="50" align="center" />
          <el-table-column
            v-if="columns[0].visible"
            key="1"
            :show-overflow-tooltip="true"
            align="center"
            label="序号"
            width="50"
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
            <!-- <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.planType, "planType") }}
            </template> -->
            <template slot-scope="{ row }">
              {{ row.businessCode }}
            </template>
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
            v-if="columns[5].visible"
            key="6"
            :show-overflow-tooltip="true"
            label="提交时间"
            prop="createTime"
            sortable
          >
            <!-- <template slot-scope="{ row }">
              {{ row.createUserNameName || "-" }}
            </template> -->
          </el-table-column>
          <el-table-column
            key="7"
            :show-overflow-tooltip="true"
            class="cup"
            label="操作"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="row.type == 0"
                size="mini"
                type="text"
                class="cup"
                @click="handleConfirm(row)"
                >审批</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            <!-- 共{{ this.pageTotal }}条记录 第1/40页 -->
            共{{ pageTotal }}条记录 第{{ currentPage }}/{{
              pageTotal > 0 ? Math.ceil(pageTotal / pageSize) : 0
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
    <el-dialog title="审批" :visible.sync="examOpinion" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="审批意见" required>
          <el-input
            v-model="form.examComment"
            type="textarea"
            :rows="5"
            required
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="examRefuse()">驳回</el-button>
        <el-button type="primary" @click="batchExam()">同意</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  taskList,
  batchComplete,
  batchReturn,
  checkConcreteType,
} from "@/api/waitDeal";
export default {
  name: "",
  filters: {
    numValueIsTrue(val) {
      if (val) {
        return val;
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      ids: [],
      form: { examComment: "" } /** 审批意见 */,
      pageTotal: 0,
      pageSize: 10,
      currentPage: 1,
      examOpinion: false,
      selPageSizes: [10, 20, 30, 100, 200, 500] /** 设置每页显示的条数 */,
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `模块`, visible: true },
        { key: 2, label: `业务`, visible: true },
        { key: 3, label: `项目名称`, visible: true },
        { key: 4, label: `提交人`, visible: true },
        { key: 5, label: `录入时间`, visible: true },
      ], // 显隐列
      tableName: "审批列表", // table的名字
      size: "medium", // 表格的密度
      headerTitle: "", // 头部标题
      title: "", // 标题
      projectName: "深圳宝安区鸿昌花园幼儿园项目", // 项目名称
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      queryParams: {
        // 查询参数
        type: null,
      },
      list: [], // 表格数据
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      options: [
        // 测试下拉数据
        { value: 0, label: "全部" },
        { value: 1, label: "测试" },
      ],
    };
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : "总结算管理";
  },
  created() {
    this.renderList();
  },
  methods: {
    async examRefuse() {
      if (!this.form.examComment) {
        this.$message.error("请填写驳回意见");
        return;
      }
      var paramArr = [];
      this.ids.forEach((item) => {
        const obj = {};
        obj.taskId = item.taskId;
        obj.processBaseId = item.processBaseId ? item.processBaseId : "";
        paramArr.push(obj);
      });
      var ret = await batchReturn({
        comment: this.form.examComment,
        flowTaskDTOList: paramArr,
      }).then(() => {
        this.form.examComment = "";
        this.currentPage = 0;
        this.renderList();
      });
      this.examOpinion = false;
    },
    async batchExam() {
      if (!this.form.examComment) {
        this.$message.error("请填写审批意见");
        return;
      }
      var paramArr = [];
      this.ids.forEach((item) => {
        const obj = {};
        obj.taskId = item.taskId;
        obj.instanceId = item.procInsId;
        obj.processBaseId = item.processBaseId ? item.processBaseId : "";
        paramArr.push(obj);
      });
      const bb = await batchComplete({
        comment: this.form.examComment,
        flowTaskDTOList: paramArr,
      })
        .then(() => {
          this.form.examComment = "";
          this.currentPage = 1;
          this.renderList();
          this.examOpinion = false;
        })
        .catch((err) => {
          this.examOpinion = false;
          // this.$message({
          //   type: "info",
          //   message: err.msg,
          // });
        });
    },
    sureBatchExam() {
      if (this.ids.length <= 0) {
        this.$message.error("请勾选审批项");
        return;
      }
      var judgeAllExam = this.ids.every((item) => {
        return item.type === 0;
      });
      if (!judgeAllExam) {
        this.$message.error("请只勾选审批选项");
        return;
      }
      var hasTotal = this.ids.some((item) => {
        return item.processCode === 'processSettlementTotal'
      });
      if (hasTotal) {
        this.$message.error("总结算不能批量结算");
        return;
      }
      this.$confirm("你确定要批量审批同意/驳回吗？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.examOpinion = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量审批",
          });
        });
    },
    /** 重新请求列表数据 */
    async renderList() {
      this.loading = true;
      var dealList = await taskList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      this.$set(this, "list", dealList.data.data);
      this.$set(this, "pageTotal", dealList.data.total);
      // this.list = dealList.data.data;
      // this.pageTotal = dealList.data.total;
      this.loading = false;
      console.log(this.list[0]);
    },
    async searchTodo() {
      var dealList = await taskList({
        ...this.queryParams,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      this.list = dealList.data.data;
    },
    /** 点击修改页面显示数据条数 */
    changePageSize(val) {
      this.pageSize = val;
      this.renderList();
    },
    /** 点击切换页面 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renderList();
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data;
      // this.ids = data.map((item) => {
      //   return item.id;
      // });
    },
    // 导出
    exportData() {
      // exportTotalPlan({ ...this.queryParams, ids: this.ids }).then((res) => {})
    },
    // 刷新
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns));
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type;
    },
    getList() {
      // 请求数据列表
      console.log("执行了");
      // this.columns = this.columns1
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch;
    },
    // 重置
    handerReset() {
      this.queryParams = {};
      this.renderList();
    },
    async backEdit(row) {
      /** 根据businessCode判断是哪个模块新建的流程，回退到流程更新修改 */
      switch (this.appendStr(row.businessCode)) {
        case "ZJH-GJ":
          if (row.isChange) {
            this.$router.push(
              `/plan/reinforcedNeededChange?id=${row.businessId}`
            );
          } else {
            this.$router.push(`/plan/reinforcedNeeded?id=${row.businessId}`);
          }
          break;
        case "ZJH-ZZL":
          if (row.isChange) {
            this.$router.push(
              `/plan/returnableNeededChange?id=${row.businessId}`
            );
          } else {
            this.$router.push(`/plan/returnableNeeded?id=${row.businessId}`);
          }
          break;
        case "ZJH-HNT":
          if (row.isChange) {
            this.$router.push(
              `/plan/concreteNeededChange?id=${row.businessId}`
            );
          } else {
            this.$router.push(`/plan/concreteNeeded?id=${row.businessId}`);
          }
          break;
        case "ZJH-TY":
          if (row.isChange) {
            this.$router.push(
              `/plan/materialsNeededChange?id=${row.businessId}`
            );
          } else {
            this.$router.push(`/plan/materialsNeeded?id=${row.businessId}`);
          }
          break;
        // case "XYJH-GCST":
        //   let ret = await checkConcreteType({ businessId: row.businessId });
        //   if (ret.data) {
        //   } else {
        //   }
      }
      const monthStr = row.businessCode.split("-")[0];
      if (monthStr === "YDJH") {
        this.$router.push(`/plan/editMonthlyPlan?id=${row.businessId}`);
      } else if (monthStr === "WZCG") {
        this.$router.push(`/purchase/purchaseDetails?id=${row.businessId}`);
      } else if (monthStr === "XYJH") {
        const ret = await checkConcreteType({ businessId: row.businessId });
        if (row.businessCode.split("-")[1] === "GCST" && ret.data) {
          this.$router.push(`/plan/concreteNeedPlan?id=${row.businessId}`);
        } else {
          this.$router.push(`/plan/suppliesNeedPlan?id=${row.businessId}`);
        }
      }
    },
    appendStr(str) {
      const ret = str.split("-");
      return ret[0] + "-" + ret[1];
    },
    handleConfirm(row) {
      this.$router.push(
        `/workbench/todo/approvalDetail?procDefId=${row.procDefId}&procInsId=${
          row.procInsId
        }&id=${row.businessId}&taskId=${row.taskId}&processCode=${
          row.processCode
        }&isChange=${row.isChange ? row.isChange : ""}&processBaseId=${
          row.processBaseId
        }&show=true&taskDefKey=${row.taskDefKey}`
      );
    },
    handlerEdit(row) {
      let path = "";
      switch (row.businessName) {
        case "总计划-物资":
          path = "/plan/materialsNeeded";
          break;
        case "总计划-钢筋":
          path = "/plan/reinforcedNeeded";
          break;
        case "总计划-混凝土":
          path = "/plan/concreteNeeded";
          break;
        case "总计划-周转料":
          path = "/plan/returnableNeeded";
          break;
      }
      this.$router.push({
        path: path,
        query: { id: row.id, planStatus: row.planStatus },
      });
    },
    handlerAlteration(row) {
      let path = "";
      switch (row.businessName) {
        case "总计划-物资":
          path = "/plan/materialsNeededChange";
          break;
        case "总计划-钢筋":
          path = "/plan/reinforcedNeededChange";
          break;
        case "总计划-混凝土":
          path = "/plan/concreteNeededChange";
          break;
        case "总计划-周转料":
          path = "/plan/returnableNeededChange";
          break;
      }
      this.$router.push({
        path: path,
        query: {
          id: row.businessId,
        },
      });
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
