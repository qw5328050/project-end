<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="queryParams" label-width="90px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目编号:">
            <!-- <el-input
              v-model="queryParams.projCode"
              placeholder="请输入"
              clearable
            /> -->
            <el-select
              v-model="queryParams.projCode"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item, index) in tableDataS"
                :key="index"
                :label="item.projCode"
                :value="item.projCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称:">
            <!-- <el-input
              v-model="queryParams.projectName"
              placeholder="请输入"
              clearable
            /> -->
            <el-select
              v-model="queryParams.projectName"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item, index) in tableDataS"
                :key="index"
                :label="item.projectName"
                :value="item.projectName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分公司名称:">
            <!-- <el-input
              v-model="queryParams.subCorp"
              placeholder="请输入"
              clearable
            /> -->
            <el-select
              v-model="queryParams.subCorp"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item, index) in branchComList"
                :key="index"
                :label="item.orgName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
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
      <el-table-column type="selection" width="55" align="center">
        <!-- <template slot-scope="{ row }">
          <el-checkbox
            v-model="radioValue"

            @change="radioChange(row)"
          /> -->
        <!-- :label="row.id" -->
        <!-- </template> -->
      </el-table-column>
      <!-- <el-table-column
            align="center"
            label="序号"
            width="95"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column> -->
      <el-table-column label="项目编号" prop="projCode" />
      <el-table-column label="项目名称" prop="name" />
      <el-table-column label="所属分公司" prop="subCorp" />
      <el-table-column label="项目管理员" prop="projAdminName" />
      <el-table-column label="项目经理" prop="projManagerName" />
      <el-table-column label="项目一级区域" prop="oneLevelAddr" />
      <el-table-column label="项目二级区域" prop="twoLevelAddr" />
      <el-table-column label="合同开工时间" prop="contractStartTime" />
      <el-table-column label="项目状态" prop="projectStatus" />
    </el-table>
    <el-pagination
      style="margin-left: 85%; margin-top: 24px"
      small
      layout="prev, pager, next"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span> -->
    <div class="footer">
      <div class="selectBox">
        <!-- <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >已选4项</el-checkbox>
        <el-button type="text" style="margin-left: 4px">取消</el-button> -->
      </div>
      <div class="actionButtons">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  noAssociatedProject,
  associateProject,
  listProjectByContractId,
  getBranchCom
} from '@/api/contractManagement/table'
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
    // interviewId: {
    //   type: Number,
    //   require: true
    // },
    id: {
      type: Number,
      require: false,
      default: null
    }
  },
  data() {
    return {
      total: 0,
      branchComList: [],
      getBranchCom: [],
      radioValue: '',
      selectData: null,
      isIndeterminate: '',
      checkAll: {},
      form: {},
      tableData: [],
      tableDataS: [],
      loading: false, // 表格加载
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contractId: this.$route.query.id
      }
    }
  },
  watch: {
    visible: {
      handler() {
        this.getList()
        if (this.id) {
          // this.projectLabel = this.id
          this.selection = Number(this.id)
        } else {
          // this.projectLabel = ''
          this.selection = 0
        }
      },
      immediate: true
    }
  },
  created() {
    this.getListS()
    this.getBranchList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getListS() {
      listProjectByContractId(this.$route.query.id).then((res) => {
        /** 数组去重 */
        this.tableDataS = Array.from(new Set(res.data))
      })
    },
    // 获取分公司列表
    getBranchList() {
      getBranchCom({}).then((res) => {
        this.branchComList = res.data
      })
    },
    // 获取数据
    getList() {
      // console.log(this.$route.query.id, '=====')
      this.loading = true
      noAssociatedProject(this.queryParams).then((res) => {
        this.tableData = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    // 搜索
    handleQuery() {
      this.form.pageNum = 1
      this.getList()
    },
    // 重置
    resetQuery() {
      this.date = ''
      this.queryParams = {
        // 查询参数
        pageNum: 1,
        pageSize: 10,
        contractId: this.$route.query.id
      }
      this.handleQuery()
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.radioValue = ''
      this.$emit('update:visible', false)
    },

    // 提交
    handlerSubmit() {
      let contractId = []
      contractId = this.$route.query.id
      const projectId = []
      this.multipleSelection.forEach((item) => {
        projectId.push(item.id)
      })
      associateProject({ contractId: contractId, projectId: projectId }).then(
        (res) => {
          this.$message.success('操作成功')
          this.handleClose()
          this.$emit('submitForm', true)
        }
      )
      // this.$emit('submitForm', this.multipleSelection)
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
