<script>
export default {
  name:'BookItem',
  props:{
    book:Object
  }
}
</script>

<template>
  <!-- 图书信息 -->
  <div class="book-info flex flex-row mt-4" v-if="book">
    <img :src="'http://127.0.0.1:5000/'+book.image_url" class="book-cover">
    <div class="flex flex-col justify-around ml-2">
      <div class="text-sky-600"><nuxt-link :to="'/book/'+book.id">{{ book.name }}</nuxt-link></div>
      <div class="text-xs text-gray-400">{{ book.author}}</div>
    </div>
  </div>
  <!-- End 图书信息 -->
</template>

<style scoped>

</style>
