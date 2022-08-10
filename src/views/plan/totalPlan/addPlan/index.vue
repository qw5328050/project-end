<template>
  <div class="materialsNeeded_container">
    <div class="table_box">
      <div v-if="!showSuccess && !showError">
        <div v-if="!isShowNode" class="table_content">
          <el-form
            ref="tableForm"
            :model="tableForm"
            :rules="tableForm.rules"
            size="small"
          >
            <div class="title_content">
              <div class="title">{{ headerTitle }}</div>
              <div class="button">
                <el-button icon="el-icon-download" @click="dowPlanTemplate">
                  下载模板
                </el-button>
                <el-upload
                  ref="upload"
                  :action="upload.url"
                  :headers="upload.headers"
                  :before-upload="beforeAvatarUpload"
                  name="proFile"
                  :on-error="handleUploadError"
                  :on-success="handleUploadSuccess"
                  :show-file-list="false"
                  class="upload-file-uploader"
                >
                  <!-- 上传按钮 -->
                  <el-button icon="el-icon-upload2">导入物资</el-button>
                </el-upload>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="addTable"
                >新增一行</el-button>
              </div>
            </div>
            <div class="table_div">
              <el-table
                :data="tableForm.list"
                height="100%"
                style="width: 100%"
                :header-row-class-name="() => 'headerClass'"
              >
                <el-table-column align="center" label="序号" width="95">
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="usePosition"
                  :render-header="addRedStar"
                  align="center"
                  label="使用部位"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.usePosition'"
                      :rules="tableForm.rules.usePosition"
                    >
                      <el-input
                        v-model="row.usePosition"
                        :maxlength="20"
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :render-header="addRedStar"
                  prop="materialName"
                  label="物资名称"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.materialName'"
                      :rules="tableForm.rules.materialName"
                    >
                      <el-input
                        ref="inputDialog"
                        v-model="row.materialName"
                        readonly="readonly"
                        placeholder="请选择"
                        @focus="focusInput(row, $index)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="meteringUnits"
                  label="计量单位"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item :prop="`list[${$index}]` + '.meteringUnits'">
                      <el-input
                        v-model="row.meteringUnits"
                        disabled
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :render-header="addRedStar"
                  prop="specification"
                  label="规格型号(工料机描述)"
                  width="250"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="`list[${$index}]` + '.specification'"
                      :rules="tableForm.rules.specification"
                    >
                      <el-input
                        v-model="row.specification"
                        :maxlength="20"
                        disabled
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remarks"
                  label="工料机补充描述"
                  width="250"
                >
                  <template slot-scope="{ row }">
                    <el-form-item>
                      <el-input
                        v-model="row.remarks"
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :render-header="addRedStar"
                  prop="totalQuantity"
                  label="数量"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="`list[${$index}]` + '.totalQuantity'"
                      :rules="tableForm.rules.totalQuantity"
                    >
                      <el-input-number
                        v-model="row.totalQuantity"
                        :controls="false"
                        :precision="4"
                        placeholder="请输入"
                        clearable
                        style="width: 100%"
                        @blur="beyondMaximum(row)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="150">
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
            </div>
          </el-form>
        </div>
        <div v-else>
          <SelectNode
            :is-radio="true"
            :alteration="alteration"
            :process-key="processKey"
            :process-instance-id="processInstanceId"
            @selectPersonnel="selectPersonnel"
          />
        </div>
      </div>
      <div v-else class="switchContent">
        <!-- 操作成功 -->
        <OperationSuccessful
          v-if="showSuccess"
          back-list-path="/plan/totalPlan"
        />
        <!-- 操作失败 -->
        <OperationFailure v-if="showError" back-list-path="/plan/totalPlan" />
      </div>
    </div>
    <div v-if="!showSuccess && !showError" class="footer">
      <div class="select_box">
        <div v-if="id && planStatus === 1" class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div v-if="beforePresent" class="time">{{ beforePresent }}</div>
        </div>
        <div class="action_buttons">
          <el-button :loading="loading" @click="toBack">取消</el-button>
          <el-button
            v-if="isShowNode"
            type="primary"
            :loading="loading"
            @click="() => (isShowNode = false)"
          >上一步</el-button>
          <el-button
            v-if="!alteration && !isShowNode"
            :loading="loading"
            @click="handlerSave"
          >保存</el-button>
          <el-button
            v-if="!isShowNode"
            type="primary"
            :loading="loading"
            @click="handlerShwoNode"
          >下一步</el-button>
          <el-button
            v-else
            type="primary"
            :loading="loading"
            @click="handlerSubmit"
          >提交</el-button>
        </div>
      </div>
    </div>
    <SuppliesDialog
      :id="cliId"
      :visible.sync="isShowSuppliesDialog"
      title="选择物资"
      @submitForm="submitForm"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // get token from cookie
