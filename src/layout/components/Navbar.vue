<template>
  <div class="navbar">
    <div class="left-logo">
      <svg-icon icon-class="logo" style="font-size: 408px" />
    </div>
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <div class="right-menu-box"><menu-navbar @select="handleSelect" /></div>
      <div class="right-btn-container">
        <!-- <svg-icon
          class="more-btn"
          icon-class="switch-group"
          style="font-size: 20px"
          @click="showSwitchGroup"
        /> -->
        <DropDownGroupDialog class="more-btn" />
        <svg-icon
          class="email-btn"
          icon-class="message-nav"
          style="font-size: 20px"
          @mouseenter="getMessage"
        />
        <el-badge v-if="messList.length > 0" is-dot class="item" />
      </div>
      <div v-show="showMessage" class="messageBox" @mouseleave="closeMessage">
        <div class="messageHeader">
          <span class="socket">消息盒</span>
          <i
            class="el-icon-close"
            style="cursor: pointer; margin-right: 10px"
            @click="closeMessage"
          />
        </div>
        <div v-if="messList.length > 0" class="messageContent">
          <div
            v-for="item in messList.slice(0, 3)"
            :key="item.id"
            class="items"
          >
            <p class="content">
              <span class="title">【{{ item.messageTitle }}】</span>{{ item.messageContent }}
            </p>
          </div>
        </div>
        <div v-else class="noData">暂无数据</div>
        <div v-if="messList.length > 0" class="footer" @click="goToMessage">
          查看全部
        </div>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            v-if="avatar"
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <svg-icon
            v-else
            icon-class="default-avatar"
            style="font-size: 32px"
          />
          <span class="user-name">{{ userInfo.name }}</span>
          <i class="el-icon-arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/workbench/personal/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="dialogFormVisible = true">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <SwitchGroupDialog title="切换组织" :visible.sync="showSwitchGroupDialog" />
    <!-- 修改密码弹窗 -->
    <edit-password :visible.sync="dialogFormVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { messageList } from '@/api/message'
import qs from 'qs'
import MenuNavbar from '@/components/MenuNavbar'
import SwitchGroupDialog from '@/components/switchGroupDialog'
import DropDownGroupDialog from '@/components/DropDownGroupDialog'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    MenuNavbar,
    SwitchGroupDialog,
    DropDownGroupDialog,
    EditPassword: () => import('@/components/EditPassword')
    // Breadcrumb,
    // Hamburger
  },
  data() {
    return {
      showMessage: false,
      showSwitchGroupDialog: false,
      dialogFormVisible: false,
      messList: [],
      page: {
        page: 1,
        rows: 10000,
        messageStatus: 0 // 0未读
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'userInfo'])
  },
  mounted() {
    this.getUnMessage()
  },
  methods: {
    goToMessage() {
      this.$router.push('/workbench/message/index')
      this.showMessage = false
    },
    closeMessage() {
      this.showMessage = false
    },
    getMessage() {
      this.showMessage = true
    },
    getUnMessage() {
      const parms = qs.stringify(this.page)
      messageList(parms).then((res) => {
        if (res.status == 200) {
          const { data, total } = res.data
          this.messList = data
        } else {
          this.$message.error('请求失败')
          return
        }
      })
    },
    // 切换组织
    showSwitchGroup() {
      this.showSwitchGroupDialog = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      const res = await this.$store.dispatch('user/logout')
      if (res.status === 200) {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    },
    handleSelect(key, name) {
      console.log(key, name)
      // 切换激活的模块，更新菜单
      this.$store.dispatch('menu/changeActiveModule', { key, name })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 2px 10px 0 rgb(0 41 102 / 8%);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .left-logo {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding-left: 16px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .right-btn-container {
      float: left;
      margin-right: 10px;
      position: relative;
      .item {
        left: -15px;
      }
      .more-btn,
      .email-btn {
        font-size: 24px;
        vertical-align: middle;
        margin: -4px 8px 0 8px;
      }
    }
    .messageBox {
      position: fixed;
      top: 50px;
      z-index: 88;
      right: 5px;
      background: #fff;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
      border: 1px solid #f5f5f5;
      width: 336px;
      .messageHeader {
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .socket {
          color: #1791ff;
          margin-left: 32px;
        }
      }
      .messageContent {
        color: #595959;
        font-size: 14px;
        .items {
          border-bottom: 1px solid #f5f5f5;
          color: #aaa;
          .content {
            line-height: 22px;
            padding: 0 16px;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            .title {
              color: #262626;
            }
          }
        }
      }
      .noData {
        text-align: center;
        font-size: 18px;
        color: #999;
        margin: 0 auto;
        padding: 50px 0;
      }
      .footer {
        text-align: center;
        color: #595959;
        cursor: pointer;
      }
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .user-name {
          font-size: 14px;
          padding: 0 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 10px;
          font-size: 20px;
        }
      }
    }
  }
}

.right-menu-box {
  float: left;
  margin-right: 4px;
}
</style>
