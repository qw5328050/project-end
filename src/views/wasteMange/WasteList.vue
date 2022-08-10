<template>
  <div>
    <div class="app-container">
      <div class="search-content" :class="{ 'show-height': anSearch }">
        <el-form ref="queryForm" :model="queryParams" label-width="90px">
          <el-row :gutter="20">
            <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
              <el-row :gutter="20">
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="项目名称:" prop="applyProjectName">
                    <el-input
                      v-model="queryParams.applyProjectName"
                      placeholder="请选择"
                      style="width: 100%"
                      @click.native='checkProject'
                      readonly
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="申请人:" prop="createUser">
                    <el-input
                      v-model="queryParams.createUser"
                      placeholder="请输入"
                      style="width: 100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="申请状态:" prop="status">
                    <el-select
                      v-model="queryParams.status"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in getDictionaryValue('useStatusAll')"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="是否立卷:" prop="isFiling">
                    <el-select
                      v-model="queryParams.isFiling"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                    >
                    <el-option  value="0">是</el-option>
                    <el-option  value="1">否</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
              <div class="search-btn">
                <el-button
                  @click="handerReset"
                >重置</el-button>
                <el-button
                  type="primary"
                  @click="handleQuery"
                >查询</el-button>
                <el-button
                  v-if="!anSearch"
                  type="text"
                  @click="changeAnSearch"
                >展开<i
                  class="el-icon-arrow-down"
                /></el-button>
                <el-button
                  v-else
                  type="text"
                  @click="changeAnSearch"
                >收起<i
                  class="el-icon-arrow-up"
                /></el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-card>
        <div class="table_header">
          <div class="table_title"></div>
          <div class="table_button">
            <el-button
              @click="exportData"
            ><svg-icon icon-class="export" />导出</el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
               @click="addWasteAsk"
            >新增</el-button>
            <right-toolbar
              :size="size"
              :columns="columns"
              @queryTable="getList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <el-table
          v-loading="loading"
          border
          stripe
          :data="tableData"
          element-loading-text="Loading"
          :size="size"
          fit
          highlight-current-row
          :header-row-class-name="() => 'headerClass'"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="left"  width="30" />
          <el-table-column
            v-if="columns[0].visible"
            key="0"
            align="left"
            label="序号"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="项目名称"
            align="left"
            prop="applyProjectName"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="申请单号"
            align="left"
            prop="applySerial"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="color: #1791ff; cursor: pointer"
                @click="askDetails(scope.row)"
              >{{ scope.row.applySerial }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="处理记录单号"
            align="left"
            prop="recordSerial"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
                @click="recordDetails(scope.row)"
              >{{ scope.row.recordSerial }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="处理立卷单号"
            header-align="left"
            align="left"
            prop="filingSerial"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
                @click="fillingDetails(scope.row)"
              >{{ scope.row.filingSerial }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            class-name="status-col"
            label="申请人"
            align="left"
            prop="createUserName"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            align="left"
            prop="createTime"
            label="申请时间"
          >
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="处理状态"
            align="left"
            prop="status"
          >
          <template slot-scope="{ row }">
              <span>{{ getDictionaryLabel(row.status,'rubbishStatus') }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作"  width="300"    class="cup" fixed="right" >
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="text"
                @click='editWasteAsk(row)'
              >编辑废旧申请</el-button>
            <el-button
                size="mini"
                type="text"
                 @click='addWasteRecord(row)'
                 v-if=" !row.recordSerial"
              >新增废旧记录</el-button>
            <el-button
                size="mini"
                type="text"
                 @click='editWasteRecord(row)'
                 v-if=" row.recordSerial"
              >编辑废旧记录</el-button>
            <el-button
                size="mini"
                type="text"
                 @click='addFiling(row)'
                 v-if="row.recordSerial"
              >新增处理立卷</el-button>
              <el-button
                size="mini"
                type="text"
                @click='editFiling(row)'
                v-if=" row.recordSerial && row.filingSerial"
              >编辑处理立卷</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="total > 0" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ page.pageNum }}/{{
              Math.ceil(total / page.pageSize)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="total"
            :page.sync="page.pageNum"
            :limit.sync="page.pageSize"
            @pagination="getList"
          />
        </div>
      </el-card>
    </div>
    <!-- 弹窗 -->
    <CheckProject
      :visible.sync="isShow"
      title="选择项目"
      @submitForm="checkForm"
    />
  </div>
</template>

<script>
import { wasteList,wasteListExport } from '@/api/wasteMange/wasteMange'
import { objectToQueryString, delEmtQueryNodes } from '@/utils/validate'
import CheckProject from '@/components/CheckProject/indexDialog.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['projectInformation'])
  },
  components: {
    CheckProject,
  },
  data() {
    return {
      size: 'small', // 表格的密度
      isIndeterminate: false, // 底部选择的状态
      checkAllData: false, // 全选的状态
      tableData: [],
      total: 0,
      anSearch: false,
      loading: false,
      isShow:false,
      page:{
        pageNum: 1,
        pageSize: 10
      },
      // 查询参数
      queryParams: {
        applyProjectName: '',
        applyProjectId:'',
        createUser: '',
        status:'',
        isFiling:''
      },
      // 表单参数
      form: {},
      list: [],
      selPreOrdetData: [],
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `项目名称`, visible: true },
        { key: 2, label: `申请单号`, visible: true },
        { key: 3, label: `处理记录单号`, visible: true },
        { key: 4, label: `处理记录卷号`, visible: true },
        { key: 5, label: `申请人`, visible: false },
        { key: 6, label: `申请时间`, visible: false },
        { key: 7, label: `处理状态`, visible: true }
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `项目名称`, visible: true },
        { key: 2, label: `申请单号`, visible: true },
        { key: 3, label: `处理记录单号`, visible: true },
        { key: 4, label: `处理记录卷号`, visible: true },
        { key: 5, label: `申请人`, visible: false },
        { key: 6, label: `申请时间`, visible: false },
        { key: 7, label: `处理状态`, visible: true }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
      checkForm(data){
        const  projectName= data.projectName
        const  projectId = data.id
        this.queryParams.applyProjectName =  projectName
        this.queryParams.applyProjectId =  projectId
        this.isShow = false
    },
    //废旧处理申请详情
    askDetails(row){
      this.$router.push(`/wasteMange/askDetails/${row.applySerial}`)
    },
    //废旧处理记录详情
    recordDetails(row){
      this.$router.push(`/wasteMange/recordDetails/${row.recordSerial}`)
    },
    //废旧处理立卷详情
    fillingDetails(row){
      this.$router.push(`/wasteMange/fillingDetails/${row.filingSerial}`)
    },
    //新增处理申请
    addWasteAsk(row){
        this.$router.push(`/wasteMange/add`)
    },
    //编辑处理申请
    editWasteAsk(row){
        this.$router.push(`/wasteMange/add/${row.applySerial}`)
    },
    //新增废旧记录
    addWasteRecord(row){
        this.$router.push(`/wasteMange/recordAdd/${row.applySerial}`)
    },
    //编辑废旧记录  含有记录单号
    editWasteRecord(row){
      const  recordSerial   = row.recordSerial ?  row.recordSerial : ''
      this.$router.push(`/wasteMange/recordAdd/${row.applySerial}?recordSerial=${recordSerial}`)
    },
    //新增立卷
    addFiling(row){
        const  applySerial   = row.applySerial
        const  recordSerial   = row.recordSerial ?  row.recordSerial : ''
        this.$router.push({ path: `/wasteMange/steelAdd/${applySerial}?recordSerial=${recordSerial}`})
    },
    //编辑立卷 含有立卷单号
    editFiling(row){
        const  applySerial   = row.applySerial
        const  filingSerial   = row.filingSerial ?  row.filingSerial : ''
        this.$router.push({ path: `/wasteMange/steelAdd/${applySerial}?filingSerial=${filingSerial}`})
    },
    //多选
    handleSelectionChange(val) {
      this.selPreOrdetData = val
    },
    // 导出
    // exportData() {
    //   wasteListExport({ ...this.queryParams, page: this.page, rows: this.rows }).then((res) => {})
    // },
    // 导出
    exportData() {
      // if (this.selPreOrdetData === null || this.selPreOrdetData.length === 0) {
      //   this.$message.warning('请选择需要导出的合同信息')
      //   return
      // }
      const ids = []
      this.selPreOrdetData.forEach((item) => {
        ids.push(item.id)
      })

      const obj = delEmtQueryNodes(delEmtQueryNodes(JSON.parse(JSON.stringify(this.queryParams))))
      obj.contractIds = ids
      delete obj.pageNum
      delete obj.pageSize
      wasteListExport(objectToQueryString({ ...obj, orgId: this.projectInformation.orgId === null ? -1 : this.projectInformation.orgId })).then((response) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        const url = window.URL || window.webkitURL || window.moxURL
        const downloadHref = url.createObjectURL(blob)
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadHref
        downloadLink.download = `合同列表.xlsx`
        downloadLink.click()
      })

       wasteListExport(this.ids).then((res) => {})
    },
    // 获取列表数据
    getList() {
      this.loading = true
      const  parm   = Object.assign(this.page,this.queryParams)
      wasteList(parm).then((res) => {
        if(res.status == 200){
          const data = res.data
          this.tableData = data.list
          this.total = data.total
          this.loading = false
        }
      }).catch(() => {
          this.loading = false
      })
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    // 跳转合同变更详情页面
    showDialog(row) {
      this.$router.push({
        path: '/contractManagement/changeDetails',
        query: { id: row.id }
      })
    },
    // 跳转关联项目页面
    relevance(row) {
      this.$router.push({
        path: '/contractManagement/relevance',
        query: { id: row.id }
      })
    },
    // 跳转合同详情页面
    details(row) {
      this.$router.push({
        path: '/contractManagement/contractDetails',
        query: { id: row.id }
      })
    },
    // 跳转编辑页面
    edit(row) {
      this.$router.push({
        path: '/contractManagement/edit',
        query: { id: row.id }
      })
    },
    // 跳转变更页面
    alteration(row) {
      this.$router.push({
        path: '/contractManagement/alteration',
        query: { id: row.id }
      })
    },
    // 跳转新增页面
    toAddView() {
      this.$router.push({ path: '/contractManagement/add' })
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    //调出项目
    checkProject(){
      this.isShow  = true
    },
    // 重置
    handerReset() {
      this.queryParams.applyProjectName = ''
      this.queryParams.applyProjectId = ''
      this.queryParams.createUser = ''
      this.queryParams.status = ''
      this.queryParams.isFiling = ''
      this.page.pageNum =1
      this.page.pageSize =10
      this.handleQuery()
    },
    handleQuery() {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.needPlanTop {
  background: #fff;
  padding-left: 32px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  .project {
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    display: flex;
    padding-bottom: 16px;
    align-items: center;
    .switch_svg {
      margin-left: 8px;
      font-size: 24px;
    }
  }
}
  .popoverIoc {
    margin-left: 8px;
    font-size: 16px;
    color: #1791ff;
  }
  .planStatus {
    display: flex;
    align-items: center;
    .box {
      width: 7px;
      height: 7px;
      box-sizing: border-box;
      border-radius: 50%;
      margin-right: 8px;
    }
    .normal {
      background: #bfbfbf;
    }
    .approval {
      background: #1791ff;
    }
    .draft {
      background: #00cc33;
    }
    .rejected {
      background: #faad14;
    }
    .forbidden {
      background: red;
    }
  }
  .action-box {
    color: #1791ff;
    display: flex;
    justify-content: space-between;
  }
  .action-border {
    width: 1px;
    height: 14px;
    background: #e9e9e9;
  }
  ::v-deep .headerClass th {
    background: #fafafa !important;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  // .box {
  //   background-color: #fff;
  //   padding-bottom: 18px;
  // }
  .box1 {
    margin-left: 32px;
    width: 80px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
  }
  .box2 {
    margin-left: 30px;
    margin-top: 8px;
    width: 266px;
    height: 28px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
    line-height: 28px;
  }
  .box3 {
    margin-left: 30px;
    position: relative;
    bottom: -15px;
  }
  .search-content {
    background: #ffffff;
    // margin: 16px;
    margin-bottom: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 70px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: end;
    }
  }
  .show-height {
    height: auto;
  }
  .table_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .table_title {
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }
    .table_button {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  .pagination {
    margin-left: 1%;
    width: 97%;
    height: 64px;
    display: flex;
    // position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    .pageNumberRecord {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .footer {
    // position: absolute;
    width: 100%;
    // margin-top: 16px;
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
