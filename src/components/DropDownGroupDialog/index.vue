<template>
  <el-popover v-model="visible" placement="bottom" width="400" trigger="click">
    <div class="content">
      <div class="title">
        当前组织:
        <span class="font-col"> {{ selectUserOrg.orgName }}</span>
      </div>
      <el-input v-model="filterText" placeholder="请输入组织查询">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
      <div class="tree_content">
        <el-tree
          ref="tree"
          :data="userOrgTree"
          :props="defaultProps"
          :highlight-current="true"
          :filter-node-method="filterNode"
          :default-expanded-keys="[userOrgTree[0].id]"
          style="max-height: 350px"
          node-key="id"
          @node-click="handleNodeClick"
        >
          <template slot-scope="{ node }">
            <div>
              <svg-icon v-if="node.level === 1" icon-class="yijizuzhi" />
              <svg-icon v-else-if="node.level === 2" icon-class="erjizuzhi" />
              <svg-icon v-else-if="node.level === 3" icon-class="sanjizuzhi" />
              <span
                v-if="node.label && node.label.length <= 20"
                class="lable"
                style="margin-left: 8px"
                v-html="getLable(node.label)"
              />
              <el-tooltip
                v-else
                class="item"
                effect="dark"
                :content="node.label"
                placement="top-end"
              >
                <span
                  class="lable"
                  style="margin-left: 8px"
                  v-html="getLable(node.label, true)"
                />
              </el-tooltip>
            </div>
          </template>
        </el-tree>
      </div>
    </div>
    <svg-icon
      slot="reference"
      class="more-btn"
      icon-class="switch-group"
      style="font-size: 20px"
    />
  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DropDownGroupDialog',
  data() {
    return {
      defaultProps: {
        children: 'childList',
        label: 'orgName',
        value: 'mainCode'
      },
      filterText: '',
      levelList: [],
      visible: false
    }
  },
  computed: {
    ...mapGetters(['userOrgTree', 'selectUserOrg'])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
    // defaultData: {
    //   handler() {
    //     if (this.defaultData.id) {
    //       this.radioValue = this.defaultData.id
    //       this.selectData = { ...this.defaultData }
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  mounted() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [].concat(matched)
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
    handleNodeClick(data) {
      if (data) {
        localStorage.setItem('selectUserOrg', JSON.stringify(data))
        this.$store.commit('plan/SET_SELECTUSERORG', data)
        this.visible = false
        this.open1(data)
        this.filterText = ''
      } else {
        this.$message({ message: '请选择组织后,在进行操作!', type: 'warning' })
      }
    },
    open1(data) {
      const title = data.orgType === 8 ? '项目' : '组织'
      this.$notify({
        message: `${title}切换成功`,
        duration: 2000
      })
      setTimeout(() => {
        if (this.levelList && this.levelList.length > 0) {
          if (this.levelList[0]) {
            if (this.$route.path === this.levelList[0].redirect) {
              this.$router.go(0)
            } else {
              this.$router.push({
                path: this.levelList[0].path
              })
            }
          } else if (this.levelList[1]) {
            if (this.$route.path === this.levelList[1].redirect) {
              this.$router.go(0)
            } else {
              this.$router.push({
                path: this.levelList[1].path
              })
            }
          }
        }
      }, 500)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    changeTree(node, data) {
      this.radioValue = data.id
      this.selectData = data
    },
    getLable(value, type) {
      let str = value
      if (str && this.filterText) {
        if (str.indexOf(this.filterText) >= 0) {
          const data = str.replace(
            this.filterText,
            `<span style="color:#1791ff">${this.filterText}</span>`
          )
          str = data
        }
      }
      if (type) {
        str = str.slice(0, 17) + '···'
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.beyond{
  width: 150px;//宽度一定要有，具体根据自己需求
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.title {
  margin-top: 4px;
  margin-bottom: 16px;
}
::v-deep .el-tree {
  .el-tree-node__content {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    line-height: 22px;
  }
}
.font-col {
  color: #1791ff;
}
.tree_content {
  margin-top: 16px;
  overflow-y: scroll;
}
.content {
  .text {
    width: 90%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
