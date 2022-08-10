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
              <td class="tableTH">索赔单编号</td>
              <td class="tableTD">{{ form.claimantNumber }}</td>
              <td class="tableTH">关联整改单</td>
              <td class="tableTD">{{ form.relationNumber }}</td>
            </tr>
            <tr>
              <td class="tableTH">被处罚单位类型</td>
              <td class="tableTD">{{ getDictionaryLabel(form.penalizedType, 'acceptCompanyType') }}</td>
              <td class="tableTH">被处罚单位</td>
              <td class="tableTD">{{ form.penalizedCompany }}</td>
            </tr>
            <tr>
              <td class="tableTH">分包工程</td>
              <td class="tableTD">{{ form.subcontractingProject }}</td>
              <td class="tableTH">签收人</td>
              <td class="tableTD">{{ form.signeeName }}</td>
            </tr>
            <tr>
              <td class="tableTH">处罚金额</td>
              <td class="tableTD">{{ form.penaltyAmount }}</td>
              <td class="tableTH">处罚方式</td>
              <td class="tableTD">{{ form.punishment }}</td>
            </tr>
            <tr>
              <td class="tableTH">签发人</td>
              <td class="tableTD">{{ form.signerName }}</td>
              <td class="tableTH">创建时间</td>
              <td class="tableTD">{{ form.createTime }}</td>
            </tr>
          </table>
        </div>
        <div class="box-content">
          <div class="content-item">
            <div class="item-name">处罚事由</div>
            <div class="item-content">{{ form.punishedBy }}</div>
          </div>
          <div class="content-item">
            <div class="item-name">附件</div>
            <div class="item-content item-content-attachment"> 
              <FileList :fileList="[{name: 'http://192.168.98.107:9000/cececnf/e.doc'}, {name: 'asfas'}]"></FileList>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/api/materialsSiteManagement/compensation";
import FileList from '@/components/FileList'

export default {
  name: "CompensationDetails",
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
    margin-top: 24px;
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
