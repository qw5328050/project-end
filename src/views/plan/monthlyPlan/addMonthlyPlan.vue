<template>
  <div class="addMonthlyPlan_container">
    <div class="addMonthlyPlanTop">
      <div class="project">
        <div class="name">关联的总计划: {{ projectName }}</div>
        <el-button
          type="primary"
          size="mini"
          style="margin-left: 12px"
          @click="toTotalDetail"
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
            <div class="tableHeader">
              <div class="handerTitle">{{ headerTitle }}</div>
              <div class="btns">
                <el-form-item
                  prop="submitMonth"
                  :rules="tableForm.rules.submitMonth"
                  label="提交月份:"
                  label-width="100px"
                >
                  <el-date-picker
                    v-model="tableForm.submitMonth"
                    value-format="yyyy-MM"
                    type="month"
                    :picker-options="pickerOptions"
                    placeholder="选择日期时间"
                    style="width: 100%"
                    @change="changeSubmitMonth"
                  />
                </el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  style="margin-left: 8px"
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
                  width="250"
                  show-overflow-tooltip
                >
                  <template slot-scope="{ row, $index }">
                    <span v-if="row.specification">{{
                      row.specification
                    }}</span>
                    <el-form-item
                      v-else
                      :prop="`list[${$index}]` + '.specification'"
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
                <el-table-column prop="unit" label="计量单位" width="150">
                  <template slot-scope="{ row, $index }">
                    <el-form-item :prop="`list[${$index}]` + '.unit'">
                      <el-input
                        v-model="row.unit"
                        disabled
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="estimateNum"
                  :render-header="addRedStar"
                  label="预算数量"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="`list[${$index}]` + '.estimateNum'"
                      :rules="tableForm.rules.estimateNum"
                    >
                      <el-input-number
                        v-model="row.estimateNum"
                        :controls="false"
                        :precision="4"
                        clearable
                        style="width: 100%"
                        placeholder="请输入"
                        @blur="useNumBlur(row)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="planProgress"
                  label="计划施工进度/使用部位"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="`list[${$index}]` + '.planProgress'"
                      :rules="tableForm.rules.planProgress"
                    >
                      <el-input
                        v-model="row.planProgress"
                        :maxlength="50"
                        placeholder="请输入"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="estimateInTime"
                  label="预估初次进场日期"
                  width="250"
                  :render-header="addRedStar"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="`list[${$index}]` + '.estimateInTime'"
                      :rules="tableForm.rules.estimateInTime"
                    >
                      <el-date-picker
                        v-model="row.estimateInTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        :picker-options="pickerOptionsData"
                        placeholder="选择日期时间"
                        style="width: 100%"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" min-width="200">
                  <template slot-scope="{ row }">
                    <el-input
                      v-model="row.remark"
                      :maxlength="20"
                      placeholder="请输入"
                      clearable
                    />
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
          back-list-path="/plan/monthlyPlan"
        />
        <!-- 操作失败 -->
        <OperationFailure v-if="showError" back-list-path="/plan/monthlyPlan" />
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
    <SuppliesTotalPlanDialog
      :id="cliId"
      :total-id="tableForm.overallPlanId"
      :visible.sync="isShowSuppliesDialog"
      title="选择物资"
      @submitForm="submitForm"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import OperationSuccessful from '../components/operationSuccessful.vue'
