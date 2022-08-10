<template>
  <el-dialog
    title="选择所属组织"
    :visible.sync="visible"
    width="50%"
    append-to-body
    :show-close="true"
    :before-close="handleCloseData"
  >
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="heander_tree">组织结构</div>
    <div class="tree_content">
      <el-tree
        ref="tree"
        :data="userOrgTree"
        :props="defaultProps"
        :highlight-current="true"
        :filter-node-method="filterNode"
        :default-expanded-keys="[userOrgTree[0].id]"
        style="max-height: 460px"
        node-key="id"
        @node-click="handleNodeClick"
      >
        <template slot-scope="{ node, data }">
          <div>
            <el-radio
              v-model="radioValue"
              :label="data.id"
              @change="changeTree(node, data)"
            />
            <svg-icon v-if="node.level === 1" icon-class="yijizuzhi" />
            <svg-icon v-else-if="node.level === 2" icon-class="erjizuzhi" />
            <svg-icon v-else-if="node.level === 3" icon-class="sanjizuzhi" />
            <span
              class="lable"
              style="margin-left: 8px"
              v-html="getLable(node.label)"
            />
          </div>
        </template>
      </el-tree>
    </div>

    <div slot="footer" class="footer">
      <div class="actionButtons">
        <el-button @click="handleCloseData">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    defaultData: {
      type: Object,
      require: false,
      default: () => {}
    }
  },
  data() {
    return {
      filterText: '',
      radioValue: '',
      defaultProps: {
        children: 'childList',
        label: 'orgName',
        value: 'mainCode'
      },
      selectData: null
    }
  },
  computed: {
    ...mapGetters(['userOrgTree'])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    defaultData: {
      handler() {
        if (this.defaultData.id) {
          this.radioValue = this.defaultData.id
          this.selectData = { ...this.defaultData }
        }
      },
      deep: true,
      immediate: true
    },
    visible: {
      handler() {
        if (this.defaultData.id) {
          this.radioValue = this.defaultData.id
          this.selectData = { ...this.defaultData }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleNodeClick(data) {
      this.radioValue = data.id
      this.selectData = data
    },
    filterNode(value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    changeTree(node, data) {
      this.radioValue = data.id
      this.selectData = data
    },
    getLable(value) {
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
      return str
    },
    handleCloseData() {
      this.handleClose()
      this.$emit('checkTree', this.defaultData)
    },
    handleClose() {
      this.radioValue = ''
      this.filterText = ''
      this.$emit('update:visible', false)
    },
    handleSubmit() {
      this.handleClose()
      this.$emit('checkTree', this.selectData)
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
