<template>
  <div class="totalPlan-container">
     <!-- <div class="totalPlanTop">
      <div class="project">
        <div class="name">项目名称：{{ form.project }}</div>
      </div>
    </div> -->
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <div>
          <span class="title" style="font-weight: 600">基本信息</span>
          <table
            border="1"
            style="
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              border-color: #dfe6ec;
              margin-top: 10px;
              margin-bottom: 10px;
            "
          >
            <tr>
              <td class="tableTH">调入项目名称</td>
              <td class="tableTD">{{ form.applyProjectName }}</td>
              <td class="tableTH">物资调拨申请编号</td>
              <td class="tableTD">{{ form.applySerial }}</td>
            </tr>
            <tr>
              <td class="tableTH">物资调拨录入编号</td>
              <td class="tableTD">{{ form.remake }}</td>
              <td class="tableTH">调拨说明</td>
              <td class="tableTD">{{ form.remake }}</td>
            </tr>
          </table>
        </div>
        <div class="box-content">
          <div class="content-item">
            <div class="item-name">申请附件</div>
            <div class="item-content item-content-attachment"> 
              <FileList :fileList="fileList"></FileList>
            </div>
          </div>
        </div>
        <div class="box-content">
          <div class="content-item">
            <div class="item-name">录入附件</div>
            <div class="item-content item-content-attachment"> 
              <FileList :fileList="form.materialFiles"></FileList>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="box-shadow: none">
        <div style='margin-bottom:20px;'>
          <span class="title" style="font-weight: 600">调拨物资信息</span>
        </div>
        <el-table
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
          <el-table-column  prop="applyAmount" label="申请调拨数量" />

          <el-table-column  prop="realityAmount" label="实际调拨数量" />
          <el-table-column  prop="unitPrice" label="单价" />
          <el-table-column  prop="totalPrice" label="总金额" />
          <el-table-column  prop="remark" label="备注" />
        </el-table>
      </el-card>  
    </div>
  </div>
</template>

<script>
import {allocationInputDetail } from '@/api/superLastMange/superLast'
import FileList from '@/components/FileList'

export default {
  name: "transferAskbase",
  components: {
    FileList
  },
  data() {
    return {
      orderNumber: "273.276.35.28",
      projectName: "深圳市宝安区鸿昌花园幼儿园1",
      loading: false,
      size: "",
      entrySerial:'',
      fileList:[],
      form:{
        applyProjectName:'',  //项目名称
        applyProjectId:'',  //项目ID
        applySerial:'',   //调拨申请编号
        entryProjectId:'',  //拟调入项目id
        entryProjectName:'',  //拟调入项目Name
        remake:'',   //调拨说明
        reportList:[],
      }, 
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png']
    };
  },
  created() {
    const {entrySerial}= this.$route.params
    this.entrySerial=entrySerial
  },
  mounted() {
     this.showSuperLastDetail();
  },
  methods: {
    showSuperLastDetail() {
      const  parm ={entrySerial:this.entrySerial}
      allocationInputDetail(parm).then(res => {
        if (res.status === 200) {
          const {  applyProjectName, applyProjectId,applySerial,
           entryProjectId,entryProjectName,remake } = res.data.transfersEntry
          const { applyMaterialFiles,materialFiles,transfersEntryItems } = res.data
          
          this.form.applyProjectName = applyProjectName  //项目名称
          this.form.applyProjectId = applyProjectId   //项目ID
          this.form.applySerial = applySerial  //调拨申请编号
          this.form.entryProjectId = entryProjectId
          this.form.entryProjectName = entryProjectName
          this.form.remake = remake

          //申请附件放外面
          this.fileList = applyMaterialFiles
          this.form.materialFiles = materialFiles
          this.form.reportList = transfersEntryItems
        }
      }).catch(err => {
        console.log(err)
      })
    },

  },
};
</script>
<style lang="scss" scoped>
.dateClass {
  color: red;
}

.totalPlan-container {
  .satisfaction {
    border: 1px solid #909498;
    border-radius: 15px;
    padding: 15px 10px;
  }
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);

    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding: 5px 0 16px;
      display: flex;
      align-items: center;

      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }

}

::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.title {
  margin-top: 24px;
  margin-bottom: 16px;
}

.tableTH {
  text-align: right;
  padding-right: 16px;
  width: 100px;
  height: 45px;
  font-size: 14px;
  font-weight: bold;
  color: #555f73;
  background-color: #f8f8f9;
}

.tableTD {
  text-align: left;
  padding-left: 16px;
  width: 240px;
  color: #606266;
  font-size: 14px;
}
</style>
