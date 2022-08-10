<template>
  <div class="totalPlan-container">
    <el-card class="pm">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">基本信息</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="90px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="索赔单编号" prop="claimantNumber">
              <el-input
                v-model="form.claimantNumber"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="项目名称" prop="project">
              <el-input
                v-model="form.project"
                placeholder="请输入"
                @click.native="addProject"
                @change="changeProject"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="关联整改单" prop="relationNumber">
              <el-input
                v-model="form.relationNumber"
                placeholder="请输入"
                @click.native="addAbarbeitung"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>

          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="被处罚单位类型" prop="penalizedType">
              <el-select
                v-model="form.penalizedType"
                placeholder="请选择"
                style="width: 80%"
                @change="acceptCompanyTypeChange"
              >
                <el-option
                  v-for="item in getDictionaryValue('acceptCompanyType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="被处罚单位" prop="penalizedCompany">
              <el-input
                v-model="form.penalizedCompany"
                placeholder="请输入"
                clearable
                style="width: 80%"
                @focus="addAcceptCompany"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xl="7"
            :lg="8"
            :xs="12"
            :sm="12"
            :md="12"
            v-show="form.penalizedType === '1'"
          >
            <el-form-item label="分包工程" prop="subcontractingProject">
              <el-input
                v-model="form.subcontractingProject"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="签收人" prop="signeeName">
              <el-input
                v-model="form.signeeName"
                placeholder="请输入"
                style="width: 80%"
                @focus="showDialog(1)"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="处罚金额" prop="penaltyAmount">
              <el-input-number
                v-model="form.penaltyAmount"
                :controls="false"
                :precision="2"
                :min="0"
                clearable
                style="width: 80%"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="处罚方式" prop="punishment">
              <el-input
                v-model="form.punishment"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="签发人" prop="signerName">
              <el-input
                v-model="form.signerName"
                placeholder="请输入"
                style="width: 80%"
                @focus="showDialog(2)"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="创建日期" prop="createTime">
              <el-date-picker
                v-model="form.createTime"
                type="date"
                disabled
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="10" :lg="12" :xs="12" :sm="12" :md="12">
            <el-form-item label="处罚事由" prop="punishedBy">
              <el-input
                v-model="form.punishedBy"
                :rows="5"
                type="textarea"
                placeholder="请输入"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="padding: 16px 0">
          <el-col :span="12">
            <FileUpload
              prop="uploads"
              :limit-num="10"
              :file-size="5"
              :file-type="fileType"
              @getFileList="getFileListS"
              @delFile="delFileS"
            />
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="footer">
      <div class="select_box">
        <div class="action_buttons">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="submitForm(1)">保存</el-button>
          <el-button type="primary" @click="submitForm(2)">提交</el-button>
        </div>
      </div>
    </div>
    <!-- 关联整改 -->
    <Abarbeitung
      :project="{ project: form.project, projectId: form.projectId }"
      :visible.sync="abarbeitungShow"
      @submitForm="subAbarbeitung"
    />
    <!-- 选择分包商 -->
    <SubcontractorDialog
      :visible.sync="subcontractorShow"
      @submitForm="subcontractorSubmit"
    />
    <!-- 选择供应商 -->
    <SupplierDialog
      :visible.sync="supplierDialogs"
      @submitForm="supplierSubmit"
    />
    <ApproverRadioDialog
      title="选择人员"
      :select-all="selectAll"
      :visible.sync="isShowApproverDialog"
      @selectSubmit="selectSubmit"
      @handleClose="handleClose"
    />
    <CheckProject
      :visible.sync="projectShow"
      title="选择项目"
      @submitForm="submitProject"
    />
    <!-- 选择合同 -->
    <ContractDialog
      :id="form.acceptCompanyId || 0"
      :visible.sync="contractShow"
      @contract="contract"
    />
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import { mapGetters } from "vuex";
import Abarbeitung from "./components/abarbeitung.vue";
import FileUpload from "@/components/FileUpload";
import ApproverRadioDialog from "@/components/approverRadioDialog";
import CheckProject from "@/components/CheckProject/indexDialog.vue";
import ContractDialog from "@/components/ContractDialog/index";
import SupplierDialog from "@/components/SupplierDialog/index2";
import SubcontractorDialog from "@/components/SubcontractorDialog/index";

import {
  saveDetails,
  getDetails,
} from "@/api/materialsSiteManagement/compensation";

