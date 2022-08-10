<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar', 'menuList', 'permissions']),
    routes() {
      const permissions = this.permissions
      const router = this.menuList
      const numRoute = this.changeRoutePermissions(permissions, router)
      // return this.$router.options.routes
      if (numRoute && numRoute.length > 0) {
        return numRoute
      } else {
        return []
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    changeRoutePermissions(permissions, router) {
      if (router && router.length > 0) {
        router.forEach((item) => {
          if (item.hasPermi) {
            if (Array.isArray(item.hasPermi)) {
              if (item.hasPermi && item.hasPermi.length > 0) {
                const isShow = item.hasPermi.some((items) => {
                  return (
                    permissions.findIndex(
                      (permission) => permission === items
                    ) >= 0
                  )
                })
                if (!isShow) {
                  item.hidden = true
                }
              }
            } else {
              if (item.hasPermi) {
                const isShow = permissions.some((permission) => {
                  return permission === item.hasPermi
                }
                )
                if (!isShow) {
                  item.hidden = true
                }
              }
            }
          }
          if (item.children && item.children.length > 0) {
            this.changeRoutePermissions(permissions, item.children)
          }
        })
        return router
        // console.log(router, 789789)
      } else {
        return []
      }
    }
  }
}
</script>
