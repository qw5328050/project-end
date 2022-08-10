<template>
  <div>
    进入该页面请求授权
    <el-button @click="empower">带code请求授权</el-button>
    <el-button @click="getUserInfo">获取数据</el-button>
  </div>
</template>

<script>
import { empower, getUserInfo } from '@/api/demo/test'
import { setToken } from '@/utils/auth'

export default {
  data() {
    return {
      code: null
    }
  },
  created() {
    this.initCode()
    console.log(location)
  },
  methods: {
    // 解析code
    initCode() {
      const url = window.location.href
      this.code = url.split('code=')[1]
      if (this.code) {
        sessionStorage.setItem('code', this.code)
      }
    },
    // 获取token
    async empower() {
      const res = await empower('code', 'this.code')
      if (res.status === 200) {
        const accessToken = res.data && res.data.accessToken
        setToken(accessToken)
        // 授权成功后重定向到主页
        this.$router.replace('/')
      }
    },
    async getUserInfo() {
      const res = await getUserInfo()
      console.log(res)
    }
  }
}
</script>
