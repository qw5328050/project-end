<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <span
        class="totalPlanTopSize"
      >您将作废总结算单：{{
        this.$route.query.totalNo || '--'
      }}，请选择需要调量的收料单：</span>
    </div>
    <el-form
      ref="form"
      :model="forms"
      :rules="rules"
      style="margin-top: 20px"
    >
    <div class="table-box">
      <div class="table-content">
        <div class="table-header">
          <div class="table-title">收料单列表</div>
        </div>
        <el-table
          v-loading="loading"
          :data="forms.list"
          element-loading-text="Loading"
          border stripe
          :header-row-class-name="() => 'headerClass'"
          style="margin-top: 26px"
        >
          <el-table-column align="center" label="序号" width=50>
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="供货月份" prop="submitTime" />
          <el-table-column label="收料单编号" prop="receiptCode" />
          <el-table-column label="物资种类" prop="type">
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.type, 'type') }}
            </template>
          </el-table-column>
          <el-table-column label="供货数量" prop="supplyQuantity">
            <template slot-scope="{ row ,$index }">
              <div v-if="row.show == false">{{ row.Quantity }}</div>
              <div v-if="row.show == true" class='supplyQuantity'>
                  <el-form-item :prop="`list.${$index}.supplyQuantity`" :rules="rules.supplyQuantity">
                  <el-input
                    v-model="row.supplyQuantity"
                    placeholder="请输入"
                    style='width:150px;'
                  />
                </el-form-item>  
              </div>
            </template>
          </el-table-column>
          <el-table-column label="网价（元）" prop="referenceNetPrice">
            <template slot-scope="{ row }">
              <div>{{ row.referenceNetPrice || '--' }}</div>
            </template>
          </el-table-column>
          <el-table-column key="10" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="settleMent(scope.row, scope.$index)"
              >调量</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams.page }}/{{
              Math.ceil(total / queryParams.rows)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 30]"
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.rows"
            @pagination="listOrder"
          />
        </div>
      </div>
    </div>
    </el-form>
    <div class="butBox">
      <div class="rowBox">
        <el-button size="mini" @click="back">取消</el-button>
        <el-button type="primary" size="mini" @click="save">作废重开</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  listAdjustmentByTotalOrder,
  saveReopenSettlementOrder
} from '@/api/lumpsum/test'
import { checkNum } from '@/utils'
export default {
  name: '',
  data() {
    return {
      queryParams: {
        page: 1,
        rows: 10
      },
      loading: false,
      total: 0,
      from: {},
      forms:{
        list: [], // 表格数据
      },
      table: [], // 选中的数据
      DuplicateDelete: [], // 操作选择的数据
      rules: {
        supplyQuantity: [
          { required: true, trigger: 'blur',validator: checkNum}
        ] 
      }
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '作废重开'
    var id = this.$route.query.id
    this.$set(this.queryParams, 'orderIds', id)
  },
  created() {
    this.listOrder()
  },
  methods: {
    back() {
      this.$router.push({
        path: '/settlement/abschluss',
        query: { activeName: 'second' }
      })
    },
    // 保存
    save() {
      var that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (that.DuplicateDelete.length === 0) {
            that.$message('请选择调量的收料单')
            return
          }
          that.$confirm('是否确认作废重开收料单?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              that.from.settlementOrderId = that.$route.query.id // 上个页面传的结算单的id
              that.from.reOpenTotalOrderDTOS = that.DuplicateDelete.map((item) => {
                return {
                  amount: item.supplyQuantity,
                  orderNo: item.orderNo,
                  receiptCode: item.receiptCode,
                  receiptFlag: item.receiptFlag,
                  receiptItemId: item.receiptItemId,
                  referenceNetPrice: item.referenceNetPrice
                }
              })
              saveReopenSettlementOrder(that.from).then((res) => {
                that.$message('操作成功')
                that.$router.push({
                  path: '/settlement/abschluss',
                  query: { activeName: 'second' }
                })
              })
            })
        }  
      })

      
    },
    // 调量
    settleMent(row, rowIndex) {
      row.show = !row.show
      this.amount(row)
      this.$set(this.forms.list, rowIndex, row)
    },
    // 处理选中的数据
    amount(row) {
      if (row.show === true) {
        this.table.push(row)
        var arr = this.table
        const newArr = arr.map((value) => value)
        // 将这个数组去重
        const DuplicateDelete = new Set(newArr)
        this.DuplicateDelete = [...DuplicateDelete]
      } else {
        const idx = this.DuplicateDelete.findIndex((itm) => {
          return itm.receiptItemId === row.receiptItemId
        })
        this.DuplicateDelete.splice(idx, 1)
      }
    },
    // 总结算作费重开选择月度列表
    listOrder() {
      this.loading = true
      listAdjustmentByTotalOrder(this.queryParams).then((res) => {
        if (res.status === 200) {
          if (res.data) {
            this.forms.list = res.data.list
            if (res.data.list) {
              this.forms.list.forEach((value, index) => {
                value['show'] = false // 显示是否调价
                value['Quantity'] = value.supplyQuantity // 记录老的数量
                value['NetPrice'] = value.referenceNetPrice // 记录老的网价
              })
            }
            this.total = res.data.total
            this.loading = false
          } else {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding: 10px 0 10px 32px;
    color: rgba(0, 0, 0, 0.85);
  }
  .totalPlanTopSize {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
    line-height: 28px;
  }
}
.table-box {
  height: 550px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  .table-content {
    margin-top: 16px;
    width: 100%;
    height: 100%;
    padding: 16px 24px 0 24px;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .table-title {
        font-size: 16px;
        font-weight: 400;
        color: #000000;
      }
    }
    .pagination {
      width: 97%;
      height: 64px;
      display: flex;
      position: absolute;
      bottom: 0;
      align-items: center;
      justify-content: space-between;
      .pageNumberRecord {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
.butBox {
  background: #ffffff;
  box-shadow: 0px -2px 8px 0px rgba(0, 41, 102, 0.08);
  margin-top: 6px;
  .rowBox {
    padding: 12px 36px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-end;
  }
}
</style>
