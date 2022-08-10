<template>
  <div />
</template>

<script>
export default {
  data() {
    return {
      code: null
    }
  },
  created() {
    this.initCode()
    this.$store.dispatch('user/empower').then((res) => {
      // 授权成功后清除code并重定向到主页
      sessionStorage.clear('code')
      this.$router.replace('/')
    })
  },
  methods: {
    // 解析code
    initCode() {
      const url = window.location.href
      this.code = url.split('code=')[1]
      if (this.code) {
        sessionStorage.setItem('code', this.code)
      }
    }
  }
}
</script>
