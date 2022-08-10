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
        <el-col :span="8">
          <el-form-item label="供应商名称:">
            <el-input v-model="form.name" placeholder="请输入" clearable>
              <!-- <el-option
                v-for="(item, index) in intentionOptions"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              /> -->
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资类别:">
            <el-input v-model="form.itemType" placeholder="请输入" clearable>
              <!-- <el-option
                v-for="(item, index) in intentionOptions"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              /> -->
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item style="margin-left: 34%">
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      height="385"
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" prop="id" /> -->
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
      <el-table-column label="供应商名称" prop="supplierName" />
      <el-table-column label="物资类别" prop="itemType" />
      <el-table-column label="累计发货单数" prop="totalDeliverNum" />
      <el-table-column label="创建时间" prop="createTime" />
    </el-table>
    <!-- <el-pagination
      style="margin-left: 85%; margin-top: 24px"
      small
      layout="prev, pager, next"
      :total="50"
    /> -->
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span> -->
    <!-- <div class="footer"> -->
    <!-- <div class="selectBox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >已选4项</el-checkbox>
        <el-button type="text" style="margin-left: 4px">取消</el-button>
      </div> -->
    <div class="actionButtons">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
    <!-- </div> -->
  </el-dialog>
</template>

<script>
import { selectSupplierByNameOrItemType } from '@/api/contractManagement/table'
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
      require: true
    },
    interviewId: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      form: {},
      loading: false, // 表格加载
      list: [], // 表格数据
      multipleSelection: [],
      projectId: [],
      radioValue: ''
    }
  },
  // watch: {
  //   visible: {
  //     handler() {
  //       if (this.id) {
  //         this.selection = Number(this.id)
  //       } else {
  //         this.selection = 0
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          if (this.interviewId) {
            this.radioValue = this.interviewId
          }
          this.getList()
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  methods: {
    radioChange(val) {
      this.projectId = val.id
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取数据
    getList() {
      this.loading = true
      selectSupplierByNameOrItemType(this.form).then((res) => {
        this.tableData = res.data
        this.loading = false
      })
    },
    resetQuery() {
      this.form = {}
      this.getList()
    },
    handleQuery() {
      // this.queryParams.pageNum = 1
      this.getList()
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.$emit('update:visible', false)
    },
    // 确定
    confirm() {
      this.$emit('submitForm', this.projectId)
    }
  }
}
</script>

<style lang="scss" scoped>
.actionButtons {
  margin-left: 85%;
  margin-top: 16px;
}
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
.footer {
  // position: absolute;
  width: 100%;
  margin-top: 16px;
  padding-left: 40px;
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}
</style>
