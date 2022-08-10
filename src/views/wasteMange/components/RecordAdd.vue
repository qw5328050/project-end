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
            <el-form-item label="计量方式" prop="measurementMethods">
              <el-select
                  v-model="form.measurementMethods"
                  placeholder="请选择"
                  filterable
                  style="width: 80%"
                  clearable
                  :disabled="pageType == 'edit' "
                >
                  <el-option
                    v-for="item in getDictionaryValue('measurementMethods')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="处理日期" prop="disposeTime">
              <el-date-picker
                key="date"
                v-model="form.disposeTime"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 80%"
                :disabled="pageType == 'edit' "
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="废旧物资处理类型"
              prop="wasteType"
            >
              <el-select
                  v-model="form.wasteType"
                  placeholder="请选择"
                  filterable
                  style="width: 80%"
                  clearable
                  :disabled="pageType == 'edit' "
                >
                  <el-option
                    v-for="item in getDictionaryValue('rubbishStatus')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
            </el-form-item>
          </el-col>    
        </el-row>
        <el-row>
        <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="说明" prop="remake">
              <el-input
                v-model="form.remake"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
                label="附件"
              >
              <FileUpload
                style="margin-left: 16px"
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
        <div class="wander">
          <div class="left">调拨物资信息</div>
          <div class="addRows" @click="addRows" >新增一行</div>
        </div>
        <el-table
          ref="multipleTable"
          :header-row-class-name="() => 'headerClass'"
          :data="form.reportList"
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
        <el-table-column prop="materialName" label="物资名称" />
          <el-table-column prop="measuringUnit" label="计量单位" />
          <!-- <el-table-column prop="unit" label="单位"  v-if='pageType == "add" ' /> -->
          <el-table-column label="皮重">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.grossWeight`" :rules="rules.grossWeight">
                <el-input v-model="row.grossWeight" maxlength="10" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="净重">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.netWeight`" :rules="rules.netWeight">
                <el-input v-model="row.netWeight" maxlength="10" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.unitPrice`" :rules="rules.unitPrice">
                <el-input v-model="row.unitPrice" maxlength="10" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.amount`" :rules="rules.amount">
                <el-input v-model="row.amount" maxlength="10" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="车号">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.carNumber`" :rules="rules.carNumber">
                <el-input v-model="row.carNumber" maxlength="10" />
              </el-form-item>
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
import FileList from '@/components/FileList'
import FileUpload from '@/components/FileUpload'
import CheckMaterial from '@/components/CheckMaterials/CheckMaterial'

import { mapGetters } from 'vuex'
import {recordAdd,recordDetail, wasteDetail} from '@/api/wasteMange/wasteMange'
export default {
  name: "transferAsk",
  components: {
    SelectNode,
    FileUpload,
    CheckMaterial,
    FileList
  },
  data() {
    return {
        recordSerial:'',  //处理记录编号
        applySerial:'',  //申请编号
        pageType:'add',
        applyFileList: [],   //外层申请附件
        fileList:[],   //记录附件
        labelPosition: "top",
        leaseParameterIdList:[],//主id
        reportStopCode:[],  //退料单id
        receiptItemId:[],    //报停单id
        form:{
            applyProjectName:'',  //项目名称
            applyProjectId:'',  //项目ID

            applySerial:'',   //调拨申请编号
            recordSerial:'',  //记录编号

            measurementMethods:'',//计量方式
            disposeTime:'',  //处理日期

            wasteType:'', //废旧物资处理类型
            remake:'',  //说明
            reportList:[],   //底部表格
      }, 
      cliId:0,
      isShowSuppliesDialog:false,
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
    };
  },
  computed: {
    ...mapGetters(['selectUserOrg'])
  },
  created() {
    const {applySerial}= this.$route.params
    const {recordSerial}= this.$route.query
    //id ? this.pageType = 'edit' :this.pageType = 'add'
    //id ? this.id = id : this.id = ''
    if(this.selectUserOrg && this.selectUserOrg.id){
        this.form.applyProjectName = this.selectUserOrg.orgName
        this.form.applyProjectId = this.selectUserOrg.id
    }else{
      this.$message.warning('请选择项目')
      return
    }

    this.form.applySerial = applySerial

    //编辑废旧记录
    if(recordSerial && recordSerial != null ){
      this.form.recordSerial = recordSerial
      this.recordSerial = recordSerial
      this.pageType = 'edit'

    }

  },
  mounted() {
    if (this.pageType == 'edit') {
      // 编辑查询 处理记录详情
      this.showRecordDetail()
    }else{
      //新增查询 废旧申请详情
      this.showAskDetail()
    }
  },
  methods: {
    addRows(){
      this.isShowSuppliesDialog = true
    },
    handleClose() {
      this.cliId = null
    },
    // 选择物资
    submit(dataArr) {
      if (dataArr.length >= 1) {
        dataArr.forEach((item, index) => {
          var   obj   = new  Object;
          obj.materialId=item.id
          obj.materialName=item.name
          obj.measuringUnit=item.unit
          this.form.reportList.push(obj)
        })
      }
    },
    getFileListS(fileList) {
      this.fileList  = fileList
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
    //新增 查看申请详情
    showAskDetail() {
      const  parm ={applySerial:this.form.applySerial}
      wasteDetail(parm).then(res => {
        if (res.status === 200) {
          const {  applyProjectName, applyProjectId,applySerial,materials} = res.data.wasteApply
          const { materialFiles,wasteApplyItems } = res.data
          
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号

          this.form.materials = materials
          
          //申请附件  外面
          this.applyFileList = materialFiles
          //底部表格
          const  reportList=[]
          wasteApplyItems.map( item =>{
              var  obj= {}
              obj.materialName = item.materialName
              obj.materialId = item.materialId
              obj.measuringUnit = item.unit
              reportList.push(obj)
          })
          this.form.reportList = reportList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //编辑记录 查看记录详情
    showRecordDetail() {
      const  parm ={entrySerial:this.recordSerial}
      recordDetail(parm).then(res => {
        if (res.status === 200) {
          const {  applyProjectName, applyProjectId,applySerial,disposeTime,remake,
           measurementMethods,serial,wasteType} = res.data.wasteRecord
          const { materialFiles,applyMaterialFiles,wasteRecordItems } = res.data
          
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号

          this.form.serial =serial
          
          this.form.measurementMethods=measurementMethods   //计量方式
          this.form.disposeTime =disposeTime    //处理日期
          this.form.wasteType = wasteType   //废旧物资处理类型
          this.form.remake=remake
          
          //编辑中申请附件 
          this.applyFileList = applyMaterialFiles
          //记录附件
          this.form.materials = materialFiles
          //底部表格
          this.form.reportList = wasteRecordItems

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
      //记录附件
       this.fileList.map ( item =>{
        var   obj   = new  Object
        obj.name = item.name
        obj.url = item.url
        submitFileList.push(obj)
      })
      formData.wasteRecord= this.form
      //记录附件
      formData.materialFiles = submitFileList
      // 底部table
      formData.wasteRecordItems = this.form.reportList

      if (this.pageType === 'edit') {
       // formData.id = this.$route.query.id
        const res = await recordAdd(formData)
        if (res && res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/wasteMange/index' })
        }
        return
      }
      recordAdd(formData).then((res) => {
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
