<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="物资类别:">
            <el-cascader v-model="selectCascader" :props="props" style="width: 100%" @change="changeCascader" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物资名称">
            <el-input v-model="form.materialName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规格型号">
            <el-input v-model="form.specification" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="search-btn">
            <el-button @click="handerReset">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="list"
      height="385"
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
      @row-click="rowClickTable"
      @select="selectRow"
      @select-all="selectall"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column width="25">
        <template slot-scope="{ row }">
          <el-radio
            v-model="radioValue"
            :label="row.id"
            @change="radioChange(row)"
          />
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="物资类别" prop="itemType" width="250">
        <template slot-scope="{ row }">
          {{ row.itemType || '-' }} / {{ row.itemBigType || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="物资名称" prop="name">
        <template slot-scope="{ row }">
          {{ row.name || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="规格型号(工料机描述)" prop="specification">
        <template slot-scope="{ row }">
          {{ row.specification || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="计量单位" prop="unit">
        <template slot-scope="{ row }">
          {{ row.unit || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" />
    </el-table>
    <Pagination
      v-if="total > 0"
      :background="false"
      small
      style="margin-left: 85%; margin-top: 8px"
      layout="prev, pager, next"
      :total="total"
      :page.sync="form.page"
      :limit.sync="form.rows"
      @pagination="getList"
    />
    <div slot="footer" class="footer">
      <div class="selectBox">
        <span>已选{{ selectData.length }}项</span>
        <el-button
          type="text"
          style="margin-left: 8px"
          @click="uncheck"
        >取消</el-button>
      </div>
      <div class="actionButtons">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handlerSubmit">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  getSuppliesList,
  getItemTypes,
  getChildrenItemType
} from '@/api/plan/totalPlan'
export default {
  name: 'IndexDialog',
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    id: {
      type: Number,
      require: false,
      default: null
    }
  },
  data() {
    return {
      props: {
        lazy: true,
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',
        checkStrictly: true,
        lazyLoad(node, resolve) {
          console.log(node, 78798)
          const { level } = node
          if (level === 0) {
            getItemTypes().then((res) => {
              resolve(res.data)
            })
          } else if (level === 1) {
            getChildrenItemType({ id: node.value }).then((res) => {
              if (level === 1) {
                const data = res.data
                data.forEach(item => {
                  item.leaf = true
                })
                resolve(data)
              }
            })
          } else {
            resolve([])
          }
        }
      },
      radioValue: '',
      selectCascader: [],
      form: {
        page: 1,
        rows: 10,
        itemType: null,
        itemBigType: null,
        materialId: null
      },
      total: 0,
      selectData: [],
      selectAllList: [],
      loading: false, // 表格加载
      list: [], // 表格数据
      itemTypes: [], // 物资类别
      itemBigTypes: [], // 物资大类
      itemSmallTypes: [] // 物资小类
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          this.getList()
          this.getItemTypes()
        }
      },
      immediate: true
    },
    id: {
      handler() {
        if (this.id) {
          this.list.forEach((item) => {
            if (item.id === this.id && this.selectData.length === 0) {
              this.selectData.push(item)
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    changeCascader() {
      if (this.selectCascader && this.selectCascader.length > 0) {
        this.$set(this.form, 'itemType', this.selectCascader[0] || null)
        this.$set(this.form, 'itemBigType', this.selectCascader[1] || null)
        this.$set(this.form, 'materialId', this.selectCascader[2] || null)
      }
    },
    uncheck() {
      if (this.selectData && this.selectData.length > 0) {
        this.$refs.multipleTable.clearSelection()
        this.selectData = []
      }
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
        this.list.forEach((item) => {
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
    rowClickTable(row) {
      const selected = this.selectData.findIndex((item) => item.id === row.id)
      if (selected >= 0) {
        // 已经被选中
        this.$refs.multipleTable.toggleRowSelection(row, false)
        this.selectData.forEach((item, index) => {
          if (item.id === row.id) {
            this.selectData.splice(index, 1)
          }
        })
      } else {
        // 还未选中
        this.selectData.push(row)
        this.$refs.multipleTable.toggleRowSelection(row, true)
      }
      // this.radioValue = row.id
      // this.selectData = row
    },
    // 获取数据
    getList() {
      this.loading = true
      getSuppliesList(this.form)
        .then((res) => {
          const data = res.data
          this.list = data.data
          this.total = data.total
          if (this.id) {
            this.list.forEach((item) => {
              if (item.id === this.id && this.selectData.length === 0) {
                this.selectData.push(item)
              }
            })
          }
          this.$refs.multipleTable.clearSelection()
          const that = this
          this.$nextTick(() => {
            if (that.selectData.length > 0) {
              that.selectData.forEach((item) => {
                for (var i = 0; i < that.list.length; i++) {
                  if (item.id === that.list[i].id) {
                    that.$refs.multipleTable.toggleRowSelection(
                      that.list[i],
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
    radioChange(row) {
      this.selectData = row
    },
    // 物资类别改变
    changeItemType(val) {
      this.form.itemSmallType = null
      this.form.itemBigType = null
      if (val) {
        this.getChildrenItemType1(val)
      } else {
        this.itemBigTypes = []
      }
    },
    // 物资大类改变
    changeItemBigType(val) {
      this.form.itemSmallType = null
      if (val) {
        this.getChildrenItemType2(val)
      } else {
        this.itemSmallTypes = []
      }
    },
    // 获取物资类别
    async getItemTypes() {
      const data = await getItemTypes()
      if (data.status === 200) {
        return data.data
      } else {
        return []
      }
    },
    // 获取物资大类
    getChildrenItemType1(id) {
      getChildrenItemType({ id: id }).then((res) => {
        this.itemBigTypes = res.data
      })
    },
    // 获取物资小类
    getChildrenItemType2(id) {
      getChildrenItemType({ id: id }).then((res) => {
        this.itemSmallTypes = res.data
      })
    },
    // 重置
    handerReset() {
      this.form = {
        // 查询参数
        page: 1,
        rows: 10
      }
      this.selectCascader = []
      this.handleQuery()
    },
    handleQuery() {
      this.form.page = 1
      this.getList()
    },
    // 关闭
    handleClose() {
      this.form = {
        page: 1,
        rows: 10,
        itemType: null,
        itemBigType: null,
        itemSmallType: null
      }
      this.selectCascader = []
      this.selectData = []
      this.radioValue = ''
      this.$emit('handleClose')
      this.$emit('update:visible', false)
    },
    // 提交
    handlerSubmit() {
      if (this.selectData && this.selectData.length > 0) {
        this.$emit('submitForm', this.selectData)
        this.handleClose()
      } else {
        this.$message({
          message: '请选择物资之后,在进行操作!',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-dialog__title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 0px 20px;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
  margin-top: 8px;
}
::v-deep .el-table::before {
  height: 0;
}
.search-btn {
  box-sizing: border-box;
  display: flex;
  justify-content: end;
}
.footer {
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  display: flex;
  align-items: center;
  .selectBox {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
  }
}
</style>
