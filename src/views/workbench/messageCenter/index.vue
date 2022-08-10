<template>
  <div class="role_authorization">
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label">未读消息({{ total }})</span>
        </el-tab-pane>
        <el-tab-pane label="已读消息" name="second" />
      </el-tabs>
    </div>
    <div class="page-column">
      <el-form ref="numberValidateForm" class="content" label-width="80px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目名称:" label-width="100px" prop="">
                  <el-input v-model="queryParams.searchKey" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="业务:">
                  <el-select
                    v-model="queryParams.businessType"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.dataName"
                      :value="item.dataValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8" class="footer">
            <el-row>
              <el-col :xl="8" :lg="8" :xs="12" :sm="12" :md="12">
                <el-button type="default" @click="handerReset">重置</el-button>
              </el-col>
              <el-col :xl="8" :lg="8" :xs="12" :sm="12" :md="12">
                <el-button type="primary" @click="queryBtn">查询</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="unRead">
      <div class="listWrap">
        <div class="listTable">消息列表</div>
        <div class="textItem">
          <div v-if="mesList.length > 0" class="ulBox">
            <div v-for="item in mesList" :key="item.relationMessageUserId" class="listItem" @click="showDetail(item)">
              <div class="listContent">
                <span class="listCate">【{{ item.messageTitle }}】</span>
                <span class="listWord">{{ item.messageContent }}</span>
              </div>
              <div class="listTime">{{ item.createTime | formartTimes }}</div>
            </div>
          </div>
          <div v-else>
            <div class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="thisblack-bgc"
      :modal="false"
      width="50%"
    >
      <div class="dialogContent">
        <div class="titleBox"><span class="detailTitle">{{ content.messageTitle }}</span></div>
        <div class="detailTime">{{ content.createTime }}</div>
        <div class="detailCont">
          <div class="contentTitle">内容：</div>
          <div class="contents">
            {{ content.messageContent }}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">关 闭</el-button>
      </span>
    </el-dialog>
    <div v-if="activeName == 'first'" class="pageWrap">
      <div class="pagination">
        <div class="pageNumberRecord">
          共{{ total }}条记录 第{{ page.page }}/{{ page.pages }}页
        </div>
        <el-pagination
          background
          :page-size="page.rows"
          :current-page.sync="page.page"
          layout="prev, pager, next, sizes, jumper"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :total="total"
          @size-change="onSizeChange"
          @current-change="onPageChange"
        />
      </div>
    </div>
    <div v-else class="pageWrap">
      <div class="pagination">
        <div class="pageNumberRecord">
          共{{ totals }}条记录 第{{ pages.page }}/{{ pages.pages }}页
        </div>
        <el-pagination
          background
          :page-size="pages.rows"
          :current-page.sync="pages.page"
          layout="prev, pager, next, sizes, jumper"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :total="totals"
          @size-change="onSizeChange"
          @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { messageList, businessList, messageDetail, messageRead } from '@/api/message'
