<template>
  <div class="totalPlan-container">
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <div class="title">基本资料</div>
        <div>
          <table
            border="1"
            style="
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              border-color: #dfe6ec;
            "
          >
            <tr>
              <td class="tableTH">盘点内容</td>
              <td class="tableTD">{{ form.content }}</td>
              <td class="tableTH">盘点时间</td>
              <td class="tableTD">
                {{ `${form.inventoryStartTime} ~ ${form.inventoryEndTime}` }}
              </td>
            </tr>
            <tr>
              <td class="tableTH">申请人</td>
              <td class="tableTD">{{ form.createUserName }}</td>
              <td class="tableTH">申请时间</td>
              <td class="tableTD">{{ form.createTime }}</td>
            </tr>
            <tr>
              <td class="tableTH">备注</td>
              <td class="tableTD" colspan="3">{{ form.remark }}</td>
            </tr>
          </table>
        </div>
        <div class="title">盘点人</div>
        <el-table
          :data="form.operatorDTOS"
          :header-cell-style="{ background: '#FAFAFA' }"
          max-height="590"
          style="width: 100%"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="operatorUserName" label="人员" width="200" />
          <el-table-column prop="duty" label="职责分工" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/api/materialsSiteManagement/plan";

export default {
  name: "Base",
  data() {
    return {
      loading: false,
      form: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.loading = true;
      let res = await getDetails({ id: this.$route.query.id });
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
  .box-content {
    padding: 24px;
    background: #fafafa;
    margin-top: 50px;
    .content-item {
      display: flex;
      align-items: flex-start;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 24px;
      &:last-child {
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



.title {
  margin-top: 24px;
  margin-bottom: 16px;
  &:nth-of-type(1) {
    margin-top: 0px;
  }
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
