<template>
  <div id="header">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <router-link :to="{ path: '/village' }" replace><el-menu-item index="1">村庄</el-menu-item></router-link>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1" @click="reset">重置</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      reset() {
        clearInterval(this.$store.state.interval)
        localStorage.removeItem('storedData')
        this.$router.go(0)
      }
    }
  }
</script>

<style>

</style>
