<template>
  <div class="account_container">
    <div class="search_content" :class="{ 'show_height': anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="90px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="调出项目:" >
                  <el-input
                    v-model="queryParams.applyProjectName"
                    @click.native='checkOutProject'
                    placeholder="请选择"
                    style="width: 100%"
                    readonly
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="申请人:" >
                  <el-input
                    v-model="queryParams.createUser"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="状态:" >
                  <el-select
                    v-model="queryParams.status"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('lastStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="调入项目:" >
                  <el-input
                    v-model="queryParams.entryProjectName"
                    placeholder="请输入"
                    style="width: 100%"
                    @click.native='checkInProject'
                    readonly
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="queryBtn">查询</el-button>
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
    <div class="table_box">
      <div class="table_content">
        <div class="table_header">
          <div class="table_title">物资调拨列表</div>
          <div class="table_button">
             <el-button @click="exportData">
              <svg-icon icon-class="export" />
              导出</el-button
            >
            <el-button type="primary" @click="addSuperLast()">
              <i class="el-icon-edit iconfont"></i>
              新增调拨申请</el-button
            >
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
          ref="tableBox"
          v-loading="loading"
          :data="listData"
          :header-row-class-name="() => 'headerClass'"
          border
          :size="size"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" align="left"  width="30" />
          <el-table-column
            v-if="columns[0].visible"
            key="0"
            align="center"
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
            label="物资调拨申请编号"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <a @click='goAskDetail(row)' style='color:#409EFF'>{{ row.applySerial }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="物资调拨录入编号"
            show-overflow-tooltip
          >
          <template slot-scope="{ row }">
              <a @click='goInputDetail(row)' style='color:#409EFF'>{{ row.entrySerial }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="调出项目名称"
            prop="entryProjectName"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="调入项目名称"
            prop="entryProjectName"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            label="调拨物资"
          >
            <template slot-scope="{ row }">
              <span>{{ row.transfersNumber }}种</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            show-overflow-tooltip
            label="申请人"
            prop='createUserName'
          >
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="申请时间"
            prop="createTime"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            v-if="columns[8].visible"
            key="8"
            label="调拨时间"
            prop="createTime"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            v-if="columns[9].visible"
            key="9"
            label="状态"
            prop="status"
            show-overflow-tooltip
          >
           <template slot-scope="{ row }">
              <span>{{  getDictionaryLabel(row.status, 'lastStatus') }}</span>
            </template>
        </el-table-column>
          <el-table-column  label="操作"  width="300"    class="cup" fixed="right" >
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="text"
                @click='editSuperLast(row)'
              >编辑调拨申请</el-button>
            <el-button
                size="mini"
                type="text"
                @click='addAllocation(row)'
              >新增调拨录入</el-button>
              <el-button
                size="mini"
                type="text"
                @click='editAllocation(row)'
                v-if="row.entrySerial"
              >编辑调拨录入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            共{{ AllListData.total }}条记录 第{{ AllListData.page }}/{{
              Math.ceil(AllListData.total /  AllListData.rows)
            }}页
          </div>
          <el-pagination
            background
            :page-size="AllListData.rows"
            :current-page.sync="AllListData.page"
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="AllListData.total"
            @size-change="onSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <CheckProject
      :visible.sync="isShow"
      title="选择项目"
      @submitForm="checkForm"
    />
  </div>
</template>

<script>
import { allocationList,inputListExport } from '@/api/superLastMange/superLast'
import CheckProject from '@/components/CheckProject/indexDialog.vue'
export default {
  name: 'SuperLastMange',
  components: {
    CheckProject,
  },
  data() {
    return {
      isShow:false,
      projectType:'in',
      page: {
        page: 1,
        rows: 10
      },
      AllListData: {
        page:1,
        rows:10,
      },
      listData: [],
      selPreOrdetData:[],  //多选导出ID
      size: 'medium', // 表格的密度
      // 查询参数
      queryParams: {
        applyProjectId: '',  //调出项目
        createUser: '',
        status: '',
        entryProjectId:''   //调入项目
      },
      loading: false, // 表格加载
      anSearch: false, //展开
      optionss: [],
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `物资调拨申请编号`, visible: true },
        { key: 2, label: `物资调拨录入编号`, visible: true },
        { key: 3, label: `调出项目名称`, visible: true },
        { key: 4, label: `调入项目名称`, visible: true },
        { key: 5, label: `调拨物资`, visible: true },
        { key: 6, label: `申请人`, visible: false },
        { key: 7, label: `申请时间`, visible: false },
        { key: 8, label: `调拨时间`, visible: false },
        { key: 9, label: `状态`, visible: true }
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `物资调拨申请编号`, visible: true },
        { key: 2, label: `物资调拨录入编号`, visible: true },
        { key: 3, label: `调出项目名称`, visible: true },
        { key: 4, label: `调入项目名称`, visible: true },
        { key: 5, label: `调拨物资`, visible: true },
        { key: 6, label: `申请人`, visible: false },
        { key: 7, label: `申请时间`, visible: false },
        { key: 8, label: `调拨时间`, visible: false },
        { key: 9, label: `状态`, visible: true }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    //调出项目
    checkOutProject(){
      this.isShow  = true
      this.projectType =  'out'
    },
    //调入项目
    checkInProject(){
        this.isShow  = true
        this.projectType =  'in'
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    checkForm(data){
      const  projectName= data.projectName
      const  projectId = data.id
      if(this.projectType == 'in'){
        this.queryParams.entryProjectName =  projectName
        this.queryParams.entryProjectId =  projectId
      }else{
        this.queryParams.applyProjectName =  projectName
         this.queryParams.applyProjectId =  projectId
      }
      this.isShow = false
    },
    handleSelectionChange(val) {
      this.selPreOrdetData = val
    },
    //申请详情
    goAskDetail(row){
      const applySerial  = row.applySerial
      this.$router.push(`/superLastMange/transferAskDetail/${applySerial}`)
    },
    //录入详情
    goInputDetail(row){
      const entrySerial  = row.entrySerial
      this.$router.push(`/superLastMange/transferInputDetail/${entrySerial}`)
    },
    getList(){
        const  parm  =Object.assign(this.page,this.queryParams)
        allocationList(parm).then( (res)=>{
            if(res.status == 200){
              this.listData = res.data.list
              this.AllListData.total  = res.data.total
              this.AllListData.page  = res.data.pageNum
              this.AllListData.rows  = res.data.pageSize
            }
        }).catch( (err)=>{
          console.log(err)
        })
    },
    exportData(){
      inputListExport('').then((res) => {})
    },
    //新增调拨录入
    addAllocation(row){
        const applySerial  = row.applySerial
        this.$router.push(`/superLastMange/allocationAdd/${applySerial}?type=add`)
    },
    //编辑调拨录入
    editAllocation(row){
        const applySerial  = row.applySerial
        const entrySerial =row.entrySerial
        this.$router.push(`/superLastMange/allocationAdd/${applySerial}?entrySerial=${entrySerial}&type=edit`)
    },
    //新增调拨申请
    addSuperLast(){
       this.$router.push(`/superLastMange/add`)
    },
    //编辑调拨申请
    editSuperLast(row){
      this.$router.push(`/superLastMange/add/${row.applySerial}`)
    },
    // 查询按钮
    queryBtn() {
      // const obj = {
      //   applyProjectId: this.queryParams.applyProjectId,
      //   createUser: this.queryParams.createUser,
      //   status: this.queryParams.status
      // }
      this.getList()
    },
    // 重置
    handerReset() {
      this.queryParams = {
        applyProjectId: '',
        createUser: '',
        status: ''
      }
      this.getList()
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    onSizeChange(e) {
      this.page.rows = e
    },
    // 切换页数
    handleCurrentChange(e) {
      this.page.page = e
    }
  }
}
</script>

<style lang="scss" scoped>
.account_container {
  .search_content {
    background: #ffffff;
    margin: 16px;
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
  .show_height {
    height: auto;
  }
  .table_box {
    height: 100%;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table_content {
      width: 100%;
      height: 100%;
      padding: 16px 24px 0px 24px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .table_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .table_title {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
        }
        .table_button {
          display: flex;
          align-items: center;
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
    }
    .name_wrapper {
      color: #1791ff;
      margin-left: 8px;
      font-size: 25px;
    }
  }
}
.jumpToPower{
  color: #1791ff;
}
</style>
