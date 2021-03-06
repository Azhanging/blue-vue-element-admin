<template>
  <div :class="classObj" class="app-wrapper">

    <div v-if="device==='mobile' && sidebar.opened && !onlyMain" class="drawer-bg" @click="handleClickOutside"/>

    <sidebar class="sidebar-container" v-if="!onlyMain"/>

    <div :class="{hasTagsView:needTagsView,'only-main':onlyMain}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}" v-if="!onlyMain">
        <navbar/>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main v-loading="loading"/>
      <right-panel v-if="showSettings">
        <settings/>
      </right-panel>
    </div>

    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" content="tooltip">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade"/>
    </el-tooltip>

  </div>
</template>

<script>

  import BackToTop from '$components/BackToTop'
  import RightPanel from '$demo/components/RightPanel'
  import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapState } from 'vuex'

  export default {
    name: 'Layout',
    data() {
      return {
        myBackToTopStyle: {
          right: '10px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        }
      }
    },
    components: {
      AppMain,
      Navbar,
      RightPanel,
      Settings,
      Sidebar,
      TagsView,
      BackToTop
    },
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        showSettings: state => state.settings.showSettings,
        needTagsView: state => state.settings.tagsView,
        fixedHeader: state => state.settings.fixedHeader,
        onlyMain: state => state.settings.onlyMain,
        loading: state => state.view.loading
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .only-main {
    margin-left: 0 !important;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
