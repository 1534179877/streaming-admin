<template>
  <div class="nav">
    <el-row>
      <el-col :span="1" style="height: 100%">
        <el-menu :default-active="$route.path.split('/').pop()"
                 background-color="#001529"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse="true"
                  :router="true">
          <el-menu-item index="user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="video">
            <i class="el-icon-video-camera-solid"></i>
            <span slot="title">视频管理</span>
          </el-menu-item>
          <el-menu-item index="live">
            <i class="el-icon-s-platform"></i>
            <span slot="title">直播管理</span>
          </el-menu-item>
          <el-menu-item index="notice">
            <i class="el-icon-message-solid"></i>
            <span slot="title">通知管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="23" style="background-color: #F0F2F5">
        <h2>{{ title }}管理</h2>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    computed: {
      title () {
        let path = this.$route.path.split('/').pop()
        switch (path) {
          case 'user':
            return '用户'
          case 'video':
            return '视频'
          case 'live':
            return '直播'
          case 'notice':
            return '通知'
          default:
            return ''
        }
      }
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .nav,
  .el-row,
  .el-col,
  .el-menu {
    height: 100%;
  }
  .el-menu {
    width: 100%;
    border: 0;
  }
  h2 {
    background-color: white;
    padding: 2rem;
  }
</style>
