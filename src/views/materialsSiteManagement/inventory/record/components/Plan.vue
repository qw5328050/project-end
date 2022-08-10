<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <div class="totalPlan_container">
      <div class="search_content">
        <el-form ref="queryForm" :model="queryParams" label-width="90px">
          <el-row :gutter="20">
            <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
              <el-row :gutter="20">
                <el-col :xl="10" :lg="10" :xs="12" :sm="12" :md="12">
                  <el-form-item label="盘点人:">
                    <el-input
                      v-model="queryParams.operatorUserName"
                      placeholder="请输入"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="10" :lg="10" :xs="12" :sm="12" :md="12">
                  <el-form-item label="盘点时间:" prop="date">
                    <el-date-picker
                      v-model="date"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 100%"
                      :picker-options="pickerOptions"
                      @change="changevalue"
                    />
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
          <el-table
            ref="listTable"
            v-loading="loading"
            :data="list"
            border
            :header-row-class-name="() => 'headerClass'"
            style="margin-top: 26px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              key="0"
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column align="center" label="序号" width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              label="盘点计划编号"
              show-overflow-tooltip
              prop="number"
              width="200"
            />

            <el-table-column
              label="盘点人"
              prop="operatorString"
              show-overflow-tooltip
            />
            <el-table-column
              label="盘点内容"
              prop="content"
              show-overflow-tooltip
            />
            <el-table-column
              label="盘点时间"
              show-overflow-tooltip
              prop="inventoryEndTime"
              width="180"
            >
              <template slot-scope="{ row }">
                <span>{{
                  `${row.inventoryStartTime} - ${row.inventoryEndTime}`
                }}</span>
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
    </div>
    <div class="actionButtons">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
    <!-- </div> -->
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getList } from "@/api/materialsSiteManagement/plan";
import { revokeProcess } from "@/api/waitDeal";

export default {
  name: "InventoryPlan",
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false,
    },
    title: {
      type: String,
      default: "计划列表",
    },
  },
  data() {
    return {
      projectDialogs: false,
      projectId: null,
      isShowPrint: false, // 显示弹窗
      checkAllData: false, // 全选的状态
      date: "",
      queryParams: {
        // 查询参数
        page: 1,
        rows: 10,
        status: 3,
        type: "",
        operatorUserName: "",
        inventoryStartTime: "",
        inventoryEndTime: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      total: 0, // 总数
      list: [], // 表格数据
      loading: false, // 表格加载
      checkSelection: ''
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
    confirm() {
      this.$emit("submitForm", this.checkSelection);
      this.$emit('update:visible', false)
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    // 查询时间
    changevalue(e) {
      if (e && e.length > 0) {
        this.queryParams.inventoryStartTime = e[0];
        this.queryParams.inventoryEndTime = e[1];
      } else {
        this.queryParams.inventoryStartTime = "";
        this.queryParams.inventoryEndTime = "";
      }
    },
    // 多选
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.listTable.clearSelection();
        this.$refs.listTable.toggleRowSelection(val.pop());
        return;
      }
      if (val[0]) {
        this.checkSelection = val[0];
      } else {
        this.checkSelection = null
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
          let { list, total } = res.data;
          list.forEach((item) => {
            if (item.operatorDTOS?.length) {
              const operatorString = item.operatorDTOS
                .map((item) => item.operatorUserName)
                .join("、");
              item.operatorString = operatorString;
            } else {
              item.operatorString = "-";
            }
          });
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
        status: 3,
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
    box-sizing: border-box;
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
    margin-top: -15px;
    .table_content {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .pagination {
        width: 100%;
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
.actionButtons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  margin-right: 16px;
}
::v-deep .is-scrolling-none {
  max-height: 412px;
  overflow-y: scroll;
}
</style>
