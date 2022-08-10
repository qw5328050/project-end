<template>
  <div class="totalPlan-container">
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <div class="title">物资盘点计划审批记录</div>
        <div>
          <el-table
            :data="list"
            :header-cell-style="{ background: '#FAFAFA' }"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="assigneeName" label="审批人" width="200" />
            <el-table-column prop="type" label="审批结果" width="200">
              <template slot-scope="{ row }">
                {{ getDictionaryLabel(row.type, "approvalResults") }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="审批时间" width="300" />
            <el-table-column prop="comment" label="审批意见" />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { flowRecordList } from "@/api/plan/mad";

import FileList from "@/components/FileList";

export default {
  name: "Record",
  components: {
    FileList,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getFlowRecordList();
  },
  mounted() {},
  methods: {
    // 获取审批记录
    getFlowRecordList() {
      flowRecordList({ processInstanceId: this.$route.query.processInstanceId })
        .then((res) => {
          this.list = res.data;
        })
        .catch(() => {
          // this.approvalRecordsLoading = false;
        });
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
  margin-bottom: 16px;
}

</style>
