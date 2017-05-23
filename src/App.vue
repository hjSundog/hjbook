<template>
  <div id="app">
    <router-view name="header"></router-view>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    let interval = setInterval(() => {
      var sid = this.stationid
      this.$store.commit('PRODUCE_FOOD', this.$store.state.farmers)
      localStorage.setItem("storedData", JSON.stringify(this.$store.state))
    }, 100)
    this.$store.commit('SET_INTERVAL', interval)
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.divider {
  width: 80%;
  margin:0 auto;
  border-bottom: 1px solid black;
}
</style>
