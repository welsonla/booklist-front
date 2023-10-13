<template>
  <div class="flex-col mt-6">
    <div class="text-xl section-title">最受欢迎的书评</div>
    <div class="flex flex-col">
      <template v-for="note in notes">
        <div class="flex flex-row py-4 border-b border-gray-200" :key="`note-`+note.id">
          <div class="text-sm font-semibold text-gray-800">
            <template v-if="note?.book?.image_url">
            <img :src="cover_url(note?.book?.image_url) " class="note-item-cover"/>
            </template>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="text-blue-900 text-sm note-title">
              <a href="">{{ note.title }}</a>
            </div>
            <div class="text-slate-400 text-sm leading-8">
              <a :href="`/user/`+note?.author_id" class="hover:bg-orange-300 text-blue-400">{{ note?.author?.name }}</a>
              评论 <a :href="`/book/`+note.book_id" class="hover:bg-orange-300 text-blue-400"> {{ note?.book?.name }}</a>
            </div>
            <div class="text-gray-600 text-sm">
              {{ note.content.substring(0,200) }}<a :href="`/book/review/`+note.id" class="text-blue-400">(查看原文)</a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import * as Tool from '@/tool';
export default {
  name: "NoteList",
  props:{
    notes:Array
  },
  methods:{
    cover_url(path){
      return Tool.cover_url(path)
    }
  }
}
</script>

<style scoped>

</style>