import { getDateTimeStamp, getDateDiff } from '@/utils/index'
import qs from 'qs'
export default {
  name: 'Message',
  filters: {
    formartTimes(val) {
      const ts = getDateTimeStamp(val)
      const result = getDateDiff(ts)
      return result
    }
  },
  data() {
    return {
      activeName: 'first',
      messageStatus: 0, // 0：未读 1：已读
      queryParams: {
        searchKey: '',
        businessType: ''
      },
      mesList: [],
      dialogVisible: false,
      total: 0,
      totals: 0,
      page: {
        page: 1,
        rows: 10
      },
      pages: {
        page: 1,
        rows: 10
      },
      options: [],
      content: {
        messageTitle: '',
        createTime: '',
        messageContent: ''
      }
    }
  },
  computed: {},
  mounted() {
    this.getBusinessList()
    this.getList()
  },
  methods: {
    // 翻页
    onPageChange(pageNum) {
      this.activeName === 'first' ? this.page.page = pageNum : this.pages.page = pageNum
      this.getList()
    },
    // 每页多少条
    onSizeChange(pageSize) {
      this.activeName === 'first' ? this.page.rows = pageSize : this.pages.rows = pageSize
      this.getList()
    },
    readMessage(id) {
      const parm = { 'relationMessageId': id }
      messageRead(parm).then(res => {
        if (res.status === 200) {
        } else {
          this.$message.error('请求失败')
          return
        }
      })
    },
    handleClose(done) {
      this.dialogVisible = false
      this.getList()
    },
    closeBtn() {
      this.dialogVisible = false
      this.getList()
    },
    showDetail(row) {
      this.dialogVisible = true
      const parm = { 'messageId': row.id }
      messageDetail(parm).then(res => {
        if (res.status == 200) {
          const { relationMessageUserId, messageTitle, createTime, messageContent } = res.data.data
          this.content.messageTitle = messageTitle
          this.content.createTime = createTime
          this.content.messageContent = messageContent
          this.activeName == 'first' ? this.readMessage(relationMessageUserId) : ''
        } else {
          this.$message.error('请求失败')
          return
        }
      })
    },
    getBusinessList() {
      // const parm = qs.stringify(this.page)
      businessList().then(res => {
        if (res.status == 200) {
          const data = res.data
          this.options = data
          // this.total = res.data.total
        } else {
          this.$message.error('请求失败')
          return
        }
      })
    },
    // 初始化列表
    getList() {
      const parm = Object.assign({}, this.activeName == 'first' ? this.page : this.pages,
        { businessType: this.queryParams.businessType,
          searchKey: this.queryParams.searchKey,
          messageStatus: this.messageStatus })
      const parms = qs.stringify(parm)
      messageList(parms).then(res => {
        if (res.status == 200) {
          const { data, total, pages } = res.data
          this.mesList = data
          this.activeName == 'first' ? this.total = total : this.totals = total
          this.activeName == 'first' ? this.page.pages = pages : this.pages.pages = pages
        } else {
          this.$message.error('请求失败')
          return
        }
      })
    },
    handleClick(tab, event) {
      this.queryParams.searchKey = ''
      this.queryParams.businessType = ''
      tab.name == 'first' ? this.messageStatus = 0 : this.messageStatus = 1
      tab.name == 'first' ? this.page.page = 1 : this.pages.page = 1
      // tab.name == "first"  ? this.getList(): this.getLists();
      this.getList()
    },
    // 重置按钮
    handerReset() {
      this.queryParams.searchKey = ''
      this.queryParams.businessType = ''
      this.getList()
    },
    // 查询按钮
    queryBtn() {
      this.getList()
    }

  }
}
</script>

<style lang="scss" scoped>
.role_authorization {
  .page-column {
    background-color: #fff;
    padding-top: 24px;
    margin: 16px;
  }
  .unRead{
       margin-top: 10px;
       .listWrap{
         background: #fff;
         margin:  0  16px;
          .listTable{
            border-bottom: 1px solid #ddd;
            font-size:16px;
            color:#333;
            font-weight: bold;
            padding: 10px;
          }
          .textItem{
             padding-bottom: 10px;
             .ulBox{
               display: inline-block;
               width:100%;
               .listItem{
                border-bottom: 1px solid #ddd;
                font-size:14px;
                padding:10px;
                color:#666;
                .listCate{
                  color:#333;
                  font-size:16px;
                }
                .listTime{
                  color:#999;
                  margin-top: 10px;
                }
                &:hover{
                  background: #f5f5f5;
                  cursor: pointer;
                }
              }
            }
          }
       }
      }
}
</style>
<style  lang='scss' scoped>
::v-deep .el-tabs__header {
  margin-bottom: 0;
  padding: 0 10px;
}
.dialogContent{
  .titleBox{
    color:#333;
    margin-bottom:10px;
    font-size:18px;
  }
  .detailTime{
    color:#999;
    font-size:14px;
  }
  .detailCont{
    font-size:14px;
    margin-top: 20px;
    .contentTitle{
      color:#666;
       font-size:16px;
    }
    .contents{
      color:#999;
      margin-top: 10px;
    }
  }
}
.tab{
    background: #fff;

}
.el-pagination{
  background: #fff;
}
.noData{
  text-align: center;
  font-size: 18px;
  color:#999;
  margin: 0 auto;
  padding: 100px 0;
}

.thisblack-bgc{
  background-color: rgba(0, 0, 0, 0.5);
}
.pageWrap{
  background: #fff;
  margin: 0 16px;
  padding: 10px;
  .pagination {
    width: 97%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pageNumberRecord {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}

</style>

