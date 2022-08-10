<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-link">
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </div>
      <div v-else key="expand" class="sidebar-logo-link">
        <h1 class="sidebar-title">{{ menuTitle }}</h1>
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'SidebarLogo',
  components: {
    Hamburger
  },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // title: '物资管理'
      // logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'menuTitle'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  overflow: hidden;
  margin-top: 15px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      padding-left: 20px;
      margin: 0;
      color: #fff;
      font-weight: 500;
      line-height: 50px;
      font-size: 18px;
      // font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      letter-spacing: 1px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: right;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
