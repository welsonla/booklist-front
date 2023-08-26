<template>
  <div class="mt-4">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
        <div class="text-lg nav-text-color">书评(共0条)</div>
        <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="writeComment">
          <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;写书评
        </div>
      </div>
      <template v-if="reviews.length > 0">
        <template v-for="review in reviews">
          <div class="py-4 border-b border-dashed">
            <div class="leading-12">
              <span class="text-blue-500 text-sm hover:bg-amber-100">{{ review.author.name }}</span>
              <span class="text-gray-400 text-sm">{{ review.created_at }}</span>
            </div>
            <div class="bg-gray-200 py-2 text-xs pl-2">{{ review.title }}</div>
            <div class="text-xs text-gray-800 mt-2">
              {{ review.content.substring(0,200) }}<a :href="`/book/review/`+review.id" class="text-blue-400">(查看原文)</a>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <NoData :message="`暂无书评`"/>
      </template>
    </div>
  </div>
</template>

<script>
import NoData from "~/components/NoData";
export default {
  name: "CommentList",
  props:{
    bookId:String,
    reviews:Array
  },
  components:{
    NoData
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
