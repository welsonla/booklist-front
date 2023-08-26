<template>
  <div class="flex-col mt-6">
    <div class="text-xl section-title">最受欢迎的书评</div>
    <div class="flex flex-col">
      <template v-for="note in notes">
        <div class="flex flex-row py-4 border-b border-gray-200" :key="`note-`+note.id">
          <div class="text-sm font-semibold text-gray-800">
            <img src="~/assets/images/s2885632.jpg" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="text-blue-900 text-sm note-title">
              <a href="">{{ note.title }}</a>
            </div>
            <div class="text-slate-400 text-sm leading-8">{{ note.user_id }} 评论 {{ note.book_id }}</div>
            <div class="text-gray-600 text-xs">{{ note.content }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteList",
  props:{
    notes:Array
  }
}
</script>

<style scoped>

</style>
