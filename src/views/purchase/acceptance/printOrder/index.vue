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
        <div class="print_content">
          <div id="tablesBom" ref="tablesBom" class="ref_content">
            <div
              v-for="(item, index) in printData"
              :key="index"
              v-watermark="watermarkConfig"
              class="workPlanTop"
              style="page-break-after: always"
            >
              <!-- <table
                v-for="(item,index) in printData"
                class="table table-bordered table"
                style="white-space: nowrap;margin-bottom: 10px"
              > -->
              <table
                class="table table-bordered table"
                style="
                  white-space: nowrap;
                  margin-bottom: 10px;
                  page-break-after: always;
                "
              >
                <tr class="text-c">
                  <!-- <td rowspan="3"><svg-icon
                      icon-class="table-logo"
                      style="font-size: 55px"
                    /></td> -->
                  <td rowspan="3">
                    <img src="@/assets/table-log.png" style="widht: 40px">
                  </td>
                  <td colspan="12" style="font-size: 25px; padding: 2%">
                    中国建筑项目管理表格
                  </td>
                </tr>
                <tr class="text-c">
                  <td colspan="6" rowspan="2">物资收料单</td>
                  <td colspan="6">表格编号</td>
                </tr>
                <tr class="text-c">
                  <td colspan="6">{{ item.tableCode }}</td>
                </tr>
                <tr class="text-c">
                  <td>单位名称</td>
                  <td colspan="6">{{ item.orgName }}</td>
                  <td colspan="2">单据编号</td>
                  <td colspan="4">{{ item.receiptCode }}</td>
                </tr>
                <tr class="text-c">
                  <td>项目名称</td>
                  <td colspan="6">{{ item.projectName }}</td>
                  <td colspan="2">日期</td>
                  <td colspan="4">{{ item.receiveDate }}</td>
                </tr>
                <tr class="text-c">
                  <td>供应商/厂家</td>
                  <td colspan="6">{{ item.supplierName }}</td>
                  <td colspan="2">费用类型</td>
                  <td colspan="4">{{ item.feeType }}</td>
                </tr>
                <tr class="text-c">
                  <td>合同编号</td>
                  <td colspan="12">{{ item.contractCode }}</td>
                </tr>
                <tr class="text-c">
                  <td>车牌号码</td>
                  <td colspan="12">{{ item.plateNumber }}</td>
                </tr>
                <tr class="text-c">
                  <td>物资名称</td>
                  <td>规格型号</td>
                  <td>单位</td>
                  <td>数量</td>
                  <td>含税单价</td>
                  <td>除税单价</td>
                  <td>税率</td>
                  <td>税金/元</td>
                  <td>合格证号</td>
                  <td>发货时间</td>
                  <td>收货时间</td>
                  <td>品牌</td>
                  <td>备注</td>
                </tr>
                <tr
                  v-for="(material, materialIndex) in item.itemList"
                  v-if="item.itemList && item.itemList !== null"
                  class="text-c"
                >
                  <td>{{ material.materialName }}</td>
                  <td>{{ material.standards }}</td>
                  <td>{{ material.unit }}</td>
                  <td>{{ material.amount }}</td>
                  <td>{{ material.taxIncludeUnitPrice }}</td>
                  <td>{{ material.taxReduceUnitPrice }}</td>
                  <td>{{ material.taxRate }}</td>
                  <td>{{ material.taxes }}</td>
                  <td>{{ material.certificate }}</td>
                  <td>{{ material.deliveryDate }}</td>
                  <td>{{ material.receiptDate }}</td>
                  <td>{{ material.brand }}</td>
                  <td>{{ material.remark }}</td>
                </tr>
                <tr class="text-c">
                  <td>合计</td>
                  <td colspan="3">{{ item.receiptAmount }}</td>
                  <td colspan="2">大写</td>
                  <td colspan="7">{{ item.countPrice }}</td>
                </tr>
                <tr class="text-c">
                  <td>收料员</td>
                  <td colspan="2">{{ item.receiverName }}</td>
                  <td>主管施工员</td>
                  <td colspan="2">{{ item.managerName }}</td>
                  <td>劳务堆组</td>
                  <td colspan="2">{{ item.workerName }}</td>
                  <td>其他验收人员</td>
                  <td colspan="3">{{ item.otherCheckerName }}</td>
                </tr>
                <tr class="text-c">
                  <td>供货确认</td>
                  <td colspan="12">{{ item.supplierCheckerName }}</td>
                </tr>
                <tr class="text-c">
                  <td colspan="13" style="text-align: left">
                    1.收料单位参与验收人员必须是合同中约定或书面授权签字方有效;
                  </td>
                </tr>
                <tr class="text-c">
                  <td colspan="13" style="text-align: left">
                    2.收料单位参与验收人员签字不齐视为无效单据;
                  </td>
                </tr>
                <tr class="text-c">
                  <td colspan="13" style="text-align: left">
                    3.本收料单必须验收完毕当日填写,过期无效;
                  </td>
                </tr>
                <tr class="text-c">
                  <td colspan="13" style="text-align: left">
                    4.如果是成件进场的材料(钢筋,扣件等),要注明件数,单件数量;
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import PrintJS from 'print-js'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  name: 'PrintOrder',
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
    printData: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      watermarkConfig: {
        // 水印
        text: '物资智慧管理系统',
        font: '50px 微软雅黑',
        textColor: 'rgba(215, 215, 215, 0.5)',
        width: 550, // 水印文字的水平间距
        height: 170, // 水印文字的高度间距（低于文字高度会被替代）
        textRotate: -15 // -90到0， 负数值，不包含-90
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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