export default {
  name: "AddAndAdit",
  components: {
    Abarbeitung,
    FileUpload,
    ApproverRadioDialog,
    SupplierDialog,
    CheckProject,
    ContractDialog,
    SubcontractorDialog,
  },
  data() {
    return {
      abarbeitungShow: false,
      isShowApproverDialog: false,
      supplierDialogs: false,
      projectShow: false,
      subcontractorShow: false,
      contractShow: false,
      selectAll: [],
      fileType: ["xls", "xlsx", "doc", "docx", "pdf", "jpg", "png"],
      fileList: [],
      labelPosition: "top",
      rules: {
        project: [
          { required: true, message: "项目名称不能为空", trigger: "change" },
        ],
        penalizedCompany: [
          {
            required: true,
            message: "被处罚单位类型不能为空",
            trigger: "change",
          },
        ],
        penalizedType: [
          { required: true, message: "被处罚单位不能为空", trigger: "blur" },
        ],
        signeeName: [
          { required: true, message: "签收人不能为空", trigger: "change" },
        ],
        signerName: [
          { required: true, message: "签发人不能为空", trigger: "change" },
        ],
        punishedBy: [
          { required: true, message: "处罚事由不能为空", trigger: "blur" },
        ],
        punishment: [
          { required: true, message: "处罚方式不能为空", trigger: "blur" },
        ],
        penaltyAmount: [
          { required: true, message: "处罚金额不能为空", trigger: "blur" },
        ],
      },
      form: {
        project: "",
        signeeId: "",
        signeeName: "",
        signeeId: "",
        signerName: "",
        signerId: "",
        punishment: "",
        subcontractingProject: "",
        penalizedCompany: "",
        penalizedType: "",
        penaltyAmount: "",
        punishedBy: "",
        materialFiles: [],
        inventoryMaterialDTOS: [],
        materialFiles: [],
      },
      detailsId: this.$route.query.id,
      signStatus: "",
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {
    ...mapGetters(["selectUserOrg"]),
    getStatus() {
      return getDictionaryLabel(this.form.status, "abarbeitungBillsStatus");
    },
  },
  methods: {
    // 关联整改单
    addAbarbeitung() {
      if (this.form.project == "") {
        this.$message("请先选择项目名称");
        return;
      }
      this.abarbeitungShow = true;
    },
    subAbarbeitung(data) {
      this.form.relationId = data.id;
      this.form.relationNumber = data.number;
    },
    init() {
      if (this.detailsId) {
        this.$route.meta.title = "修改整改单据";
        this.getDetail();
      } else {
        if (this.selectUserOrg && this.selectUserOrg.id) {
          this.form.project = this.selectUserOrg.orgName;
          this.form.projectId = this.selectUserOrg.id;
        }
      }
    },
    contract(data) {
      this.form.contract = data.contractCode;
    },
    acceptCompanyTypeChange() {
      this.form.penalizedCompany = "";
      this.form.penalizedCompanyId = "";
      this.form.penalizedType === "1" && (this.form.subcontractingProject = "");
    },
    addContract() {
      if (this.form.acceptCompanyId == "") {
        this.$message("请先选择接收单位");
        return;
      }
      this.contractShow = true;
    },
    submitProject(data) {
      this.form.projectId = data.id;
      this.form.project = data.projectName;
      this.projectShow = false;
    },
    changeProject() {
      this.form.relationId = "";
      this.form.relationNumber = "";
    },
    addProject() {
      this.projectShow = true;
    },
    // 分包商弹窗回显
    subcontractorSubmit(data) {
      this.form.penalizedCompany = data.subContractorName;
      this.form.penalizedCompanyId = data.id;
    },
    // 供应商弹窗回显
    supplierSubmit(data) {
      this.form.penalizedCompany = data.supplierName;
      this.form.penalizedCompanyId = data.id;
    },
    // 选择供应商弹窗
    addAcceptCompany() {
      if (this.form.penalizedType == "") {
        this.$message("请先选择供应商类型");
        return;
      }
      if (this.form.penalizedType == 2) {
        // 供应商
        this.supplierDialogs = true;
      } else {
        // 分包商
        this.subcontractorShow = true;
      }
    },
    showDialog(status) {
      this.signStatus = status;
      this.isShowApproverDialog = true;
    },
    selectSubmit(data) {
      if (this.signStatus === 1) {
        this.form.signeeName = data[0].name;
        this.form.signeeId = data[0].idNumber;
      } else {
        this.form.signerName = data[0].name;
        this.form.signerId = data[0].idNumber;
      }
    },
    handleClose() {
      this.selectAll = [];
    },
    // 成功回调
    getFileListS(fileList) {
      this.form.materialFiles = fileList.map((item) => {
        return {
          name: item.name,
          url: item.url,
        };
      });
    },
    // 删除回调
    delFileS(fileList) {
      this.form.materialFiles = fileList.map((item) => {
        return {
          name: item.name,
          url: item.url,
        };
      });
    },
    async getDetail() {
      this.loading = true;
      let res = await getDetails({ id: this.detailsId });
      if (res && res.status == 200) {
        Object.assign(this.form, res.data);
        // this.form.penalizedType = this.form.penalizedType + ''
      }
    },
    // 提交按钮
    submitForm(type) {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          const res = await saveDetails(this.form);
          if (res && res.status == 200) {
            this.$message.success("操作成功");
            this.$router.go(-1);
          }
        }
      });
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
.title-container {
  margin: 0 -20px;
  .title {
    padding: 0 20px;
  }
}
.select-material {
  border: 1px solid #74bdff;
  margin-top: 16px;
  height: 40px;
  border-radius: 0px;
}
::v-deep .el-table {
  .el-form-item {
    margin-bottom: 0px;
    &__content {
      width: 100%;
    }
    &.is-error {
      width: 100%;
    }
  }
}

::v-deep .el-card__body {
  padding: 0 20px 20px 20px;
}

.totalPlan-container {
  .pm {
    margin: 16px;
    max-height: 1280px;
  }
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 110px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding: 16px 0;
      display: flex;
      align-items: center;
      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .table_box {
    margin: 16px;
    background: #fff;
    .table_content {
      padding: 19px 24px 24px 24px;
      box-sizing: border-box;
      margin-bottom: 16px;
    }
  }
  .footer {
    // position: absolute;
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
</style>
