import {
  Message
} from 'element-ui'
import {
  empower,
  logout,
  getAuths
} from '@/api/base'
// import { getInfo } from '@/api/user'
import {
  getWatermark
} from '@/api/plan/mad'
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: getUserInfo(),
    name: '',
    avatar: '',
    permissions: [],
    watermark: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_WATERMARK: (state, watermark) => {
    state.watermark = watermark
  }
}

const actions = {
  // 获取token
  empower({
    commit
  }) {
    return new Promise((resolve, reject) => {
      empower()
        .then((response) => {
          const {
            data
          } = response
          console.log(data)
          commit('SET_TOKEN', data.accessToken)
          setToken(data.accessToken)
          commit('SET_USERINFO', data.user)
          setUserInfo(data.user)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token)
  //       .then((response) => {
  //         const { data } = response

  //         if (!data) {
  //           return reject('Verification failed, please Login again.')
  //         }

  //         const { name, avatar } = data

  //         commit('SET_NAME', name)
  //         commit('SET_AVATAR', avatar)
  //         resolve(data)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // 获取权限
  getAuths({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getAuths()
        .then((response) => {
          const {
            data
          } = response
          if (!data) {
            Message('没有获取到权限')
          }
          commit('SET_PERMISSIONS', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 获取水印
  watermark({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getWatermark()
        .then((response) => {
          const {
            data
          } = response
          if (!data) {
            Message('没有获取到水印')
          }
          commit('SET_WATERMARK', data.configValue)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout().then((response) => {
        removeToken() // must remove  token  first
        removeUserInfo()
        resetRouter()
        commit('RESET_STATE')
        resolve(response)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      removeUserInfo()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
