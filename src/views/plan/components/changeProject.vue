<template>
  <div>
    项目名称：<el-select
      v-model="projectId"
      placeholder="请选择"
      @change="changeProject"
    >
      <el-option
        v-for="item in projectOption"
        :key="item.id"
        :label="item.projectName"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { getUserProjects } from '@/api/plan/mad'

export default {
  name: 'ChangeProject',
  data() {
    return {
      projectId: null,
      projectOption: []
    }
  },
  created() {
    // this.getUserProjectsData()
  },
  methods: {
    // 获取项目信息
    getUserProjectsData() {
      getUserProjects().then((res) => {
        this.projectOption = res.data
        if (this.projectOption && this.projectOption.length > 0) {
          if (localStorage.getItem('projectData')) {
            const data = JSON.parse(localStorage.getItem('projectData'))
            this.projectId = data.id
            this.$store.dispatch('plan/setProjcetData', data)
            this.$emit('handlerList')
          } else {
            this.projectId = this.projectOption[0].id
            localStorage.setItem(
              'projectData',
              JSON.stringify(this.projectOption[0])
            )
            this.$store.dispatch('plan/setProjcetData', this.projectOption[0])
            this.$emit('handlerList')
          }
        }
      })
    },
    changeProject(data) {
      // let row = {}
      // this.projectOption.forEach((item) => {
      //   if (item.id === data) {
      //     row = { ...item }
      //   }
      // })
      // localStorage.setItem('projectData', JSON.stringify(row))
      // this.$store.dispatch('plan/setProjcetData', row)
      this.$emit('handlerList')
    }
  }
}
</script>

<style></style>
