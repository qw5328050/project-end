<template>
<!--新增立卷-->
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
            <el-form-item label="项目名称" prop="applyProjectName">
              <el-input
                v-model="form.applyProjectName"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="处理申请编号" prop="applySerial">
              <el-input
                v-model="form.applySerial"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="处理记录编号" prop="recordSerial">
              <el-input
                v-model="form.recordSerial"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="处理立卷编号" prop="filingSerial">
              <el-input
                v-model="form.filingSerial"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="当前批次处理编号" prop="serial">
              <el-input
                v-model="form.serial"
                style="width: 80%"
                :disabled="pageType == 'edit' "
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="当批次废旧材料" prop="materials">
              <el-input
                v-model="form.materials"
                style="width: 80%"
                :disabled="pageType == 'edit' "
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="本次处理是否延迟" prop="ifDelay">
              <el-select
                    v-model="form.ifDelay"
                    placeholder="请选择"
                    filterable
                    style="width: 80%"
                    clearable
                    :disabled="pageType == 'edit' "
                  >
                    <el-option
                      v-for="item in getDictionaryValue('ifDelay')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="本次处理是否紧急" prop="ifEmergency">
              <el-select
                    v-model="form.ifEmergency"
                    placeholder="请选择"
                    filterable
                    style="width: 80%"
                    clearable
                    :disabled="pageType == 'edit' "
              >
                <el-option
                  v-for="item in getDictionaryValue('ifEmergency')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="财务收据单号"
              prop="financialReceipt"
            >
              <el-input
                v-model="form.financialReceipt"
                placeholder="请输入"
                clearable
                maxlength="30"
                style="width: 80%"
                :disabled="pageType == 'edit' "
              />
            </el-form-item>
          </el-col>    
        </el-row>
        <el-row>
          <div class="box-content">
            <div class="content-item">
              <div class="item-name">申请附件</div>
              <div class="item-content item-content-attachment"> 
                <FileList :fileList="applyFileList"></FileList>
              </div>
            </div>
          </div>
        </el-row>
        <el-row>
          <div class="box-content">
            <div class="content-item">
              <div class="item-name">处理附件</div>
              <div class="item-content item-content-attachment"> 
                <FileList :fileList="recordFileList"></FileList>
              </div>
            </div>
          </div>
        </el-row>

        <div class="wander">
          <div class="left">调拨物资信息</div>
          <div class="addRows" @click="addRows" >新增一行</div>
        </div>
        <el-table
          ref="multipleTable"
          :header-row-class-name="() => 'headerClass'"
          :data="reportList"
          max-height="500"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column align="center" label="序号" width="50" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="资料类型">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.dataType`" :rules="rules.dataType">
                <el-select
                    v-model="row.dataType"
                    placeholder="请选择"
                    filterable
                    style="width: 80%"
                    clearable
              >
                <el-option
                  v-for="item in dataTypeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  label="附件"   width="100"  >
            <template slot-scope="{ row, $index }">

            </template>  
           </el-table-column>        
          <el-table-column label="操作" fixed="right" width="300">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                title="确定要删除这一行吗？"
                style="margin-left: 10px"
                @onConfirm="handelDelete(row, $index)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                >删除</el-button>
              </el-popconfirm>
                <FileUpload
                style="margin-left: 16px"
                :rules="rules"
                prop="uploads"
                :limit-num="10"
                :file-size="5"
                :file-type="fileType"
                @getFileList="getFileListS(fileList)"
                @delFile="delFileS"
              />
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                >预览</el-button>
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                >下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer">
          <div class="select_box">
            <div class="action_buttons">
              <el-button @click="handleCancle">取消</el-button>
              <el-button @click="submitSaveForm">保存</el-button>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>

    <div v-else>
      <SelectNode
        :is-radio="true"
        :alteration="alteration"
        :process-key="processKey"
        @selectPersonnel="selectPersonnel"
      />
      <div class="checkPerson">
        <el-button @click="prevHandle">上一步</el-button>
        <el-button type="primary" @click="submitHandleForm">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectNode from '@/components/selectNode'
import FileUpload from '@/components/FileUpload'
import FileList from '@/components/FileList'

import { mapGetters } from 'vuex'
import {steelAdd,recordDetail,steelDetail } from '@/api/wasteMange/wasteMange'
export default {
  name: "transferAsk",
  components: {
    SelectNode,
    FileUpload,
    FileList
  },
  data() {
    return {
        filingSerial:'',  //立卷编号
        pageType:'add',
        fileList: [],
        labelPosition: "top",
        leaseParameterIdList:[],//主id
        reportStopCode:[],  //退料单id
        receiptItemId:[],    //报停单id
        applyFileList:[],  //申请附件
        recordFileList:[],  //记录附件
        reportList:[],  //底部表格
        form:{
            applyProjectName:'',  //项目名称
            applyProjectId:'',  //项目ID

            applySerial:'',   //调拨申请编号
            recordSerial:'',  //记录编号
            filingSerial:'',  //立卷编号

            serial:'', //当前批次编号
            materials:'',  //当批次废旧材料

            ifDelay:'', //本次处理是否延迟
            ifEmergency:'',  //本次处理是否紧急

            financialReceipt:''  //财务收据单号
      }, 
       //底部表格
      alteration:1,
      processKey:"onsiteManagement",
      approver:[],//选中的审批人列表
      isApproveShow:false,//是否显示选择审批人页面
      submitSuccess:false,//是否提交成功
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png'],
      rules: {
          entryProjectName: [
            { required: true, message: "请选择调入项目", trigger: "change" },
          ],
          uploads: [{ required: true, message: '请选择', trigger: 'blur' }],
          dataType: [
            { required: true, message: "请输入数量"},
            { pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正整数', trigger: 'change' }
          ],
      },
      dataTypeArr:[
        {'label':'废旧物资处理申请表','value':1},
        {'label':'废旧物资处理招标评审表','value':2},
        {'label':'废旧处理紧急申请','value':3},
        {'label':'废旧处理延迟报告','value':4},
        {'label':'废旧处理声明','value':5},
        {'label':'废旧处理收购方身份证','value':6},
        {'label':'废旧安全行为交底单据','value':7},
        {'label':'废旧安全行为承诺书','value':8},
        {'label':'废旧款项通知书','value':9},
        {'label':'废旧款项付款委托书','value':10},
        {'label':'废旧处理记录表','value':11},
        {'label':'我的钢筋网钢筋单价确认单据','value':12},
        {'label':'过磅单','value':13},
        {'label':'出门证','value':14},
        {'label':'过程照片','value':15}
      ]
    };
  },
  computed: {
    ...mapGetters(['selectUserOrg'])
  },
  created() {
    const {applySerial}= this.$route.params
    const {recordSerial,filingSerial}= this.$route.query
    //id ? this.pageType = 'edit' :this.pageType = 'add'
    //id ? this.id = id : this.id = ''
    if(this.selectUserOrg && this.selectUserOrg.id){
        this.form.applyProjectName = this.selectUserOrg.orgName
        this.form.applyProjectId = this.selectUserOrg.id
    }else{
      this.$message.warning('请选择项目')
      return
    }
    //申请编号
    this.form.applySerial = applySerial
    //记录编号
    this.form.recordSerial = recordSerial

    //编辑立卷页面
    if(filingSerial && filingSerial  != null ){//是否存在立卷单号
      this.form.filingSerial = filingSerial
      this.filingSerial = filingSerial
      this.pageType = 'edit'
    }else{  //新增
      //新增立卷  先查询记录详情 获取记录单号
      this.pageType = 'add'
    }

  },
  mounted() {
    if (this.pageType == 'edit') {
      this.showSteelDetail()
    }else{
      this.showRecordDetail()
    } 
  },
  methods: {
    addRows(){
      var   obj   = new  Object;
      obj.dataType = ''
      obj.file='查看'
      this.reportList.push(obj)
    },
    getFileListS(fileList) {
      console.log(fileList)
      //this.fileList  = fileList
    },
    delFileS(fileList) {
     console.log(fileList)
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
    //新增立卷 查看记录详情
    showRecordDetail() {
      const  parm ={entrySerial:this.form.recordSerial}
      recordDetail(parm).then(res => {
        if (res.status === 200) {
          const {  applyProjectName, applyProjectId,applySerial,serial} = res.data.wasteRecord
          const { materialFiles,applyMaterialFiles } = res.data
          
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号
        
          //编辑中申请附件 
          this.applyFileList = applyMaterialFiles
          //记录附件
          this.recordFileList = materialFiles

        }
      }).catch(err => {
        console.log(err)
      })
    },
    //编辑立卷 查看立卷详情
    showSteelDetail() {
      const  parm ={filingSerial:this.filingSerial}
      steelDetail(parm).then(res => {
        if (res.status === 200) {
          const {  applyProjectName, applyProjectId,applySerial,recordSerial,
           serial,materials,ifDelay,ifEmergency,financialReceipt } = res.data.wasteFiling
          const { applyMaterialFiles,recordMaterialFiles,wasteFilingItems } = res.data
          
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号
          this.form.recordSerial=recordSerial   //记录编号

          this.form.serial =serial   //当前批次处理编号
          this.form.materials = materials   //当批次废旧材料

          this.form.ifDelay = ifDelay
          this.form.ifEmergency = ifEmergency
          this.form.financialReceipt = financialReceipt
          
          this.applyFileList = applyMaterialFiles  //申请附件
          this.recordFileList = recordMaterialFiles  //记录附件

          this.reportList = wasteFilingItems
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
      // var  submitFileList  = []
      //  this.fileList.map ( item =>{
      //   var   obj   = new  Object
      //   obj.name = item.name
      //   obj.url = item.url
      //   submitFileList.push(obj)
      // })
      formData.wasteFiling= this.form
     // formData.materialFiles = submitFileList
      // 底部table
      formData.wasteFilingItems = this.reportList

      if (this.pageType === 'edit') {
       // formData.id = this.$route.query.id
        const res = await steelAdd(formData)
        if (res && res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/wasteMange/index' })
        }
        return
      }
      steelAdd(formData).then((res) => {
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/wasteMange/index' })
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
    // position: absolute;
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
    margin-top: 20px;
    .left{
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

  .box-content{
    padding: 24px;
    background: #FAFAFA;
    margin-top: 50px;
    .content-item{
      display: flex;
      align-items: flex-start;
      color: rgba(0,0,0,0.8500);
      margin-bottom: 24px;
      &:last-child{
        margin-bottom: 0px;
      }
      .item-name {
        width: 79px;
        font-size: 15px;
        font-weight: 600;
      }
      .item-content {
        font-size: 14px;
        font-weight: 400;
        flex: 1;
        color: #595959;
        &-attachment {
          margin-top: -2px;
          margin-left: -1px;
        }
      }
    }
  }

</style>
