<template>
  <Layout>
    <UserItem :user="user"  :message="'书评'" v-if="user" />
    <BookItem :book="book" v-if="book"/>
    <template v-if="reviews.length > 0">
      <template v-for="review in reviews">
        <ReviewItem :review="review" />
      </template>
      <Pagination :current="parseInt(p)" :total="parseInt(total)" v-if="total>1"/>
    </template>
    <template v-else>
      <NoData :message="'还没有书评'"/>
    </template>
  </Layout>
</template>

<script>
import * as api from '~/api';
import Layout from "@/pages/layout.vue";
import {reviews} from "~/api";
import ReviewItem from "@/components/Item/ReviewItem.vue";
import {showError} from "@/tool";
import BookItem from "@/components/Item/BookItem.vue";
import UserItem from "@/components/Item/UserItem.vue";
export default {
  name: 'reviews',
  components: {UserItem, BookItem, ReviewItem, Layout},
  async fetch() {
    if(this.userid > 0) {
      await api.user({userid: this.userid}).then((resp) => {
        this.user = resp.result
      }).catch((e) => {

      })
    }

    if (this.bookid > 0) {
      await api.book({id:this.bookid}).then((resp) => {
        this.book = resp.result
      }).catch((e) => {

      })
    }

    let params = {
      bookid:this.bookid,
      userid:this.userid,
      p:this.p
    }
    await api.reviews(params).then((resp) => {
      console.log(JSON.stringify(resp))
      if (resp.result.list.length > 0){
        this.reviews = resp.result.list
        this.total = resp.result.total
        this.total_count = resp.result.total_items
      }
    }).catch((e) => {
      console.log('请求出错')
      showError('服务繁忙，请稍候重试')
    })
  },
  data() {
    return {
      bookid: this.$route.query.bookid,
      userid: this.$route.query.userid || 0,
      reviews:[],
      p:this.$route.query.p || 1,
      total:0,
      items_count:0,
      book: null,
      user:null
    }
  },
  head() {
  return {
    title: '书评列表'
  }
}
}
</script>

<style scoped>

</style>
