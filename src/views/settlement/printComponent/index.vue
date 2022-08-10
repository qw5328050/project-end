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
            >
              <!-- 浮动价 -->
              <template
                v-if="
                  item.type === 1 ||
                    item.type === 3 ||
                    item.type === 4 ||
                    item.type === 5
                "
              >
                <!-- 浮动价 -->
                <FloatingPrice v-if="item.splitFlag === 0" :print-data="item" />
                <!-- 浮动价副单 -->
                <template
                  v-if="
                    item.splitFlag === 1 &&
                      item.settlementOrderSubsidiaryVos &&
                      item.settlementOrderSubsidiaryVos.length > 0
                  "
                >
                  <FloatingPrice :print-data="item" />
                  <FloatingPriceCopy
                    v-for="(items, indexs) in item.settlementOrderSubsidiaryVos"
                    :key="indexs"
                    :print-data="item"
                    :print-copy-data="items"
                    style="margin-top: 20px"
                  />
                </template>
              </template>
              <!-- 固定价 -->
              <template v-if="item.type === 2">
                <!-- 固定价 -->
                <FixedPrice v-if="item.splitFlag === 0" :print-data="item" />
                <!-- 固定价副单 -->
                <template
                  v-if="
                    item.splitFlag === 1 &&
                      item.settlementOrderSubsidiaryVos &&
                      item.settlementOrderSubsidiaryVos.length > 0
                  "
                >
                  <FixedPrice :print-data="item" />
                  <FixedPriceCopy
                    v-for="(items, indexs) in item.settlementOrderSubsidiaryVos"
                    :key="indexs"
                    :print-data="item"
                    :print-copy-data="items"
                    style="margin-top: 20px"
                  />
                </template>
              </template>
              <!-- 租赁类 -->
              <!-- <template v-if="item.type === 6"> -->
              <!-- 租赁类 -->
              <!-- <LeaseClass v-if="item.splitFlag === 0" :print-data="item"/> -->
              <!-- 租赁类副单 -->
              <!-- <LeaseClassCopy v-if="item.splitFlag === 1" /> -->
              <!-- </template> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import FloatingPrice from './floatingPrice'
import FixedPrice from './fixedPrice.vue'
// import LeaseClass from './leaseClass.vue'
import FloatingPriceCopy from './floatingPriceCopy'
import FixedPriceCopy from './fixedPriceCopy.vue'
// import LeaseClassCopy from './leaseClassCopy.vue'
import { mapGetters } from 'vuex'
import PrintJS from 'print-js'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  name: 'PrintDialog',
  components: {
    FloatingPrice,
    FixedPrice,
    FloatingPriceCopy,
    FixedPriceCopy
  },
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
.text_wid {
  min-width: 10px;
}
.table .text-c th,
.table .text-c td {
  padding: 0px 2px;
  height: 35px;
  word-break: break-all;
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
