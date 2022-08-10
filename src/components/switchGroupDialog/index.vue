<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="30%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <div class="content">
      <div class="text">
        <svg-icon icon-class="organization" style="font-size: 14px" /><span
          style="margin-left: 8px"
        >所选组织: {{ getLable(defaultData.orgName) }}</span>
      </div>
      <div class="btn">
        <el-button type="primary" @click="changeData">切换</el-button>
      </div>
    </div>
    <div slot="footer" class="footer">
      <div class="actionButtons">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确定</el-button>
      </div>
    </div>
    <GroupDialog
      :visible.sync="isShowDialog"
      :default-data="defaultData"
      @checkTree="checkTree"
    />
  </el-dialog>
</template>
<script>
import GroupDialog from './groupDialog.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'SwitchGroupDialog',
  components: { GroupDialog },
  props: {
    title: {
      type: String,
      require: true,
      default: null
    },
    visible: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      levelList: [],
      defaultData: {},
      isShowDialog: false,
      radioValue: null,
      selectedGroupsName: '',
      queryParams: {},
      filterText: '',
      loading: false,
      labelPosition: 'right',
      selectUserOrgData: null
    }
  },
  computed: {
    ...mapGetters(['selectUserOrg'])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
    visible: {
      handler() {
        if (this.visible) {
          if (
            this.selectUserOrg &&
            this.selectUserOrg.id
          ) {
            this.defaultData = { ...this.selectUserOrg }
          }
        }
      },
      deep: true,
      immediate: true
    },
    selectUserOrg: {
      handler() {
        if (this.selectUserOrg.id) {
          this.defaultData = { ...this.selectUserOrg }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.getBreadcrumb()
    if (
      this.selectUserOrg &&
      this.selectUserOrg.id &&
      this.selectUserOrg.orgName
    ) {
      this.radioValue = this.selectUserOrg.id
      this.selectedGroupsName = this.selectUserOrg.orgName
    }
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [].concat(
          matched
        )
      }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    getLable(data) {
      let name = data
      if (name && name.length > 18) {
        name = name.substring(0, 18) + '...'
      }
      return name
    },
    checkTree(data) {
      this.defaultData = { ...data }
    },
    // 切换
    changeData() {
      this.isShowDialog = true
    },
    handleClose() {
      this.defaultData = {}
      this.$emit('handleClose')
      this.$emit('update:visible', false)
    },
    // actionButtons() {
    //   if (!this.selectUserOrgData) {
    //     this.$message({ message: '请选择组织后,在进行操作!', type: 'warning' })
    //   } else {
    //     this.selectedGroupsName = this.selectUserOrgData.orgName
    //     this.handleCloseDialog()
    //   }
    // },
    handleSubmitDialog() {
      if (this.defaultData) {
        localStorage.setItem(
          'selectUserOrg',
          JSON.stringify(this.defaultData)
        )
        this.$store.commit('plan/SET_SELECTUSERORG', this.defaultData)
        if (this.levelList && this.levelList.length > 0) {
          if (this.levelList[1]) {
            if (this.$route.path === this.levelList[1].redirect) {
              this.$router.go(0)
            } else {
              this.$router.push({
                path: this.levelList[1].path
              })
            }
          } else if (this.levelList[0]) {
            if (this.$route.path === this.levelList[0].redirect) {
              this.$router.go(0)
            } else {
              this.$router.push({
                path: this.levelList[0].path
              })
            }
          }
        }
        this.handleClose()
      } else {
        this.$message({ message: '请选择组织后,在进行操作!', type: 'warning' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
::v-deep .el-dialog__body {
  padding: 20px;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
}
::v-deep .el-radio {
  margin-right: 8px;
  .el-radio__label {
    display: none;
  }
}
::v-deep .el-tree {
  .el-tree-node__content {
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    line-height: 22px;
    border-bottom: 1px solid#f0f0f0;
  }
}
.font-col {
  color: #1791ff;
}
.tree_content {
  overflow-y: scroll;
}
.content {
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .text {
    width: 90%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
.heander_tree {
  height: 54px;
  line-height: 54px;
  padding-left: 24px;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 4px 4px 0px 0px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 16px;
}
</style>
