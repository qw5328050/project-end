<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="70%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <el-form
      ref="queryForm"
      :label-position="labelPosition"
      :model="queryParams"
      label-width="50px"
    >
      <el-row :gutter="20">
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="queryParams.name" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工号:" prop="account">
                <el-input v-model="queryParams.account" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位:" prop="station">
                <el-input v-model="queryParams.station" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <div class="search-btn">
            <el-button @click="handerReset">重置</el-button>
            <el-button type="primary" @click="handerSearch">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="bor">
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="tree">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :highlight-current="true"
              icon-class=" "
              @node-click="handleNodeClick"
            >
              <template slot-scope="{ node, data }">
                <div>
                  <svg-icon
                    v-if="data.childList && data.childList.length > 0"
                    icon-class="folder"
                  />
                  <svg-icon v-else icon-class="file" />
                  <span class="lable">{{ node.label }}</span>
                </div>
              </template>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableList"
            element-loading-text="Loading"
            fit
            max-height="385"
            border
            stripe
            :row-key="getRowKey"
            :header-row-class-name="() => 'headerClass'"
            highlight-current-row
            style="margin-top: 26px"
            @select="selectRow"
            @select-all="selectall"
          >
            <el-table-column type="selection" width="30" align="center" />
            <el-table-column align="center" label="序号" width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="用户姓名" prop="name" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.name || '-' }}
              </template>
            </el-table-column>
            <el-table-column label="工号" prop="account" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.account || '-' }}
              </template>
            </el-table-column>
            <el-table-column label="岗位" prop="station" width="200" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.station || '-' }}
              </template>
            </el-table-column>
            <el-table-column label="手机号" prop="phone">
              <template slot-scope="{ row }">
                {{ row.phone || '-' }}
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            v-if="total > 0"
            :background="false"
            small
            style="
              margin-left: 85%;
              margin-top: 8px;
              display: flex;
              justify-content: end;
            "
            layout="prev, pager, next"
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.rows"
            @pagination="getTableList"
          />
        </el-col>
      </el-row>
    </div>

    <div slot="footer" class="footer">
      <div class="selectBox">已选{{ selectData.length }}项</div>
      <div class="actionButtons">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="actionButtons">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getTree, getList } from '@/api/plan/mad'
export default {
  name: '',
  props: {
    title: {
      type: String,
      require: true,
      default: null
    },
    visible: {
      type: Boolean,
      require: true
    },
    selectAll: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      total: 0,
      queryParams: {
        page: 1,
        rows: 10,
        orgId: 0
      },
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'orgName'
      },
      selectData: [],
      tableList: [], // 表格数据
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      date: '',
      loading: false,
      labelPosition: 'right'
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          this.getTreeList()
          this.getTableList()
        }
      },
      deep: true,
      immediate: true
    },
    selectAll: {
      handler() {
        if (this.selectAll && this.selectAll.length > 0) {
          this.selectData = JSON.parse(JSON.stringify(this.selectAll))
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getRowKey(row) {
      return row.id
    },
    selectall(rows) {
      if (rows.length > 0) {
        rows.forEach((item) => {
          this.selectData.forEach((sel, index) => {
            if (item.id === sel.id) {
              this.selectData.splice(index, 1)
            }
          })
        })
        rows.forEach((item) => {
          this.selectData.push(item)
        })
      } else {
        this.tableList.forEach((item) => {
          this.selectData.forEach((sel, index) => {
            if (item.id === sel.id) {
              this.selectData.splice(index, 1)
            }
          })
        })
      }
    },
    selectRow(rows, row) {
      let selected = rows.length && rows.indexOf(row) !== -1
      if (selected === 0) {
        selected = false
      }
      if (selected) {
        this.selectData.push(row)
      } else {
        this.selectData.forEach((item, index) => {
          if (item.id === row.id) {
            this.selectData.splice(index, 1)
          }
        })
      }
    },
    // 多选
    handleSelectionChange(data) {
      this.selectData = data
      if (data.length === this.tableList.length) {
        // 全部选择
        this.checkAll = true
        this.isIndeterminate = false
      } else if (data.length > 0 && data.length < this.tableList.length) {
        this.isIndeterminate = true
        this.checkAll = false
      } else {
        this.checkAll = false
        this.isIndeterminate = false
      }
    },
    getTableList() {
      this.loading = true
      getList(this.queryParams)
        .then((res) => {
          const data = res.data
          this.tableList = data.list
          this.total = data.total
          this.$refs.multipleTable.clearSelection()
          const that = this
          this.$nextTick(() => {
            if (that.selectData.length > 0) {
              that.selectData.forEach((item) => {
                for (var i = 0; i < that.tableList.length; i++) {
                  if (item.id === that.tableList[i].id) {
                    that.$refs.multipleTable.toggleRowSelection(
                      that.tableList[i],
                      true
                    )
                  }
                }
              })
            }
          })

          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getTreeList() {
      getTree().then((res) => {
        const data = res.data
        this.queryParams.orgId = data[0].pid
        this.treeData = data[0].childList
      })
    },
    handerSearch() {
      this.queryParams.page = 1
      this.getTableList()
    },
    handleClose() {
      this.queryParams = {
        page: 1,
        rows: 10,
        orgId: 0
      }
      this.selectData = []
      this.$emit('handleClose')
      this.$emit('update:visible', false)
    },
    handleNodeClick(node, data) {
      this.queryParams.orgId = node.pid
      this.getTableList()
    },
    actionButtons() {
      if (this.selectData.length > 0) {
        this.$emit('selectSubmit', this.selectData)
        this.handleClose()
      } else {
        this.$message({ message: '请选择人员后,在进行操作!', type: 'warning' })
      }
    },
    // 重置
    handerReset() {
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        orgId: 0
      }
      this.handerSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 10px 20px;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
}
::v-deep .el-table {
  margin-top: 0 !important;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.bor {
  position: relative;
  &::after {
    position: absolute;
    content: '';
    left: 19.5%;
    top: 0;
    width: 1px;
    height: 100%;
    background: #f0f0f0;
  }
}
.search-btn {
  box-sizing: border-box;
  display: flex;
  justify-content: end;
}
.selectBox {
  color: #1890ff;
  font-size: 14px;
  font-weight: 400;
}
.footer {
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.tree {
  box-sizing: border-box;
}
.lable {
  margin-left: 6px;
}
</style>
