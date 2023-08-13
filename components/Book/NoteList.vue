<template>
  <div class="flex flex-col mt-4">
    <!--顶部导航 -->
    <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
      <div class="text-lg nav-text-color ">笔记与摘录(共0条)</div>
      <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="writeComment">
        <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;写笔记
      </div>
    </div>
    <!-- End 顶部导航 -->
    <template v-for="i in 6">
      <!-- 笔记标注 -->
      <div class="py-4">
        <div class="text-sm text-gray-800 mt-2 note-quote">
          还记得《漫长的季节》播出的时候，龚彪最后的离开赚足了多少人的眼泪，而王响最后的结局有人写出了上千字地透彻分析，来证明那个喊着向前看，别回头的王响只是一种意念和希翼。 东北工业的落寞在一众演员的精湛表...
        </div>
        <div class="leading-12 note-quote-author">
          <span class="text-blue-500 text-sm">welsonla</span>
          <span class="text-gray-400 text-sm">2023-08-13 18:00:00</span>
          <span class="text-gray-400 text-sm">章节一　P24</span>
        </div>
      </div>
      <!-- End 笔记标注 -->
    </template>
  </div>
</template>

<script>
export default {
  name: "NoteList",
  props:{
    bookId:Number
  },
  methods:{
    writeComment() {
      this.$router.push({
        path: '/book/note/create',
        query:{
          bookid:1
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
