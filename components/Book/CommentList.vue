<template>
  <div :class="bookId ? 'mt-4' : ''">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between leading-12 border-b last:border-0 pb-2">
        <div class="text-lg nav-text-color">书评</div>
        <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="writeComment" v-show="canEdit">
          <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;写书评
        </div>
      </div>
      <template v-if="reviews.length > 0">
        <template v-for="review in reviews">
          <div class="py-4 border-b border-dashed last:border-0">
            <div class="leading-12">
              <span class="text-sky-700 text-sm hover:bg-amber-100"><nuxt-link :to="'/user/'+review.author.id">{{ review.author.name }}</nuxt-link></span>
              <span class="text-gray-400 text-sm">发表于{{ review.created_at }}</span>
            </div>
            <div class="bg-gray-200 py-2 text-sm pl-2 text-gray-600"><nuxt-link :to="'/book/review/'+review.id">{{ review.title }}</nuxt-link></div>
            <div class="text-sm text-gray-600 mt-2 leading-6">
              <template v-if="review.content.length > 400">
                {{ review.content.substring(0,400) }}<a :href="`/book/review/`+review.id" class="text-sky-700">(查看原文)</a>
              </template>
              <template v-else>
                {{ review.content }}
              </template>
            </div>
          </div>
        </template>
        <div class="text-sky-700 text-right text-sm leading-8" v-show="showMore"><nuxt-link :to="'/book/reviews?bookid='+bookId">&gt;&nbsp;查看更多书评</nuxt-link></div>
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
    reviews:Array,
    canEdit:{
      type:Boolean,
      default:false
    },
    showMore:{
      type:Boolean,
      default: false
    }
  },
  components:{
    NoData
  },
  methods:{
    writeComment() {
      this.$router.push({
        path: '/book/review/create',
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
