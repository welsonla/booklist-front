<template>
  <div class="mt-4">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
        <div class="text-lg nav-text-color">书评(共0条)</div>
        <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="writeComment">
          <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;写书评
        </div>
      </div>

      <template v-for="comment in comments">
        <div class="py-4 border-b border-dashed">
          <div class="leading-12">
            <span class="text-blue-500 text-sm">welsonla</span>
            <span class="text-gray-400 text-sm">2023-08-13 18:00:00</span>
          </div>
          <div class="text-sm text-gray-800 mt-2">
            还记得《漫长的季节》播出的时候，龚彪最后的离开赚足了多少人的眼泪，而王响最后的结局有人写出了上千字地透彻分析，来证明那个喊着向前看，别回头的王响只是一种意念和希翼。 东北工业的落寞在一众演员的精湛表...
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  props:{
    bookId:Number,
    comments:Array
  },
  methods:{
    writeComment() {
      this.$router.push({
        path: '/book/note/create',
        query:{
          bookid:this.bookId
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
