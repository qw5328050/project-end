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
              <td class="tableTD">{{ getDictionaryLabel(form.status, "abarbeitungBillsStatus") }}</td>
              <td class="tableTH">接收单位类型</td>
              <td class="tableTD">{{ getDictionaryLabel(form.acceptCompanyType, "acceptCompanyType") }}</td>
            </tr>
            <tr>
              <td class="tableTH">接收单位</td>
              <td class="tableTD">{{ form.acceptCompany }}</td>
              <td class="tableTH">所属合同</td>
              <td class="tableTD">{{ form.contract }}</td>
            </tr>
            <tr>
              <td class="tableTH">类别</td>
              <td class="tableTD">{{ getDictionaryLabel(form.type, "abarbeitungType") }}</td>
              <td class="tableTH">完成期限</td>
              <td class="tableTD">{{ form.deadlines }}</td>
            </tr>
            <tr v-if="form.contractSettlementType == 2">
              <td class="tableTH">指定验证人</td>
              <td class="tableTD" colspan="3">{{ form.validator }}</td>
            </tr>
          </table>
        </div>
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/api/materialsSiteManagement/abarbeitung";
import FileList from '@/components/FileList'

export default {
  name: "AbarbeitungDetails",
  components: {
    FileList
  },
  data() {
    return {
      detailsId: this.$route.query.id,
      orderNumber: "273.276.35.28",
      projectName: "深圳市宝安区鸿昌花园幼儿园1",
      loading: false,
      size: "",
      ruleForm: {},
      form: {},
      url: [],
      fileList: [],
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png']
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {},
  methods: {
    async getDetail() {
      this.loading = true;
      let res = await getDetails({id: this.detailsId});
      if (res && res.status == 200) {
        this.form = res.data
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dateClass {
  color: red;
}

.totalPlan-container {
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
  .box-content{
    padding: 24px;
    background: #FAFAFA;
    margin-top: 50px;
    .content-item{
      display: flex;
      align-items: flex-start;
      color: rgba(0,0,0,0.8500);
      margin-bottom: 24px;
      &:last-child{
        margin-bottom: 0px;
      }
      .item-name {
        width: 79px;
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
}

::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
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
