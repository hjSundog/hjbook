<template>
    <div id="profile">
        <el-table
            :data="books"
            style="width: 100%">
            <el-table-column
                prop="book_name"
                label="bookname"
                width="180">
            </el-table-column>
            <el-table-column
                prop="current_borrower"
                label="Current Borrower">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import api from 'api'
import {mapGetters} from 'vuex'
export default {
    name: 'current-records',
    data () {
        return {
            books: []
        }
    },
    computed: {
        ...mapGetters([
            'getUserInfo',
        ])
    },
    mounted() {
        let self = this;
        api.getCurrentBorrowedByUser( 
            self.getUserInfo.user_id, 
        ).then(function(response) {
            self.books = response
        }).catch(function(error) {
            self.$message(error.data)
        })        
    }
}
</script>

<style lang="scss" scoped>
#current {
    display: flex;
    max-width: 1000px;
    margin: 50px auto;
}
</style>
