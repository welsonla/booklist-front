<template>
  <div class="flex-col mt-6">
    <div class="text-xl section-title">热门图书榜单</div>
    <div class="flex flex-col">
      <template v-for="book in books">
        <div class="flex flex-row py-4 border-b border-gray-200" :key="`book-`+book.id">
          <div class="text-sm font-semibold text-gray-800">
            <img :src="book.cover_url" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="text-blue-900 text-sm note-title">
              <a href="">{{ book.name }}</a>
            </div>
            <div class="">作者: {{ book.author }}</div>
            <div class="">评分: {{ book.rating }}</div>
            <div class="text-gray-600">{{ book.desc }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotList",
  props:{
    books:Array
  }
}
</script>

<style scoped>

</style>
