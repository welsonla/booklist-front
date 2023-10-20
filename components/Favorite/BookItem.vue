<template>
  <!-- 图书详情 -->
  <div class="flex flex-row py-4 cursor-pointer" :key="`book-`+book.id">
    <div class="text-sm font-semibold text-gray-800">
      <img :src="cover_url(book.image_url)" class="note-item-cover"/>
    </div>
    <div class="flex flex-col text-sm text-gray-500 ml-4">
      <div class="text-blue-900 text-sm note-title">
        <nuxt-link :to="'/book/'+book.id">
        {{ book.name }}
        </nuxt-link>
      </div>
      <div class="">作者: {{ book.author }}</div>
      <div class="">评分: {{ book.rating }}</div>
      <div class="text-gray-400">{{ book.desc }}</div>
    </div>
  </div>
  <!-- EOF 图书详情 -->
</template>

<script>
import {cover_url} from "~/tool";

export default {
  name:'BookItem',
  methods: {cover_url},
  props:{
    book:Object
  }
}
</script>

<style scoped>

</style>
