<template>
    <div class="section">
        <div class="section-title">
            <h1>{{ $route.params.category }}</h1>
        </div>
        <div class="section-content">
            <div v-for="book of booksList" :data-bookid="'book-'+book.book_id" class="book-entry">
                <img class="book-entry-thumbnail" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497456024110&di=b871a3930ba8b8ec6296fb2adf780c15&imgtype=0&src=http%3A%2F%2Fwww.jillcon.cn%2FUploadFiles%2FOthers%2F201408181306141562753.jpg">
                <div class="book-entry-intro">
                    <h1>{{book.book_name}}</h1>
                    <h2>Yuyi Liang / 2017-5-29 / adoubi </h2>
                    <p>{{book.book_detail}}</p>
                </div>
            </div>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1">
        </el-pagination>
    </div>
</template>
<script>
import api from 'api'
export default {
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    data() {
        return {
            title: "Computer Science",
            booksList: [],
            currentPage1: 5,
        };
    },
    mounted() {
        let self = this;
        console.log(`this is in ${this.$route.params.category}`)
        api.getBooks_category(
            {}, 
            this.$route.params.category.toString(), 
        ).then(function(response) {
            console.dir(response)
            self.booksList = response
        }).catch(function(error) {
            self.$message('get List error')
        })
    },
    watch: {
        $route(curVal, oldVal) {
            let self = this;
            console.log(`this is in ${this.$route.params.category}`);
            api.getBooks_category(
                {}, 
                this.$route.params.category, 
            ).then(function(response) {
                console.dir(response)
                self.booksList = response
            }).catch(function(error) {
                self.$message('get List error')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.section-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 50px;
    border: 1px solid #eee;
}
.book-entry {
    display: flex;
    width: 100%;
    height: 150px;
    padding: 20px;
    &:not(:first-child) {
        border-top: 1px dashed #ddd;
    }
    img {
        width: 100px;
        height: 145px;
        padding: 0 15px;
    }
    .book-entry-intro {
        display: flex;
        flex-direction: column;
        h1 {
            text-align: left;
            margin: 0 0 0.5em 0;
            font-size: 1em;
        }
        h2 {
            text-align: left;
            margin: 0 0 0.5em 0;
            font-size: 0.75em;
        }
        p {
            flex: 1;
            text-align: left;
        }
    }
}
</style>
