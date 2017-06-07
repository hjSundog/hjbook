<template>
  <div id="app">
    <router-view name="header"></router-view>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="hjbook-tester" @click="change()">
      <i class="el-icon-caret-top"></i>
    </div>
    <el-dialog title="return books" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="bookname" label="book name" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        <h1>borrow books</h1>
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="bookname" label="book name" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  methods: {
    change() {
      this.dialogTableVisible = true
      console.log("fuck")
    }
  },
  mounted() {
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
.hjbook-tester {
    background-color: #58b7ff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
    opacity: .4;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
