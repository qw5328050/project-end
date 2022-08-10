<template>
  <div class="concreteNeedPlan_container">
    <div class="concreteNeedPlanTop">
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
            <div class="tableHeader">
              <div class="handerTitle">{{ headerTitle }}</div>
              <div class="btns">
                <el-form-item
                  label="方量计算式"
                  prop="volumeCalWay"
                  label-width="100px"
                >
                  <el-input
                    v-model="tableForm.volumeCalWay"
                    clearable
                    placeholder="请输入"
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
                  prop="markNum"
                  :render-header="addRedStar"
                  label="标号(工料机描述)"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="{ row, $index }">
                    <span v-if="row.markNum">{{ row.markNum }}</span>
                    <el-form-item
                      v-else
                      :prop="'list.' + $index + '.markNum'"
                      :rules="tableForm.rules.markNum"
                    >
                      <el-input
                        v-model="row.markNum"
                        disabled
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
                  prop="planVolume"
                  :render-header="addRedStar"
                  label="计划方量"
                  width="150"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.planVolume'"
                      :rules="tableForm.rules.planVolume"
                    >
                      <el-input-number
                        v-model="row.planVolume"
                        type="number"
                        :controls="false"
                        :precision="4"
                        placeholder="请输入"
                        clearable
                        style="width: 100%"
                        @blur="useNumBlur(row)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="collapseDegree"
                  :render-header="addRedStar"
                  label="塌落度"
                  width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.collapseDegree'"
                      :rules="tableForm.rules.collapseDegree"
                    >
                      <el-input
                        v-model="row.collapseDegree"
                        placeholder="请输入"
                        clearable
                        @input="changeColl(row)"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="usePosition"
                  :render-header="addRedStar"
                  label="浇筑部位"
                  width="200"
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
                  prop="useTime"
                  :render-header="addRedStar"
                  label="浇筑时间"
                  width="170"
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
                        placeholder="请选择日期时间"
                        style="width: 100%"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="unloadingWay"
                  :render-header="addRedStar"
                  label="卸料方式"
                  min-width="200"
                >
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'list.' + $index + '.unloadingWay'"
                      :rules="tableForm.rules.unloadingWay"
                    >
                      <el-input
                        v-model="row.unloadingWay"
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
      :id="cliId"
      :visible.sync="isShowSuppliesDialog"
      :is-monthly-plan="true"
      :monthly-id="tableForm.monthPlanId"
      title="选择物资"
      @submitForm="submitForm"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OperationSuccessful from '../../components/operationSuccessful.vue'
