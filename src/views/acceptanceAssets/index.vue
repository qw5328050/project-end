<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-if="getvIfDomHasPermi(['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:query','isAll'],'first')" label="收料列表" name="first" />
          <el-tab-pane v-if="getvIfDomHasPermi(['xm:menu:bs:material:purchase_manage:acceptance:return_list:query','isAll'],'second')" label="退换货列表" name="second" />
        </el-tabs>
      </div>
    </div>
    <div
      v-show="table"
      class="search-content"
      :class="{ 'show-height': anSearch }"
    >
      <!--      v-if="activeName === 'first'"-->
      <el-form ref="queryForm" :model="queryParams" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="发货单编号:" prop="type">
                  <el-input
                    v-model="queryParams.deliveryNo"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="收料单位:" prop="type">
                  <el-input
                    v-model="queryParams.projectName"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="供应商厂家:" prop="type">
                  <el-input
                    v-model="queryParams.supplierName"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="合同编号:" prop="type">
                  <el-input
                    v-model="queryParams.contractCode"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button
                @click="handerReset"
              >重置</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:reset']"-->
              <el-button
                type="primary"
                @click="handleQuery"
              >查询</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:query']"-->
              <el-button
                v-if="!anSearch"
                type="text"
                @click="changeAnSearch"
              >展开<i
                class="el-icon-arrow-down"
              /></el-button>
              <el-button
                v-else
                type="text"
                @click="changeAnSearch"
              >收起<i
                class="el-icon-arrow-up"
              /></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div
      v-show="!table"
      class="search-content"
      :class="{ 'show-height': anSearch }"
    >
      <!--      v-if="activeName === 'second'"-->
      <el-form ref="queryForm" :model="queryParams" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="退换货单编号:" prop="type">
                  <el-input
                    v-model="queryParams1.returnCode"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="原收料单编号:" prop="type">
                  <el-input
                    v-model="queryParams1.receiptCode"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="原发货单编号:" prop="type">
                  <el-input
                    v-model="queryParams1.deliveryNo"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <!--              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">-->
              <!--                <el-form-item label="状态:" prop="type">-->
              <!--                  <el-select-->
              <!--                    v-model="queryParams1.returnStatus"-->
              <!--                    placeholder="请选择"-->
              <!--                    style="width: 100%"-->
              <!--                    clearable-->
              <!--                  >-->
              <!--                    <el-option-->
              <!--                      v-for="item in options"-->
              <!--                      :key="item.value"-->
              <!--                      :label="item.label"-->
              <!--                      :value="item.value"-->
              <!--                    />-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button
                @click="handerReset"
              >重置</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:return_list:reset']"-->
              <el-button
                type="primary"
                @click="handleQuery1"
              >查询</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:return_list:query']"-->
              <el-button
                v-if="!anSearch"
                type="text"
                @click="changeAnSearch"
              >展开<i
                class="el-icon-arrow-down"
              /></el-button>
              <el-button
                v-else
                type="text"
                @click="changeAnSearch"
              >收起<i
                class="el-icon-arrow-up"
              /></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-box">
      <div class="table-content">
        <div class="table-header">
          <div class="table-title">{{ tableName }}</div>
          <div class="table-col">
            <el-button
              v-show="table"
              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:print']"
              @click="printOrder"
            > 打印 </el-button>
            <el-button
              v-show="table"
              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:export']"
              class="buttonRight"
              @click="importPreOrderList"
            > 导出 </el-button>
            <el-button
              v-show="!table"
              v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:return_list:export']"
              class="buttonRight"
              @click="importPreOrderList"
            > 导出 </el-button>
            <!-- <div v-if="!table" class="tablePrimary" /> -->
            <right-toolbar
              v-show="table"
              :columns="columns"
              @queryTable="getLists"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
            <right-toolbar
              v-show="!table"
              :columns="preColumns"
              @queryTable="returnOrChangeList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <el-table
          v-show="!table"
          key="退换货列表"
          v-loading="loading"
          border
          :data="ChangeList"
          element-loading-text="Loading"
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          style="margin-top: 26px"
          @selection-change="normalOrderHandleSelectionChange"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
            align="center"
          />
          <el-table-column
            v-if="preColumns[0].visible"
            key="0"
            align="center"
            label="序号"
            width="80"
            fixed="left"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="preColumns[1].visible"
            key="1"
            label="类型"
            prop="returnType"
            width="150"
          >
            <template slot-scope="{ row }">
              <div v-if="row.returnType == 1">退货</div>
              <div v-if="row.returnType == 2">换货</div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="preColumns[2].visible"
            key="2"
            label="退换货单编号"
            width="150"
            prop="returnCode"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="detailReturn(row.returnCode)">{{
                row.returnCode
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="preColumns[3].visible"
            key="3"
            label="原收料单编号"
            prop="receiptCode"
            width="150"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="toSlDetails(row.receiptId)">{{
                row.receiptCode
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="preColumns[4].visible"
            key="4"
            label="原发货单编号"
            prop="deliveryNo"
            width="150"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="toDetails(row.deliveryId)">{{
                row.deliveryNo
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="preColumns[5].visible"
            key="5"
            label="送货人姓名"
            prop="returnOperator"
            width="150"
          />
          <el-table-column
            v-if="preColumns[6].visible"
            key="6"
            label="联系电话"
            prop="returnOperatorPhone"
            width="150"
          />
          <el-table-column
            v-if="preColumns[7].visible"
            key="7"
            label="状态"
            prop="returnStatus"
            width="150"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass4(row)" />
                <span>{{
                  getDictionaryLabel(row.returnStatus, 'ReturnStatus')
                }}</span>
              </div>
            </template>
            <!--            prop="returnStatusStr"-->
          </el-table-column>
          <el-table-column
            v-if="preColumns[8].visible"
            key="8"
            label="退换货日期"
            prop="returnDate"
            width="150"
            sortable
          />
          <el-table-column
            v-if="preColumns[9].visible"
            key="9"
            label="是否结算"
            prop="isSettlement"
            width="100"
          ><template slot-scope="{ row }">
            <div v-if="row.isSettlement == 0">否</div>
            <div v-if="row.isSettlement == 1">是</div>
          </template>
          </el-table-column>
          <el-table-column
            v-if="preColumns[10].visible"
            key="10"
            fixed="right"
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.returnStatus==1"
                v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:return_list:edit']"
                size="mini"
                type="text"
                @click="editReturn(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="table"
          key="收料"
          v-loading="loading"
          border
          :data="list"
          element-loading-text="Loading"
          :size="size"
          :header-row-class-name="() => 'headerClass'"
          style="margin-top: 26px"
          @selection-change="preOrderHandleSelectionChange"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
            align="center"
          />
          <el-table-column
            v-if="columns[0].visible"
            key="0"
            align="center"
            label="序号"
            width="80"
            fixed="left"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[17].visible"
            key="17"
            label="收料单编号"
            prop="receiptCode"
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="toSlDetails(row.id)">{{
                row.receiptCode
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="发货单编号"
            prop="deliveryNo"
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="toDetails(row.deliveryId)">{{
                row.deliveryNo
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="供应商厂家"
            prop="supplierName"
            show-overflow-tooltip
            min-width="120"
          />
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="合同编号"
            prop="contractCode"
            min-width="120"
            show-overflow-tooltip
          />
          <!--          show-overflow-tooltip-->
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="收料员"
            prop="receiverName"
          />
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            label="车牌号"
            prop="plateNumber"
            width="90"
          />
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            label="收料单位"
            prop="projectName"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="收料单金额(元)"
            prop="receiptAmount"
            header-align="left"
            align="right"
            width="120"
          />
          <el-table-column
            v-if="columns[8].visible"
            key="8"
            label="发货日期"
            prop="deliveryDate"
            width="150"
            sortable
          />
          <el-table-column
            v-if="columns[9].visible"
            key="9"
            label="收货日期"
            prop="receiveDate"
            width="160"
            sortable
          />
          <el-table-column
            v-if="columns[18].visible"
            key="18"
            label="录入状态"
            prop="editStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass(row)" />
                <span>{{
                  getDictionaryLabel(row.editStatus, 'editStatus')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[19].visible"
            key="19"
            label="验收状态"
            prop="receiveStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass1(row)" />
                <span>{{
                  getDictionaryLabel(row.receiveStatus, 'receiveStatus')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[12].visible"
            key="12"
            label="有无变更"
            prop="hasModifyLog"
          ><template slot-scope="{ row }">
            <div
              v-if="row.hasModifyLog == 1"
              class="checkAlteration"
              @click="checkAlteration(row)"
            >
              变更详情
            </div>
            <div v-if="row.hasModifyLog == 0">无变更</div>
          </template>
          </el-table-column>
          <el-table-column
            v-if="columns[20].visible"
            key="20"
            label="供应商确认"
            prop="supplierCheckStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass2(row)" />
                <span>{{
                  getDictionaryLabel(row.supplierCheckStatus, 'supplierCheckStatus')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[13].visible"
            key="13"
            label="状态"
            prop="lockStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass3(row)" />
                <span>{{
                  getDictionaryLabel(row.lockStatus, 'lockStatus')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[21].visible"
            key="21"
            label="审批状态"
            prop="approvalStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass5(row)" />
                <span>{{
                  getDictionaryLabel(row.approvalStatus, 'approval_status')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[14].visible"
            key="14"
            label="打印次数"
            prop="printCount"
          />
          <el-table-column
            v-if="columns[15].visible"
            key="15"
            label="验收人数"
            prop="signerNum"
          />
          <el-table-column
            v-if="columns[16].visible"
            key="16"
            fixed="right"
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <!-- <div class="action-box"> -->
              <el-button
                v-show="scope.row.lockStatus == 0"
                v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:edit']"
                size="mini"
                type="text"
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button
                v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:resurn']"
                size="mini"
                type="text"
                @click="retreat(scope.row)"
              >退货</el-button>
              <el-button
                v-show="scope.row.lockStatus == 1 && scope.row.approvalStatus != 2"
                v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:unlock']"
                size="mini"
                type="text"
                @click="deblocking(scope.row)"
              >解锁</el-button>
              <el-button
                v-show="scope.row.approvalStatus != 1 && scope.row.approvalStatus != null"
                v-hasPermi="['xm:menu:bs:material:purchase_manage:acceptance:approvals']"
                size="mini"
                type="text"
                @click="showDetail(scope.row)"
              >审批进度</el-button>
              <!-- <el-popover trigger="hover" placement="top">
                <el-button
                  size="mini"
                  type="text"
                  @click="edit(scope.row)"
                >编辑</el-button>
                <span
                  slot="reference"
                  class="name-wrapper"
                  style="font-size: 24px"
                >...</span>
              </el-popover> -->
              <!-- </div> -->
            </template>
          </el-table-column>
        </el-table>
        <div v-show="total > 0 && table == true" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams.page }}/{{
              Math.ceil(total / queryParams.rows)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.rows"
            @pagination="getLists"
          />
        </div>
        <div v-show="total > 0 && table == false" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams1.page }}/{{
              Math.ceil(total / queryParams1.rows)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="total"
            :page.sync="queryParams1.page"
            :limit.sync="queryParams1.rows"
            @pagination="returnOrChangeList"
          />
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- <indexDialog
      :visible.sync="isShow"
      title="发货单"
      :interview-id="interviewId"
      :prop-data="propData"
      @submitForm="submitForm"
    /> -->
    <print-order
      :visible.sync="isPrint"
      :print-data="printData"
    />
    <!--    <div v-if="!isApproveShow && !submitSuccess">-->
    <!--    <el-dialog-->
    <!--      title="审批"-->
    <!--      :visible.sync="dialogVisible"-->
    <!--      width="60%"-->
    <!--      >-->
    <!--      <SelectNode-->
    <!--        :is-radio="true"-->
    <!--        :alteration="alteration"-->
    <!--        :process-key="processKey"-->
    <!--        @selectPersonnel="selectPersonnel"-->
    <!--      />-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
    <!--    </span>-->
    <!--    </el-dialog>-->
    <el-dialog
      :title="processView.title"
      :visible.sync="processView.open"
      width="50%"
      append-to-body
    >
      <div v-if="processView.open">
        <approve-detail :info="info" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ApproveDetail from '@/views/plan/components/approveDetail'
// import ApprovalProgress from '@/views/plan/components/approvalProgress'
// import SelectNode from '@/components/selectNode'
import printOrder from '@/views/purchase/acceptance/printOrder/index.vue'
import { vIfDomHasPermi } from '@/utils'
import { mapGetters } from 'vuex'
import { chineseNumber } from '@/utils/validate'
import {
  getLists,
  returnOrChangeList,
  returnOrChangeListExport,
  exportReceiptList,
  printReceipt
} from '@/api/contractManagement/material'
export default {
  name: 'AcceptanceIndex',
  components: { printOrder, ApproveDetail },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  data() {
    return {
      dialogVisible: false,
      alteration: 1,
      chineSize: chineseNumber,
      processKey: 'process_cez0vrrd',
      printData: [], // 订单打印数据
      isPrint: false,
      total: 0, // 总条数
      interviewId: '',
      propData: [],
      isShow: false,
      size: 'medium', // 表格的密度
      title: '', // 标题
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `发货单编号`, visible: true },
        { key: 2, label: `供应商厂家`, visible: true },
        { key: 3, label: `合同编号`, visible: true },
        { key: 4, label: `收料员`, visible: true },
        { key: 5, label: `车牌号`, visible: true },
        { key: 6, label: `收料单位`, visible: true },
        { key: 7, label: `收料单金额`, visible: true },
        { key: 8, label: `发货日期`, visible: true },
        { key: 9, label: `收货日期`, visible: true },
        { key: 10, label: `是否结算`, visible: true },
        { key: 11, label: `验收状态`, visible: true },
        { key: 12, label: `有无变更`, visible: true },
        { key: 13, label: `状态`, visible: true },
        { key: 14, label: `打印次数`, visible: true },
        { key: 15, label: `打印次数`, visible: true },
        { key: 16, label: `操作`, visible: true },
        { key: 17, label: `收料单编号`, visible: true },
        { key: 18, label: `录入状态`, visible: true },
        { key: 19, label: `验收状态`, visible: true },
        { key: 20, label: `供应商确认`, visible: true },
        { key: 21, label: `审批记录`, visible: true }
      ], // 显隐列
      preColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `类型`, visible: true },
        { key: 2, label: `退换货单编号`, visible: true },
        { key: 3, label: `原收料单编号`, visible: true },
        { key: 4, label: `原发货单编号`, visible: true },
        { key: 5, label: `送货人姓名`, visible: true },
        { key: 6, label: `联系电话`, visible: true },
        { key: 7, label: `状态`, visible: true },
        { key: 8, label: `退换货日期`, visible: true },
        { key: 9, label: `是否结算`, visible: true },
        { key: 10, label: `操作`, visible: true }
      ], // 显隐列
      tableName: '收料列表', // table的名字
      table: true, // 显示tab切换
      headerTitle: '', // 头部标题
      projectName: '深圳市龙岗区耳鼻喉医院迁址重建工程', // 项目名称
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      queryParams: {
        // 查询参数
        rows: 10,
        page: 1
      }, // 收料
      queryParams1: {
        rows: 10,
        page: 1
      }, // 退货
      activeName: 'first',
      list: [], // 表格数据
      ChangeList: [], // 表格数据
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      options: [
        // 测试下拉数据
        { value: 1, label: '草稿' },
        { value: 2, label: '待确认' },
        { value: 3, label: '待修改' },
        { value: 4, label: '已锁定' }
      ],
      selPreOrdetData: [],
      selNormalOrdetData: [],
      processView: {
        title: '审批详情',
        open: false
      },
      info: {}
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '物资验收管理'
    // console.log(this.$route.params.clickStatus,"==================")
    if (
      this.$route.params.clickStatus !== undefined &&
      this.$route.params.clickStatus !== -1
    ) {
      if (this.$route.params.clickStatus + '' === '0') {
        this.activeName = 'second'
        this.tableName = '退换货列表'
        this.table = false
      } else {
        this.activeName = 'first'
        this.tableName = '收料列表'
        this.table = true
      }
    }
  },
  created() {
    this.getLists()
  },
  methods: {
    // 审批进度
    showDetail(row) {
      this.info.processDefinitionId = row.processDefinitionId
      this.info.processInstanceId = row.processInstanceId
      this.processView.open = true
    },
    // 权限
    getvIfDomHasPermi(value, type) {
      if (type === 'first') {
        if (vIfDomHasPermi(value)) {
          this.activeName = 'first'
          // this.table = false
        } else {
          this.activeName = 'second'
          this.table = true
        }
      }
      return vIfDomHasPermi(value)
    },
    // getvIfDomHasPermi(value) {
    //   return vIfDomHasPermi(value)
    // },
    // 打印收料订单
    printOrder() {
      if (this.selPreOrdetData === null || this.selPreOrdetData.length === 0) {
        this.$message.warning('请先选择需要打印的收料订单')
        return
      }
      const ids = []
      this.selPreOrdetData.forEach((item) => {
        ids.push(item.id)
      })
      // 获取打印数据
      printReceipt({ idList: ids }).then((res) => {
        this.printData = res.data
        if (this.printData && this.printData !== null) {
          this.printData.forEach((item) => {
            item.countPrice = this.chineSize(item.receiptAmount)
          })
        }
        this.getLists()
      })
      this.isPrint = true
    },
    // 导出
    importPreOrderList() {
      // 收料导出
      if (this.table) {
        // if (
        //   this.selPreOrdetData === null ||
        //   this.selPreOrdetData.length === 0
        // ) {
        //   this.$message.warning("请选择所需要导出的数据");
        //   return;
        // }
        this.loading = true
        const ids = []
        this.selPreOrdetData.forEach((item) => {
          ids.push(item.id)
        })
        exportReceiptList({ idList: ids, ...this.projectInformation }).then((response) => {
          // const blob = new Blob([response], {
          //   type: "application/vnd.ms-excel",
          // });
          // const url = window.URL || window.webkitURL || window.moxURL;
          // const downloadHref = url.createObjectURL(blob);
          // const downloadLink = document.createElement("a");
          // downloadLink.href = downloadHref;
          // downloadLink.download = `收料列表.xlsx`;
          // downloadLink.click();
          this.loading = false
        })
      } else {
        // 退换货导出
        // if (
        //   this.selNormalOrdetData === null ||
        //   this.selNormalOrdetData.length === 0
        // ) {
        //   this.$message.warning("请选择所需要导出的数据");
        //   return;
        // }
        this.loading = true
        const ids = []
        this.selNormalOrdetData.forEach((item) => {
          ids.push(item.id)
        })
        returnOrChangeListExport({ idList: ids, ...this.projectInformation }).then((response) => {
          // const blob = new Blob([response], {
          //   type: "application/vnd.ms-excel",
          // });
          // const url = window.URL || window.webkitURL || window.moxURL;
          // const downloadHref = url.createObjectURL(blob);
          // const downloadLink = document.createElement("a");
          // downloadLink.href = downloadHref;
          // downloadLink.download = `退换货列表.xlsx`;
          // downloadLink.click();
          this.loading = false
        })
      }
    },
    // 收料单多选
    preOrderHandleSelectionChange(val) {
      // 收料单选中
      this.selPreOrdetData = val
    },
    // 退换货多选
    normalOrderHandleSelectionChange(val) {
      // 退换货选中
      this.selNormalOrdetData = val
    },
    // 返回颜色
    getClass(row) {
      switch (row.editStatus) {
        case 0:
          return 'forbidden'
        case 1:
          return 'normal'
      }
    },
    getClass1(row) {
      switch (row.receiveStatus) {
        case 0:
          return 'forbidden'
        case 1:
          return 'normal'
      }
    },
    getClass2(row) {
      switch (row.supplierCheckStatus) {
        case 0:
          return 'forbidden'
        case 1:
          return 'normal'
      }
    },
    getClass3(row) {
      switch (row.lockStatus) {
        case 0:
          return 'forbidden'
        case 1:
          return 'normal'
      }
    },
    getClass4(row) {
      switch (row.returnStatus) {
        case 1:
          return 'draft'
        case 2:
          return 'rejected'
        case 3:
          return 'approval'
        case 4:
          return 'forbidden'
      }
    },
    getClass5(row) {
      switch (row.approvalStatus) {
        case 2:
          return 'approval'
        case 3:
          return 'normal'
        case 4:
          return 'forbidden'
        case 5:
          return 'rejected'
      }
    },
    // 根据条件分页查询收料单
    getLists() {
      this.loading = true
      getLists({ ...this.queryParams, ...this.projectInformation })
        .then((res) => {
          this.list = res.data.list
          this.total = res.data.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 退/换货列表
    returnOrChangeList() {
      this.loading = true
      returnOrChangeList({ ...this.queryParams1, ...this.projectInformation })
        .then((res) => {
          this.ChangeList = res.data.list
          this.total = res.data.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 查看收货项目弹窗
    dispatch(row, type) {
      this.interviewId = row.id
      this.propData = row
      this.isShow = true
    },
    // 退换货详情
    detailReturn(returnCode) {
      this.$router.push({
        path: '/purchase/details',
        query: { returnCode: returnCode }
      })
    },
    // 收料单详情
    toSlDetails(id) {
      this.$router.push({
        path: '/purchase/checkReceipt',
        query: { id: id }
      })
    },
    // 发货单详情
    toDetails(deliveryId) {
      this.$router.push({
        path: '/purchase/deliver',
        query: { id: deliveryId }
      })
    },
    detailS(row) {
      this.$router.push({
        path: '/purchase/details',
        query: { id: row.id }
      })
    },
    // 查看变更
    checkAlteration(row) {
      this.$router.push({
        path: '/purchase/checkAlteration',
        query: { id: row.id }
      })
    },
    // 解锁
    deblocking(row) {
      this.$router.push({
        path: '/purchase/examine',
        query: { id: row.id }
      })
      // var that = this
      // that.$confirm('是否解锁该项目?', '警告', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     return unlockReceipt({
      //       receiptId: row.id,
      //     })
      //   })
      //   .then(() => {
      //     that.$message.success('解锁成功!')
      //     that.getLists()
      //   })
    },
    resetColumns() {},
    // 收料编辑跳转页面
    edit(row) {
      this.$router.push({ path: '/purchase/receipt', query: { id: row.id }})
    },
    // 退货单编辑跳转页面
    editReturn(row) {
      // 填写退换货单据
      let clickStatus = 0
      if (this.table) {
        clickStatus = 1
      }
      this.$router.push({
        path: '/purchase/retreat',
        query: { id: row.receiptId, clickStatus: clickStatus }
      })
    },
    // 填写退换货单据
    retreat(row) {
      this.$router.push({ path: '/purchase/retreat', query: { id: row.id }})
    },
    // 下单跳转页面
    orders() {
      this.$router.push({ path: '/purchase/placeOrder' })
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    getList() {
      // 请求数据列表
      // console.log('执行了')
    },
    submitForm() {
      this.isShow = false
      this.isShow_Development = false
      this.isShow_Cancellation = false
    },
    // tab切换
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.table = true
        this.getLists()
        this.tableName = '收料列表'
      } else {
        this.table = false
        this.returnOrChangeList()
        this.tableName = '退换货列表'
      }
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 重置
    handerReset() {
      this.queryParams = {
        page: 1,
        rows: 10
      }
      this.queryParams1 = {
        page: 1,
        rows: 10
      }
      this.getLists()
      this.returnOrChangeList()
    },
    // 查询
    handleQuery() {
      this.queryParams.page = 1
      this.getLists()
    },
    // 查询
    handleQuery1() {
      this.queryParams1.page = 1
      this.returnOrChangeList()
    }
  }
}
</script>

<style lang="scss" scoped>
.needPlanTop {
  background: #fff;
  padding-left: 32px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  .project {
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    display: flex;
    padding-bottom: 16px;
    align-items: center;
    .switch_svg {
      margin-left: 8px;
      font-size: 24px;
    }
  }
}
.action-box {
  color: #1791ff;
  display: flex;
  justify-content: space-between;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
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
  .search-content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 70px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: end;
    }
  }
  .show-height {
    height: auto;
  }
  .table-box {
    /*height: 680px;*/
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table-content {
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
        /*position: absolute;*/
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
  .footer {
    width: 100%;
    margin-top: 16px;
    padding-left: 40px;
    padding-right: 24px;
    box-sizing: border-box;
    height: 64px;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
  }
}
.table-col {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.popoverIoc {
  margin-left: 8px;
  font-size: 16px;
  color: #1791ff;
}
.tablePrimary {
  height: 40px;
  background-color: #fff;
  width: 30px;
}
.buttonRight {
  margin-right: 8px;
}
.checkAlteration {
  color: #409eff;
  cursor: pointer;
}
.planStatus {
  display: flex;
  align-items: center;
  .box {
    width: 7px;
    height: 7px;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 8px;
  }
  .draft {
    background: #bfbfbf;
  }
  .approval {
    background: #1791ff;
  }
  .normal {
    background: #00cc33;
  }
  .rejected {
    background: #faad14;
  }
  .forbidden {
    background: red;
  }
}
</style>
