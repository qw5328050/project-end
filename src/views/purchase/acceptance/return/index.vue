<template>
  <div class="purchase-container">
    <!-- 搜索 -->
    <Search ref="search" @search="handleSearch" />
    <!-- 表格 -->
    <div class="purchase-table">
      <Table
        ref="table"
        :data-source="data"
        :loading="loading"
        @onclick="handleClick"
      />
      <Pagination
        v-model="papaginationData"
        @search="handleSearch('', false)"
      />
    </div>
    <Return v-model="visible.return" />
  </div>
</template>

<script>
import {
  getReturnOrChangeList,
  returnOrChangeListExport
} from '@/api/supplier/ship/return'
export default {
  components: {
    Search: () => import('./module/search.vue'),
    Table: () => import('./module/table.vue'),
    Return: () => import('./components/return.vue'),
    Pagination: () => import('@/components/Pagination')
  },
  props: {},
  data() {
    return {
      data: [],
      loading: false,
      modalConfig: {},
      visible: { return: false },
      papaginationData: { page: 1, page_size: 20, rows: 20, total: 0 }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSearch(params, isReset = true) {
      this.getTableData(params, isReset)
    },
    // 列表第一次加载在search组件create生命周期中调用
    getTableData(params, isReset = true) {
      params = params || this.$refs.search.getSearchParams()
      if (isReset) {
        Object.assign(this.papaginationData, { page: 1, rows: 20, total: 0 })
      }
      const data = Object.assign(params, this.papaginationData)
      this.loading = true
      getReturnOrChangeList(data)
        .then((res) => {
          const { pageSize: rows, pageNum: page, total } = res.data
          Object.assign(this.papaginationData, { rows, page, total })
          this.data = res.data.list
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleClick({ key, record = {}}) {
      const eventObj = {
        1: this.handleRouterLink, // 确认
        2: this.handleReturn, // 退回
        3: this.handleRouterLink, // 新增发货单
        4: this.handleRouterLink, // 详情-退换单
        5: this.handleRouterLink, // 详情-收料单
        6: this.handleRouterLink, // 详情-发货单
        7: this.handleExport // 导出
      }
      eventObj[key].call(this, record, key) // 调用事件
    },
    handleExport(record) {
      const data = { idList: record.selectedRowKeys, page: 1, rows: 1000 }
      this.$refs.table.setLoading('export', true)
      returnOrChangeListExport(data)
        .then(() => {
          this.$refs.table.clearSelection()
        })
        .finally(() => {
          this.$refs.table.setLoading('export', false)
        })
    },
    handleReturn(record) {
      this.visible.return = true
      Object.assign(this.modalConfig, { record })
    },
    handleRouterLink(record, key) {
      const url = {
        1: '/ship/return_confirm/',
        3: '/ship/return_create/',
        4: '/ship/return_details/',
        5: '/ship/info_search_details/',
        6: '/ship/info_search_details/'
      }
      this.$router.push(url[key] + record.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.purchase-container {
  .purchase-table {
    font-size: 14px;
    margin-top: 16px;
    background: white;
    padding: 0 24px;
  }
}
</style>
