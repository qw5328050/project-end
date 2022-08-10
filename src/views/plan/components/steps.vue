<template>
  <div class="steps">
    <div v-for="(item, index) in stepList" :key="index" class="item">
      <div class="stepItem">
        <div
          v-if="activeIndex <= index"
          class="icon"
          :class="{ active: activeIndex === index }"
        >
          {{ index + 1 }}
        </div>
        <div v-else>
          <svg-icon icon-class="complete-step" style="font-size: 32px" />
        </div>
        <div class="text">{{ item.text }}</div>
        <div
          v-if="index < stepList.length - 1"
          class="line"
          :class="{ 'lineActive': activeIndex > index }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    stepList: {
      type: Array,
      default: () => [],
      require: true
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  .stepItem {
    display: flex;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
    .active {
      background: #1890ff;
      border: none;
      color: #fff;
    }
    .text {
      margin-left: 8px;
    }
    .line {
      width: 192px;
      height: 1px;
      margin: 0 16px;
      background: rgba(0, 0, 0, 0.15);
    }
    .lineActive {
      background: #1791FF;
    }
  }
}
</style>
