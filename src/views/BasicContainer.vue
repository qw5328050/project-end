<template>
  <div class="BasicContainer">
    <div class="search">
        <input v-model="query" type="text" @keydown.enter="search" ref="input"/>
        <button @click="search">搜索</button>
    </div>
    <ul>
        <li v-for="item in responseList" :key="item.key">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.content}}</div>
        </li>
    </ul>
  </div>
</template>

<script>
// import BasicContainer from '@/components/BasicContainer';
export default {
  name: 'Search',
  props: {
    response: Object
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    responseList () {
        return this.response.list.map((v, index) => {
            v.key = Symbol(index)
            return v
        })
    },
  },
  mounted() {},
  methods: {
    search () {
        this.$refs['input'].blur()
        // this.$emit('search', this.query)
    }
  },
};
</script>
<style></style>