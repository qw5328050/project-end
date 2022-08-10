<template>
  <div class="details-container">
    <el-form ref="form" :model="form" :rules="rules">
      <Panel title="基本信息">
        <el-row :gutter="24">
          <el-col v-for="(v, i) in basicColumns" :key="i" :span="8">
            <el-form-item width="90" :label="v.label" :prop="v.key">
              <el-input
                v-if="['input'].includes(v.type)"
                v-model="form[v.key]"
                :disabled="v.disabled"
                type="input"
              />
              <el-input
                v-else-if="['number'].includes(v.type)"
                v-model="form[v.key]"
                onkeyup="value=value.replace(/[^\d]/g,'')"
                :disabled="v.disabled"
                type="input"
              />
              <el-date-picker
                v-else
                v-model="form[v.key]"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                type="date"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </Panel>
      <Panel title="收货方信息">
        <el-row :gutter="24">
          <el-col v-for="(v, i) in reciveColumns" :key="i" :span="8">
            <el-form-item width="90" :label="v.label" :prop="v.key">
              <el-input
                v-if="v.type === 'input'"
                v-model="form[v.key]"
                :disabled="v.disabled"
              />
              <el-select
                v-else
                v-model="form.person"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Panel>
      <Panel title="物资信息">
        <div v-show="selectedRowKeys.length" class="check-desc">
          <svg-icon class="email-btn" icon-class="checked" />
          已选 {{ selectedRowKeys.length }} 项
          <!-- <a class="fr" @click="$refs.table.clearSelection()">删除</a> -->
        </div>
        <!-- 表格 -->
        <el-table
          ref="table"
          :data="form.data"
          :row-key="rowKey"
          style="width: 100%"
          class="mt16"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" width="90" label="物资名称" />
          <el-table-column
            prop="planSpecification"
            width="90"
            label="规格/型号"
          />
          <el-table-column prop="num" width="140" label="发货数量">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`data.${$index}.num`"
                :rules="[
                  { required: true, message: '请输入发货数量', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model="row.num"
                  type="number"
                  placeholder="请输入"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="unit" width="90" label="单位" />
          <el-table-column
            prop="taxIncludeUnitPrice"
            width="140"
            label="含税单价（元）"
          />
          <el-table-column
            prop="taxReduceUnitPrice"
            width="90"
            label="除税单价(元)"
          />
          <el-table-column prop="taxRate" width="90" label="税率(%)" />
          <el-table-column prop="taxes" width="90" label="税金(元)" />
          <el-table-column prop="certificate" width="140" label="合格证号">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`data.${$index}.certificate`"
                :rules="[
                  { required: true, message: '请输入合格证号', trigger: 'blur' }
                ]"
              >
                <el-input v-model="row.certificate" placeholder="请输入" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="brand" width="140" label="品牌">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`data.${$index}.brand`"
                :rules="[
                  { required: true, message: '请输入品牌', trigger: 'blur' }
                ]"
              >
                <el-input v-model="row.brand" placeholder="请输入" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" width="140" label="备注">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`data.${$index}.remark`"
                :rules="[
                  { required: true, message: '请输入备注', trigger: 'blur' }
                ]"
              >
                <el-input v-model="row.count" placeholder="请输入" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="actions" label="操作" width="60" fixed="right">
            <template slot-scope="{ $index }">
              <a @click="handlRemove($index)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </Panel>
    </el-form>
    <el-row id="sunmit-footer" type="flex" justify="end">
      <el-button
        :disabled="loading.submit || loading.add"
        @click="handleCancel"
      >取消</el-button>
      <el-button
        :disabled="loading.submit"
        :loading="loading.add"
        @click="handleOk({ key: 'add' })"
      >保存</el-button>
      <el-button
        type="primary"
        :disabled="loading.add"
        :loading="loading.submit"
        @click="handleOk({ key: 'submit' })"
      >提交</el-button>
    </el-row>
  </div>
</template>
<script>
const basicColumns = [
  { label: '发货单编号', key: 'deliveryNo', type: 'input', disabled: true },
  {
    label: '采购单编号',
    key: 'normalOrderCode',
    type: 'input',
    disabled: true
  },
  { label: '供应商/厂家', key: 'supplierName', type: 'input', disabled: true },
  { label: '发货车牌号', key: 'plateNumber', type: 'input' },
  { label: '送货人姓名', key: 'deliverName', type: 'input' },
  { label: '送货人联系电话', key: 'deliverTel', type: 'number' },
  { label: '发货日期', key: 'deliveryDate', type: 'date' },
  { label: '备注', key: 'remark', type: 'input' }
]
const reciveColumns = [
  { label: '单位', key: 'organizationId', type: 'input', disabled: true },
  { label: '收料单位', key: 'projName', type: 'input', disabled: true },
  { label: '材料工程师', key: 'receiveEngineer', type: 'input' }
]
const rules = {}
const ruleList = basicColumns
  .slice(3, basicColumns.length - 1)
  .concat(reciveColumns.slice(2, reciveColumns.length))
for (const v of ruleList) {
  const rule = { required: true, message: '请填入' + v.label, trigger: 'blur' }
  rules[v.key] = [rule]
}
import { placeOrderDetail } from '@/api/supplier/ship/purchase'
import {
  getSelectRoleUsers,
  placeDeliverAdd,
  placeDeliverCommitOrder
} from '@/api/supplier/ship/index'
export default {
  name: 'PurchaseDetails',
  components: {
    Panel: () => import('@/components/Panel')
  },
  props: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 24 * 1000
        }
      },
      basicColumns: Object.freeze(basicColumns),
      reciveColumns: Object.freeze(reciveColumns),
      rules: Object.freeze(rules),
      form: { data: [] },
      loading: {
        add: false,
        submit: false
      },
      rowKey: 'id',
      selectedRowKeys: [],
      userList: []
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    async initData() {
      getSelectRoleUsers({ roleId: 1 }).then((res) => {
        this.userList = res.data
      })
      const res = await placeOrderDetail({ id: this.id })
      this.form = Object.assign({}, this.form, {
        ...res.data,
        date: '',
        data: res.data.prucNormalOrderItemDetailVOS
      })
      delete this.form.prucNormalOrderItemDetailVOS
    },
    handleOk({ key }) {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        const data = {}
        Object.assign(data, { detailList: this.form.data })
        for (const v of basicColumns.concat(reciveColumns)) {
          data[v.key] = this.form[v.key] || ''
        }
        this.loading = true
        const eventObj = {
          add: placeDeliverAdd, // 保存
          submit: placeDeliverCommitOrder // 提交
        }
        eventObj[key]
          .call(null, data)
          .then(() => {
            this.$message.success('操作成功！')
            this.handleCancel()
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    handlRemove(index) {
      if (this.form.data.length <= 1) {
        this.$message.error('必须有一项物资！')
        return
      }
      this.form.data.splice(index, 1)
    },
    handleCancel() {
      this.$router.push('/ship/purchase')
      this.$refs.form.resetFields()
    },
    handleSelectionChange(val) {
      this.selectedRowKeys = val.map((i) => i[this.rowKey])
    }
  }
}
</script>
<style lang="scss" scoped>
.details-container {
  padding-bottom: 16px;
  .check-desc {
    padding: 9px 16px;
    color: #595959;
    font-size: 14px;
    background: #edf7ff;
    border: 1px solid #74bdff;
    .fr {
      float: right;
    }
  }
}
</style>
<style lang="scss" scoped>
#sunmit-footer {
  z-index: 1000;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  background: white;
  padding: 16px 24px;
}
a {
  color: #1791ff;
  cursor: pointer;
}
</style>
