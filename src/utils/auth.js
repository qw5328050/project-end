import Cookies from 'js-cookie'

const TokenKey = 'accessToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const UserInfoKey = 'userInfo'

export function getUserInfo() {
  const userInfo = Cookies.get(UserInfoKey)
  return userInfo && JSON.parse(userInfo)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfoKey, userInfo)
}

export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
