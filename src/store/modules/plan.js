import {
  getUserOrgTrees
} from '@/api/plan/mad'
import {
  Message
} from 'element-ui'
import { ifArrVal, ifArrValData } from '@/utils'
const state = {
  projectInformation: {
    orgId: ''
  },
  project: {},
  userOrgTree: [],
  selectUserOrg: {}
}

const mutations = {
  // CHANGE_PROJECT: (state, data) => {
  //   state.project = {
  //     ...data
  //   }
  //   state.projectInformation = {
  //     projectCode: data.projCode,
  //     projectId: data.id,
  //     projectName: data.projectName
  //   }
  // },
  SET_USERORGTREE: (state, userOrgTree) => {
    state.userOrgTree = userOrgTree
  },
  SET_SELECTUSERORG: (state, selectUserOrg) => {
    state.projectInformation = { orgId: selectUserOrg.id }
    state.selectUserOrg = selectUserOrg
  }
}

const actions = {
  // setProjcetData({
  //   commit
  // }, data) {
  //   commit('CHANGE_PROJECT', data)
  // },
  // 获取组织树
  getUserOrgTree({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getUserOrgTrees().then((response) => {
        const {
          data
        } = response
        if (!data) {
          Message('没有获取到权限')
        }
        const selectUserOrg = localStorage.getItem('selectUserOrg')
        const isArr = ifArrVal(data, JSON.parse(selectUserOrg))
        if (selectUserOrg && isArr) {
          commit('SET_SELECTUSERORG', JSON.parse(selectUserOrg))
        } else {
          if (data && data[0]) {
            commit('SET_SELECTUSERORG', data[0])
          } else {
            commit('SET_SELECTUSERORG', {})
          }
        }
        if (isArr) {
          const obj = ifArrValData(data, JSON.parse(selectUserOrg))
          if (obj) {
            commit('SET_SELECTUSERORG', obj)
            localStorage.setItem('selectUserOrg', JSON.stringify(obj))
          }
        }
        commit('SET_USERORGTREE', data)
        resolve(data)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
