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
        <el-table :data="borrowedBooks">
            <el-table-column property="book_id" label="id" width="150"></el-table-column>
            <el-table-column property="book_name" label="book name"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click.native.prevent="handleReturn(scope.$index, borrowedBooks)" type="text" size="small">return book</el-button>
              </template>
            </el-table-column>
        </el-table>
        <h1>borrow books</h1>
        <el-table :data="allBooks">
            <el-table-column property="book_id" label="id" width="150"></el-table-column>
            <el-table-column property="book_name" label="book name"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button v-if="allBooks[scope.$index].borrowed == '0'" @click.native.prevent="handleClick(scope.$index, allBooks)" type="text" size="small">borrow</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      dialogTableVisible: false,
      borrowedBooks: [],
      allBooks: [],
    }
  },
  computed: {
      ...mapGetters([
          'getUserInfo',
      ])
  },
  methods: {
    change() {
      this.dialogTableVisible = true
      console.log("fuck")
    },
    handleClick(index, rows) {
      let self = this;
      console.dir(rows[index])
      api.borrowBook(
        rows[index].book_id 
      ).then(function(response) {
        self.$message('borrow success')
      }).catch(function(error) {
        self.$message(error.data)
      })
    },
    handleReturn(index, rows) {
      let self = this;
      console.dir(rows[index])
      api.returnBook(
        rows[index].book_id 
      ).then(function(response) {
        self.$message('return success')
      }).catch(function(error) {
        self.$message(error.data)
      })
    }
  },
  created() {
    let self = this;
    api.getBooks(
      {}, 
    ).then(function(response) {
      self.allBooks = response
      console.log(self.allBooks)
    }).catch(function(error) {
      self.$message('get List error')
    })
    api.getCurrentBorrowedByUser( 
        self.getUserInfo.user_id, 
    ).then(function(response) {
        self.borrowedBooks = response
    }).catch(function(error) {
        self.$message(error.data)
    })   
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
