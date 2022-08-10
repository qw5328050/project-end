<template>
  <div>
    单点登录

    <el-button @click="getUserInfo">不带code请求</el-button>
    <el-button @click="getUserInfo">带code请求</el-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/demo/test'

export default {
  data() {
    return {
      code: null
    }
  },
  created() {
    const url = window.location.href
    const code = url.split('code=')[1]
    console.log(code)
    this.code = code
  },
  methods: {
    async getUserInfo() {
      if (this.code) {
        sessionStorage.setItem('code', this.code)
      }
      const code = sessionStorage.getItem('code')
      console.log(code)
      const res = await getUserInfo()
      console.log(res)
    }
  }
}
</script>
