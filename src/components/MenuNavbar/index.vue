<template>
  <div>
    <el-menu
      :default-active="activeModule"
      class="right-menu-box"
      mode="horizontal"
      active-text-color="#1791FF "
      @select="handleSelect"
    >
      <template v-for="item in tabList">
        <template v-if="item.children && item.children.length > 0">
          <el-submenu
            :key="item.key"
            v-hasPermi="item.hasPermi"
            :index="item.key"
          >
            <template slot="title">{{ item.name }}</template>
            <el-menu-item
              v-for="childrenItem in item.children"
              :key="childrenItem.key"
              v-hasPermi="childrenItem.hasPermi"
              :index="childrenItem.key"
            >{{ childrenItem.name }}</el-menu-item>
          </el-submenu>
        </template>
        <el-menu-item v-else :key="item.key" v-hasPermi="item.hasPermi" :index="item.key">{{
          item.name
        }}</el-menu-item>
      </template>
      <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuItem',
  data() {
    return {
      tabList: [
        {
          key: 'workbench',
          name: '工作台',
          hasPermi: ['xm:menu:wp', 'isAll']
        },
        // {
        //   key: 'systemManagement',
        //   name: '系统管理',
        //   hasPermi: ['xm:menu:sys', 'isAll']
        // },
        // {
        //   key: 'masterData',
        //   name: '主数据'
        // },
        {
          key: 'businessCenter',
          name: '业务中心',
          hasPermi: ['xm:menu:bs', 'isAll'],
          children: [
            {
              key: 'material',
              name: '物资管理',
              hasPermi: ['xm:menu:bs:material', 'isAll']
            },
            {
              key: 'asset',
              name: '资产管理',
              hasPermi: ['xm:menu:bs:material', 'isAll']
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['activeModule'])
  },
  created() {
    const activeModule = JSON.parse(sessionStorage.getItem('activeModule'))
    if (activeModule) {
      this.$store.dispatch('menu/changeActiveModule', activeModule)
    } else {
      // 顶部导航栏初始化激活的模块（激活列表中的第一个）
      this.$store.dispatch('menu/changeActiveModule', this.tabList[0])
    }
  },
  methods: {
    handleSelect(key) {
      const { name } = recursion(this.tabList, 'key', key)
      this.$emit('select', key, name)

      function recursion(sourceObj, key, target) {
        let lastObj = null
        for (const i in sourceObj) {
          if (sourceObj[i][key] === target) {
            lastObj = sourceObj[i]
            return lastObj
          } else {
            if (sourceObj[i].children) {
              return recursion(sourceObj[i].children, key, target)
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.el-menu-item,
::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
</style>
