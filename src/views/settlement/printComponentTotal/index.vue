<template>
  <el-dialog
    :visible.sync="visible"
    width="60%"
    top="10vh"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <div class="print_container">
      <div class="print_header">
        <div class="operation">
          <div class="btn" @click="printDom">
            <svg-icon
              icon-class="table-print"
              style="margin-right: 6px; font-size: 24px"
            />打印
          </div>
          <div class="btn" @click="pdfDownload">
            <svg-icon
              icon-class="table-download"
              style="margin-right: 6px; font-size: 24px"
            />下载
          </div>
        </div>
        <div class="close">
          <div class="btn" @click="handleClose">
            关闭
            <svg-icon
              icon-class="table-close"
              style="margin-left: 6px; font-size: 24px"
            />
          </div>
        </div>
      </div>
      <div class="scroll">
        <div v-loading="printLoading" class="print_content">
          <div id="tablesBom" ref="tablesBom" class="ref_content">
            <div
              v-for="(item, index) in allDataLit"
              :key="index"
              v-watermark="watermarkConfig"
              class="workPlanTop"
              style="page-break-after: always;"
            >
              <table v-if="item" class="table table-bordered">
                <tbody>
                  <tr class="text-c">
                    <td colspan="2" rowspan="3">
                      <img src="@/assets/table-log.png" style="widht: 40px">
                    </td>
                    <td
                      colspan="10"
                      style="
                        font-size: 32px;
                        font-family: FZL2JW--GB1-0, FZL2JW--GB1;
                        font-weight: normal;
                        color: #262626;
                        height: 50px;
                      "
                    >
                      中国建筑项目管理表格
                    </td>
                  </tr>
                  <tr class="text-c header_col">
                    <td
                      rowspan="2"
                      colspan="8"
                      style="font-size: 24px; width: 70%"
                    >
                      物资采购总结算书
                    </td>
                    <td colspan="2">表格编号</td>
                  </tr>
                  <tr class="text-c header_col">
                    <td colspan="2">CSCEC82-HR-B10507</td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">需方</td>
                    <td colspan="4">{{ item.projectInfo || '' }}</td>
                    <td colspan="2">日期</td>
                    <td colspan="2">{{ item.createTime || '' }}</td>
                    <td colspan="1">单位: 元</td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">供方</td>
                    <td colspan="3">{{ item.supplierName || '' }}</td>
                    <td colspan="3">合同编号</td>
                    <td colspan="3">{{ item.contractNo || '' }}</td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">项目名称及编码</td>
                    <td colspan="3">{{ item.projectInfo || '' }}</td>
                    <td colspan="3">结算单编号</td>
                    <td colspan="3">{{ item.orderNo || '' }}</td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="1">序号</td>
                    <td colspan="2">供货月份</td>
                    <td colspan="2">物资种类</td>
                    <td colspan="2">供货数量</td>
                    <td colspan="3">供货金额</td>
                    <td colspan="2">备注</td>
                  </tr>
                  <tr
                    v-for="(totalItem, totalIndex) in item.totalRelDTOS"
                    :key="totalIndex"
                    class="text-c"
                  >
                    <td colspan="1">{{ totalIndex + 1 }}</td>
                    <td colspan="2">
                      {{ totalItem.submitTime || '' }}
                    </td>
                    <td colspan="2">
                      {{ getDictionaryLabel(totalItem.type, 'type') || '' }}
                    </td>
                    <td colspan="2">{{ totalItem.supplyQuantity || '' }}</td>
                    <td colspan="3">{{ totalItem.supplyAmount || '' }}</td>
                    <td colspan="2">{{ totalItem.remark || '' }}</td>
                  </tr>

                  <tr>
                    <td colspan="4" class="text-c">除税结算金额(元)</td>
                    <td colspan="8">
                      <div>(小写):{{ item.amountNoTax || '' }}</div>
                      <div>(大写):{{ chineSize(item.amountNoTaxCapitalize) || '' }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-c">含税结算金额(元)</td>
                    <td colspan="8">
                      <div>(小写):{{ item.amountTax || '' }}</div>
                      <div>(大写):{{ chineSize(item.amountTaxCapitalize) || '' }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="12" class="content">
                      以上结算内容为供应商自 {{ item.startTime || '' }} 至
                      {{ item.endTime || '' }} 期间与本项目发生的所有 业务，
                      已按照合同(合同编号:{{
                        item.contractNo || ''
                      }})约定方武按月度进行结算.累计办理月度结算单{{
                        item.settlementQuantity || ''
                      }}
                      份。
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" rowspan="5">
                      <div class="officialSeal">
                        <div class="seal">供应商(公章):</div>
                        <div class="agent">
                          经办人:{{ item.supplierName || '' }}
                        </div>
                        <div class="data">
                          {{ getTime(item.supplierConfirmTime) || '' }}
                        </div>
                      </div>
                    </td>
                    <td colspan="3" class="text-c">项目部</td>
                    <td colspan="3" class="text-c">审签栏</td>
                    <td colspan="2" class="text-c">日期</td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">项目物资部经办人</td>
                    <td colspan="3">
                      {{ item.projectMaterialOperationName || '' }}
                    </td>
                    <td colspan="2">
                      {{ item.projectMaterialOperationTime || '' }}
                    </td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">项目物资部负责人</td>
                    <td colspan="3">
                      {{ item.projectMaterialManagerName || '' }}
                    </td>
                    <td colspan="2">
                      {{ item.projectMaterialManagerTime || '' }}
                    </td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">项目商务经理</td>
                    <td colspan="3">
                      {{ item.projectBusinessManagerName || '' }}
                    </td>
                    <td colspan="2">
                      {{ item.projectBusinessManagerTime || '' }}
                    </td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="3">项目经理</td>
                    <td colspan="3">{{ item.projectManagerName || '' }}</td>
                    <td colspan="2">
                      {{ item.projectManagerTime || '' }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <div class="officialSeal">
                        <div class="seal">
                          <div>
                            成本会计意见:
                            <!-- <br></br> -->
                            {{ item.costAccountantOpinion || '' }}
                          </div>
                          <div>
                            <!-- <br></br> -->
                            累计已付款:{{ item.cumSettlementPaidAmt || '' }}
                          </div>
                        </div>
                        <div class="agent">
                          签字:{{ item.costAccountantName || '' }}
                        </div>
                        <div class="data">
                          {{ item.costAccountantTime || '' }}
                        </div>
                      </div>
                    </td>
                    <td colspan="4">
                      <div class="officialSeal">
                        <div class="seal">
                          分公司物资管理部经理意见:
                          {{ item.filialeMaterialManagerOpinion || '' }}
                        </div>
                        <div class="agent">
                          签字:{{ item.filialeMaterialManagerName || '' }}
                        </div>
                        <div class="data">
                          {{ item.filialeMaterialManagerTime || '' }}
                        </div>
                      </div>
                    </td>
                    <td colspan="4">
                      <div class="officialSeal">
                        <div class="seal">
                          分公司总经济师意见:
                          {{ item.filialeEconomicOpinion || '' }}
                        </div>
                        <div class="agent">
                          签字:{{ item.filialeEconomicName || '' }}
                        </div>
                        <div class="data">
                          {{ item.filialeEconomicTime || '' }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="12">
                      <div class="officialSeal">
                        <div class="seal">
                          公司物资管理部意见:
                          {{ item.aterialsOpinion || '' }}
                        </div>
                        <div>实际结算金额:{{ item.actualAmount || '' }}</div>
                        <div class="agent">
                          签字: {{ item.companyMaterialManagerName || '' }}
                        </div>
                        <div class="data">
                          {{ item.companyMaterialManagerTime || '' }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import PrintJS from 'print-js'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { chineseNumber } from '@/utils/validate'
export default {
  name: 'PrintDialog',
  filters: {
    numValueIsTrue(val) {
      if (val) {
        return val
      } else {
        return 0
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    printLoading: {
      type: Boolean,
      require: false,
      default: false
    },
    allDataLit: {
      type: Array,
      require: false,
      default: () => []
    }
  },
  data() {
    return {
      chineSize: chineseNumber,
      watermarkConfig: {
        // 水印
        font: '50px 微软雅黑',
        textColor: 'rgba(215, 215, 215, 0.5)',
        width: 400, // 水印文字的水平间距
        height: 170, // 水印文字的高度间距（低于文字高度会被替代）
        textRotate: 0 // -90到0， 负数值，不包含-90
      }
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    dealdate(dealdate) {
      const date = new Date(dealdate)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      return year + '-' + month + '-' + day
    },
    getTime(time) {
      return this.dealdate(time)
    },
    // 下载
    pdfDownload() {
      const myBox = this.$refs.tablesBom // 获取ref里面的内容
      html2Canvas(myBox, {
        useCORS: true, // 是否尝试使用CORS从服务器加载图像
        allowTaint: true,
        dpi: 300, // 解决生产图片模糊
        scale: 3 // 清晰度--放大倍数
      }).then(function(canvas) {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = (contentWidth / 592.28) * 841.89 // 一页pdf显示html页面生成的canvas高度;
        let leftHeight = contentHeight // 未生成pdf的html页面高度
        let position = 0 // pdf页面偏移
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        // let imgWidth = 595.28
        const imgWidth = 560.28 // 宽度
        const imgHeight = (592.28 / contentWidth) * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', 'a4')

        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save('测试' + '.pdf') // 下载标题
      })
    },
    // 打印
    printDom() {
      // print(this.$refs.tablesBom)
      PrintJS({
        printable: 'tablesBom',
        type: 'html',
        targetStyles: ['*']
      })
    },
    // 修改 table cell边框的背景色
    tableCellStyle() {
      return 'border-color: #000;'
    },
    // 修改 table header cell的背景色
    tableHeaderCellStyle() {
      return 'border-color: #000; color: #606266;'
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0 20px;
  height: 50px;
  box-sizing: border-box;
}

.check {
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.officialSeal {
  padding: 0 20px;
  box-sizing: border-box;
}

.officialSeal .seal {
  height: 80px;
}

.officialSeal .agent {
  height: 30px;
}

.officialSeal .data {
  /* margin-left: 16px; */
}
.text_wid {
  min-width: 10px;
}
.table .text-c th,
.table .text-c td {
  padding: 0px 2px;
  height: 35px;
}
.input-text {
  border: 0px;
  height: 28px;
}
.table-bordered th,
.table-bordered td {
  border-left: 1px solid #202020;
  border-bottom: 1px solid #202020;
}

textarea {
  border: none;
}
.table {
  width: 100%;
  empty-cells: show;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px solid #202020;
}

.text-c {
  text-align: center;
}
.header_col {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
}
.check {
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
<style lang="scss" scoped>
.cell-class-name {
  border-color: #000;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #000 !important;
}
.el-table--border,
.el-table--group {
  border-color: #000 !important;
}
::v-deep .el-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
.print_container {
  overflow: hidden;
  .print_header {
    width: 100%;
    height: 50px;
    background: rgba(23, 145, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    .operation {
      display: flex;
      .btn {
        cursor: pointer;
        color: #595959;
        font-weight: 500;
        font-size: 16px;
        display: flex;
        align-items: center;
        margin: 0 8px;
        user-select: none;
      }
    }
    .close {
      .btn {
        cursor: pointer;
        margin: 0 8px;
        color: #595959;
        font-weight: 500;
        font-size: 16px;
        display: flex;
        user-select: none;
        align-items: center;
      }
    }
  }
  .scroll {
    margin: 30px 30px 0 30px;
    overflow-y: scroll;
    overflow-x: scroll;
    .print_content {
      width: 100%;
      height: 75vh;
      background: #fff;
      box-sizing: border-box;
      .ref_content {
        margin: 0 auto;
        .workPlanTop {
          padding: 24px;
          background: #fff;
          box-sizing: border-box;
          margin-bottom: 24px;
          .project {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            text-align: left;
            padding-left: 16px;
            box-sizing: border-box;
            .name {
              width: 70%;
            }
            .code {
              width: 30%;
            }
          }
        }
      }
    }
  }
}
</style>
