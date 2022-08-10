<template>
  <div class="addMonthlyPlan_container">
    <div class="add-content">
      <div class="table_box">
        <div class="table_content">
          <el-card class="pm">
            <div slot="header" class="clearfix">
              <span style="font-weight: 600">基本信息</span>
            </div>
            <el-form
              ref="form"
              :model="queryParams"
              :rules="formRules"
              label-width="90px"
              style="margin-top: 20px"
              :label-position="labelPosition"
            >
              <el-row>
                <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="盘点计划" prop="plantNumber">
                    <el-input
                      v-model="queryParams.plantNumber"
                      placeholder="请输入"
                      @click.native="planShow"
                      style="width: 80%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="项目名称" prop="projectName">
                    <el-input
                      v-model="queryParams.projectName"
                      placeholder="请输入"
                      disabled
                      style="width: 80%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="盘点记录号" prop="number">
                    <el-input
                      v-model="queryParams.number"
                      placeholder=""
                      clearable
                      disabled
                      style="width: 80%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="盘点时间:" prop="date">
                    <el-date-picker
                      v-model="queryParams.date"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 80%"
                      :picker-options="pickerOptions"
                      @change="changevalue"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="盘点内容" prop="content">
                    <el-input
                      v-model="queryParams.content"
                      placeholder="请输入"
                      style="width: 80%"
                      maxlength="50"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form
                ref="tableForm"
                :model="queryParams"
                :rules="tableRules"
                size="small"
              >
                <div class="tableHeader">
                  <div class="handerTitle">盘点人</div>
                  <div class="btns">
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      style="margin-left: 8px"
                      @click="addTable"
                      >新增一行</el-button
                    >
                  </div>
                </div>
                <div class="table_div">
                  <el-table
                    :data="queryParams.operatorDTOS"
                    :header-row-class-name="() => 'headerClass'"
                    style="width: 100%"
                  >
                    <el-table-column align="center" label="序号" width="95">
                      <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="operatorUserName"
                      label="人员"
                      width="250"
                    >
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`operatorDTOS[${$index}].operatorUserName`"
                          :rules="tableRules.operatorUserName"
                        >
                          <el-input
                            ref="inputDialog"
                            v-model="row.operatorUserName"
                            readonly="readonly"
                            placeholder="请选择"
                            @focus="focusInput(row, $index)"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="职责分工">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`operatorDTOS[${$index}].duty`"
                          :rules="tableRules.duty"
                        >
                          <el-input
                            v-model="row.duty"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                      <template slot-scope="{ row, $index }">
                        <el-popconfirm
                          title="确定要删除这一行吗？"
                          style="margin-left: 10px"
                          @onConfirm="handelDelete(row, $index)"
                        >
                          <el-button slot="reference" size="mini" type="text"
                            >删除</el-button
                          >
                        </el-popconfirm>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-form>
              <el-form
                ref="materialForm"
                :model="queryParams"
                :rules="materialRules"
                size="small"
              >
                <div class="tableHeader">
                  <div class="handerTitle">盘点物资</div>
                  <div class="btns">
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      style="margin-left: 8px"
                      @click="addMaterial"
                      >新增一行</el-button
                    >
                  </div>
                </div>
                <div class="table_div">
                  <el-table
                    :data="queryParams.inventoryMaterialDTOS"
                    :header-row-class-name="() => 'headerClass'"
                    style="width: 100%"
                  >
                    <el-table-column align="center" label="序号" width="95">
                      <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="operatorUserName"
                      label="盘点物资"
                      width="250"
                    >
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].materialName`"
                        >
                          <el-input
                            ref="materiaDialog"
                            :value="row.materialName"
                            readonly="readonly"
                            placeholder="请选择"
                            disabled
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="规格型号">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].specification`"
                        >
                          <el-input
                            :value="row.specification"
                            placeholder="请输入"
                            disabled
                            clearable
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>

                    <el-table-column prop="duty" label="类型">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].type`"
                        >
                          <el-select
                            v-model="row.type"
                            placeholder="请选择"
                            style="width: 80%"
                          >
                            <el-option
                              v-for="item in getDictionaryValue('materialType')"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </template>
                    </el-table-column>

                    <el-table-column prop="duty" label="剩余数量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].amount`"
                          :rules="materialRules.amount"
                        >
                          <el-input
                            v-model="row.amount"
                            type="number"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                      <template slot-scope="{ row, $index }">
                        <el-popconfirm
                          title="确定要删除这一行吗？"
                          style="margin-left: 10px"
                          @onConfirm="handelDelete(row, $index)"
                        >
                          <el-button slot="reference" size="mini" type="text"
                            >删除</el-button
                          >
                        </el-popconfirm>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-form>
            </el-form>
            <el-row :gutter="20" style="padding: 16px 0">
              <el-col :span="12">
                <FileUpload
                  :value="queryParams.materialFiles"
                  prop="uploads"
                  :limit-num="10"
                  :file-size="5"
                  :file-type="fileType"
                  @getFileList="getFileListS"
                  @delFile="delFileS"
                />
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
      <div class="footer">
        <div class="select_box">
          <div class="action_buttons">
            <el-button @click="goback">取消</el-button>
            <el-button @click="submitForm(0)">保存</el-button>
            <el-button type="primary" @click="submitForm(1)">提交</el-button>
          </div>
        </div>
      </div>
    </div>

    <ApproverRadioDialog
      title="选择人员"
      :select-all="selectAll"
      :visible.sync="isShowSuppliesDialog"
      @selectSubmit="selectSubmit"
      @handleClose="handleClose"
    />
    <CheckProject
      :visible.sync="projectShow"
      title="选择项目"
      @submitForm="submitProject"
    />
    <PlanList :visible.sync="isPlanShow" @submitForm="submitPlan" />

    <CheckMaterial
      :id="mId"
      :visible.sync="isShowCheckMaterial"
      title="选择物资"
      @submit="submitMaterial"
      @handleClose="materialClose"
    />
  </div>
