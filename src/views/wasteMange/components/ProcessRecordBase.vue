<template>
  <div class="totalPlan-container">
    <el-card class="pm">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">基本信息</span>
      </div>
      <el-form
        ref="form"
        :model="form"
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
            <el-form-item label="废旧物资处理申请编号" prop="applySerial">
              <el-input
                v-model="form.applySerial"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="废旧物资处理类型" prop="wasteType">
              <el-select
                v-model="form.wasteType"
                placeholder="请选择"
                filterable
                style="width: 100%"
                clearable
                disabled
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
            <el-form-item
              label="调拨说明"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入"
                clearable
                maxlength="30"
                disabled
                style="width: 80%"
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
              <div class="item-name">记录附件</div>
              <div class="item-content item-content-attachment"> 
                <FileList :fileList="recordFileList"></FileList>
              </div>
            </div>
          </div>
        </el-row>
        <div class="wander">
          <div class="left">调拨物资信息</div>
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
          <el-table-column label="皮重" prop="grossWeight">
          </el-table-column>
          <el-table-column label="净重" prop="netWeight">
          </el-table-column>
          <el-table-column label="单价" prop="unitPrice">
          </el-table-column>
          <el-table-column label="金额" prop="amount">
          </el-table-column>
          <el-table-column label="车号" prop="carNumber">
          </el-table-column>
        </el-table>
        <div class="footer">
          <div class="select_box">
            <div class="action_buttons">
              <el-button @click="handleCancle">取消</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import FileList from '@/components/FileList'
import {recordDetail } from '@/api/wasteMange/wasteMange'
export default {
  name: "recordBase",
  components: {
    FileList
  },
  data() {
    return {
        recordSerial:'',   //记录id
        fileList: [],
        labelPosition: "top",
        leaseParameterIdList:[],//主id
        reportStopCode:[],  //退料单id
        receiptItemId:[],    //报停单id
        applyFileList:[],  //申请附件
        recordFileList:[],  //记录附件
        form:{
            applyProjectName:'',  //项目名称
            applyProjectId:'',  //项目ID
            applySerial:'',   //调拨申请编号
            remake:'',   //调拨说明
            reportList:[]
      }, 
       //底部表格
      alteration:1,
    };
  },
  created() {
    const {recordSerial}= this.$route.params
    this.recordSerial = recordSerial
  },
  mounted() {
      this.showRecordDetail()
  },
  methods: {
    //记录 查看记录详情
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
          
          //申请附件 
          this.applyFileList = applyMaterialFiles
          //记录附件
          this.recordFileList = materialFiles
          //底部表格
          this.form.reportList = wasteRecordItems
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消
    handleCancle() {
      this.$router.go(-1)
    }
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
