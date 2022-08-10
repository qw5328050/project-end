<template>
  <div class="top_right_btn">
    <el-row>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <svg-icon
          icon-class="refresh"
          style="font-size: 16px; margin: 0 5px;cursor: pointer;"
          @click="refresh"
        />
      </el-tooltip>
      <el-tooltip
        v-if="columns"
        class="item"
        effect="dark"
        content="密度"
        placement="top"
      >
        <el-popover
          placement="bottom-end"
          popper-class="popper_content"
          width="150"
          trigger="click"
        >
          <div class="density_box">
            <div
              class="density_box_item"
              :class="{ active: activeDensity === '1' }"
              @click="cliDensity('1')"
            >
              默认
            </div>
            <div
              class="density_box_item"
              :class="{ active: activeDensity === '2' }"
              @click="cliDensity('2')"
            >
              中等
            </div>
            <div
              class="density_box_item"
              :class="{ active: activeDensity === '3' }"
              @click="cliDensity('3')"
            >
              紧凑
            </div>
          </div>
          <svg-icon
            slot="reference"
            icon-class="density"
            style="font-size: 16px; margin: 0 5px;cursor: pointer;"
          />
        </el-popover>
      </el-tooltip>
      <el-tooltip
        v-if="columns"
        class="item"
        effect="dark"
        content="显隐列"
        placement="top"
      >
        <el-popover
          placement="bottom-end"
          popper-class="popper_content"
          width="200"
          trigger="click"
        >
          <div class="top_Check">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              style="margin: 0 0 0 16px"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-button type="text" @click="reset">重置</el-button>
          </div>
          <el-checkbox-group
            v-model="checkdColumns"
            @change="handleCheckdColumnsChange"
          >
            <el-checkbox
              v-for="item in columns"
              :key="item.key"
              :label="item.key"
            >{{ item.label }}</el-checkbox>
          </el-checkbox-group>
          <svg-icon
            slot="reference"
            icon-class="menu"
            style="font-size: 16px; margin: 0 5px;cursor: pointer;"
          />
        </el-popover>
      </el-tooltip>
    </el-row>
    <!-- <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-transfer
        v-model="value"
        :titles="['显示', '隐藏']"
        :data="columns"
        @change="dataChange"
      />
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  name: 'RightToolbar',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      checkdColumns: [],
      checkAll: false,
      isIndeterminate: true,
      // 显隐数据
      // 弹出层标题
      title: '显示/隐藏',
      // 是否显示弹出层
      open: false,
      activeDensity: '1'
    }
  },
  watch: {
    columns: {
      handler() {
        this.checkdColumns = []
        if (this.columns && this.columns.length > 0) {
          this.columns.forEach((item) => {
            if (item.visible) {
              this.checkdColumns.push(item.key)
            }
          })
          if (this.checkdColumns.length === this.columns.length) {
            this.checkAll = true
            this.isIndeterminate =
              this.checkdColumns.length > 0 &&
              this.checkdColumns.length < this.columns.length
          }
        } else {
          this.checkdColumns = []
        }
      },
      deep: true,
      immediate: true
    },
    size: {
      handler() {
        if (this.size) {
          switch (this.size) {
            case 'medium':
              this.activeDensity = '1'
              break
            case 'small ':
              this.activeDensity = '2'
              break
            case 'mini':
              this.activeDensity = '3'
              break
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    reset() {
      this.$emit('resetColumns')
    },
    handleCheckAllChange(val) {
      if (val) {
        const arr = []
        this.columns.forEach((item) => {
          item.visible = true
          if (item.visible) {
            arr.push(item.key)
          }
        })
        this.checkdColumns = arr
      } else {
        this.columns.forEach((item) => {
          item.visible = false
        })
        this.checkdColumns = []
      }
      this.isIndeterminate = false
    },
    handleCheckdColumnsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.columns.length
      this.columns.forEach((item) => {
        const index = value.findIndex((items) => item.key === items)
        if (index >= 0) {
          item.visible = true
        } else {
          item.visible = false
        }
      })
    },
    // 刷新
    refresh() {
      this.$emit('queryTable')
    },
    // 更改密度
    cliDensity(type) {
      this.activeDensity = type
      let size = ''
      switch (this.activeDensity) {
        case '1':
          size = 'medium'
          break
        case '2':
          size = 'small'

          break
        case '3':
          size = 'mini'
          break
      }
      this.$emit('changeSize', size)
    }
  }
}
</script>
<style lang="scss" scoped>
.top_right_btn {
  margin-left: 10px;
}
.popper_content {
  .top_Check {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 34px;
    line-height: 28px;
    border-bottom: 1px solid #f0f0f0;
  }
  .density_box {
    text-align: center;
    .density_box_item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
    .active {
      color: #1791ff;
    }
  }
}
::v-deep .el-checkbox {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #595959;
  margin: 6px 0 6px 40px;
}
</style>
