<template>
  <div class="upload-file">
    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        v-for="file in fileList"
        :key="file.name"
        class="el-upload-list__item ele-upload-list__item-content"
      >
        <el-link :href="file.url" :underline="false"  target="_blank">
          <svg-icon icon-class="attachment" style="width: 14px; height: 14px" />
          <span class="file-name"> {{ file.name }} </span>
        </el-link>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.el-upload-list__item:first-child {
  margin-top: 0px;
}
.file-name{
  margin-left: 4px;
}
</style>
