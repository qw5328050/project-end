<template>
  <div class="materialsNeeded_container">
    <!-- <div class="materialsNeededTop">
      <div class="title">
        {{ headerTitle }}
        <el-button style="margin-left: 84.9%">取消</el-button>
        <el-button type="primary" style="margin-left: 9px">确认</el-button>
      </div>
    </div> -->
    <div class="table_box">
      <div class="table_content">
        <div style="margin-bottom: 16px">
          <span>已关联项目</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            style="margin-left: 87.5%"
            @click="more"
          >关联更多项目</el-button>
        </div>
        <el-table
          :data="dataList"
          max-height="590"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column type="selection" width="50" align="left" />
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="关联项目" align="left" prop="projectName" />
          <el-table-column label="项目状态" align="left" prop="projectStatus">
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.projectStatus, 'projectStatus')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总结算状态"
            align="left"
            prop="settlementStatus"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.settlementStatus, 'settlementStatus')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" align="left" prop="createUserName" />
          <el-table-column label="关联时间" align="left" prop="createTime">
            <!-- <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template> -->
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="{ row, $index }">
              <el-button
                v-if="row.settlementStatus == 1"
                size="mini"
                type="text"
                @click="unlock(row)"
              >解锁</el-button>
              <!-- v-if="form.settlementStatus == 1" -->
              <!-- <el-button
                size="mini"
                type="text"
                @click="handelCopy(row)"
              >复制</el-button> -->
              <!-- <el-popconfirm
                title="确定要删除这一行吗？"
                style="margin-left: 10px"
                @onConfirm="handelDelete(row, $index)"
              > -->
              <el-button
                slot="reference"
                size="mini"
                type="text"
                @click="del(row)"
              >删除</el-button>
              <!-- </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="addTableline" @click="addTable">
          <i class="el-icon-plus" />
          新增一行
        </div> -->
      </div>
    </div>
    <!-- <div class="footer">
      <div class="select_box">
        <div class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div class="time">2分钟前</div>
        </div>
        <div class="action_buttons">
          <el-button>取消</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </div>
    </div> -->
    <!-- 弹窗 -->
    <indexDialog
      :visible.sync="isShow"
      title="选择项目"
      :interview-id="interviewId"
      :prop-data="propData"
      @submitForm="submitForms"
    />
  </div>
</template>

<script>
import {
  associatedProject,
  conDelete,
  unlockProject
} from '@/api/contractManagement/table'
import indexDialog from '../more/indexDialog.vue'
export default {
  name: 'MaterialsNeeded',
  components: { indexDialog },
  data() {
    return {
      dataList: [],
      selList: [],
      interviewId: '',
      propData: [],
      isShow: false,
      loading: false,
      tableData: [],
      list: [{ type: '测试1' }, { type: '测试2' }, { type: '测试3' }], // 表格数据
      headerTitle: '' // 头部标题
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '关联项目'
  },
  methods: {
    // 获取列表数据
    getList() {
      this.loading = true
      associatedProject(this.$route.query.id).then((res) => {
        this.tableData = res.data
        this.hb()
        // this.total = res.data.total
        this.loading = false
      })
    },
    // 删除
    del(row) {
      // let contractId = []
      // contractId.push(this.$route.query.id)
      // let projectId = []
      // projectId = row.id
      var that = this
      const contractId = this.$route.query.id
      that.$confirm('是否删除已关联项目?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return conDelete({
            contractId: Number.parseInt(contractId),
            projectId: row.projectId
          })
        })
        .then(() => {
          that.$message.success('删除成功!')
          that.getList()
        })
      // if ({}) {
      //   conDelete({
      //     contractId: Number.parseInt(contractId),
      //     projectId: row.projectId
      //   }).then((res) => {
      //     this.$message.success('删除成功!')
      //     this.getList()
      //   })
      // } else {
      //   this.$message.error('删除失败!')
      // }
    },
    // 解锁
    unlock(row) {
      unlockProject(row.id).then((res) => {})
    },
    // 选择项目弹窗
    more(row, type) {
      // this.interviewId = this.$route.query.id
      this.propData = row
      this.isShow = true
    },
    submitForms(val) {
      // if (val !== null) {
      //   this.selList = val
      //   this.hb()
      // }
      this.isShow = false
      this.getList()
      // this.$set(this.form, 'projectName', row)
      // console.log(val)
    },
    hb() {
      const arr = []
      this.tableData.forEach((item) => {
        arr.push(item)
      })
      this.selList.forEach((item) => {
        const obj = {
          projectName: item.projCode
        }
        arr.push(obj)
      })
      this.dataList = arr
    },

    // 新增行
    addTable() {
      this.list.push({ type: '' })
    },
    // 复制行
    handelCopy(row) {
      this.list.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.list.splice(index, 1)
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
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.materialsNeeded_container {
  .materialsNeededTop {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 16px 32px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .table_box {
    margin: 16px;
    background: #fff;
    .table_content {
      padding: 24px;
      box-sizing: border-box;
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
