<template>
  <div />
</template>

<script>
import { empower } from '@/api/base'
import { setToken } from '@/utils/auth'

export default {
  data() {
    return {
      code: null
    }
  },
  created() {
    this.initCode()
    this.empower()
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
      const res = await empower()
      if (res.status === 200) {
        const accessToken = res.data && res.data.accessToken
        setToken(accessToken)
        // 授权成功后重定向到主页
        this.$router.replace('/')
      }
    }
  }
}
</script>
