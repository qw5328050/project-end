<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="project">
        <div class="name">项目名称：{{ form.project }}</div>
      </div>
    </div>
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <div>
          <span class="title" style="font-weight: 600">基本信息</span>
          <table
            border="1"
            style="
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              border-color: #dfe6ec;
              margin-top: 10px;
              margin-bottom: 10px;
            "
          >
            <tr>
              <td class="tableTH">整改单编号</td>
              <td class="tableTD">{{ form.number }}</td>
              <td class="tableTH">创建日期</td>
              <td class="tableTD">{{ form.createTime }}</td>
            </tr>
            <tr>
              <td class="tableTH">单据状态</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.status, "abarbeitungBillsStatus") }}
              </td>
              <td class="tableTH">接收单位类型</td>
              <td class="tableTD">
                {{
                  getDictionaryLabel(
                    form.acceptCompanyType,
                    "acceptCompanyType"
                  )
                }}
              </td>
            </tr>
            <tr>
              <td class="tableTH">接收单位</td>
              <td class="tableTD">{{ form.acceptCompany }}</td>
              <td class="tableTH">所属合同</td>
              <td class="tableTD">{{ form.contract }}</td>
            </tr>
            <tr>
              <td class="tableTH">类别</td>
              <td class="tableTD">
                {{ getDictionaryLabel(form.type, "abarbeitungType") }}
              </td>
              <td class="tableTH">完成期限</td>
              <td class="tableTD">{{ form.deadlines }}</td>
            </tr>
            <tr v-if="form.contractSettlementType == 2">
              <td class="tableTH">指定验证人</td>
              <td class="tableTD" colspan="3">{{ form.validator }}</td>
            </tr>
          </table>
        </div>
        <div class="box-list">
          <div class="box-content">
            <div class="content-item">
              <div class="item-name">整改内容</div>
              <div class="item-content">{{ form.content }}</div>
            </div>
            <div class="content-item">
              <div class="item-name">附件</div>
              <div class="item-content item-content-attachment">
                <FileList :fileList="form.materialFiles"></FileList>
              </div>
            </div>
          </div>
          <div class="box-content">
            <div class="content-item">
              <div class="item-name">验收记录</div>
              <div class="item-content">
                <el-input
                  v-model="acceptanceRemark"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入"
                />
              </div>
            </div>
            <div class="content-item">
              <div class="item-name">是否通过验证</div>
              <div class="item-content">
                <el-select
                  v-model="isPass"
                  style="width: 250px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in getDictionaryValue('ifVerify')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="footer">
      <div class="select_box">
        <div class="action_buttons">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="checkValidation">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDetails,
  validationResults,
} from "@/api/materialsSiteManagement/abarbeitung";
import FileList from "@/components/FileList";

export default {
  name: "VerifyDetails",
  components: {
    FileList,
  },
  data() {
    return {
      acceptanceRemark: "",
      form: {},
      isPass: "",
      detailsId: this.$route.query.id,
      loading: false,
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {},
  methods: {
    async getDetail() {
      this.loading = true;
      let res = await getDetails({ id: this.detailsId });
      if (res && res.status == 200) {
        this.form = res.data;
      }
    },
    checkValidation() {
      if (this.acceptanceRemark === "") {
        this.$message.error("验收记录不能为空");
        return;
      }
      if (this.isPass === "") {
        this.$message.error("请选择是否通过验证");
        return;
      }

      if (this.isPass === 0) {
        this.$confirm("是否创建索赔?", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {
            
          })
          .catch(() => {
            this.setValidation();
          });
      } else {
        this.setValidation();
      }
    },
    async setValidation() {
      // this.loading = true;
      const param = {
        id: this.detailsId,
        acceptanceRemark: this.acceptanceRemark,
        isPass: this.isPass,
        isClaimant: 0,
      };
      console.log(param);
      // let res = await validationResults(param);
      // if (res && res.status == 200) {
      //   this.form = res.data;
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.dateClass {
  color: red;
}

.totalPlan-container {
  margin-bottom: 80px;
  .satisfaction {
    border: 1px solid #909498;
    border-radius: 15px;
    padding: 15px 10px;
  }
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);

    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding: 5px 0 16px;
      display: flex;
      align-items: center;

      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .box-content {
    padding: 24px;
    background: #fafafa;
    margin-top: 24px;
    .content-item {
      display: flex;
      align-items: flex-start;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0px;
      }
      .item-name {
        width: 110px;
        font-size: 15px;
        font-weight: 600;
      }
      .item-content {
        font-size: 14px;
        font-weight: 400;
        flex: 1;
        color: #595959;
        &-attachment {
          margin-top: -2px;
          margin-left: -1px;
        }
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

.title {
  margin-top: 24px;
  margin-bottom: 16px;
}

.tableTH {
  text-align: right;
  padding-right: 16px;
  width: 100px;
  height: 45px;
  font-size: 14px;
  font-weight: bold;
  color: #555f73;
  background-color: #f8f8f9;
}

.tableTD {
  text-align: left;
  padding-left: 16px;
  width: 240px;
  color: #606266;
  font-size: 14px;
}
</style>
