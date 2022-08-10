<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="tabActive" @tab-click="handleClick">
          <el-tab-pane v-if="getvIfDomHasPermi(['xm:menu:bs:material:purchase_manage:order:pending_list:query','isAll'],'first')" label="待采购列表" name="first" />
          <el-tab-pane label="待选择供应商列表页" name="third" />
          <el-tab-pane v-if="getvIfDomHasPermi(['xm:menu:bs:material:purchase_manage:order:list:query','isAll'],'second')" label="采购订单列表" name="second" />
        </el-tabs>
      </div>
    </div>
    <div
      v-if="!table"
      class="search-content"
      :class="{ 'show-height': anSearch }"
    >
      <el-form ref="queryForm" :model="normalOrderParam" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="订单编号:" prop="orderCode">
                  <el-input
                    v-model="normalOrderParam.orderCode"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目名称:" prop="type">
                  <el-input
                    v-model="normalOrderParam.projectName"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="供应商:" prop="type">
                  <el-input
                    v-model="normalOrderParam.supplierName"
                    placeholder="请输入"
                    style="width: 100%"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="订单状态:" prop="orderStatus">
                  <el-select
                    v-model="normalOrderParam.orderStatus"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in normalOrderOptions.normalOrderStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="采购类型:" prop="purchaseType">
                  <el-select
                    v-model="normalOrderParam.purchaseType"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in normalOrderOptions.purchaseTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="发货状态:" prop="deliveryStatus">
                  <el-select
                    v-model="normalOrderParam.deliveryStatus"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in normalOrderOptions.deliveryStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="退回状态:" prop="returnStatus">
                  <el-select
                    v-model="normalOrderParam.returnStatus"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in normalOrderOptions.returnStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="验收状态:" prop="checkStatus">
                  <el-select
                    v-model="normalOrderParam.checkStatus"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in normalOrderOptions.checkStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button
                @click="handerReset"
              >重置</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:reset']"-->
              <el-button
                type="primary"
                @click="getNormalOrderList"
              >查询</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:query']"-->
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
      v-if="table"
      class="search-content"
      :class="{ 'show-height': anSearch }"
    >
      <el-form ref="queryForm" :model="preOrderParam" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="计划编号:" prop="needPlanCode">
                  <el-input
                    v-model="preOrderParam.needPlanCode"
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
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:pending_list:reset']"-->
              <el-button
                type="primary"
                @click="getPreOrderList"
              >查询</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:pending_list:query']"-->
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
              v-show="!table"
              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:print']"
              @click="printOrder"
            > 打印 </el-button>
            <!-- <el-button @click="printOrder"> 打印 </el-button> -->
            <el-button
              v-show="!table"
              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:export']"
              class="buttonRight"
              @click="importPreOrderList"
            >
              导出
            </el-button>
            <el-button
              v-show="table"
              v-hasPermi="['xm:menu:bs:material:purchase_manage:order:pending_list:export']"
              class="buttonRight"
              @click="importPreOrderList"
            >
              导出
            </el-button>
            <!-- <el-button v-if="table" class="buttonRight" @click="placeOrder"> 下单 </el-button> -->
            <!-- <div v-if="!table" class="tablePrimary" /> -->
            <right-toolbar
              v-show="!table"
              :columns="columns"
              @queryTable="table ? getPreOrderList : getNormalOrderList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <div v-show="!table">
          <el-table
            v-if="!table"
            ref="preTableBox"
            key="采购订单列表"
            v-loading="loading"
            border
            :data="normalOrderData"
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
              v-if="columns[1].visible"
              key="1"
              label="采购订单编号"
              prop="orderCode"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span
                  style="color: #20a0ff; cursor: pointer"
                  @click="toDetails(scope.row)"
                >{{ scope.row.orderCode }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[2].visible"
              key="2"
              label="项目名称"
              prop="projectName"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="columns[3].visible"
              key="3"
              label="订单状态"
              prop="orderStatus"
            >
              <template slot-scope="{ row }">
                <div class="planStatus">
                  <div class="box" :class="getClass2(row)" />
                  <span>{{
                    getDictionaryLabel(row.orderStatus, 'orderStatusS')
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[4].visible"
              key="4"
              label="供应商"
              prop="supplierName"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="columns[5].visible"
              key="5"
              label="采购类型"
              prop="purchaseType"
            >
              <template slot-scope="{ row }">
                <div class="planStatus">
                  <!-- <div class="box" :class="getClass(row)" /> -->
                  <span>{{
                    getDictionaryLabel(row.purchaseType, 'purchaseType')
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[6].visible"
              key="6"
              label="发货状态"
              prop="deliveryStatus"
            >
              <template slot-scope="{ row }">
                <div class="planStatus">
                  <div class="box" :class="getClass3(row)" />
                  <span>{{
                    getDictionaryLabel(row.deliveryStatus, 'deliveryStatusS')
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[7].visible"
              key="7"
              label="退回状态"
              prop="returnStatus"
            >
              <template slot-scope="{ row }">
                <div class="planStatus">
                  <div class="box" :class="getClass5(row)" />
                  <span>{{
                    getDictionaryLabel(row.returnStatus, 'returnStatus')
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[8].visible"
              key="8"
              label="验收状态"
              prop="checkStatus"
            >
              <template slot-scope="{ row }">
                <div class="planStatus">
                  <div class="box" :class="getClass4(row)" />
                  <span>{{
                    getDictionaryLabel(row.checkStatus, 'checkStatus')
                  }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-if="columns[9].visible"
              key="9"
              label="物资种类数"
              prop="itemNum"
            />
            <el-table-column
              v-if="columns[10].visible"
              key="10"
              label="物资需用计划编号"
              prop="needPlanCodes"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="columns[11].visible"
              key="11"
              label="发货单数量"
              prop="deliveryNum"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.deliveryNum === 0"> --- </span>
                <span
                  v-else
                  style="color: #20a0ff; cursor: pointer"
                  @click="getDeliveryList(scope.row)"
                >
                  {{ scope.row.deliveryNum }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="columns[12].visible"
              key="12"
              label="下发人员"
              prop="issuingUserName"
            />
            <el-table-column
              v-if="columns[13].visible"
              key="13"
              label="下发时间"
              prop="issuingDate"
              width="160"
              sortable
            />
            <el-table-column key="14" label="操作" width="200">
              <template slot-scope="{ row, $index }">
                <!--                <el-button-->
                <!--                  size="mini"-->
                <!--                  type="text"-->
                <!--                  @click="toDetails(row)"-->
                <!--                >详情</el-button>-->
                <el-button
                  v-show="row.orderStatus === 1 || row.orderStatus === 4 || row.orderStatus === 5 || !row.projectProductionManager && row.orderStatus === 6"
                  v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:edit']"
                  size="mini"
                  type="text"
                  @click="edit(row)"
                >编辑</el-button>
                <el-button
                  v-show="row.orderStatus === 6 && tabActive == 'third' && row.projectProductionManager"
                  v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:edit']"
                  size="mini"
                  type="text"
                  @click="edit(row)"
                >选择供应商和合同</el-button>
                <!-- <el-button
                    size="mini"
                    type="text"
                    @click="handelCopy(row)"
                  >复制</el-button> -->
                <el-popconfirm
                  v-if="row.orderStatus === 1||row.orderStatus=== 4 || row.orderStatus === 5 || !row.projectProductionManager && row.orderStatus === 6"
                  title="确定要删除这一行吗？"
                  style="margin-left: 10px"
                  @onConfirm="deleteNormalOrder(row, $index)"
                >
                  <el-button
                    slot="reference"
                    v-if="tabActive!=='third'"
                    v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:delete']"
                    size="mini"
                    type="text"
                  >删除</el-button>
                </el-popconfirm>
                <!--                <el-button-->
                <!--                  v-if="row.orderStatus === 2 || row.orderStatus === 3||row.orderStatus===4 "-->
                <!--                  size="mini"-->
                <!--                  type="text"-->
                <!--                  @click="showApprovals(row)"-->
                <!--                >审批进度</el-button>-->
                <el-button
                  v-show="row.orderStatus === 2 || row.orderStatus === 3||row.orderStatus===4 "
                  v-hasPermi="['xm:menu:bs:material:purchase_manage:order:list:approvals']"
                  size="mini"
                  type="text"
                  @click="showDetail(row)"
                >审批进度</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="normalOrderPage.total > 0" class="pagination">
            <div class="pageNumberRecord">
              共{{ normalOrderPage.total }}条记录 第{{
                normalOrderParam.page
              }}/{{
                Math.ceil(normalOrderPage.total / normalOrderParam.rows)
              }}页
            </div>
            <Pagination
              background
              layout="prev, pager, next, sizes, jumper"
              :page-sizes="[10, 20, 50, 100, 200, 500]"
              :total="normalOrderPage.total"
              :page.sync="normalOrderParam.page"
              :limit.sync="normalOrderParam.rows"
              @pagination="getNormalOrderList"
            />
          </div>
        </div>
        <div v-show="table">
          <el-table
            v-if="table"
            ref="preTableBox"
            key="待采购列表"
            v-loading="preLoading"
            border
            :data="preOrderData"
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
              v-if="preColumns[0].visible"
              fixed="left"
              align="center"
              label="序号"
              width="80"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="preColumns[1].visible"
              label="计划编号"
              prop="needPlanCode"
            >
              <!-- <template slot-scope="scope">
                <span @click="toDetails(scope.row)" style="color: #20a0ff;cursor: pointer">{{scope.row.needPlanCode}}</span>
              </template> -->
            </el-table-column>
            <el-table-column
              v-if="preColumns[2].visible"
              label="采购状态"
              prop="purchaseStatus"
              sortable
            >
              <template slot-scope="{ row }">
                <div class="planStatus">
                  <div class="box" :class="getClass1(row)" />
                  <span>{{
                    getDictionaryLabel(row.purchaseStatus, 'purchaseStatusS')
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="preColumns[3].visible"
              label="物资种类数"
              prop="itemNum"
            />
            <el-table-column
              v-if="preColumns[4].visible"
              label="采购订单数量"
              prop="normalOrderNum"
            />
            <el-table-column
              v-if="preColumns[5].visible"
              label="计划提交人员"
              prop="planSubmitUserName"
            />
            <el-table-column
              v-if="preColumns[6].visible"
              label="计划提交时间"
              prop="planSubmitTime"
              sortable
            />
            <el-table-column label="操作" fixed="right" v-if="tabActive == 'third'">
              <template slot-scope="scope">
                <el-button
                  v-hasPermi="['xm:menu:bs:material:purchase_manage:order:pending_list:add']"
                  size="mini"
                  type="text"
                  @click="orders(scope.row, 'manager')"
                >下单</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" v-else>
              <template slot-scope="scope">
                <el-button
                  v-hasPermi="['xm:menu:bs:material:purchase_manage:order:pending_list:add']"
                  size="mini"
                  type="text"
                  @click="orders(scope.row)"
                >下单</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div v-if="preOrderPage.total > 0" class="pagination">
            <div class="pageNumberRecord">
              共{{ preOrderPage.total }}条记录 第{{ preOrderParam.page }}/{{
                Math.ceil(preOrderPage.total / preOrderParam.rows)
              }}页
            </div>
            <Pagination
              background
              layout="prev, pager, next, sizes, jumper"
              :page-sizes="[10, 20, 50, 100, 200, 500]"
              :total="preOrderPage.total"
              :page.sync="preOrderParam.page"
              :limit.sync="preOrderParam.rows"
              @pagination="getPreOrderList"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <div class="selectBox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >已选4项</el-checkbox>
        <el-button type="text" style="margin-left: 4px">取消</el-button>
      </div>
      <div class="actionButtons">
        <el-button>批量导出</el-button>
        <el-button>打印表格</el-button>
      </div>
    </div> -->
    <!-- 弹窗 -->
    <indexDialog
      :visible.sync="isShow"
      title="发货单"
      :interview-id="interviewId"
      :list="deliveryList"
    />

    <print-order :visible.sync="isPrint" :print-data="printData" />
    <ApprovalProgress
      :visible.sync="isShowApprovalProgress"
      :processdata="processdata"
    />
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
import { vIfDomHasPermi } from '@/utils'
import ApproveDetail from '@/views/plan/components/approveDetail'
import ApprovalProgress from '@/views/plan/components/approvalProgress'
import indexDialog from '../dispatch/indexDialog.vue'
import printOrder from '../printOrder/index.vue'
import { mapGetters } from 'vuex'
import {
  getPreOrderList,
  exportPrucPreOrderItemListByProject
} from '@/api/purchase/preOrder'
import {
  getNormalOrderList,
  getChooseSupplierList,
  exportPrucNormalOrderItemListByProject,
  delPrucNormalOrder,
  getOrderStampList
} from '@/api/purchase/normalOrder'
import { queryDeliveryOrderList } from '@/api/purchase/deliveryOrder'
import selectSupplier from './selectSupplier'

export default {
  name: 'OrderIndex',
  components: { indexDialog, printOrder, ApprovalProgress, ApproveDetail, selectSupplier },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  data() {
    return {
      interviewId: '',
      preOrderData: null, // 待采购数据列表
      preOrderParam: {
        page: 1,
        rows: 10
      }, // 待采购查询条件
      preOrderPage: {
        total: 0,
        pageSize: 0
      }, // 待采购分页数据
      selPreOrdetData: [], // 多选选中的待采购数据
      normalOrderData: null, // 采购列表数据
      normalOrderParam: {
        page: 1,
        rows: 10
      }, // 采购查询条件
      normalOrderPage: {
        total: 0,
        pageSize: 0
      }, // 采购分页数据
      normalOrderOptions: {
        normalOrderStatusOptions: [
          // 订单状态
          { value: 1, label: '草稿' },
          { value: 2, label: '审批中' },
          { value: 3, label: '审批通过' },
          { value: 4, label: '审批驳回' },
          { value: 5, label: '审批撤回' }
        ],
        purchaseTypeOptions: [
          // 采购类型
          { value: 1, label: '物资采购' },
          { value: 2, label: '资产采购' }
        ],
        deliveryStatusOptions: [
          // 发货状态
          { value: 1, label: '待发货' },
          { value: 2, label: '部分发货' },
          { value: 3, label: '全部发货' }
        ],
        returnStatusOptions: [
          // 退回状态
          { value: 1, label: '部分退回' },
          { value: 2, label: '全部退回' }
        ],
        checkStatusOptions: [
          // 验收状态
          { value: 0, label: '待验收' },
          { value: 1, label: '已验收' }
        ]
      }, // 订单字典数据
      selNormalOrdetData: [], // 多选选中的采购数据
      deliveryList: [], // 采购单列表
      isPrint: false,
      options: [],
      propData: [],
      isShow: false,
      size: 'medium', // 表格的密度
      title: '', // 标题
      preColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `计划编号`, visible: true },
        { key: 2, label: `采购状态`, visible: true },
        { key: 3, label: `物资种类数`, visible: true },
        { key: 4, label: `采购订单数量`, visible: true },
        { key: 5, label: `计划提交人员`, visible: true },
        { key: 6, label: `计划提交时间`, visible: true }
      ], // 显隐列
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `采购订单编号`, visible: true },
        { key: 2, label: `项目名称`, visible: true },
        { key: 3, label: `订单状态`, visible: true },
        { key: 4, label: `供应商`, visible: true },
        { key: 5, label: `采购类型`, visible: true },
        { key: 6, label: `发货状态`, visible: true },
        { key: 7, label: `退回状态`, visible: true },
        { key: 8, label: `验收状态`, visible: true },
        { key: 9, label: `物资种类数`, visible: true },
        { key: 10, label: `物资需用计划编号`, visible: true },
        { key: 11, label: `发货单数量`, visible: true },
        { key: 12, label: `下发人员`, visible: true },
        { key: 13, label: `下发时间`, visible: true }
      ], // 显隐列
      tableName: '待采购列表', // table的名字
      table: true, // 显示tab切换
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      queryParams: {
        // 查询参数
        type: null
      },
      activeName: 'first',
      tabActive: 'first',
      loading: false, // 表格加载
      preLoading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      printData: [], // 订单打印数据
      isShowApprovalProgress: false, // 审批进度弹窗
      processdata: {}, // 审批进度条件,
      processView: {
        title: '审批详情',
        open: false
      },
      info: {}
    }
  },
  watch: {
    columns: {
      handler() {
        this.$nextTick(() => {
          this.$refs.preTableBox.doLayout()
        })
      },
      immediate: true,
      deep: true
    },
    preColumns: {
      handler() {
        this.$nextTick(() => {
          this.$refs.preTableBox.doLayout()
        })
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // console.log(this.$route.params.clickStatus,"==================")
    if (this.$route.params.clickStatus !== undefined && this.$route.params.clickStatus !== -1) {
      if ((this.$route.params.clickStatus + '') === '0') {
        this.activeName = 'second'
        this.tableName = '采购订单列表'
        this.table = false
      } else {
        this.activeName = 'first'
        this.tableName = '待采购列表'
        this.table = true
      }
    }
    this.getPreOrderList()
    this.getNormalOrderList()
  },
  created() {},
  methods: {
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
    // 审批进度
    showDetail(row) {
      this.info.processDefinitionId = row.processDefinitionId
      this.info.processInstanceId = row.processInstanceId
      this.processView.open = true
    },
    // //审批进度
    // showApprovals(row){
    //   this.processdata = {
    //     processInstanceId: row.processInstanceId===null?"":row.processInstanceId,
    //     processDefinitionId: row.processDefinitionId
    //   }
    //   this.isShowApprovalProgress = true
    // },
    // 待采购列表状态返回颜色
    getClass1(row) {
      switch (row.purchaseStatus) {
        case 1:
          return 'normal'
        case 2:
          return 'approval'
        case 3:
          return 'draft'
      }
    },
    getClass2(row) {
      switch (row.orderStatus) {
        case 1:
          return 'normal'
        case 2:
          return 'approval'
        case 3:
          return 'draft'
        case 4:
          return 'forbidden'
        case 5:
          return 'rejected'
      }
    },
    getClass3(row) {
      switch (row.deliveryStatus) {
        case 1:
          return 'approval'
        case 2:
          return 'draft'
        case 3:
          return 'rejected'
        case 4:
          return 'forbidden'
      }
    },

    getClass4(row) {
      switch (row.checkStatus) {
        case 0:
          return 'normal'
        case 1:
          return 'draft'
      }
    },
    getClass5(row) {
      switch (row.returnStatus) {
        case 1:
          return 'draft'
        case 2:
          return 'draft'
      }
    },
    // 批量下单
    placeOrder() {},
    getPreOrderList() {
      this.preLoading = true
      // 待采购列表
      getPreOrderList({ ...this.preOrderParam, ...this.projectInformation, platFormType: 1 })
        .then((res) => {
          this.preOrderData = res.data.list
          this.preOrderPage.total = res.data.total
          this.preOrderPage.pageSize = res.data.pageSize
          this.preLoading = false
        })
        .catch(() => {
          this.preLoading = false
        })
    },
    // 待采购导出
    importPreOrderList() {
      // 待采购导出
      if (this.table) {
        // if (
        //   this.selPreOrdetData === null ||
        //   this.selPreOrdetData.length === 0
        // ) {
        //   this.$message.warning('请选择选需要导出的待采购订单')
        //   return
        // }
        this.preLoading = true
        const ids = []
        this.selPreOrdetData.forEach((item) => {
          ids.push(item.id)
        })
        exportPrucPreOrderItemListByProject({ idList: ids, orgId: this.projectInformation.orgId, platFormType: 1 }).then((response) => {
          // const blob = new Blob([response], {
          //   type: 'application/vnd.ms-excel'
          // })
          // const url = window.URL || window.webkitURL || window.moxURL
          // const downloadHref = url.createObjectURL(blob)
          // const downloadLink = document.createElement('a')
          // downloadLink.href = downloadHref
          // downloadLink.download = `物资待采购订单台账.xlsx`
          // downloadLink.click()
          this.preLoading = false
        })
      } else {
        // 采购导出
        // if (
        //   this.selNormalOrdetData === null ||
        //   this.selNormalOrdetData.length === 0
        // ) {
        //   this.$message.warning('请选择选需要导出的采购订单')
        //   return
        // }
        this.loading = true
        const ids = []
        this.selNormalOrdetData.forEach((item) => {
          ids.push(item.id)
        })

        exportPrucNormalOrderItemListByProject({ idList: ids, orgId: this.projectInformation.orgId, platFormType: 1 }).then((response) => {
          // const blob = new Blob([response], {
          //   type: 'application/vnd.ms-excel'
          // })
          // const url = window.URL || window.webkitURL || window.moxURL
          // const downloadHref = url.createObjectURL(blob)
          // const downloadLink = document.createElement('a')
          // downloadLink.href = downloadHref
          // downloadLink.download = `物资采购订单台账.xlsx`
          // downloadLink.click()
          this.loading = false
        })
      }
    },
    // 待采购多选
    preOrderHandleSelectionChange(val) {
      // 待采购选中
      this.selPreOrdetData = val
    },
    // 采购多选
    normalOrderHandleSelectionChange(val) {
      // 待采购选中
      this.selNormalOrdetData = val
    },
    // 采购列表
    async getNormalOrderList() {
      let params = { ...this.normalOrderParam, ...this.projectInformation, platFormType: 1 }
      this.loading = true
      let res
      if (this.tabActive=='third') {
        res = await getChooseSupplierList(params)
      } else {
        res = await getNormalOrderList(params)
      }
      if (res && res.status == 200) {
        this.normalOrderData = res.data.list
        this.normalOrderPage.total = res.data.total
        this.normalOrderPage.pageSize = res.data.pageSize
      }
      this.loading = false
    },
    delBtn(e) {
      e.stopPropagation()
    },
    // 删除采购订单
    deleteNormalOrder(row, index) {
      const ids = []
      ids.push(row.id)
      delPrucNormalOrder(ids).then((res) => {
        this.$message.success('删除成功')
        this.getNormalOrderList()
      })
    },
    // 获取发货单
    getDeliveryList(row) {
      queryDeliveryOrderList({
        page: 1,
        rows: 100000,
        purchaseNo: row.orderCode
      }).then((res) => {
        this.deliveryList = res.data.list
      })
      this.isShow = true
    },

    // 详情
    toDetails(row) {
      this.$router.push({
        path: '/purchase/purchaseDetails',
        query: { id: row.id }
      })
    },
    resetColumns() {
      const oldColumns = [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `采购订单编号`, visible: true },
        { key: 2, label: `项目名称`, visible: true },
        { key: 3, label: `订单状态`, visible: true },
        { key: 4, label: `供应商`, visible: true },
        { key: 5, label: `采购类型`, visible: true },
        { key: 6, label: `发货状态`, visible: true },
        { key: 7, label: `退回状态`, visible: true },
        { key: 8, label: `验收状态`, visible: true },
        { key: 9, label: `物资种类数`, visible: true },
        { key: 10, label: `物资需用计划编号`, visible: true },
        { key: 11, label: `发货单数量`, visible: true },
        { key: 12, label: `下发人员`, visible: true },
        { key: 13, label: `下发时间`, visible: true }
      ]
      this.columns = JSON.parse(JSON.stringify(oldColumns))
    },
    resetPreColumns() {
      const oldPreColumns = [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `计划编号`, visible: true },
        { key: 2, label: `采购状态`, visible: true },
        { key: 3, label: `物资种类数`, visible: true },
        { key: 4, label: `采购订单数量`, visible: true },
        { key: 5, label: `计划提交人员`, visible: true },
        { key: 6, label: `计划提交时间`, visible: true }
      ]
      this.preColumns = JSON.parse(JSON.stringify(oldPreColumns))
    },
    // 编辑跳转页面
    edit(row) {
      let clickStatus = 0
      if (this.table) {
        clickStatus = 1
      }
      let query = { id: row.id, clickStatus: clickStatus }
      if (this.tabActive=='third') {
        query.pageType = 'manager'
      }
      this.$router.push({
        path: '/purchase/edit',
        query: query
      })
    },
    // 下单跳转页面
    orders(row, type) {
      let query = { id: row.id }
      if (type) {
        query.pageType = type
      }
      this.$router.push({
        path: '/purchase/placeOrder',
        query: query
      })
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },

    // tab切换
    handleClick(tab, event) {
      this.activeName = tab.name
      if (tab.name === 'second' || tab.name === 'third') {
        this.table = false
        this.tableName = tab.name === 'third' ? '待选择供应商列表页' : '采购订单列表'
        this.getNormalOrderList()// 获取采购列表
      } else {
        this.table = true
        this.tableName = '待采购列表'
        this.getPreOrderList()// 获取待采购列表
      }
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 重置
    handerReset() {
      this.preOrderParam = {
        page: 1,
        rows: 10
      }
      this.normalOrderParam = {
        page: 1,
        rows: 10
      }
      this.getPreOrderList()
      this.getNormalOrderList()
    },
    // 打印采购订单
    printOrder() {
      if (
        this.selNormalOrdetData === null ||
        this.selNormalOrdetData.length === 0
      ) {
        this.$message.warning('请先选择需要打印的采购订单')
        return
      }
      const ids = []
      this.selNormalOrdetData.forEach((item) => {
        ids.push(item.id)
      })
      // 获取打印数据
      getOrderStampList({ idList: ids }).then((res) => {
        this.printData = res.data
      })
      this.isPrint = true
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
  .normal {
    background: #bfbfbf;
  }
  .approval {
    background: #1791ff;
  }
  .draft {
    background: #00cc33;
  }
  .rejected {
    background: #faad14;
  }
  .forbidden {
    background: red;
  }
}
.totalPlan-container {
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
        //position: absolute;
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
</style>
