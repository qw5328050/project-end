<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="80%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="queryParams" label-width="90px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目编号:">
             <el-input
              v-model="queryParams.projCode"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称:">
             <el-input
              v-model="queryParams.projectName"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分公司名称:">
             <el-input
              v-model="queryParams.subCorp"
              placeholder="请输入"
              clearable
            /> 
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
      ref='listTable'
      :data="tableData"
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
      border
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="30" align="center">
        <!-- <template slot-scope="{ row }">
          <el-checkbox
            v-model="radioValue"
            @change="radioChange(row)"
          /> -->
        <!-- :label="row.id" -->
        <!-- </template> -->
      </el-table-column>
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="项目编号" prop="projCode"  show-overflow-tooltip  />
      <el-table-column label="项目名称" prop="projectName"  show-overflow-tooltip />
      <el-table-column label="所属分公司" prop="subCorp" />
      <el-table-column label="项目管理员" prop="projAdminName" />
      <el-table-column label="项目经理" prop="projManagerName" />
      <el-table-column label="项目一级区域" prop="oneLevelAddr" />
      <el-table-column label="项目二级区域" prop="twoLevelAddr" />
      <el-table-column label="合同开工时间" prop="contractStartTime" />
    </el-table>
    <Pagination
      v-if="total > 0"
      :background="false"
      small
      style="margin-top: 24px;display: flex;justify-content: end"
      layout="prev, pager, next"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.rows"
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
import { checkProjectList } from '@/api/superLastMange/superLast'
export default {
  name: 'IndexDialog',
  props: {
    title: {
      type: String,
      require: true
    },
    visible: {
      type: Boolean,
      require: true
    },
  },
  data() {
    return {
      total: 0,
      isIndeterminate: '',
      checkAll: {},
      tableData: [],
      subCorpList: [],
      loading: false, // 表格加载
      checkSelection:{},
      queryParams:{
        projCode:'',
        projectName:'',
        subCorp:''
      },
      page: {
        page: 1,
        rows: 10,
      }
    }
  },
  watch: {
    visible: {
      handler() {
        this.getList()
      },
      immediate: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      if(val.length >1){
        this.$refs.listTable.clearSelection()
        this.$refs.listTable.toggleRowSelection(val.pop())
        return
      }
      if(val[0]){
        this.checkSelection.id = val[0].id
        this.checkSelection.projectName = val[0].projectName
      }else{
        this.checkSelection.id = ''
        this.checkSelection.projectName = ''
      }
      //this.multipleSelection = val
    },
    // 获取数据
    getList() {
      this.loading = true
      const parm   = Object.assign(this.page,this.queryParams)
      checkProjectList(parm).then((res) => {
        if(res.status == 200 ){
          this.tableData = res.data.list
          this.total = res.data.total
        }
        this.loading = false
      })
    },
    // 搜索
    handleQuery() {
      this.page.page = 1
      this.getList()
    },
    // 重置
    resetQuery() {
      this.page = {
        // 查询参数
        page: 1,
        rows: 10
      }
      this.queryParams.projCode='',
       this.queryParams.projectName= '',
       this.queryParams.subCorp= ''
      this.handleQuery()
    },
    // 关闭
    handleClose() {
      this.$emit('update:visible', false)
    },
    // 提交
    handlerSubmit() {
      //let checkedProject =[]
      // this.multipleSelection.forEach( item =>{
      //   checkedProject.push({id:item.id,projectName:item.projectName})
      // })
       this.$emit('submitForm', this.checkSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
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
