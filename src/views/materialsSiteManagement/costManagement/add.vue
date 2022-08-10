<template>
  <div class="totalPlan-container">
    <el-card v-if="!isApproveShow && !submitSuccess" class="pm">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">基本信息</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="90px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="节超分析编号" prop="applyProjectName">
              <el-input
                v-model="form.applyProjectName"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="项目名称" prop="applySerial">
              <el-input
                v-model="form.applySerial"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12" v-if="pageType == 'partSubitem'">
            <el-form-item label="供应商名称" prop="entryProjectName">
                <el-input
                v-model="form.entryProjectName"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="版本日期"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入"
                clearable
                maxlength="30"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12" v-if="pageType == 'turnoverInventory'">
            <el-form-item
              label="单据状态"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入"
                clearable
                maxlength="30"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <!-- 单据状态 -->
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="核对时间"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入"
                clearable
                maxlength="30"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="统计区域"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入"
                clearable
                maxlength="30"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>    
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item>
                  <FileUpload
                    :rules="rules"
                    prop="uploads"
                    :limit-num="10"
                    :file-size="5"
                    :file-type="fileType"
                    @getFileList="getFileListS"
                    @delFile="delFileS"
                  />
                </el-form-item>
            </el-col>
          </el-row>
        <div class="wander">
          <div class="left">物资信息</div>
          <div class="addRows" @click="addRows" >导 出</div>
        </div>
        <AllTable
          :table-data="form.list"
          :bind-data="currentBindData"
          :is-selection="true"
          :is-index="true"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
            <template v-slot:list="{ row }">
                <div class="item-border" v-for="item in row.list" :key="item">{{item.a}}</div>
            </template>
        </AllTable>
      </el-form>
    </el-card>
    <div class="footer">
      <div class="select_box">
        <div class="action_buttons">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleClose">保存</el-button>
          <el-button type="primary" @click="submitForm" v-if="pageType == 'turnoverInventory'">快照</el-button>
          <el-button @click="submitForm" v-if="pageType == 'partSubitem'">拍照</el-button>
          <el-button type="primary" @click="submitForm" v-if="pageType == 'partSubitem'">提交</el-button>
        </div>
      </div>
    </div>
    <CheckProject
      :visible.sync="isShow"
      title="选择项目"
      @submitForm="checkForm"
    />
    <CheckMaterial
      :id="cliId"
      :visible.sync="isShowSuppliesDialog"
      title="选择物资"
      @submit="submit"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import SelectNode from '@/components/selectNode'
