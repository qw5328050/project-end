<template>
  <BasicContainer :response="response" @getList="search"></BasicContainer>
</template>

<script>
import BasicContainer from './BasicContainer';
export default {
  name: 'Search',
  components: {
    BasicContainer,
  },
  data() {
    return {
      response: {},
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 发送搜索列表请求
    async getList(key) {
      const response = await this.$http.get('http://douyin.bytedance.com/api/list', {
        params: {
          // 搜索词
          keyword: key || '',
          // 分页个数
          pageSize: 10,
          // 页码
          page: 1,
        },
      });
      this.response = response.data;
    },
  },
};
</script>
<style></style>