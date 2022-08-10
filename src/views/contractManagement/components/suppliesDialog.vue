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
            <el-select
              v-model="form.itemType"
              placeholder="请选择"
              clearable
              @change="changeItemType"
            >
              <el-option
                v-for="(item, index) in itemTypes"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物资大类:">
            <el-select
              v-model="form.itemBigType"
              placeholder="请选择"
              clearable
              @change="changeItemBigType"
            >
              <el-option
                v-for="(item, index) in itemBigTypes"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物资小类:">
            <el-select
              v-model="form.jobIntention"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item, index) in itemSmallTypes"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="search-btn">
            <el-button @click="handerReset">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="物资名称:">
            <el-input v-model="form.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list"
      height="385"
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
    >
      <el-table-column width="25">
        <template slot-scope="{ row }">
          <el-radio
            v-model="radioValue"
            :label="row.id"
            @change="radioChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="物资类别" prop="itemType" />
      <el-table-column label="物资大类" prop="itemBigType" />
      <el-table-column label="物资小类" prop="itemSmallType" />
      <el-table-column label="物资名称" prop="name" />
      <el-table-column label="计量单位" prop="unit" />
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handlerSubmit">确 定</el-button>
    </span>
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
      radioValue: '',
      form: {
        page: 1,
        rows: 10
      },
      total: 0,
      selectData: null,
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
          if (this.id) {
            this.radioValue = this.id
          } else {
            this.radioValue = null
          }
          this.getList()
          this.getItemTypes()
        }
      },
      immediate: true
    },
    id: {
      handler() {
        if (this.id) {
          this.radioValue = this.id
        } else {
          this.radioValue = null
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取数据
    getList() {
      this.loading = true
      getSuppliesList(this.form)
        .then((res) => {
          const data = res.data
          this.list = data.data
          this.total = data.total
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
      if (val) {
        this.getChildrenItemType1(val)
      } else {
        this.itemBigTypes = []
      }
    },
    // 物资大类改变
    changeItemBigType(val) {
      if (val) {
        this.getChildrenItemType2(val)
      } else {
        this.itemSmallTypes = []
      }
    },
    // 获取物资类别
    getItemTypes() {
      getItemTypes().then((res) => {
        this.itemTypes = res.data
      })
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
      this.handleQuery()
    },
    handleQuery() {
      this.form.page = 1
      this.getList()
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.radioValue = ''
      this.$emit('update:visible', false)
    },
    // 提交
    handlerSubmit() {
      if (this.selectData || this.radioValue) {
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
</style>
