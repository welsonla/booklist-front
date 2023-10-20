
<template>
<Layout>
  <div class="nav-text-color text-lg font-medium">
    笔记列表
  </div>
  <!-- 作者与图书信息 -->
  <div class="flex flex-row items-center box-border mt-2" v-if="user">
    <!-- 头像 -->
    <div class="flex w-8 h-8 flex flex-col items-center">
      <a :href="`/user/`+user.id">
        <img src="~/assets/images/avatar.png"/>
      </a>
    </div>
    <!-- End 头像 -->
    <div class="text-xs flex flex-col justify-between ml-2">
      <!-- 作者发表 -->
      <div class="nav-text-color text-lg">
        <a :href="`/user/`+user.id" class="text-blue-400 hover:bg-amber-100">{{ user.nickname }} </a>的笔记
      </div>
      <!-- End 作者发表 -->
    </div>
  </div>
  <!-- End 作者与图书信息 -->
<div class="flex flex-col">
  <!-- 图书信息 -->
  <nuxt-link :to="'/book/'+book.id">
  <div class="book-info flex flex-row mt-4" v-if="book">
    <img :src="'http://127.0.0.1:5000/'+book.image_url" class="book-cover">
    <div class="flex flex-col justify-around ml-2">
      <div class="text-sky-600">{{ book.name }}</div>
      <div class="text-xs text-gray-400">{{ book.author}}</div>
    </div>
  </div>
  </nuxt-link>
  <!-- End 图书信息 -->
  <NoteList
    :notes="listArray" :bookId="bookId"
    :total="total_items"
  />
  <div class="flex gap-x-2 text-sky-600 text-sm py-2 items-center content-center justify-center">
    <a href="">&lt;首页</a>
    <template v-for="i in total">
      <a href="" class="inline-block w-4 h-4 text-center" :class="page===i? 'bg-orange-400 text-white':''">{{ i }}</a>
    </template>
    <a href="">尾页&gt;</a>
  </div>
</div>
</Layout>
</template>

<script>
import Layout from "~/pages/layout.vue";
import NoteList from "~/components/Book/NoteList.vue";
import Pagination from "~/components/Pagination.vue";
import * as api from "~/api";
export default {
  name: 'notelist',
  components: {
    Layout,
    NoteList,
  },
  mounted() {
    this.fetchList()
  },
  async fetch() {
    await api.book({"id":this.bookId}).then((resp) => {
      console.log(`Book.detail:${resp.result}`)
      if(resp.returncode === 1000) {
        this.book = resp.result
        // this.quotes = resp.result.quotes
        // this.reviews = resp.result.reviews || []
      } else {
        console.log(`error:${resp}`)
      }
    }).catch((e) => {
      console.log(e)
    })

    // let params = {
    //   userid: this.userId,
    //   bookid: this.bookId,
    //   p: this.page
    // }
    // await api.notelist(params).then((resp) => {
    //   this.listArray = resp.result.list || []
    // }).catch((e) => {
    //
    // })
  },
  methods:{
    fetchList() {
      let params = {
        userid: this.userId,
        bookid: this.bookId,
        p: this.page
      }
      api.notelist(params).then((resp) => {
        this.listArray = resp.result.list || []
        this.total = resp.result.total
        this.total_items = resp.result.total_items
        this.user = resp.result.user
      }).catch((e) => {

      })
    }
  },
  data() {
    return {
      userId: this.$route.query.userid,
      bookId: this.$route.query.bookid,
      page: this.$route.query.p || 1,
      book: undefined,
      total_items:0,
      total: 1,
      listArray: [],
      user:null
    }
  },
  head() {
    return {
      title: '笔记列表'
    }
  }
}
</script>


<style scoped>

</style>
