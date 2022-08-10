<template>
  <div class="materialsNeeded_container">
    <!-- <div class="materialsNeededTop">
      <div class="title">
        {{ headerTitle }}
      </div>
    </div> -->
    <el-card class="table_box" style="margin-bottom: -2px !important">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">变更税率</span>
      </div>
      <!-- <div class="table_content"> -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <div class="text item pms">
          <!-- <hr style="width:100%;"> -->
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="新税率" prop="taxVal">
                <el-input
                  v-model="form.taxVal"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="新税率生效时间" prop="newTaxStartDate">
                <el-date-picker
                  v-model="form.newTaxStartDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="原税率失效时间" prop="oldTaxEndDate">
                <el-date-picker
                  v-model="form.oldTaxEndDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="说明" prop="taxModifyDesc">
                <el-input
                  v-model="form.taxModifyDesc"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <p>变更合同金额</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="补充金额" prop="accessAuthorityId">
                  <el-input
                    v-model="form.accessAuthorityId"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="补充说明" prop="features">
                  <el-input
                    v-model="form.features"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <p>变更结算周期</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="结算周期" prop="accessAuthorityId">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="生效时间" prop="accessAuthorityId">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用方" prop="features">
                  <el-input
                    v-model="form.features"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row> -->
        </div>
      </el-form>
      <!-- </div> -->
    </el-card>
    <el-card
      class="table_box"
      style="margin-top: -2px !important; margin-bottom: -2px !important"
    >
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">变更合同金额</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <div class="text item pms">
          <!-- <p>变更合同金额</p> -->
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="补充金额" prop="contractAmount">
                <el-input
                  v-model="form.contractAmount"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="补充说明" prop="contractAmountDesc">
                <el-input
                  v-model="form.contractAmountDesc"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-upload
                class="upload-demo"
                style="margin-bottom: 16px"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload="false"
              >
                <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip" style="color:red">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <el-card class="table_box" style="margin-top: -2px !important;height:550px">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">变更结算周期</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <div class="text item pms">
          <el-row>
            <!-- <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="结算周期" prop="organizationName">
                <el-select
                  v-model="form.periodType"
                  placeholder="请选择"
                  style="width: 27%; margin-right: 3%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in getDictionaryValue('periodType')"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-date-picker
                  v-if="form.periodType == 1"
                  v-model="form.organizationName"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 50%"
                />
                <el-date-picker
                  v-if="form.periodType == 2"
                  v-model="form.organizationName"
                  type="month"
                  placeholder="选择月"
                  style="width: 50%"
                />
              </el-form-item>
            </el-col> -->
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="结算周期" prop="periodType">
                <el-select
                  v-model="form.periodType"
                  placeholder="请选择"
                  style="width: 25%; margin-right: 2%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in getDictionaryValue('periodType')"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <span
                  v-if="form.periodType == 1"
                >自本月1日00:00起至本月月末23:59结束</span>
                <span v-if="form.periodType == 2">本月: </span>
                <el-select
                  v-if="form.periodType == 2"
                  v-model="form.startDay"
                  placeholder="请选择"
                  style="width: 16%; margin-right: 3%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in list"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <span v-if="form.periodType == 2">次月: </span>
                <el-select
                  v-if="form.periodType == 2"
                  v-model="form.endDay"
                  placeholder="请选择"
                  style="width: 16%; margin-right: 3%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in list"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <!-- <el-date-picker
                v-if="form.periodType == 2"
                v-model="form.organizationName"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 50%"
              /> -->
                <!-- <el-date-picker
                v-if="form.periodType == 1"
                v-model="form.organizationName"
                type="month"
                placeholder="选择月"
                style="width: 50%"
              /> -->
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="生效时间" prop="settlementEffectDate">
                <el-date-picker
                  v-model="form.settlementEffectDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="补充说明" prop="settlementDesc">
                <el-input
                  v-model="form.settlementDesc"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="使用方" prop="userId">
              <el-select
                v-model="form.userId"
                placeholder="请选择"
                style="width: 80%"
                clearable
              >
                <el-option
                  v-for="(item, index) in partyA"
                  :key="index"
                  :label="item.orgName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          </el-row>
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-upload
                class="upload-demo"
                style="margin-bottom: 16px"
                :action="url"
                :data="fileData"
                :headers="headers"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip" style="color:red">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <div style="margin-left: 85%; margin-bottom: 16px">
          <div style="display: inline-block; margin-right: 10px">
            <el-upload
              :show-file-list="show"
              :action="importUrl"
              :data="fileData"
              :headers="headers"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :file-list="fileList"
            >
              <el-button size="small">导入</el-button>
              <!-- <div slot="tip" class="el-upload__tip" style="color:red">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
            </el-upload>
          </div>

          <el-button size="small" @click="xzmb">下载模板</el-button>
          <el-button
            size="small"
            type="primary"
            @click="addTable"
          >新增一行</el-button>
        </div>
        <el-table :data="form.mdmItemList" max-height="240" style="width: 100%">
          <!-- <el-table-column type="selection" align="left" fixed="left" /> -->
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="物资大类"
            prop="big"
            width="200"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'mdmItemList.' + $index + '.big'"
                :rules="form.rules.big"
              >
                <el-input
                  ref="inputDialog"
                  v-model="row.big"
                  placeholder="请选择"
                  clearable
                  @focus="focusInput(row, $index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="small" label="物资小类" width="200">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'mdmItemList.' + $index + '.small'"
                :rules="form.rules.small"
              >
                <el-input
                  ref="inputDialog"
                  v-model="row.small"
                  placeholder="请选择"
                  clearable
                  @focus="focusInput(row, $index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="itemName" label="物资名称" width="200">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'mdmItemList.' + $index + '.itemName'"
                :rules="form.rules.itemName"
              >
                <el-input
                  ref="inputDialog"
                  v-model="row.itemName"
                  placeholder="请选择"
                  clearable
                  @focus="focusInput(row, $index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="specifications" label="规格型号" width="200">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`mdmItemList[${$index}]` + '.specifications'"
                :rules="form.rules.specifications"
              >
                <el-input
                  v-model="row.specifications"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="unitPrice" label="单价/元" width="200">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`mdmItemList[${$index}]` + '.unitPrice'"
                :rules="form.rules.unitPrice"
              >
                <el-input
                  v-model="row.unitPrice"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`mdmItemList[${$index}]` + '.remark'">
                <el-input v-model="row.remark" placeholder="请输入" clearable />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                size="mini"
                type="text"
                @click="handelCopy(row)"
              >复制</el-button>
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
        <!-- <div class="addTableline" @click="addTable">
          <i class="el-icon-plus" />
          新增一行
        </div> -->
      </el-form>
    </el-card>

    <div class="footer">
      <div class="select_box">
        <!-- <div class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div class="time">2分钟前</div>
        </div> -->
        <div class="action_buttons">
          <el-button @click="handleClose">取消</el-button>
          <!-- <el-button>保存</el-button> -->
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </div>
    </div>
    <!-- 选择物资 -->
    <SuppliesDialog
      :id="cliId"
      :visible.sync="isShowSuppliesDialog"
      title="选择物资"
      @submitForm="submitForms"
    />
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import { getToken } from '@/utils/auth'
import SuppliesDialog from '../components/suppliesDialog.vue'
import {
  getAllOrganization,
  modify,
  getTemplateFile
} from '@/api/contractManagement/table'
export default {
  name: 'AddAndAdit',
  components: { SuppliesDialog },
  data() {
    return {
      show: false,
      fileData: {
        fileName: 'aaa.jpg'
      },
      fileList: [],
      url: process.env.VUE_APP_BASE_API + '/purchase-service/file/upload',
      importUrl: null,
      headers: {
        access_token: this.getTokens()
      },
      cliId: null,
      cliIndex: null,
      isShowSuppliesDialog: false,
      labelPosition: 'top',
      value1: '',
      headerTitle: '', // 头部标题
      list: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
      ],
      disabled: false,
      partyA: [],
      rules: {
        // 规则
        taxVal: [{ required: true, message: '请输入', trigger: 'blur' }],
        newTaxStartDate: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        oldTaxEndDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        taxModifyDesc: [{ required: true, message: '请输入', trigger: 'blur' }],
        contractAmount: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        contractAmountDesc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        organizationName: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        startDay: [{ required: true, message: '请选择', trigger: 'blur' }],
        endDay: [{ required: true, message: '请选择', trigger: 'blur' }],
        settlementEffectDate: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        settlementDesc: [{ required: true, message: '请输入', trigger: 'blur' }],
        periodType: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      form: {
        rules: {
          // big: [
          //   { required: true, message: '物料大类不能为空', trigger: 'change' }
          // ],
          // small: [
          //   { required: true, message: '物资小类不能为空', trigger: 'blur' }
          // ],
          // itemName: [
          //   { required: true, message: '物料名称不能为空', trigger: 'blur' }
          // ],
          // specifications: [
          //   {
          //     required: true,
          //     message: '规格型号不能为空',
          //     trigger: 'blur'
          //   }
          // ],
          // unitPrice: [
          //   {
          //     required: true,
          //     message: '单价不能为空',
          //     trigger: 'blur'
          //   }
          // ]
        },
        mdmItemList: [{}] // 表格数据
      }
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '变更合同'
  },
  methods: {
    // 上传成功
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList, '===')
    },
    getTokens() {
      const obj = getToken()
      return obj
    },
    // 下载模板
    xzmb() {
      getTemplateFile(1).then((response) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        const url = window.URL || window.webkitURL || window.moxURL
        const downloadHref = url.createObjectURL(blob)
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadHref
        downloadLink.download = `物资列表模板.xlsx`
        downloadLink.click()
      })
    },
    // 上传附件
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitUpload() {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }, // 上传附件
    // 使用方
    getDetail() {
      this.loading = true
      getAllOrganization().then((res) => {
        this.partyA = res.data
        this.loading = false
      })
    },
    // 选择物资弹窗
    focusInput(row, index) {
      this.cliId = row.itemBigTypeId
      this.cliIndex = index
      this.isShowSuppliesDialog = true
      this.$refs['inputDialog'].blur()
    },
    // 选择物资
    submitForms(data) {
      if (this.cliIndex >= 0) {
        this.form.mdmItemList.forEach((item, index) => {
          if (index === this.cliIndex) {
            this.$set(item, 'itemId', data.id)
            this.$set(item, 'big', data.itemBigType)
            this.$set(item, 'small', data.itemSmallType)
            this.$set(item, 'itemName', data.name)
          }
        })
      }
    },
    // getDetail(id) {
    //   this.loading = true;
    //   CheckPedestrianAreaInfo(this.id).then((res) => {
    //     this.form = { ...res.data };
    //     this.loading = false;
    //   });
    // },
    // 新增行
    addTable() {
      this.form.mdmItemList.push({ type: '' })
    },
    // 复制行
    handelCopy(row) {
      this.form.mdmItemList.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.form.mdmItemList.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.$router.go(-1)
      // this.form = {}
      // this.$emit('update:visible', false)
      // if (this.$refs['form']) {
      //   this.$refs['form'].clearValidate()
      // }
    },
    // 提交按钮
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            // this.form.monthPayPercent = this.form.monthPayPercent / 100
            // this.form.taxVal = this.form.taxVal / 100
            this.form.contractId = this.$route.query.id
            modify(this.form).then((res) => {
              this.$message.success('操作成功')
              this.$router.push({ path: '/contractManagement/table' })
            })
          }
        }
      })
    }
  }
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
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
  ::v-deep .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0 0px 0px 0 rgb(0 0 0 / 0%);
    box-shadow: 0 0px 0px 0 rgb(0 0 0 / 0%);
  }
  ::v-deep .el-card__body {
    padding: 0;
  }
  ::v-deep .headerClass th {
    background: #fafafa !important;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .materialsNeeded_container {
    .pms {
      margin-left: 16px;
    }
    .materialsNeededTop {
      background: #fff;
      box-sizing: border-box;
      width: 100%;
      padding: 0 0 16px 32px;
      box-sizing: border-box;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
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
      margin-bottom: 16px;
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
</style>
