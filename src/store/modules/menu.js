import router from '@/router'

const state = {
  activeModule: null, // 激活模块的key
  menuTitle: null, // 菜单名称
  menuList: null // 菜单数据
}

const mutations = {
  ACTIVE_MODULE: (state, key) => {
    state.activeModule = key
  },
  MENU_TITLE: (state, title) => {
    state.menuTitle = title
  },
  MENU_LIST: (state, list) => {
    state.menuList = list
  }
}

const actions = {
  // 切换右上角导航模块
  changeActiveModule({ commit, dispatch }, activeModule) {
    // 状态保持
    sessionStorage.setItem('activeModule', JSON.stringify(activeModule))
    // 更新当前激活模块
    commit('ACTIVE_MODULE', activeModule.key)
    // 更新菜单名称
    dispatch('changeMenuTitle', activeModule.name)
    // 更新菜单列表
    dispatch('changeMenuList', activeModule.key)
  },
  // 切换菜单名称
  changeMenuTitle({ commit }, title) {
    commit('MENU_TITLE', title)
  },
  // 切换菜单数据
  changeMenuList({ commit }, data) {
    // 只显示当前模块菜单，隐藏非当前模块菜单
    const routes = router.options.routes.filter((item) => {
      if (item.haveMenuModule && item.haveMenuModule === data) {
        return true
      } else {
        return false
      }
    })
    commit('MENU_LIST', routes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
