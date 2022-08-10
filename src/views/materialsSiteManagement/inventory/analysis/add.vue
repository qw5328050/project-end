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
                      style="width: 80%"
                      disabled
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
                  <el-form-item label="盘点时间:" prop="date">
                    <el-date-picker
                      :value="queryParams.date"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 80%"
                      disabled
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
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form
                ref="materialForm"
                :model="queryParams"
                :rules="materialRules"
                size="small"
              >
                <div class="tableHeader">
                  <div class="handerTitle">盘点物资</div>
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
                      label="物资名称"
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

                    <el-table-column prop="duty" label="单位">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].unit`"
                          :rules="materialRules.amount"
                        >
                          <el-input
                            v-model="row.unit"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="工程节点图算量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].nodeGraphCalculation`"
                        >
                          <el-input
                            v-model="row.nodeGraphCalculation"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="总量上期存量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].lastPeriodStock`"
                        >
                          <el-input
                            v-model="row.lastPeriodStock"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="总量当期进厂量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].incomingQuantity`"
                        >
                          <el-input
                            v-model="row.incomingQuantity"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="存量原材料">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].stockMaterials`"
                        >
                          <el-input
                            v-model="row.stockMaterials"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="存量成品/半成品数量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].stockSemiFinishedProducts`"
                        >
                          <el-input
                            v-model="row.stockSemiFinishedProducts"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="使用数量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].usageAmount`"
                        >
                          <el-input
                            v-model="row.usageAmount"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="风险分析">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].riskAnalysis`"
                        >
                          <el-input
                            v-model="row.riskAnalysis"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="原因说明">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].remark`"
                        >
                          <el-input
                            v-model="row.remark"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="耗用量">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].consumptionRatio`"
                        >
                          <el-input
                            v-model="row.consumptionRatio"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duty" label="节超率">
                      <template slot-scope="{ row, $index }">
                        <el-form-item
                          :prop="`inventoryMaterialDTOS[${$index}].festivalRate`"
                        >
                          <el-input
                            v-model="row.festivalRate"
                            placeholder="请输入"
                            clearable
                            maxlength="50"
                          />
                        </el-form-item>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-form>
            </el-form>
          </el-card>
        </div>
      </div>
      <div class="footer">
        <div class="select_box">
          <div class="action_buttons">
            <el-button @click="goback">取消</el-button>
            <el-button type="primary" @click="submitForm(1)">保存</el-button>
          </div>
        </div>
      </div>
    </div>

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
import CheckMaterial from "@/components/CheckMaterialsNum/CheckMaterial";
import { saveDetails, getDetails } from "@/api/materialsSiteManagement/analysis";

export default {
  name: "RecordAdd",
  components: {
    CheckMaterial,
  },
  data() {
    return {
      isShowCheckMaterial: false,
      isApproveShow: false, //是否显示选择审批人页面
      alteration: 1,
      isShowSuppliesDialog: false,
      projectShow: false,
      queryParams: {
        id: "",
        date: [],
        isCommit: 0,
        projectId: "",
        projectName: "",
        inventoryStartTime: "",
        inventoryEndTime: "",
        content: "",
        number: "",
        approverMap: {},
        inventoryMaterialDTOS: [],
        materialFiles: [],
      },

      loading: false,
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
    this.getDetail();
  },
  methods: {
    // 点击选择物资
    focusInput(row, index) {
      console.log(row);
      this.isShowSuppliesDialog = true;
      this.cliId = row.overallMaterialId;
      this.cliIndex = index;
      this.$refs["inputDialog"].blur();
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
        this.queryParams = res.data;
        this.queryParams.date = []
        this.queryParams.date.push(
          this.queryParams.inventoryStartTime,
          this.queryParams.inventoryEndTime
        );
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

    async submitSaveData() {
      const res = await saveDetails(this.queryParams);
      if (res && res.status == 200) {
        this.$message.success("操作成功");
        this.$router.go(-1);
      }
    },
    goback() {
      this.$router.go(-1);
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
::v-deep .el-row {
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
