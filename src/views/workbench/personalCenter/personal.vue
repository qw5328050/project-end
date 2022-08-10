<template>
  <div class="mod4">
    <div class="header-content">
      <div class="personal_center_header">
        <svg-icon icon-class="default-avatar" style="font-size: 80px" />
        <div class="content">
          <div class="TextGroup1 flex-col">
            <div class="mod6">
              <span class="info4 header">{{ perinfo.name }}</span>
              <p class="state">正常</p>
            </div>
          </div>
          <div class="info">
            <el-row>
              <el-col :span="12">
                <div class="item">
                  <svg-icon icon-class="work-number" class="svg-font" />
                  <span class="text">工号：</span>
                  <span class="value">{{ perinfo.username }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <svg-icon icon-class="phone" class="svg-font" />
                  <span class="text">手机：</span>
                  <span class="value">{{ perinfo.phone }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="item">
                  <svg-icon icon-class="jobs" class="svg-font" />
                  <span class="text">岗位：</span>
                  <span class="value">{{ perinfo.orgName ? perinfo.orgName : '管理员' }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <svg-icon icon-class="personal-email" class="svg-font" />
                  <span class="text">邮箱：</span>
                  <span class="value">{{ perinfo.email }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="btns">
          <el-button
            v-hasPermi="['qy:menu:wp:person_center:modify_pw']"
            type="primary"
            @click="() => (dialogFormVisible = true)"
          >修改密码</el-button>
        </div>
      </div>
    </div>
    <div class="table_content">
      <div class="mod8 flex-col">
        <div class="table_header_text">
          最近一次登录时间为：{{ updateTime }}&nbsp;&nbsp;&nbsp;&nbsp;登录IP：{{
            loginIp
          }}
        </div>
        <el-table
          :data="logData"
          border
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="updateTime" label="登录时间" />
          <el-table-column prop="loginIp" label="登录IP" />
          <el-table-column
            label="状态"
            prop="status"
            width="100"
          ><template slot-scope="{ row }">
            <span v-if="row.status === 0">成功</span>
            <span
              v-else-if="row.status === 1"
              style="color: #ff4d4f"
            >失败</span>
          </template></el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            共{{ allData.total }}条记录 第{{ allData.page }}/{{ allData.pages }}页
          </div>
          <el-pagination
            background
            :page-size="allData.rows"
            :current-page.sync="allData.page"
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="allData.total"
            @size-change="onSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!-- 修改密码弹窗 -->
    <edit-password
      :visible.sync="dialogFormVisible"
      @success="personalInformation"
    />
  </div>
</template>

<script>
import { personalInformation, personalJournal } from '@/api/workbench'
import EditPassword from '@/components/EditPassword'
export default {
  components: { EditPassword },
  data() {
    return {
      dialogFormVisible: false,
      loginIp: '',
      updateTime: '',
      perinfo: {},
      logData: [],
      allData: {},
      page: 1,
      rows: 10
    }
  },
  mounted() {
    this.personalInformation()
    // this.personalJournal()
  },
  methods: {
    personalInformation() {
      personalInformation()
        .then((re) => {
          if (re.status === 200) {
            const data = re.data
            const { loginIp, updateTime } = data.prevLoginLog
            this.loginIp = loginIp
            this.updateTime = updateTime
            this.perinfo = data.ssoUser
          } else {
            this.$message.error('请求失败')
            return
          }
        })
        .then(() => {
          const obj = {
            page: 1,
            rows: 10,
            userId: this.perinfo.id
          }
          personalJournal(obj).then((re) => {
            this.logData = re.data.data
            this.allData = re.data
          })
        })
    },

    open() {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      })
    },
    onSizeChange(e) {
      this.rows = e
      const obj = {
        page: this.page,
        rows: this.rows,
        userId: this.perinfo.id
      }
      personalJournal(obj).then((re) => {
        this.logData = re.data.data
        this.allData = re.data
      })
    },
    // 切换页数
    handleCurrentChange(e) {
      this.page = e
      const obj = {
        page: this.page,
        rows: this.rows,
        userId: this.perinfo.id
      }
      personalJournal(obj).then((re) => {
        this.logData = re.data.data
        this.allData = re.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.flex-row {
  display: flex;
  flex-direction: row;
}
.justify-between {
  display: flex;
  justify-content: space-between;
}

.header-content {
  // width: 30%;
  background: #fff;
  // height: calc(100vh - 50px);
  .personal_center_header {
    padding: 24px 40px;
    display: flex;
    .content {
      width: 93%;
      padding-left: 24px;
      box-sizing: border-box;
      .header {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .state {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0ac76f;
        margin-top: 6px;
        margin-bottom: 12px;
      }
      .info {
        .item {
          padding: 6px 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          .svg-font {
            font-size: 16px;
          }
          .text {
            margin-left: 8px;
          }
        }
      }
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
    }
  }
}

.table_content {
  background: #fff;
  // width: 70%;
  // margin-left: 16px;
  padding: 24px 24px 16px 24px;
  // height: calc(100vh - 50px);
  margin-top: 20px;
  .table_header_text {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c8c8c;
    margin-bottom: 16px;
  }
  .pagination {
    margin-top: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pageNumberRecord {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
.mod4 {
  // width: 83.34vw;
  // display: flex;
  margin: 16px;
}
.el-input {
  width: 350px;
}
</style>