import OperationFailure from '../components/operationFailure.vue'
import SelectNode from '@/components/selectNode'
import {
  saveMonthPlan,
  selectById,
  submitMonthPlan
} from '@/api/plan/monthlyPlan'
import SuppliesTotalPlanDialog from '../components/suppliesTotalPlanDialog'
import { computedTime } from '@/utils/index'
export default {
  name: 'AddMonthlyPlan',
  components: {
    SuppliesTotalPlanDialog,
    OperationSuccessful,
    OperationFailure,
    SelectNode
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          const date = new Date()
          const year = date.getFullYear()
          let month = date.getMonth() + 1
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          const currentdate = year.toString() + month.toString()
          const timeyear = time.getFullYear()
          let timemonth = time.getMonth() + 1
          if (timemonth >= 1 && timemonth <= 9) {
            timemonth = '0' + timemonth
          }
          const timedate = timeyear.toString() + timemonth.toString()
          return timedate < currentdate
        }
      },
      pickerOptionsData: {
        disabledDate(time) {
          // 如果想包含本⽉本⽉ - 8.64e7 * t 就不需要了，
          // 如果想之前的不能选择把 > 换成 <
          return time.getTime() <= Date.now() - 8.64e7
        }
      },
      loading: false,
      isShowNode: false,
      beforePresent: null,
      showSuccess: false,
      showError: false,
      tableForm: {
        submitMonth: '',
        rules: {
          submitMonth: [
            { required: true, message: '提交月份不能为空', trigger: 'change' }
          ],
          materialName: [
            { required: true, message: '物资名称不能为空', trigger: 'change' }
          ],
          specification: [
            { required: true, message: '规格型号不能为空', trigger: 'blur' }
          ],
          estimateNum: [
            {
              required: true,
              message: '预算数量不能为空',
              trigger: 'blur'
            },
            {
              type: 'number',
              min: 0.001,
              message: '输入的值必须大于0',
              trigger: 'blur'
            }
          ],
          estimateInTime: [
            {
              required: true,
              message: '预估初次进场时间不能为空',
              trigger: 'change'
            }
          ]
        },
        list: [{}] // 表格数据
      },
      cliId: null,
      cliIndex: null,
      isShowSuppliesDialog: false,
      processKey: 'Process_month_plan',
      personnelList: [],
      id: '',
      isSelectNode: false,
      processInstanceId: null,
      projectName: '', // 项目名称
      headerTitle: '' // 头部标题
    }
  },
  mounted() {
    const query = this.$route && this.$route.query
    this.headerTitle = this.$route.name ? this.$route.name : '月度计划'
    this.id = query.id || ''
    if (this.id) {
      this.getMonthlyDetail(this.id)
    } else {
      this.tableForm.overallPlanType = Number(query.overallPlanType) || '' // 总计划类型
      this.tableForm.overallPlanCode = query.overallPlanCode || '' // 总计划编号
      this.tableForm.overallPlanId = Number(query.overallPlanId) || null // 总计划id
      this.tableForm.projectId = Number(query.projectId) || null // 项目id
      this.tableForm.projectName = query.projectName || null // 项目namecode
      this.tableForm.projectCode = query.projectCode || null // 项目code
      this.projectName =
        this.getDictionaryLabel(this.tableForm.overallPlanType, 'planType') +
        '-' +
        this.tableForm.overallPlanCode
    }
  },
  methods: {
    beyondMaximum(row) {
      if (row.estimateNum > 999999999) {
        this.$message.warning('数量已超最大值')
        this.$set(row, 'estimateNum', 999999999)
      }
    },
    // 选择人员
    selectPersonnel(data, isSelectNode) {
      this.isSelectNode = isSelectNode
      this.personnelList = data
    },
    // 跳转到总计划详情页面
    toTotalDetail(row) {
      let path = ''
      switch (this.tableForm.overallPlanType) {
        case 1:
          path = '/plan/materialsTotalPlanDetails'
          break
        case 2:
          path = '/plan/reinforcedTotalPlanDetails'
          break
        case 3:
          path = '/plan/concreteTotalPlanDetails'
          break
        case 4:
          path = '/plan/returnableTotalPlanDetails'
          break
      }
      this.$router.push({
        path: path,
        query: {
          type: this.tableForm.overallPlanType,
          id: this.tableForm.overallPlanId
        }
      })
    },
    // 获取详情
    getMonthlyDetail(id) {
      selectById({ id }).then((res) => {
        const data = res.data
        data.planMaterials.forEach((item) => {
          this.useNumBlur(item)
        })
        this.tableForm = { ...this.tableForm, ...data }
        this.tableForm.list = data.planMaterials
        this.tableForm.submitMonth = data.planYear + '-' + data.planMonth
        this.processInstanceId = this.tableForm.processInstanceId
        this.projectName =
          this.getDictionaryLabel(this.tableForm.overallPlanType, 'planType') +
          '-' +
          (this.tableForm.overallPlanCode || '')
        if (data.updateTime) {
          this.beforePresent = computedTime(data.updateTime)
        } else {
          this.beforePresent = computedTime(data.createTime)
        }
      })
    },
    toBack() {
      this.$router.push({ path: '/plan/monthlyPlan' })
    },
    // 提交日期发生变化
    changeSubmitMonth(data) {
      if (data) {
        const arr = data.split('-')
        this.$set(this.tableForm, 'planYear', arr[0])
        this.$set(this.tableForm, 'planMonth', arr[1])
      }
    },
    // 表头添加必填
    addRedStar(h, { column }) {
      return [
        h('span', { style: 'color: red' }, '*'),
        h('span', ' ' + column.label)
      ]
    },
    // 点击选择物资
    focusInput(row, index) {
      this.isShowSuppliesDialog = true
      this.cliId = row.overallMaterialId
      this.cliIndex = index
      this.$refs['inputDialog'].blur()
    },
    useNumBlur(row) {
      if (row.estimateNum >= 0 && row.availableQuantity >= 0) {
        if (row.estimateNum > row.availableQuantity) {
          this.$message({
            message: `${row.materialName}的预算数量不能超过对应总计划的物资可用数量`,
            type: 'warning'
          })
          this.$set(row, 'estimateNum', row.availableQuantity)
        }
      }
      this.beyondMaximum(row)
    },
    // 选择物资
    submitForm(dataArr) {
      const data = dataArr[0]
      if (this.cliIndex >= 0) {
        this.tableForm.list.forEach((item, index) => {
          if (index === this.cliIndex) {
            this.$set(item, 'materialId', data.materialId)
            this.$set(item, 'overallMaterialId', data.id)
            this.$set(item, 'materialName', data.name || data.materialName)
            this.$set(item, 'unit', data.meteringUnits)
            if (data.remarks) {
              this.$set(
                item,
                'specification',
                `${data.specification} - ${data.remarks}`
              )
            } else {
              this.$set(item, 'specification', `${data.specification}`)
            }

            this.$set(item, 'availableQuantity', data.availableQuantity)
            this.$set(item, 'estimateNum', data.availableQuantity)
            this.$set(item, 'planProgress', data.usePosition)
          }
        })
      }
      if (dataArr.length > 1) {
        dataArr.forEach((item, index) => {
          if (index >= 1) {
            const obj = {
              materialId: item.materialId,
              overallMaterialId: item.id,
              materialName: item.name || item.materialName,
              unit: item.meteringUnits,
              specification: item.remarks
                ? `${item.specification} - ${item.remarks}`
                : `${item.specification}`,
              availableQuantity: item.availableQuantity,
              estimateNum: item.availableQuantity,
              planProgress: item.usePosition
            }
            this.tableForm.list.push({ ...obj })
          }
        })
      }
    },
    handleClose() {
      this.cliId = null
    },
    // 暂存
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
          const obj = { ...this.tableForm }
          obj.planMaterials = this.tableForm.list
          saveMonthPlan(obj)
            .then((res) => {
              this.loading = false
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.toBack()
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
      //
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
                    items.unit === item.unit &&
                    items.planProgress === item.planProgress
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
        }
      })
    },
    // 保存
    handlerSubmit() {
      this.loading = true
      if (this.personnelList.length > 0 || this.isSelectNode) {
        const isMeet = this.personnelList.every((item) => {
          return item.personnel && item.personnel.length > 0
        })
        if (isMeet) {
          const obj = {}
          this.personnelList.forEach((item) => {
            const arr = item.personnel.map((items) => items.mainCode)
            obj[item.assignee] = arr.join(',')
          })
          const data = { ...this.tableForm }
          data.planMaterials = this.tableForm.list
          data.processVariables = obj
          delete data.list
          delete data.rules
          submitMonthPlan(data)
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
    // 新增行
    addTable() {
      this.tableForm.list.push({})
    },
    // 复制行
    handelCopy(row) {
      this.tableForm.list.push({ ...row })
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
.switchContent {
  padding: 40px 0 0px;
  box-sizing: border-box;
}
::v-deep .btns {
  .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    .el-form-item__content {
      margin-left: 0px !important;
    }
  }
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
.addMonthlyPlan_container {
  .addMonthlyPlanTop {
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
    .tableHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .headerTitle {
        font-size: 14px;
        font-weight: 400;
        color: #595959;
      }
      .btns {
        display: flex;
        align-items: center;
      }
    }
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
