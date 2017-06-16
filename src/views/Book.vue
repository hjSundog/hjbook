<template>
    <div id="book-details" :data-bookid="'123'">
        <div class="center-container">
            <div class="book-details-container">
                <div class="book-details-header">
                    <h1>{{book.book_name}} <el-tag v-if="book.borrowed == '1'">borrowed</el-tag><el-tag v-else type="success">available</el-tag></h1>
                    <div class="book-details-profile">
                        <div class="book-details-profile-img">
                            <img src="https://img1.doubanio.com/spic/s29372139.jpg">
                        </div>
                        <div class="book-details-profile-info">
                            <ul>
                                <li>Author: {keke}</li>
                                <li>Publishing House: {keke}</li>
                                <li>Title: {keke}</li>
                                <li>Sub Title: {keke}</li>
                                <li>price: {keke}</li>
                                <li>ISBN: {keke}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="book-details-brief">
                    <h2>Content Summary</h2>
                    <p>{{ book.book_detail }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from 'api'
export default {
    name: 'book-details',
    data () {
        return {
            book: {}
        }
    },
    mounted() {
        let self = this;
        api.getBook( 
            this.$route.params.id, 
        ).then(function(response) {
            self.book = response[0]
        }).catch(function(error) {
            self.$message('get List error')
        })        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.center-container {
    width: 950px;
    margin: 0 auto;
}
.book-details-header {
    width: 100%;
    h1 {
        text-align: left;
    }
    div.book-details-profile {
        display: flex;
        align-items: center;
        .book-details-profile-img {
            height: 135px;
            width: 108px;
            img {
                object-fit: contain;
                height: 100%;
                width: 100%;
            }
        }
        .book-details-profile-info {
            ul {
                list-style: none;
                padding: 0 10px;
                li {
                    text-align: left;
                }
            }
        }
    }
}
.book-details-brief {
    h2 {
        color: #007722;
        text-align: left;
    }
    p {
        text-align: left;
    }
}
</style>
