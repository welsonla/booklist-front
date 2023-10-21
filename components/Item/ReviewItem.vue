

<template>
  <div class="flex flex-row py-4 border-b border-gray-200 last:border-0" :key="`review-`+review.id">
    <div class="text-sm font-semibold text-gray-800">
<!--      <template v-if="review?.book?.image_url">-->
<!--        <img :src="cover_url(review?.book?.image_url) " class="review"/>-->
<!--      </template>-->
    </div>
    <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
      <div class="text-sky-700 text-sm review">
        <a :href="'/book/review/'+review.id">{{ review.title }}</a>
      </div>
      <div class="text-slate-400 text-sm leading-8">
        <a :href="`/user/`+review?.author_id" class="hover:bg-orange-300 text-sky-700">{{ review?.author?.name }}</a>
        发表书评 <a :href="`/book/`+review.book_id" class="hover:bg-orange-300 text-sky-700"> {{ review?.book?.name }}</a>
      </div>
      <div class="text-gray-600 text-sm" v-if="review.content">
        {{ review.content.substring(0,200) }}<a :href="`/book/review/`+review.id" class="text-sky-700">(查看原文)</a>
      </div>
    </div>
  </div>
</template>
<script>
import {cover_url} from "@/tool";

export default {
  name: 'ReviewItem',
  methods: {cover_url},
  props:{
    review:Object
  }
}
</script>
<style>
</style>
