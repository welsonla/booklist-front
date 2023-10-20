<template>
  <Layout>
      <div class="" v-if="book !== undefined">
        <div class="text-blue-900 text-2xl content-color">
          {{ book.name }}
        </div>
        <div class="flex flex-row py-4 w-1/2" :key="`book-`+book.id">
          <div class="text-sm font-semibold text-gray-800">
            <img :src="cover_url(book.image_url)" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4 gap-y-1">
            <div class="leading-14">作者: <a href="" class="text-sky-700">{{ book.author }}</a></div>
            <div class="leading-14">评分: <span class="text-orange-500">{{ book.rating }}</span></div>
            <div class="leading-14">ISBN: {{ book.isbn || "暂无" }} </div>
            <div class="leading-14 text-gray-700">{{ book.desc }}</div>
            <div class="leading-14 flex justify-between">
              <a :href="book.douban_url" target="_blank" class="text-sky-700">去豆瓣网查看更多图书详情»</a>

              <div class="text-sky-700 text-sm">
                <span class="underline cursor-pointer" @click="toggleLike">
                  <template v-if="favorite">已收藏</template><template v-else>添加收藏</template></span>({{ book.like_count }}人收藏)
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- 读书笔记  -->
      <NoteList :bookId="bookId" :notes="quotes"/>

      <!-- 书评列表 -->
      <CommentList :bookId="bookId" :reviews="reviews"/>
  </Layout>
</template>

<script>
import Layout from '@/pages/layout';
import * as api from '@/api';
import NoteList from '@/components/Book/NoteList';
import CommentList from "@/components/Book/CommentList";
import * as Tool from "@/tool";
import {addFavorite, delFavorite, getFavorite, showError, showSuccess} from "@/tool";

export default {
  name: "BookDetail",
  components: {
    Layout,
    NoteList,
    CommentList
  },
  data(){
    return {
      book:undefined,
      bookId:this.$route.params.detail,
      quotes:[],
      reviews:[],
      title:'',
      favorite:null
    }
  },
  async fetch() {
    await api.book({"id":this.bookId}).then((resp) => {
      // console.log(`Book.detail:${resp.result}`)
      if(resp.returncode === 1000) {
        this.book = resp.result
        this.quotes = resp.result.quotes
        this.reviews = resp.result.reviews || []
        this.title = this.book.name
      } else {
        showError('获取图书信息失败')
        // console.log(`error:${resp}`)
      }
    }).catch((e) => {
      console.log(e)
    })
  },
  computed:{
    bookInfo() {
      let info = this.book
      console.log(info)
      return info
    }
  },
  methods:{
    cover_url(url) {
      return Tool.cover_url(url)
    },
    toggleLike() {
      if(this.favorite === null) {
        // 添加收藏
        addFavorite(api.fav_book, this.bookId, (resp) => {
          this.favorite = resp
          this.book.like_count += 1
          showSuccess('收藏成功')
        })
      } else {
        // 取消收藏
        delFavorite(api.fav_book, this.bookId, () => {
          this.favorite = null
          this.book.like_count -= 1
          showSuccess('已取消收藏')
        })
      }
    }
  },
  mounted() {
    getFavorite(api.fav_book, this.bookId, (resp) => {
      this.favorite = resp
    })
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped>

</style>
