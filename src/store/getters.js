const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  permissions: (state) => state.user.permissions,
  activeModule: (state) => state.menu.activeModule,
  menuTitle: (state) => state.menu.menuTitle,
  menuList: (state) => state.menu.menuList,
  watermark: (state) => state.user.watermark,
  userOrgTree: (state) => state.plan.userOrgTree,
  selectUserOrg: (state) => state.plan.selectUserOrg,
  projectInformation: (state) => state.plan.projectInformation
}
export default getters
