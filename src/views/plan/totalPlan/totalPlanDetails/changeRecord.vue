<template>
  <div class="changeRecord">
    <div v-for="(item, index) in list" :key="index" class="alteration">
      <div class="title">第{{ index + 1 }}次变更</div>
      <div class="alteration_describe">
        <div class="item">
          <div class="label">变更人</div>
          <div class="value">{{ item.changeName || '-' }}</div>
        </div>
        <div class="item">
          <div class="label">变更时间</div>
          <div class="value">{{ item.changeTime || '-' }}</div>
        </div>
        <div class="item">
          <div class="label">变更结果</div>
          <div class="value">
            {{ getDictionaryLabel(item.changeStatus, 'changeStatus') || '-' }}
          </div>
        </div>
      </div>
      <div class="alteration_table">
        <div class="table_title">变更内容</div>
        <div class="table_content">
          <TableComponents
            v-if="type === 1 || type === 4 || type === 3"
            :list="item.changeVOList"
            :is-change="true"
          />
          <ReinforcedTable
            v-if="type === 2"
            :list="item.changeVOList"
            :is-change="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponents from './tables/ordinaryTable.vue'
import ReinforcedTable from './tables/reinforcedTable.vue'
export default {
  name: 'ChangeRecord',
  components: { TableComponents, ReinforcedTable },
  props: {
    type: {
      type: Number,
      require: false,
      default: null
    },
    list: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.changeRecord {
  width: 100%;
  .alteration {
    padding: 24px;
    background: #fff;
    width: 100%;
    margin-bottom: 16px;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
    .alteration_describe {
      margin-top: 16px;
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        display: flex;
        align-items: center;
        .label {
          font-size: 14px;
          font-weight: 400;
          color: #262626;
        }
        .value {
          margin-left: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #595959;
        }
      }
    }
    .alteration_table {
      margin-top: 16px;
      .table_title {
        font-size: 14px;
        font-weight: 400;
        color: #262626;
      }
      .table_content {
        margin-top: 16px;
      }
    }
  }
}
</style>
