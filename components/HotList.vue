<template>
  <div class="flex-col mt-6">
    <div class="text-xl section-title">热门图书榜单</div>
    <div class="flex flex-row flex-wrap">
      <template v-for="book in books">
        <!-- 图书详情 -->
        <div class="flex flex-row py-4 w-1/2 box-border pr-3 cursor-pointer" :key="`book-`+book.id" @click="showBook(book.id)">
<!--          <a :href="`/book/`+book.id">-->
          <div class="text-sm font-semibold text-gray-800">
            <img :src="cover_url(book.image_url)" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="text-blue-900 text-sm note-title">
              {{ book.name }}
            </div>
            <div class="">作者: {{ book.author }}</div>
            <div class="">评分: {{ book.rating }}</div>
            <div class="text-gray-400">{{ book.desc }}</div>
          </div>
<!--          </a>-->
        </div>
        <!-- EOF 图书详情 -->
      </template>
    </div>
  </div>
</template>

<script>
import * as Tool from '@/tool'
export default {
  name: "HotList",
  props:{
    books:Array
  },
  methods:{
    cover_url(url) {
      return Tool.cover_url(url)
    },
    showBook(bookid){
      this.$router.push({
        path:`/book/${bookid}`
      })
    }
  },
}
</script>

<style scoped>

</style>
