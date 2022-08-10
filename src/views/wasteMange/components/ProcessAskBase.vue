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
                  v-for="item in getDictionaryValue('wasteType')"
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
              <div class="item-name">附件</div>
              <div class="item-content item-content-attachment"> 
                <FileList :fileList="fileList"></FileList>
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
          <el-table-column prop="specification" label="规格/型号" />
          <el-table-column prop="unit" label="单位" />
          <el-table-column label="暂估数量">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.applyAmount`" >
                <el-input v-model="row.applyAmount"  disabled />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="暂估单价">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.unitPrice`" >
                <el-input v-model="row.unitPrice" disabled />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="暂估金额">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.totalAmount`" >
                <el-input v-model="row.totalAmount" disabled />
              </el-form-item>
            </template>
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
import {wasteDetail } from '@/api/wasteMange/wasteMange'
export default {
  name: "transferAsk",
  components: {
    FileList
  },
  data() {
    return {
        id:'',
        fileList: [],
        labelPosition: "top",
        leaseParameterIdList:[],//主id
        reportStopCode:[],  //退料单id
        receiptItemId:[],    //报停单id
        form:{
            applyProjectName:'',  //项目名称
            applyProjectId:'',  //项目ID
            applySerial:'',   //调拨申请编号
            remake:'',   //调拨说明
            reportList:[],
      }, 
       //底部表格
      alteration:1,
    };
  },
  created() {
    const {id}= this.$route.params
    this.id = id
  },
  mounted() {
      this.showSuperLastDetail()
  },
  methods: {
    //申请查看详情
    showSuperLastDetail() {
      const  parm ={applySerial:this.id}
      wasteDetail(parm).then(res => {
        if (res.status === 200) {
          const {  applyProjectName, applyProjectId,applySerial, wasteType,remake } = res.data.wasteApply
          const { materialFiles,wasteApplyItems } = res.data
          
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号
          this.form.wasteType =wasteType

          this.form.remake = remake
          
          this.fileList = materialFiles
          this.form.reportList = wasteApplyItems
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消
    handleCancle() {
      this.$router.go(-1)
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
    margin-top:20px;
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


</style>
