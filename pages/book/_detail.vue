<template>
  <Layout>
      <div class="" v-if="book !== undefined">
        <div class="text-blue-900 text-2xl content-color">
          {{ book.name }}
        </div>
        <div class="flex flex-row py-4 w-1/2" :key="`book-`+book.id">
          <div class="text-sm font-semibold text-gray-800">
            <img :src="book.cover_url" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="leading-14">作者: <a href="" class="text-blue-500">{{ book.author }}</a></div>
            <div class="leading-14">评分: <span class="text-orange-500">{{ book.rating }}</span></div>
            <div class="leading-14">ISBN: {{ book.isbn || "暂无" }} </div>
            <div class="leading-14 text-gray-600">{{ book.desc }}</div>
            <div class="leading-14"><a :href="book.douban_url" target="_blank" class="text-blue-500">去豆瓣网查看更多图书详情»</a> </div>
          </div>
        </div>
      </div>

      <!--读书笔记 -->
      <NoteList :bookId="bookId" :notes="[]"/>

      <!-- 书评列表 -->
      <CommentList :bookId="bookId" :comments="[]"/>
  </Layout>
</template>

<script>
import Layout from '@/pages/layout';
import * as api from '@/api';
import NoteList from '@/components/Book/NoteList';
import CommentList from "@/components/Book/CommentList";

export default {
  name: "BookDetail",
  components: {
    Layout,
    NoteList,
    CommentList
  },
  computed:{
    bookInfo() {
      let info = this.book
      console.log(info)
      return info
    }
  },
  data(){
    return {
      book:undefined,
      bookId:this.$route.params.detail
    }
  },
  mounted() {
    api.book({"id":this.bookId}).then((resp) => {
      console.log(`Book.detail:${resp.result}`)
      if(resp.returncode === 1000) {
        this.book = resp.result
      } else {
        console.log(`error:${resp}`)
      }
    }).catch((e) => {
      console.log(e)
    })
  }
}
</script>

<style scoped>

</style>
