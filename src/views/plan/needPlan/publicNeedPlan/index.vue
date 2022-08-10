<template>
  <div class="publicNeedPlan_container">
    <div
      v-if="tableForm.needPlanType === 1 || tableForm.needPlanType === 2"
      class="publicNeedPlanTop"
    >
      <div class="project">
        <div class="name">关联的月度计划：{{ projectName }}</div>
        <el-button
          type="primary"
          size="mini"
          style="margin-left: 12px"
          @click="toMonthlyPlanDetail"
        >查看</el-button>
      </div>
    </div>
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
                <el-button
                  v-if="
                    tableForm.needPlanType !== 1 && tableForm.needPlanType !== 2
                  "
                  icon="el-icon-download"
                  @click="dowPlanTemplate"
                >
                  下载模板
                </el-button>
                <el-upload
                  v-if="
                    tableForm.needPlanType !== 1 && tableForm.needPlanType !== 2
                  "
                  ref="upload"
                  :action="upload.url"
                  :headers="upload.headers"
                  :before-upload="beforeAvatarUpload"
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
                :header-row-class-name="() => 'headerClass'"
                style="width: 100%"
              >
                <el-table-column align="center" label="序号" width="95">
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="materialName"
                  :render-header="addRedStar"
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
                  prop="specification"
                  :render-header="addRedStar"
                  label="规格型号(工料机描述)"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="{ row, $index }">
                    <span v-if="row.specification">{{
                      row.specification
                    }}</span>
                    <el-form-item
                      v-else
                      :prop="'list.' + $index + '.specification'"
                      :rules="tableForm.rules.specification"
                    >
                      <el-input
                        v-model="row.specification"
                        disabled
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="
                    tableForm.needPlanType !== 1 && tableForm.needPlanType !== 2
                  "
                  prop="remark"
                  label="工料机补充描述"
                  width="250"
                >
                  <template slot-scope="{ row }">
                    <el-form-item>
                      <el-input
                        v-model="row.remark"
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="unit" label="单位" width="150">
                  <template slot-scope="{ row, $index }">
                    <el-form-item :prop="'list.' + $index + '.unit'">
                      <el-input
                        v-model="row.unit"
                        placeholder="请输入"
                        disabled
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="tableForm.needPlanType === 6"
                  prop="useNum"
                  :render-header="addRedStar"
                  label="使用数量"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.useNum'"
                      :rules="tableForm.rules.useNum"
                    >
                      <el-input-number
                        v-model="row.useNum"
                        :controls="false"
                        :precision="4"
                        :min="1"
                        clearable
                        placeholder="请输入"
                        style="width: 100%"
                        @blur="useNumBlur(row)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  v-else
                  prop="useNum"
                  :render-header="addRedStar"
                  label="数量"
                  width="150"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.useNum'"
                      :rules="tableForm.rules.useNum"
                    >
                      <el-input-number
                        v-model="row.useNum"
                        :controls="false"
                        :precision="4"
                        clearable
                        placeholder="请输入"
                        style="width: 100%"
                        @blur="useNumBlur(row)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="useTime"
                  :render-header="addRedStar"
                  width="170"
                  :label="
                    tableForm.needPlanType === 6
                      ? '计划使用时间'
                      : '计划进场时间'
                  "
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.useTime'"
                      :rules="tableForm.rules.useTime"
                    >
                      <el-date-picker
                        v-model="row.useTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        :picker-options="pickerOptionsData"
                        placeholder="请选择日期时间"
                        style="width: 100%"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="usePosition"
                  :render-header="addRedStar"
                  label="使用部位"
                  width="150"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.usePosition'"
                      :rules="tableForm.rules.usePosition"
                    >
                      <el-input
                        v-model="row.usePosition"
                        :maxlength="10"
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="
                    tableForm.needPlanType === 1 || tableForm.needPlanType === 2
                  "
                  prop="remark"
                  label="备注"
                  min-width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.remark'"
                      :rules="tableForm.rules.remark"
                    >
                      <el-input
                        v-model="row.remark"
                        placeholder="请输入"
                        clearable
                      />
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
            </div>
          </el-form>
        </div>
        <div v-else>
          <SelectNode
            :is-radio="true"
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
          back-list-path="/plan/needPlan"
        />
        <!-- 操作失败 -->
        <OperationFailure v-if="showError" back-list-path="/plan/needPlan" />
      </div>
    </div>
    <div v-if="!showSuccess && !showError" class="footer">
      <div class="select_box">
        <div v-if="tableForm.status === 1" class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div v-if="beforePresent" class="time">{{ beforePresent }}</div>
        </div>
        <div class="action_buttons">
          <el-button @click="toBack">取消</el-button>
          <el-button
            v-if="!isShowNode"
            :loading="loading"
            @click="handlerSave"
          >保存</el-button>
          <el-button
            v-if="isShowNode"
            :loading="loading"
            type="primary"
            @click="() => (isShowNode = false)"
          >上一步</el-button>
          <el-button
            v-if="!isShowNode"
            :loading="loading"
            type="primary"
            @click="handlerShwoNode"
          >下一步</el-button>
          <el-button
            v-else
            :loading="loading"
            type="primary"
            @click="handlerSubmit"
          >提交</el-button>
        </div>
      </div>
    </div>
    <SuppliesMonthlyPlanDialog
      v-if="tableForm.needPlanType === 1 || tableForm.needPlanType === 2"
      :id="cliId"
      :visible.sync="isShowSuppliesDialog"
      :is-monthly-plan="true"
      :monthly-id="tableForm.monthPlanId"
      title="选择物资"
      @submitForm="submitForm"
      @handleClose="handleClose"
    />
    <SuppliesDialog
      v-else
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
import { selectDictDatas } from '@/api/plan/mad'
import { mapGetters } from 'vuex'
import OperationSuccessful from '../../components/operationSuccessful.vue'
import OperationFailure from '../../components/operationFailure.vue'
import SelectNode from '@/components/selectNode'
import SuppliesDialog from '../../components/suppliesDialog'
import SuppliesMonthlyPlanDialog from '../../components/suppliesMonthlyPlanDialog'
import {
  selectById,
  saveNeedPlan,
  submitNeedPlan,
  downloadTemplate
} from '@/api/plan/needPlan'
import { computedTime } from '@/utils/index'
export default {
  name: 'PublicNeedPlan',
  components: {
    OperationSuccessful,
    OperationFailure,
    SelectNode,
    SuppliesDialog,
    SuppliesMonthlyPlanDialog
  },
  data() {
    return {
      pickerOptionsData: {
        disabledDate(time) {
          // 如果想包含本⽉本⽉ - 8.64e7 * t 就不需要了，
          // 如果想之前的不能选择把 > 换成 <
          return time.getTime() <= Date.now() - 8.64e7
        }
      },
      upload: {
        // 设置上传的请求头部
        headers: {
          access_token: getToken()
        },
        // 上传的地址
        url:
          process.env.VUE_APP_BASE_API +
          '/plan-service/needPlan/importMaterials'
        // 上传内容
      },
      loading: false,
      cliId: null,
      cliIndex: null,
      isShowSuppliesDialog: false,
      beforePresent: null,
      processKey: 'Process_need_plan',
      isShowNode: false,
      showSuccess: false,
      showError: false,
      id: null,
      tableForm: {
        list: [{ remark: '' }],
        rules: {
          materialName: [
            { required: true, message: '物资名称不能为空', trigger: 'change' }
          ],
          specification: [
            { required: true, message: '规格型号不能为空', trigger: 'blur' }
          ],
          useNum: [
            { required: true, message: '数量不能为空', trigger: 'blur' },
            {
              type: 'number',
              min: 0.001,
              message: '输入的值必须大于0',
              trigger: 'blur'
            }
          ],
          useTime: [
            { required: true, message: '计划进场时间不能为空', trigger: 'blur' }
          ],
          usePosition: [
            { required: true, message: '使用部位不能为空', trigger: 'blur' }
          ]
        }
      },
      personnelList: [],
      projectName: '', // 项目名称
      queryParams: {},
      addPlanData: [],
      isSelectNode: false,
      processInstanceId: null,
      headerTitle: '' // 头部标题
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  mounted() {
    const query = this.$route.query
    this.tableForm.needPlanType = Number(query.needPlanType)
    this.tableForm.monthPlanType = Number(query.monthPlanType)
    this.getDictValue()
    this.id = query.id
    this.tableForm.monthPlanId = Number(query.monthPlanId)
    this.tableForm.monthPlanName = query.monthPlanName
    this.tableForm.monthPlanCode = query.monthPlanCode
    this.tableForm.planMonth = query.planMonth
    this.tableForm.planYear = query.planYear
    if (this.id) {
      this.getDetail()
    } else {
      this.projectName = query.monthPlanName + '-' + query.monthPlanCode
    }
  },
  methods: {
    beyondMaximum(row) {
      if (row.useNum > 999999999) {
        this.$message.warning('数量已超最大值')
        this.$set(row, 'useNum', 999999999)
      }
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.success) {
        if (this.tableForm.list && res.data && res.data.length > 0) {
          this.tableForm.list = this.tableForm.list.concat(res.data)
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
      downloadTemplate()
    },
    // 表头添加必填
    addRedStar(h, { column }) {
      return [
        h('span', { style: 'color: red' }, '*'),
        h('span', ' ' + column.label)
      ]
    },
    getDictValue() {
      selectDictDatas('DIC_NEED_PLAN_TYPE').then((res) => {
        if (res.data && res.data.length > 0) {
          this.addPlanData = res.data
          this.headerTitle = this.getDictLabel(this.tableForm.needPlanType)
        }
      })
    },
    getDictLabel(type) {
      let name = ''
      this.addPlanData.forEach((item) => {
        if (Number(item.dataValue) === type) {
          name = item.dataName
        }
      })
      return name
    },
    // 选择人员
    selectPersonnel(data, isSelectNode) {
      this.isSelectNode = isSelectNode
      this.personnelList = data
    },
    useNumBlur(row) {
      if (
        this.tableForm.needPlanType === 1 ||
        this.tableForm.needPlanType === 2
      ) {
        if (row.overallNum >= 0 && row.useNum >= 0) {
          if (row.useNum > row.overallNum) {
            this.$message({
              message: `${row.materialName}的数量不可超过对应总计划的物资可用数量`,
              type: 'warning'
            })
            this.$set(row, 'useNum', row.overallNum)
          }
        }
      }
      this.beyondMaximum(row)
    },
    getDetail() {
      this.loading = true
      selectById({ id: this.id }).then((res) => {
        const data = res.data
        data.planMaterials.forEach((item) => {
          this.useNumBlur(item)
        })
        this.tableForm = { ...this.tableForm, ...data }
        this.processInstanceId = this.tableForm.processInstanceId
        this.projectName =
          this.tableForm.monthPlanName + '-' + this.tableForm.monthPlanCode
        if (data.updateTime) {
          this.beforePresent = computedTime(data.updateTime)
        } else {
          this.beforePresent = computedTime(data.createTime)
        }
        this.tableForm.list = data.planMaterials
        this.loading = false
        this.headerTitle = this.getDictLabel(this.tableForm.needPlanType)
      })
    },
    // 点击选择物资
    focusInput(row, index) {
      this.isShowSuppliesDialog = true
      if (
        this.tableForm.needPlanType === 1 ||
        this.tableForm.needPlanType === 2
      ) {
        this.cliId = row.monthMaterialId
      } else {
        this.cliId = row.materialId
      }
      this.cliIndex = index
      this.$refs['inputDialog'].blur()
    },
    handleClose() {
      this.cliId = null
    },
    submitForm(dataArr) {
      const data = dataArr[0]
      if (this.cliIndex >= 0) {
        this.tableForm.list.forEach((item, index) => {
          if (index === this.cliIndex) {
            if (
              this.tableForm.needPlanType === 1 ||
              this.tableForm.needPlanType === 2
            ) {
              this.$set(item, 'materialName', data.materialName)
              this.$set(item, 'materialId', data.materialId)
              this.$set(item, 'monthMaterialId', data.id)
            } else {
              this.$set(item, 'materialId', data.id)
              this.$set(item, 'materialName', data.name)
            }
            this.$set(item, 'unit', data.unit)
            this.$set(item, 'specification', data.specification)
            this.$set(item, 'useNum', data.availableNum)
            this.$set(item, 'availableNum', data.availableNum)
            this.$set(item, 'overallNum', data.overallNum)
            this.$set(item, 'overallMaterialId', data.overallMaterialId)
            this.$set(item, 'usePosition', data.planProgress)
          }
        })
      }
      if (dataArr.length > 1) {
        dataArr.forEach((item, index) => {
          if (index >= 1) {
            let obj = {}
            if (
              this.tableForm.needPlanType === 1 ||
              this.tableForm.needPlanType === 2
            ) {
              obj = {
                materialId: item.materialId,
                monthMaterialId: item.id,
                materialName: item.materialName,
                unit: item.unit,
                specification: item.specification,
                useNum: item.availableNum,
                availableNum: item.availableNum,
                overallNum: item.overallNum,
                overallMaterialId: item.overallMaterialId,
                usePosition: item.planProgress
              }
            } else {
              obj = {
                materialId: item.id,
                materialName: item.name,
                unit: item.unit,
                specification: item.specification,
                useNum: item.availableNum,
                availableNum: item.availableNum,
                overallNum: item.overallNum,
                overallMaterialId: item.overallMaterialId,
                usePosition: item.planProgress
              }
            }

            this.tableForm.list.push({ ...obj })
          }
        })
      }
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
                    this.tableForm.needPlanType === 1 ||
                    this.tableForm.needPlanType === 2
                  ) {
                    if (
                      items.specification === item.specification &&
                      items.materialId === item.materialId &&
                      items.usePosition === item.usePosition &&
                      items.unit === item.unit
                    ) {
                      arr.push(items)
                    }
                  } else {
                    if (
                      items.specification === item.specification &&
                      items.materialId === item.materialId &&
                      items.usePosition === item.usePosition &&
                      items.remark === item.remark &&
                      items.unit === item.unit
                    ) {
                      arr.push(items)
                    }
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
        }
      })
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
          const obj = { ...this.tableForm, ...this.projectInformation }
          obj.planMaterials = this.tableForm.list
          delete obj.list
          delete obj.rules
          saveNeedPlan(obj)
            .then((res) => {
              this.loading = false
              this.$message({
                message: '计划已保存成功！',
                type: 'success'
              })
              this.toBack()
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    toBack() {
      this.$router.push({ path: '/plan/needPlan' })
    },
    // 保存
    handlerSubmit() {
      this.loading = true
      if (
        this.personnelList.length > 0 ||
        this.isSelectNode ||
        this.tableForm.status === 4
      ) {
        const isMeet = this.personnelList.every((item) => {
          return item.personnel && item.personnel.length > 0
        })
        if (isMeet) {
          const obj = {}
          this.personnelList.forEach((item) => {
            const arr = item.personnel.map((items) => items.mainCode)
            obj[item.assignee] = arr.join(',')
          })
          const data = { ...this.tableForm, ...this.projectInformation }
          delete data.list
          delete data.rules
          data.planMaterials = this.tableForm.list
          data.processVariables = obj
          submitNeedPlan(data)
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
    toMonthlyPlanDetail() {
      this.$router.push({
        path: '/plan/monthlyPlanDetail',
        query: { id: this.tableForm.monthPlanId }
      })
    },
    // 新增行
    addTable() {
      this.tableForm.list.push({ type: '', remark: '' })
    },
    cancel() {
      this.$router.go(-1)
    },
    // 复制行
    handelCopy(row) {
      this.tableForm.list.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.tableForm.list.splice(index, 1)
    },
    // 需用数量(基础,装修,主体发生改变)
    demandSubtotal(row) {
      const basis = Number(row.basis) || 0
      const subject = Number(row.subject) || 0
      const decorate = Number(row.decorate) || 0
      row.demandSubtotal = basis + subject + decorate
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
.switchContent {
  padding: 40px 0 0px;
  box-sizing: border-box;
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
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
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
.publicNeedPlan_container {
  .publicNeedPlanTop {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 16px 32px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      display: flex;
      align-items: center;
      .switch_svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .table_box {
    margin: 16px;
    background: #fff;
    .table_content {
      padding: 24px;
      box-sizing: border-box;
      .table_div {
        height: calc(100vh - 350px);
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