import { mapGetters } from 'vuex'
import OperationSuccessful from '../../components/operationSuccessful.vue'
import SelectNode from '@/components/selectNode'
import OperationFailure from '../../components/operationFailure.vue'
import { computedTime } from '@/utils/index'
import {
  doSaveOrUpdate,
  getDetailPlan,
  updatePlan,
  submitPlan,
  exportPlanTemplate
} from '@/api/plan/totalPlan'
import SuppliesDialog from '../../components/suppliesDialog'
export default {
  name: 'MaterialsNeeded',
  components: {
    SuppliesDialog,
    OperationSuccessful,
    OperationFailure,
    SelectNode
  },
  data() {
    return {
      upload: {
        // 设置上传的请求头部
        headers: {
          access_token: getToken()
        },
        // 上传的地址
        url:
          process.env.VUE_APP_BASE_API +
          '/plan-service/overallPlan/importPlanExcel'
        // 上传内容
      },
      isShowNode: false,
      cliId: null,
      cliIndex: null,
      showSuccess: false,
      loading: false,
      showError: false,
      tableForm: {
        rules: {
          materialName: [
            { required: true, message: '物资名称不能为空', trigger: 'change' }
          ],
          specification: [
            { required: true, message: '规格型号不能为空', trigger: 'blur' }
          ],
          usePosition: [
            {
              required: true,
              message: '使用部位不能为空',
              trigger: 'blur'
            }
          ],
          totalQuantity: [
            {
              required: true,
              message: '数量不能为空',
              trigger: 'blur'
            },
            {
              type: 'number',
              min: 0.001,
              message: '输入的值必须大于0',
              trigger: 'blur'
            }
          ]
        },
        list: [{ remarks: '' }] // 表格数据
      },
      id: null,
      alteration: null, // 变更
      beforePresent: null,
      planStatus: null,
      isShowSuppliesDialog: false,
      headerTitle: '', // 头部标题
      processKey: '',
      personnelList: [],
      isSelectNode: false,
      processInstanceId: null
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '物资需用总计划'
    this.id = this.$route.query ? this.$route.query.id : ''
    if (this.id) {
      this.getPlanDetail(this.id)
    } else {
      this.planStatus = this.$route.query
        ? Number(this.$route.query.planStatus)
        : ''
      this.tableForm.planType = this.$route.query
        ? Number(this.$route.query.type)
        : ''
      if (this.tableForm.planType === 4) {
        this.processKey = 'process_xa2gg3vg'
      } else {
        this.processKey = 'Process_1653649890649'
      }
    }
    this.alteration = this.$route.query
      ? Number(this.$route.query.alteration)
      : 0
  },
  methods: {
    beyondMaximum(row) {
      if (row.totalQuantity > 999999999) {
        this.$message.warning('数量已超最大值')
        this.$set(row, 'totalQuantity', 999999999)
      }
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.success) {
        if (this.tableForm.list && res.data && res.data.length > 0) {
          res.data.forEach((item) => {
            if (item.steelType === '一级钢') {
              item.steelType = 1
            } else if (item.steelType === '三级钢') {
              item.steelType = 3
            } else if (item.steelType === '四级钢') {
              item.steelType = 4
            }
          })
          this.tableForm.list = res.data
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`只允许上传单个文件`)
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error(err)
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      const fileType = ['xlsx', 'xls']
      if (file) {
        const addTypeArray = file.name.split('.')
        const addType = addTypeArray[addTypeArray.length - 1] // 文件格式
        if (fileType.findIndex((item) => item === addType) >= 0) {
          return true
        } else {
          this.$message.error(`上传${file.name}文件格式错误,请上传工作表`)
          return false
        }
      }
    },
    // 下载模板
    dowPlanTemplate() {
      exportPlanTemplate()
    },
    // 选择人员
    selectPersonnel(data, isSelectNode) {
      this.isSelectNode = isSelectNode
      this.personnelList = data
    },
    // 获取详情数据
    getPlanDetail(id) {
      getDetailPlan({ planId: id }).then((res) => {
        this.tableForm = { ...res.data, ...this.tableForm }
        this.planStatus = this.tableForm.planStatus
        if (this.tableForm.planType === 4) {
          this.processKey = 'process_xa2gg3vg'
        } else {
          this.processKey = 'Process_1653649890649'
        }
        this.processInstanceId = this.tableForm.processInstanceId
        this.tableForm.list = res.data ? res.data.materialList : []
        if (this.tableForm.list && this.tableForm.list.length > 0) {
          const updateTime = this.tableForm.list[0].updateTime
          const createTime = this.tableForm.list[0].createTime
          if (updateTime) {
            this.beforePresent = computedTime(updateTime)
          } else {
            this.beforePresent = computedTime(createTime)
          }
        }
      })
    },
    // 表头添加必填
    addRedStar(h, { column }) {
      return [
        h('span', { style: 'color: red' }, '*'),
        h('span', ' ' + column.label)
      ]
    },
    // 提交
    handlerShwoNode() {
      if (this.tableForm.list && this.tableForm.list.length === 0) {
        this.$message({
          message: '请填写物资数据后,在进行操作!',
          type: 'warning'
        })
        return
      }
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          if (this.tableForm.list && this.tableForm.list.length > 0) {
            try {
              this.tableForm.list.forEach((item, index) => {
                const arr = []
                this.tableForm.list.forEach((items) => {
                  if (
                    items.specification === item.specification &&
                    items.materialId === item.materialId &&
                    items.usePosition === item.usePosition &&
                    items.meteringUnits === item.meteringUnits &&
                    items.remarks === item.remarks
                  ) {
                    arr.push(items)
                  }
                })
                if (arr.length > 1) {
                  throw new Error()
                }
                if (index === this.tableForm.list.length - 1) {
                  this.isShowNode = true
                }
              })
            } catch (e) {
              this.$message({
                message: '不可重复提交相同物资',
                type: 'warning'
              })
            }
          }
          //
        }
      })
    },
    handlerSubmit() {
      this.loading = true
      if (this.personnelList.length > 0 || this.isSelectNode) {
        const isMeet = this.personnelList.every((item) => {
          return item.personnel && item.personnel.length > 0
        })
        if (isMeet) {
          const data = {}
          const obj = {}
          this.personnelList.forEach((item) => {
            const arr = item.personnel.map((items) => items.mainCode)
            obj[item.assignee] = arr.join(',')
          })
          const overallPlanMaterialRefDTOList = this.tableForm.list
          overallPlanMaterialRefDTOList.forEach((item, index) => {
            item.serialNumber = index + 1
          })
          data.overallPlanMaterialRefDTOList = overallPlanMaterialRefDTOList
          data.overallPlanDTO = {
            ...this.projectInformation,
            id: this.id,
            planType: this.tableForm.planType,
            variable: obj
          }
          submitPlan(data)
            .then((res) => {
              this.loading = false
              this.showSuccess = true
            })
            .catch(() => {
              this.loading = false
              this.showError = true
            })
        } else {
          this.loading = false
          this.$message({
            message: '请选择对应节点的审批人后,在进行操作!',
            type: 'warning'
          })
        }
      } else {
        this.loading = false
        this.$message({
          message: '请选择对应节点的审批人后,在进行操作!',
          type: 'warning'
        })
      }
    },
    // 保存
    handlerSave() {
      if (this.tableForm.list && this.tableForm.list.length === 0) {
        this.$message({
          message: '请填写物资数据后,在进行操作!',
          type: 'warning'
        })
        return
      }
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = {}
          const overallPlanMaterialRefDTOList = this.tableForm.list
          overallPlanMaterialRefDTOList.forEach((item, index) => {
            item.serialNumber = index + 1
          })
          data.overallPlanMaterialRefDTOList = overallPlanMaterialRefDTOList
          data.overallPlanDTO = {
            ...this.projectInformation,
            id: this.id,
            planType: this.tableForm.planType
          }
          if (this.id) {
            updatePlan(data)
              .then((res) => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                this.$router.push({ path: '/plan/totalPlan' })
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            doSaveOrUpdate(data)
              .then((res) => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                this.$router.push({ path: '/plan/totalPlan' })
              })
              .catch(() => {
                this.loading = false
              })
          }
        }
      })
    },
    // 选择物资
    submitForm(dataArr) {
      const data = dataArr[0]
      if (this.cliIndex >= 0) {
        this.tableForm.list.forEach((item, index) => {
          if (index === this.cliIndex) {
            this.$set(item, 'materialId', data.id)
            this.$set(item, 'materialName', data.name)
            this.$set(item, 'meteringUnits', data.unit)
            this.$set(item, 'specification', data.specification)
          }
        })
      }
      if (dataArr.length > 1) {
        dataArr.forEach((item, index) => {
          if (index >= 1) {
            const obj = {
              materialId: item.id,
              materialName: item.name,
              meteringUnits: item.unit,
              specification: item.specification
            }
            this.tableForm.list.push({ ...obj })
          }
        })
      }
    },
    handleClose() {
      this.cliId = null
    },
    toBack() {
      this.$router.push({ path: '/plan/totalPlan' })
    },
    focusInput(row, index) {
      this.isShowSuppliesDialog = true
      this.cliId = row.materialId
      this.cliIndex = index
      this.$refs['inputDialog'].blur()
    },
    // 新增行
    addTable() {
      this.tableForm.list.push({ remarks: '' })
    },
    // 复制行
    handelCopy(row) {
      const obj = { ...row }
      delete obj.id
      this.tableForm.list.push({ ...obj })
    },
    // 删除行
    handelDelete(row, index) {
      this.tableForm.list.splice(index, 1)
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
.title_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  .button {
    display: flex;
    align-items: center;
    .upload-file-uploader {
      margin: 0 8px;
    }
  }
}

.switchContent {
  padding: 40px 0 0px;
  box-sizing: border-box;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-table {
  .el-form-item {
    margin-bottom: 0px;
    &__content {
      width: 100%;
    }
    &.is-error {
    }
  }
}
.materialsNeeded_container {
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
      padding: 24px;
      box-sizing: border-box;
      .table_div{
        height: calc(100vh - 300px);
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
  }
  .footer {
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
</style>
