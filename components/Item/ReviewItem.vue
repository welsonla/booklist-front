

<template>
  <div class="flex flex-row py-4 border-b border-gray-200 last:border-0" :key="`review-`+review.id">
    <div class="text-sm font-semibold text-gray-800">
<!--      <template v-if="review?.book?.image_url">-->
<!--        <img :src="cover_url(review?.book?.image_url) " class="review"/>-->
<!--      </template>-->
    </div>
    <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
      <div class="text-sky-700 text-sm review flex justify-between">
        <a :href="'/book/review/'+review.id">{{ review.title }}</a>
        <div class="text-sky-700" v-if="user && parseInt(user.id) === parseInt(review.author_id)" >
          <a :href="'/book/review/create?ation=edit&id='+review.id+'&bookid='+review.book.id">编辑</a>
          <span @click="deleteNote" class="cursor-pointer">删除</span>
        </div>
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
import {cover_url, showError, showSuccess} from "@/tool";
import {mapGetters} from "vuex";
import * as api from "@/api";

export default {
  name: 'ReviewItem',
  computed: {
    ...mapGetters({
      user:'user/user',
    })
  },
  methods: {
    cover_url,
    deleteNote() {
      if(confirm('是否删除本条内容')) {
        api.deleteReview({id:this.review.id}).then((resp) => {
          if(resp.returncode === 1000) {
            showSuccess('删除成功')
            location.reload()
          }
        }).catch((e) => {
          showError('系统繁忙，请稍候重试')
        })
      }
    }
  },
  props:{
    review:Object
  }
}
</script>
<style>
</style>
