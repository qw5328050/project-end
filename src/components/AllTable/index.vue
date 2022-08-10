<template>
  <div>
    <el-table
      ref="multipleTable"
      style="width: 100%"
      :max-height="maxHeight"
      :data="tableData"
      :header-row-class-name="() => 'headerClass'"
      border
      :show-summary="showSummary"
      :span-method="spanMethod"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="isSelection"
        type="selection"
        width="50"
        align="left"
        fixed="left"
        :selectable="() => selected"
      />
      <el-table-column
        v-if="isIndex"
        key="0"
        align="center"
        label="序号"
        width="80"
        fixed="left"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <template v-for="key in bindDataList">
        <el-table-column
          v-if="filterList.indexOf(key) !== -1"
          :key="key"
          :label="bindData[key]"
          :filters="filters[key]"
          :filter-method="filterTag"
        >
          <template v-if="slotList.indexOf(key) !== -1" slot-scope="scope">
            <slot :name="key" :row="scope.row" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="key + 1"
          :label="bindData[key]"
        >
          <template v-if="slotList.indexOf(key) !== -1" slot-scope="scope">
            <slot :name="key" :row="scope.row" />
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="slotList.indexOf('operation') !== -1"
        label="操作"
        fixed="right"
        :width="handleWidth('operation')"
      >
        <template slot-scope="scope">
          <slot name="operation" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isPagination" class="pagination">
      <div class="pageNumberRecord">
        共{{ currentPage.total }}条记录 第{{ currentPage.page }}/{{
          Math.ceil(currentPage.total / currentPage.rows)
        }}页
      </div>
      <Pagination
        background
        layout="prev, pager, next, sizes, jumper"
        :total="currentPage.total"
        :page.sync="currentPage.page"
        :limit.sync="currentPage.rows"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllDelete',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    // 需要绑定的参数
    bindData: {
      type: Object,
      default: () => {}
    },
    maxHeight: {
      type: String | Number,
      default: '300'
    },
    // table是否需要序号
    isIndex: {
      type: Boolean,
      default: false
    },
    // table是否需要多选
    isSelection: {
      type: Boolean,
      default: false
    },
    // 是否需要分页
    queryParams: {
      type: Object,
      default: () => {}
    },
    // 是否筛选
    filters: {
      type: Object,
      dafault: () => {}
    },
    styles: {
      type: Object,
      dafault: () => {}
    },
    selected: {
      type: Boolean,
      default: true
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function,
      default: () => false
    }
  },
  data() {
    return {
      isIndeterminate: true,
      checkAll: true,
      bindDataList: [],
      slotList: [],
      isPagination: false,
      isFilter: false,
      selectData: [],
      currentPage: {},
      filterList: [],
      styleList: {}
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.slotList = this.$scopedSlots ? Object.keys(this.$scopedSlots).concat(Object.keys(this.$slots)) : []
      this.bindDataList = this.bindData ? Object.keys(this.bindData) : []
      this.isPagination = this.queryParams && JSON.stringify(this.queryParams) !== '{}'
      this.currentPage = this.isPagination ? JSON.parse(JSON.stringify(this.queryParams)) : {}
      this.filterList = this.filters ? Object.keys(this.filters) : []
    },
    handleSelectionChange(data) {
      this.$emit('selection-change', data)
    },
    getList() {
      this.$emit('getList', { ...this.currentPage })
    },
    filterTag(value, row) {
      console.log(value)
      return row.tag === value
    },
    handleWidth(key) {
      return 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  .el-table__column-filter-trigger .el-icon-arrow-down
  {
    vertical-align: text-bottom;
      &::before {
      content: ' ';
      display: block;
      width: 12px;
      height: 12px;
      background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng18598f67219d47d736dd0ec0dd4a7aeeef7661f38f1c81ea7fd045b5225a6519)
        0px 0px no-repeat;
      background-size: 13px 12px;
      margin-left: 5px;
    }
  }
}
 .pagination {
    width: 97%;
    height: 64px;
    display: flex;
    // position: absolute;
    // bottom: 0;
    align-items: center;
    justify-content: space-between;
    .pageNumberRecord {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
