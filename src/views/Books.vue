<template>
  <div>
    <el-row id="books">
      <div class="books-sidebar">
        <el-menu class="books-categories" @open="handleOpen" @close="handleClose" :router="true">
          <el-menu-item v-for="category of categoryList" class="category" :index="'/books/' + category.category_name">
            <i class="el-icon-setting"></i>
            <p>{{category.category_name}}</p>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="books-content">
        <router-view></router-view>
      </div>
    </el-row>

  </div>
</template>

<script>
import api from 'api'
import {mapGetters} from 'vuex'
export default {
  name: 'village',
  data() {
    return {
      categoryList: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    let self = this
    api.getCategoryList({
    }).then(function(response) {
        console.dir(response)
        self.categoryList = response
    }).catch(function(error) {
        self.$message('get List error')
    })
  }
}
</script>


<style lang="scss" scoped>
#books {
    display: flex;
}
.books-categories {
    height: 100%;
    p {
        display: inline-block;
        margin: auto;
    }
}
.category {
    display: flex;
    justify-content: center;
    align-items: center;
}
.books-sidebar {
    width: 180px;
}
.books-content {
    flex: 1;
}
</style>