import FileUpload from '@/components/FileUpload'
import CheckProject from '@/components/CheckProject/indexDialog.vue'
import CheckMaterial from '@/components/CheckMaterials/CheckMaterial'
import { mapGetters } from 'vuex'
import {allocationAdd,allocationDetail } from '@/api/superLastMange/superLast'
import AllTable from '@/components/AllTable'
export default {
  name: "transferAsk",
  components: {
    SelectNode,
    CheckProject,
    CheckMaterial,
    FileUpload,
    AllTable
  },
  data() {
    return {
        id:'',
        pageType:'',  // pageType turnoverInventory partSubitem
        fileList: [],
        labelPosition: "top",
        leaseParameterIdList:[],//主id
        reportStopCode:[],  //退料单id
        receiptItemId:[],    //报停单id
        form:{
            id:'',  
            applyProjectName:'',  //项目名称
            applyProjectId:'',  //项目ID
            applySerial:'',   //调拨申请编号
            entryProjectId:'',  //拟调入项目id
            entryProjectName:'',  //拟调入项目Name
            remake:'',   //调拨说明
            list:[{name: '', list: [{a: 1},{a: 1},{a: 1}]}],
      }, 
      cliId:0,
      isShowSuppliesDialog:false,
       //底部表格
      alteration:1,
      processKey:"onsiteManagement",
      approver:[],//选中的审批人列表
      isApproveShow:false,//是否显示选择审批人页面
      submitSuccess:false,//是否提交成功
      isShow:false,
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png'],
      currentBindData: '',
      turnoverInventoryData: {
        a: '工程部位',
        a1: '混凝土浇筑时间',
        a2: '按方案拆除时间',
        a3: '实际拆除时间 ',
        list: '闲置材料名称',
        a5: '物资单位',
        a6: '状态',
        a7: '闲置数量（按方案 /盘点计量）',
      },
      partSubitemData: {
        a: '浇筑部位',
        a1: '强度等级',
        a2: '浇筑时间',
        a3: '浇筑方式',
        a4: '图算量（商务）'
      },
      rules: {
          entryProjectName: [
            { required: true, message: "请选择调入项目", trigger: "change" },
          ],
          uploads: [{ required: true, message: '请选择', trigger: 'blur' }],
          applyAmount: [
            { required: true, message: "请输入数量"},
            { pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正整数', trigger: 'blur' }
          ],
        },
    };
  },
  computed: {
    ...mapGetters(['selectUserOrg'])
  },
  created() {
    this.pageType = this.$route.query.pageType
    if (this.pageType == 'turnoverInventory') {
        this.$route.meta.title = '周转料具应拆未拆盘点新增'
        this.currentBindData = this.turnoverInventoryData
    } else {
        this.$route.meta.title = '新增节超分析表-混凝土分部分项浇筑统计'
        this.currentBindData = this.partSubitemData
    }
  },
  mounted() {
    if (this.pageType == 'edit') {
      this.showSuperLastDetail()
    } 
  },
  methods: {
    handleSelectionChange () {},
    addRows(){
      this.isShowSuppliesDialog = true
    },
    // 选择物资
    submit(dataArr) {
      if (dataArr.length >= 1) {
        dataArr.forEach((item, index) => {
          var   obj   = new  Object;
          obj.materialId=item.id
          obj.materialName=item.name
          obj.specification=item.specification
          obj.unit=item.unit
          this.form.reportList.push(obj)
        })
      }
    },
    handleClose() {
      this.cliId = null
    },
    getFileListS(fileList) {
      console.log(fileList)
      this.fileList  = fileList
    },
    delFileS(fileList) {
     // this.periodFileListS = fileList
     console.log(fileList)
    },
    checkProject(){
      this.isShow = true
    },
    checkForm(data){
      // console.log(data)
      // console.log(data.id)
      // console.log(data.projectName)
      this.form.entryProjectName = data.projectName
      this.form.entryProjectId = data.id
      this.isShow = false
    },
    prevHandle(){
      this.isApproveShow= false
      this.submitSuccess=false
    },
    submitHandleForm() {
      if (!this.approver || this.approver === null || this.approver.length === 0) {
        this.$message.warning('请选择审批人信息')
        return
      }
      // 设置审批人
      const variable = {}
      var isCheckPerson = this.approver.every((item) => item.personnel != null)
      if (!isCheckPerson) {
        this.$message.warning('请选择完整的对应审批人')
        return
      }
      this.approver.forEach(item => {
        variable[item.assignee] = item.personnel[0].mainCode
      })
      this.form.variable = variable
      this.commonSubmit(1)
    },
    // 选中的审批人列表
    selectPersonnel(val) {
      this.approver = val
    },
    //编辑查看详情
    showSuperLastDetail() {
      const  parm ={applySerial:this.id}
      allocationDetail(parm).then(res => {
        if (res.status === 200) {
          const { id, applyProjectName, applyProjectId,applySerial,
           entryProjectId,entryProjectName,remake } = res.data.transfersApply
          const { materialFiles,transfersApplyItems } = res.data
          
          this.form.id = id
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号
          this.form.entryProjectId = entryProjectId
          this.form.entryProjectName = entryProjectName
          this.form.remake = remake

          this.fileList = materialFiles
          this.form.reportList = transfersApplyItems
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除行
    handelDelete(row, index) {
      this.reportList.splice(index, 1)
    },
    // 取消
    handleCancle() {
      this.$router.go(-1)
    },
    // 提交打开选择审批人
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 先打开审批人
          this.isApproveShow = true
          this.submitSuccess = true
        }
      })
    },
    // 公共提交方法
    async commonSubmit(submitStatus) {
      const formData = {}

      // formData.applyProjectName = this.form.applyProjectName
      // formData.applyProjectId = this.form.applyProjectId
      // formData.entryProjectId = this.form.entryProjectId
      // formData.entryProjectName = this.form.entryProjectName
      // formData.remake = this.form.remake


      // 0为保存
      if (submitStatus === 0) {
        formData.type = 0
      } else {
        formData.type = 1
       // formData.variable = this.form.variable
      }

      var  submitFileList  = []
       this.fileList.map ( item =>{
        var   obj   = new  Object
        obj.name = item.name
        obj.url = item.url
        submitFileList.push(obj)
      })
      formData.transfersApply= this.form
      formData.materialFiles = submitFileList
      // 底部table
      formData.transfersApplyItems = this.form.reportList

      if (this.pageType === 'edit') {
        formData.id = this.$route.query.id
        const res = await allocationAdd(formData)
        if (res && res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/superLastMange/index' })
        }
        return
      }
      allocationAdd(formData).then((res) => {
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/superLastMange/index' })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存
    submitSaveForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.commonSubmit(0)
        }
      });
    },
    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList,"===")
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style lang="scss" scoped>
.item-border {
    margin: 0 -10px;
    padding: 6px 10px;
    border-top: 1px solid #EBEEF5;
    line-height: 23px;
     &:first-child {
      margin-top: -6px;
     }
}
::v-deep .el-table {
  .el-form-item {
    margin-bottom: 0px;
    &__content {
      width: 100%;
    }
    &.is-error {
      width: 100%;
    }
  }
}

::v-deep .el-card__body {
  padding: 0 20px 20px 20px;
}

.totalPlan-container {
  .pm {
    margin: 16px;
    max-height: 1280px;
  }
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 110px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding: 16px 0;
      display: flex;
      align-items: center;
      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .table_box {
    margin: 16px;
    background: #fff;
    .table_content {
      padding: 19px 24px 24px 24px;
      box-sizing: border-box;
      margin-bottom: 16px;
      .addTableline {
        margin-top: 16px;
        width: 100%;
        height: 40px;
        border: 1px dashed#BFBFBF;
        font-size: 14px;
        font-weight: 400;
        color: #595959;
        line-height: 40px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .addTableline {
    margin-top: 16px;
    width: 100%;
    height: 40px;
    border: 1px dashed#BFBFBF;
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    line-height: 40px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
   .footer {
    margin-top: 24px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64px;
    line-height: 64px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
    .select_box {
      display: flex;
      float: right;
      .prompt_information {
        display: flex;
        align-items: center;
        .information {
          font-size: 14px;
          font-weight: 400;
          color: #595959;
          padding-left: 16px;
          padding-right: 8px;
          box-sizing: border-box;
        }
        .time {
          font-size: 12px;
          font-weight: 400;
          color: #bfbfbf;
        }
      }
      .action_buttons {
        box-sizing: border-box;
        padding-left: 16px;
      }
    }
  }
}
.checkPerson{
  padding: 10px;
  text-align: right;
  background: #fff;

}

.wander{
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:20px;
    .left{
        font-weight: 600;
        font-size:16px;
        color:#262626;
    }
    .addRows{
        width: 88px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        background: #EDF7FF;
        border-radius: 2px;
        border: 1px solid #74BDFF;
        text-align: center;
        color: #1791FF;
        cursor: pointer;
    }

}

</style>