</template>

<script>
import SelectNode from "@/components/selectNode";
import CheckProject from "@/components/CheckProject/indexDialog.vue";
import ApproverRadioDialog from "@/components/approverRadioDialog";
import CheckMaterial from "@/components/CheckMaterialsNum/CheckMaterial";
import PlanList from "./components/Plan";
import { saveDetails, getDetails } from "@/api/materialsSiteManagement/record";
import FileUpload from "@/components/FileUpload";

export default {
  name: "RecordAdd",
  components: {
    CheckProject,
    ApproverRadioDialog,
    SelectNode,
    PlanList,
    FileUpload,
    CheckMaterial,
  },
  data() {
    return {
      isShowCheckMaterial: false,
      isPlanShow: false,
      isApproveShow: false, //是否显示选择审批人页面
      alteration: 1,
      processKey: "materialinventory",
      isShowSuppliesDialog: false,
      projectShow: false,
      fileType: ["jpg", "png", "gif"],
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
      queryParams: {
        id: "",
        plantNumber: '',
        date: [],
        isCommit: 0,
        projectId: "",
        projectName: "",
        inventoryStartTime: "",
        inventoryEndTime: "",
        content: "",
        number: "",
        operatorDTOS: [],
        approverMap: {},
        inventoryMaterialDTOS: [],
        materialFiles: [],
      },

      loading: false,
      tableRules: {
        operatorUserName: [
          {
            required: true,
            message: "盘点人员不能为空",
            trigger: ["blur", "change"],
          },
        ],
        duty: [
          {
            required: true,
            message: "职责分工不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
      formRules: {
        plantNumber: [
          { required: true, message: "盘点计划不能为空", trigger: ["blur", "change"] },
        ],
        // projectName: [
        //   { required: true, message: "项目名称不能为空", trigger: "change" },
        // ],
        date: [
          {
            required: true,
            message: "盘点时间不能为空",
            trigger: "change",
          },
        ],
        content: [
          {
            required: true,
            message: "盘点内容不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
      cliId: null,
      mId: null,
      cliIndex: null,
      selectAll: [],
      labelPosition: "top",
      materialRules: {
        amount: [
          {
            required: true,
            message: "盘点物资数量不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
      detailsId: this.$route.query.id,
    };
  },
  mounted() {},
  created() {
    this.init();
  },
  methods: {
    // 成功回调
    getFileListS(fileList) {
      this.queryParams.materialFiles = fileList.map((item) => {
        return {
          name: item.name,
          url: item.url,
        };
      });
    },
    // 删除回调
    delFileS(fileList) {
      this.queryParams.materialFiles = fileList.map((item) => {
        return {
          name: item.name,
          url: item.url,
        };
      });
    },
    planShow() {
      this.isPlanShow = true;
    },
    // 点击选择物资
    focusInput(row, index) {
      console.log(row);
      this.isShowSuppliesDialog = true;
      this.cliId = row.overallMaterialId;
      this.cliIndex = index;
      this.$refs["inputDialog"].blur();
    },
    addProject() {
      this.projectShow = true;
    },
    submitPlan(data) {
      console.log(data);
      // Object.assign(this.form, data);
      this.queryParams.plantId = data.id;
      this.queryParams.plantNumber = data.number;

      this.queryParams.content = data.content;
      this.queryParams.projectName = data.projectName;
      this.queryParams.operatorDTOS = data.operatorDTOS || [];
      this.queryParams.inventoryStartTime = data.inventoryStartTime;
      this.queryParams.inventoryEndTime = data.inventoryEndTime;
      this.queryParams.date = [];
      this.queryParams.date.push(data.inventoryStartTime);
      this.queryParams.date.push(data.inventoryEndTime);
    },
    submitProject(data) {
      this.queryParams.projectId = data.id;
      this.queryParams.projectName = data.projectName;
      this.projectShow = false;
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
    init() {
      if (this.detailsId) {
        this.$route.meta.title = "修改物资盘点记录";
        this.getDetail();
      }
    },
    selectSubmit(data) {
      this.queryParams.operatorDTOS[this.cliIndex].operatorUser =
        data[0].idNumber;
      this.queryParams.operatorDTOS[this.cliIndex].operatorUserName =
        data[0].name;
    },
    submitMaterial(data) {
      const dataArr = data.map((item) => {
        return {
          materialName: item.itemName,
          specification: item.specifications,
          type: 1,
        };
      });
      this.queryParams.inventoryMaterialDTOS.push(...dataArr);
      console.log(dataArr);
      console.log(this.queryParams.inventoryMaterialDTOS);
    },
    addMaterial() {
      this.isShowCheckMaterial = true;
    },
    materialOpen() {
      this.isShowCheckMaterial = true;
    },
    materialClose() {
      this.mId = null;
    },
    handleClose() {
      this.selectAll = [];
    },
    async getDetail() {
      this.loading = true;
      let res = await getDetails({ id: this.detailsId });
      if (res && res.status == 200) {
        Object.assign(this.queryParams, res.data);
        this.queryParams.date.push(this.queryParams.inventoryStartTime);
        this.queryParams.date.push(this.queryParams.inventoryEndTime);
      }
    },
    // 提交按钮
    submitForm(type) {
      const formName = ["form", "tableForm", "materialForm"];
      const validates = (item) => {
        return new Promise((resolve, reject) => {
          if (!this.$refs[item]) {
            resolve();
            return false;
          }
          this.$refs[item].validate((valid) => {
            if (valid) {
              resolve();
            } else {
              reject(new Error("验证不对"));
            }
          });
        });
      };
      Promise.all(formName.map((item) => validates(item)))
        .then(async () => {
          if (!this.queryParams.operatorDTOS.length) {
            this.$message.error("请添加盘点人");
            return;
          }
          if (!this.queryParams.inventoryMaterialDTOS.length) {
            this.$message.error("请添加盘点物资");
            return;
          }
          if (type === 0) {
            this.queryParams.approverMap = {};
            this.queryParams.isCommit = 0;
            this.submitSaveData();
          } else {
            this.isApproveShow = true;
          }
        })
        .catch(() => {});
    },
    // 选中的审批人列表
    selectPersonnel(val) {
      this.approver = val;
    },
    submitHandleForm() {
      if (
        !this.approver ||
        this.approver === null ||
        this.approver.length === 0
      ) {
        this.$message.warning("请选择审批人信息");
        return;
      }
      // 设置审批人
      const approverMap = {};
      var isCheckPerson = this.approver.every((item) => item.personnel != null);
      if (!isCheckPerson) {
        this.$message.warning("请选择完整的对应审批人");
        return;
      }
      this.approver.forEach((item) => {
        approverMap[item.assignee] = item.personnel[0].mainCode;
      });
      this.queryParams.approverMap = approverMap;
      this.queryParams.isCommit = 1;
      this.submitSaveData();
    },
    
    async submitSaveData() {
      this.queryParams.inventoryMaterialDTOS.map(item=>{
        item.amount = parseFloat(item.amount)
        return item
      })
      const res = await saveDetails(this.queryParams);
      if (res && res.status == 200) {
        this.$message.success("操作成功");
        this.$router.go(-1);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    // 新增行
    addTable() {
      console.log(this.queryParams.operatorDTOS);
      this.queryParams.operatorDTOS.push({
        duty: "",
        operatorUser: "",
        operatorUserName: "",
      });
    },
    // 删除行
    handelDelete(row, index) {
      this.queryParams.operatorDTOS.splice(index, 1);
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style lang="scss" scoped>
::v-deep .el-row{
  display: flex;
  flex-wrap: wrap;
}
.switchContent {
  padding: 40px 0 0px;
  box-sizing: border-box;
}
::v-deep .btns {
  .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    .el-form-item__content {
      margin-left: 0px !important;
    }
  }
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-table {
  .el-form-item {
    margin-bottom: 0px;
    &__content {
      width: 100%;
    }
  }
}
.addMonthlyPlan_container {
  margin-bottom: 95px;
  .addMonthlyPlanTop {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 16px 32px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      display: flex;
      align-items: center;
      .switch_svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .table_box {
    margin: 16px;
    background: #fff;
    .pm {
      padding-bottom: 50px;
      min-height: calc(100vh - 210px);
    }
    .tableHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      margin-top: 16px;
      .headerTitle {
        font-size: 14px;
        font-weight: 400;
        color: #595959;
      }
      .btns {
        display: flex;
        align-items: center;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64px;
    line-height: 64px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
    .select_box {
      display: flex;
      float: right;
      .prompt_information {
        display: flex;
        align-items: center;
        .information {
          font-size: 14px;
          font-weight: 400;
          color: #595959;
          padding-left: 16px;
          padding-right: 8px;
          box-sizing: border-box;
        }
        .time {
          font-size: 12px;
          font-weight: 400;
          color: #bfbfbf;
        }
      }
      .action_buttons {
        box-sizing: border-box;
        padding-left: 16px;
      }
    }
  }
}
::v-deep .el-table::before {
  display: none;
}
::v-deep .table_div {
  margin-bottom: 30px;
  .el-form-item__error {
    position: relative;
  }
}
.checkPerson {
  padding: 10px;
  text-align: right;
  background: #fff;
}

.wander {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .left {
    font-size: 16px;
    color: #262626;
  }
  .addRows {
    width: 88px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    background: #edf7ff;
    border-radius: 2px;
    border: 1px solid #74bdff;
    text-align: center;
    color: #1791ff;
    cursor: pointer;
  }
}
</style>
