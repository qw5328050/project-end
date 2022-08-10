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
            <div class="workPlanTop">
              <table
                class="table table-bordered table"
                style="white-space: nowrap"
              >
                <tbody>
                  <tr class="text-c">
                    <td rowspan="3">
                      <svg-icon
                        icon-class="table-logo"
                        style="font-size: 55px"
                      />
                    </td>
                    <td
                      colspan="11"
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
                      colspan="10"
                      style="font-size: 24px; width: 70%"
                    >
                      物资需用总计划
                    </td>
                    <td>表格编号</td>
                  </tr>
                  <tr class="text-c header_col">
                    <td>CSCEC82-HR-B10507</td>
                  </tr>
                  <tr class="text-c" style="border-top: 2px solid #202020">
                    <td colspan="12">
                      <div class="project">
                        <div class="name">项目名称及编码:</div>
                        <div class="code">编号:</div>
                      </div>
                    </td>
                  </tr>
                  <slot name="header" />
                  <slot name="content" :list="list" />
                  <tr class="text-c">
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">商务工程师制表</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">测试数据</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">商务经理审核</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">测试数据</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">项目经理审批</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">测试数据</div>
                    </td>
                  </tr>
                  <tr class="text-c">
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">日期</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">测试数据</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">日期</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">测试数据</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">日期</div>
                    </td>
                    <td colspan="2" style="width: 16.66%">
                      <div class="text_wid">测试数据</div>
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
import PrintJS from 'print-js'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
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
    }
  },
  data() {
    return {
      allDataLit: [
        {
          planType: 1,
          projectName: '测试项目',
          projectCode: '测试编码',
          projectNumber: '测试编号',
          tableNumber: 'CSCEC82-HR-B10507',
          tabulation: '测试制表',
          tabulationTime: '2020-06-08',
          audit: '测试审核',
          auditTime: '2020-06-08',
          approval: '测试审批',
          approvalTime: '2020-06-08',
          list: [
            {
              usePosition: '测试数据',
              materialName: '测试数据',
              specification: '测试数据',
              meteringUnits: '测试数据',
              totalQuantity: '测试数据',
              remarks: '测试数据'
            }
          ]
        }
      ]
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