import OperationFailure from '../../components/operationFailure.vue'
import SelectNode from '@/components/selectNode'
import SuppliesMonthlyPlanDialog from '../../components/suppliesMonthlyPlanDialog'
import { selectById, saveNeedPlan, submitNeedPlan } from '@/api/plan/needPlan'
import { computedTime } from '@/utils/index'
export default {
  name: 'ConcreteNeedPlan',
  components: {
    OperationSuccessful,
    OperationFailure,
    SelectNode,
    SuppliesMonthlyPlanDialog
  },
  data() {
    return {
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
      monthPlanId: null,
      projectName: '', // 项目名称
      queryParams: {},
      personnelList: [],
      tableForm: {
        list: [{}],
        rules: {
          volumeCalWay: [
            { required: true, message: '方量计算式不能为空', trigger: 'blur' }
          ],
          materialName: [
            { required: true, message: '物资名称不能为空', trigger: 'change' }
          ],
          markNum: [
            { required: true, message: '标号不能为空', trigger: 'blur' }
          ],
          planVolume: [
            { required: true, message: '计划方量不能为空', trigger: 'blur' },
            {
              type: 'number',
              min: 0.001,
              message: '输入的值必须大于0',
              trigger: 'blur'
            }
          ],
          collapseDegree: [
            { required: true, message: '塌落度不能为空', trigger: 'blur' }
          ],
          usePosition: [
            { required: true, message: '浇筑部位不能为空', trigger: 'blur' }
          ],
          useTime: [
            { required: true, message: '浇筑时间不能为空', trigger: 'change' }
          ],
          unloadingWay: [
            { required: true, message: '卸料方式不能为空', trigger: 'blur' }
          ]
        }
      },
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
    this.headerTitle = '工程实体需用计划'
    this.id = query.id
    this.tableForm.monthPlanId = Number(query.monthPlanId)
    this.tableForm.monthPlanType = Number(query.monthPlanType)
    this.tableForm.monthPlanName = query.monthPlanName
    this.tableForm.monthPlanCode = query.monthPlanCode
    this.tableForm.planMonth = Number(query.planMonth)
    this.tableForm.planYear = Number(query.planYear)
    this.tableForm.needPlanType = Number(query.needPlanType)
    if (this.id) {
      this.getDetail()
    } else {
      this.projectName = query.monthPlanName + '-' + query.monthPlanCode
    }
  },
  methods: {
    changeColl(row) {
      var pattern = /[0-9~-]/
      const rs = row.collapseDegree ? row.collapseDegree.split('') : []
      rs.forEach((item, index) => {
        if (!pattern.test(item)) {
          rs[index] = ''
        }
      })
      const string = rs.join('')
      this.$set(row, 'collapseDegree', string)
    },
    beyondMaximum(row) {
      if (row.planVolume > 999999999) {
        this.$message.warning('数量已超最大值')
        this.$set(row, 'planVolume', 999999999)
      }
    },
    // 表头添加必填
    addRedStar(h, { column }) {
      return [
        h('span', { style: 'color: red' }, '*'),
        h('span', ' ' + column.label)
      ]
    },
    getDetail() {
      this.loading = true
      selectById({ id: this.id }).then((res) => {
        const data = res.data
        data.planConcretes.forEach((item) => {
          this.useNumBlur(item)
        })
        this.tableForm = { ...this.tableForm, ...data }
        if (data.updateTime) {
          this.beforePresent = computedTime(data.updateTime)
        } else {
          this.beforePresent = computedTime(data.createTime)
        }
        this.processInstanceId = this.tableForm.processInstanceId
        this.projectName =
          this.tableForm.monthPlanName + '-' + this.tableForm.monthPlanCode
        this.tableForm.list = data.planConcretes
        this.loading = false
      })
    },
    // 点击选择物资
    focusInput(row, index) {
      this.isShowSuppliesDialog = true
      this.cliId = row.monthMaterialId
      this.cliIndex = index
      this.$refs['inputDialog'].blur()
    },
    useNumBlur(row) {
      if (row.overallNum > 0 && row.planVolume > 0) {
        if (row.planVolume > row.overallNum) {
          this.$message({
            message: `${row.materialName}的数量已超过对应总计划的物资可用数量`,
            type: 'warning'
          })
          this.$set(row, 'planVolume', row.overallNum)
        }
      }
      this.beyondMaximum(row)
    },
    handleClose() {
      this.cliId = null
    },
    // 选择物资
    submitForm(dataArr) {
      const data = dataArr[0]
      if (this.cliIndex >= 0) {
        this.tableForm.list.forEach((item, index) => {
          if (index === this.cliIndex) {
            this.$set(item, 'materialId', data.materialId)
            this.$set(item, 'monthMaterialId', data.id)
            this.$set(item, 'materialName', data.materialName)
            this.$set(item, 'markNum', data.specification)
            this.$set(item, 'unit', data.unit)
            this.$set(item, 'planVolume', data.availableNum)
            this.$set(item, 'availableNum', data.availableNum)
            this.$set(item, 'overallNum', data.overallNum)
            this.$set(item, 'overallMaterialId', data.overallMaterialId)
            // this.$set(item, 'availableNum', data.availableNum)
            this.$set(
              item,
              'usePosition',
              data.usePosition || data.planProgress
            )
          }
        })
      }
      if (dataArr.length > 1) {
        dataArr.forEach((item, index) => {
          if (index >= 1) {
            const obj = {
              materialId: item.materialId,
              monthMaterialId: item.id,
              materialName: item.materialName,
              markNum: item.specification,
              planVolume: item.availableNum,
              availableNum: item.availableNum,
              overallNum: item.overallNum,
              overallMaterialId: item.overallMaterialId,
              unit: item.unit,
              usePosition: item.usePosition || item.planProgress
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
                    items.markNum === item.markNum &&
                    items.materialId === item.materialId &&
                    items.unit === item.unit &&
                    items.usePosition === item.usePosition
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
    toBack() {
      this.$router.push({ path: '/plan/needPlan' })
    },
    // 选择人员
    selectPersonnel(data, isSelectNode) {
      this.isSelectNode = isSelectNode
      this.personnelList = data
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
          obj.planConcretes = this.tableForm.list
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
          data.planConcretes = this.tableForm.list
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
      this.tableForm.list.push({ type: '' })
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
.concreteNeedPlan_container {
  .concreteNeedPlanTop {
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
