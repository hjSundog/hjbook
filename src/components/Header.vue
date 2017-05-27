<template>
  <div id="header">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-row>
        <el-col class="hjbook-header-col" :span="4">
          <div class="logo">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1909982463,2705094677&fm=23&gp=0.jpg">
          </div>
        </el-col>
        <el-col class="hjbook-header-col" :span="12">
          <router-link :to="{ path: '/village' }" replace><el-menu-item index="1">村庄</el-menu-item></router-link>
          <el-submenu index="2">
            <template slot="title">Workspace</template>
            <el-menu-item index="2-1" @click="reset">重置</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
        </el-col>
        <el-col class="hjbook-header-col" :span="4">
          <el-input id="hjbook-header-search"
          placeholder="search the book name" 
          icon="search" 
          v-model="input2" 
          :on-icon-click="handleIconClick">
          </el-input>
        </el-col>
        <el-col class="hjbook-header-col" :span="4">
          <el-dropdown class="hjbook-header-profile" trigger="hover">
            <span class="el-dropdown-link hjbook-header-profile-avatar">
              <img src="http://img1.imgtn.bdimg.com/it/u=4042190513,2070669060&fm=23&gp=0.jpg" /> 
              <p>Liangwang</p>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
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

<style style lang="scss" scoped>
.logo {
  display: flex;
  margin:auto;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60px;
  img {
    height: 50px;
    width: 100%;
  }
}
.hjbook-header-col {
  line-height: 60px;
}
#hjbook-header-search {
  box-sizing: border-box;
}
.hjbook-header-profile {
  height: 60px;
}
.hjbook-header-profile-avatar {
  display: flex;
  img {
    height: 36px;
    width: 36px;
    align-self: center;
    border-radius: 23px;
  }

  p {
    margin: 0;
  }
}
</style>
