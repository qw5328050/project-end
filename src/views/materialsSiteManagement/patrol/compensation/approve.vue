<template>
  <div class="totalPlan_container">
    <div class="search_content" :class="{ show_height: anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="90px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="类型:" prop="planType">
                  <el-select
                    v-model="queryParams.planType"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('planType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="状态:" prop="planStatus">
                  <el-select
                    v-model="queryParams.planStatus"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('planStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="提交人:" prop="createUserName">
                  <el-input
                    v-model="queryParams.createUserName"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="提交时间:" prop="date">
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
            <el-button type="primary" @click="addAbarbeitung" icon="el-icon-plus">新增</el-button>
          </div>
        </div>
        <el-table
          ref="tableBox"
          v-loading="loading"
          :data="list"
          border
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" type="selection" width="55" align="center" />
          <el-table-column
            v-if="columns[0].visible"
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
            v-if="columns[1].visible"
            key="2"
            label="类型"
            show-overflow-tooltip
            prop="planType"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.planType, "planType") }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="3"
            label="总计划编号"
            prop="planCode"
            show-overflow-tooltip
            width="250"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toTotalPlanDetails(row)">{{
                row.planCode || "-"
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="4"
            label="物资种类数"
            width="120"
            sortable
            prop="materialQuantity"
          >
            <template slot-scope="{ row }">
              {{ row.materialQuantity | numValueIsTrue }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[4].visible"
            key="5"
            sortable
            label="月度计划数量"
            width="140"
            prop="monthPlanQuantity"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toViewMonthlyList(row)">
                {{ row.monthPlanQuantity | numValueIsTrue }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[5].visible"
            key="6"
            label="提交人员"
            prop="createUserName"
          >
            <template slot-scope="{ row }">
              {{ row.createUserName || "-" }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            key="7"
            label="提交时间"
            prop="createTime"
            width="150"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="columns[7].visible"
            key="8"
            label="变更次数"
            width="150"
            sortable
            prop="changeCount"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toChangeDetail(row)">
                {{ row.changeCount | numValueIsTrue }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[8].visible"
            key="9"
            label="状态"
            prop="planStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass(row)" />
                <span>{{
                  getDictionaryLabel(row.planStatus, "totalPlanStatus")
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[9].visible"
            key="10"
            width="200"
            label="操作"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-button size="mini" type="text" @click="toAdd(row)">编辑</el-button>
              <el-button size="mini" type="text" @click="toDetails(row)" >查看</el-button>
              <el-button size="mini" type="text" @click="toApprove(row)">审批</el-button>
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
    <el-dialog
      :title="processView.title"
      :visible.sync="processView.open"
      width="50%"
      append-to-body
    >
      <div v-if="processView.open">
        <approve-detail :info="info" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getList,
  deletePlan,
  exportTotalPlan,
  exportMaterial,
  selectPrintData,
} from "@/api/plan/totalPlan";
export default {
  name: "TotalPlan",
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
      processView: {
        title: '审批详情',
        open: false
      },
      info: {},
      projectId: null,
      isShowPrint: false, // 显示弹窗
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
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
      isShowApprovalProgress: false,
      date: "",
      isShowMonthlyDialog: false,
      size: "medium", // 表格的密度
      headerTitle: "", // 头部标题
      isIndeterminate: false, // 底部选择的状态
      checkAllData: false, // 全选的状态
      queryParams: {
        // 查询参数
        page: 1,
        rows: 10,
        planStatus: "",
        planType: "",
      },
      total: 0, // 总数
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `类型`, visible: true },
        { key: 2, label: `总计划编号`, visible: true },
        { key: 3, label: `物资种类`, visible: true },
        { key: 4, label: `月度计划数量`, visible: true },
        { key: 5, label: `提交人员`, visible: true },
        { key: 6, label: `提交时间`, visible: true },
        { key: 7, label: `变更次数`, visible: true },
        { key: 8, label: `状态`, visible: true },
        { key: 9, label: `操作`, visible: true },
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `类型`, visible: true },
        { key: 2, label: `总计划编号`, visible: true },
        { key: 3, label: `物资种类`, visible: true },
        { key: 4, label: `月度计划数量`, visible: true },
        { key: 5, label: `提交人员`, visible: true },
        { key: 6, label: `提交时间`, visible: true },
        { key: 7, label: `变更次数`, visible: true },
        { key: 8, label: `状态`, visible: true },
        { key: 9, label: `操作`, visible: true },
      ],
      list: [], // 表格数据
      ids: [],
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      totalId: null,
      printLoading: false,
      processdata: {},
      projectOption: [],
      printData: [],
    };
  },
  computed: {
    ...mapGetters(["projectInformation"]),
  },
  watch: {
    columns: {
      handler() {
        this.$nextTick(() => {
          this.$refs.tableBox.doLayout();
        });
      },
      immediate: true,
      deep: true,
    },
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
    // 新增整改数据
    addAbarbeitung(row = null) {
      this.$router.push({
        path: '/materialsSiteManagement/abarbeitungAdd',
        query: {
          id: row ? row.id : ''
        }
      })
    },
    // 详情
    toDetails(row) {
      this.$router.push({
        path: "/materialsSiteManagement/abarbeitungDetails",
        query: { id: row.id },
      });
    },
    // 验证详情
    toVerifyDetails(row) {
      this.$router.push({
        path: "/materialsSiteManagement/abarbeitungVerify",
        query: { id: row.id },
      });
    },
    showDetail(row) {
      const { processDefinitionId, processInstanceId } = row;
      this.info.processDefinitionId = processDefinitionId;
      this.info.processInstanceId = processInstanceId;
      this.processView.open = true;
    },
    getOnly() {
      // 0x   表示16进制数据的开头
      // 可以直接return (((1+Math.random())*0x10000)|0).toString(16)；

      // 也可用如下，随机数*时间戳，再转化为16进制
      // Number.toString(16)    表示将其转换为16进制
      // Number | 0 表示取整数部分

      const stamp = new Date().getTime();
      return (((1 + Math.random()) * stamp) | 0).toString(16);
    },

    changeArr(arr) {
      const idArr = [];
      const arrData = [];
      arr.forEach((item) => {
        if (idArr.findIndex((items) => items === item.activityId) < 0) {
          idArr.push(item.activityId);
        }
      });
      if (idArr.length > 0) {
        idArr.forEach((item) => {
          const newArr = arr.filter((items) => item === items.activityId);
          newArr.sort((a, b) => {
            return new Date(b.createTime) - new Date(a.createTime);
          });
          arrData.push(newArr[0]);
        });
      }
      arrData.sort((a, b) => {
        return new Date(a.createTime) - new Date(b.createTime);
      });
      if (arrData && arrData.length > 0) {
        return arrData;
      } else {
        return [];
      }
    },
    selectPrintData() {
      selectPrintData(this.ids).then((res) => {
        const arr = res.data || [];
        arr.forEach((item) => {
          if (item.materialList && item.materialList.length > 0) {
            item.materialList.forEach((materialItem) => {
              if (item.planType === 2 || item.planType === 3) {
                if (materialItem.remarks) {
                  materialItem.specification =
                    materialItem.specification + "-" + materialItem.remarks;
                }
              }
            });
          }
        });
        arr.forEach((item) => {
          if (item.planType === 2) {
            // 处理钢筋格式
            const obj = this.processingReinforced(item);
            const obj1 = Object.keys(obj);
            obj1.forEach((key) => {
              this.$set(item, key, obj[key]);
            });
          } else if (item.planType === 3) {
            const obj = this.processingConcrete(item);
            const obj1 = Object.keys(obj);
            obj1.forEach((key) => {
              this.$set(item, key, obj[key]);
            });
          }
        });
        this.printData = arr;
        this.printLoading = false;
      });
    },
    // 处理钢筋
    processingReinforced(obj) {
      const oneColum = [];
      const threeColum = [];
      const fourColum = [];
      const newList = [];
      if (obj.materialList && obj.materialList.length > 0) {
        obj.materialList.forEach((item, index) => {
          const obj = {};
          obj.usePosition = item.usePosition;
          obj.reinforcedTotalWeight = item.totalQuantity;
          if (item.steelType === 1) {
            obj["one" + item.specification] = item.totalQuantity;
            if (
              oneColum.findIndex(
                (items) => items.lable === item.specification
              ) < 0
            ) {
              oneColum.push({
                lable: item.specification,
                value: "one" + item.specification,
              });
            }
          } else if (item.steelType === 3) {
            obj["three" + item.specification] = item.totalQuantity;
            if (
              threeColum.findIndex(
                (items) => items.lable === item.specification
              ) < 0
            ) {
              threeColum.push({
                lable: item.specification,
                value: "three" + item.specification,
              });
            }
          } else if (item.steelType === 4) {
            obj["four" + item.specification] = item.totalQuantity;
            if (
              fourColum.findIndex(
                (items) => items.lable === item.specification
              ) < 0
            ) {
              fourColum.push({
                lable: item.specification,
                value: "four" + item.specification,
              });
            }
          }
          newList.push(obj);
        });
      }
      const total = {
        usePosition: "全部层汇总",
        reinforcedTotalWeight: 0,
      };
      newList.forEach((item) => {
        total.reinforcedTotalWeight += Number(item.reinforcedTotalWeight) || 0;
      });
      oneColum.forEach((item) => {
        total[item.value] = 0;
        newList.forEach((items) => {
          total[item.value] += Number(items[item.value]) || 0;
        });
      });
      threeColum.forEach((item) => {
        total[item.value] = 0;
        newList.forEach((items) => {
          total[item.value] += Number(items[item.value]) || 0;
        });
      });
      fourColum.forEach((item) => {
        total[item.value] = 0;
        newList.forEach((items) => {
          total[item.value] += Number(items[item.value]) || 0;
        });
      });
      newList.push(total);
      // 处理数组合并
      const changeNewList = [];
      newList.forEach((items) => {
        const index = changeNewList.findIndex(
          (item) => item.usePosition === items.usePosition
        );
        if (index >= 0) {
          changeNewList[index] = { ...items, ...changeNewList[index] };
        } else {
          changeNewList.push(items);
        }
      });
      const columnTotalNum =
        oneColum.length + threeColum.length + fourColum.length + 2;
      const base = this.getBase(1, columnTotalNum);
      const newObj = {
        oneColum,
        threeColum,
        fourColum,
        newList: changeNewList,
        base,
        columnTotal: columnTotalNum * base,
      };
      return newObj;
    },
    // 处理混凝土
    processingConcrete(obj) {
      const labelColum = [];
      const newList = [];
      if (obj.materialList && obj.materialList.length > 0) {
        obj.materialList.forEach((item, index) => {
          const obj = {};
          obj.usePosition = item.usePosition;
          obj.reinforcedTotalWeight = item.totalQuantity;
          obj["labelColum" + item.specification] = item.totalQuantity;
          if (
            labelColum.findIndex(
              (items) => items.lable === item.specification
            ) < 0
          ) {
            labelColum.push({
              lable: item.specification,
              value: "labelColum" + item.specification,
            });
          }
          newList.push(obj);
        });
      }
      const total = {
        usePosition: "全部层汇总",
        reinforcedTotalWeight: 0,
      };
      newList.forEach((item) => {
        total.reinforcedTotalWeight += Number(item.reinforcedTotalWeight) || 0;
      });
      labelColum.forEach((item) => {
        total[item.value] = 0;
        newList.forEach((items) => {
          total[item.value] += Number(items[item.value]) || 0;
        });
      });
      newList.push(total);
      // 处理数组合并
      const changeNewList = [];
      newList.forEach((items) => {
        const index = changeNewList.findIndex(
          (item) => item.usePosition === items.usePosition
        );
        if (index >= 0) {
          changeNewList[index] = { ...items, ...changeNewList[index] };
        } else {
          changeNewList.push(items);
        }
      });
      const base = this.getBase(1, labelColum.length + 2);
      const newObj = {
        labelColum,
        newList: changeNewList,
        base,
        columnTotal: (labelColum.length + 2) * base,
      };
      return newObj;
    },
    getBase(base, columnTotal) {
      let num = base;
      let sum = columnTotal;
      if (sum < 6) {
        ++num;
        sum = sum * num;
        return this.getBase(num, sum);
      } else {
        return num;
      }
    },
    // 显示审批进度
    showApprovals(row) {
      this.processdata = {
        processInstanceId: row.processInstanceId,
        processDefinitionId: row.processDefinitionId,
      };
      this.isShowApprovalProgress = true;
    },
    // 显示关联的月度计划
    toViewMonthlyList(row) {
      if (row.monthPlanQuantity > 0) {
        this.totalId = row.id;
        this.isShowMonthlyDialog = true;
      } else {
        this.$message({
          message: "当前总计划暂无关联月度计划",
          type: "warning",
        });
      }
    },
    // 跳转到了变更页面
    toChangeDetail(row) {
      if (row.changeCount > 0) {
        let path = "";
        switch (row.planType) {
          case 1:
            path = "/plan/materialsTotalPlanDetails";
            break;
          case 2:
            path = "/plan/reinforcedTotalPlanDetails";
            break;
          case 3:
            path = "/plan/concreteTotalPlanDetails";
            break;
          case 4:
            path = "/plan/returnableTotalPlanDetails";
            break;
        }
        this.$router.push({
          path: path,
          query: {
            type: row.planType,
            id: row.id,
            planStatus: row.planStatus,
            processInstanceId: row.processInstanceId,
            change: 1,
          },
        });
      } else {
        this.$message({
          message: "当前总计划暂无变更",
          type: "warning",
        });
      }
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
    // 查询时间
    changevalue(e) {
      if (e && e.length > 0) {
        this.queryParams.startDate = e[0];
        this.queryParams.endDate = e[1];
      } else {
        this.queryParams.startDate = "";
        this.queryParams.endDate = "";
      }
    },
    // 返回颜色
    getClass(row) {
      switch (row.planStatus) {
        case 1:
          return "draft";
        case 2:
          return "approval";
        case 3:
          return "normal";
        case 4:
          return "rejected";
        case 5:
          return "rejected";
        case 6:
          return "withdraw";
        case 7:
          return "withdraw";
      }
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns));
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type;
    },
    // 删除数据
    handlerdDeletePlan(row) {
      deletePlan({ planId: row.id }).then((res) => {
        this.$message({
          message: "删除成功!",
          type: "success",
        });
        this.getList();
      });
    },
    // 获取数据
    getList() {
      this.loading = true;
      getList({
        ...this.queryParams,
        ...this.projectInformation,
      })
        .then((res) => {
          const data = res.data;
          this.$set(this, "list", data.data);
          this.$set(this, "total", data.total);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
      // 请求数据列表
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch;
    },
    // 重置
    handerReset() {
      this.date = "";
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        planStatus: "",
        planType: "",
      };
      this.handleQuery();
    },
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    // 跳转新增页面
    toAddView(path) {
      this.$router.push({ path: path });
    },
    // 跳转到总计划详情页面
    toTotalPlanDetails(row) {
      let path = "";
      switch (row.planType) {
        case 1:
          path = "/plan/materialsTotalPlanDetails";
          break;
        case 2:
          path = "/plan/reinforcedTotalPlanDetails";
          break;
        case 3:
          path = "/plan/concreteTotalPlanDetails";
          break;
        case 4:
          path = "/plan/returnableTotalPlanDetails";
          break;
      }
      this.$router.push({
        path: path,
        query: {
          id: row.id,
          processInstanceId: row.processInstanceId,
        },
      });
    },
    handlerEdit(row) {
      let path = "";
      switch (row.planType) {
        case 1:
          path = "/plan/materialsNeeded";
          break;
        case 2:
          path = "/plan/reinforcedNeeded";
          break;
        case 3:
          path = "/plan/concreteNeeded";
          break;
        case 4:
          path = "/plan/returnableNeeded";
          break;
      }
      this.$router.push({
        path: path,
        query: { id: row.id },
      });
    },
    handlerAlteration(row) {
      let path = "";
      switch (row.planType) {
        case 1:
          path = "/plan/materialsNeededChange";
          break;
        case 2:
          path = "/plan/reinforcedNeededChange";
          break;
        case 3:
          path = "/plan/concreteNeededChange";
          break;
        case 4:
          path = "/plan/returnableNeededChange";
          break;
      }
      this.$router.push({
        path: path,
        query: {
          id: row.id,
          alteration: 1,
        },
      });
    },
    // 发起月度计划
    initiateMonthlyPlan(row) {
      this.$router.push({
        path: "/plan/addMonthlyPlan",
        query: {
          overallPlanType: row.planType,
          overallPlanCode: row.planCode,
          overallPlanId: row.id,
          projectId: row.projectId,
          projectName: row.projectName,
          projectCode: row.projectCode,
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
