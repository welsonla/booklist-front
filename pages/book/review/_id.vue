<template>
<Layout>
<div class="flex flex-col" v-if="review">
  <div class="text-lg text-gray-700">{{ review.title }}</div>

  <!-- 作者与图书信息 -->
  <div class="flex flex-row items-center box-border mt-2">
      <!-- 头像 -->
      <div class="flex w-8 h-8 flex flex-col items-center">
        <a :href="`/user/`+review.author_id">
          <img src="~/assets/images/avatar.png"/>
        </a>
      </div>
      <!-- End 头像 -->

      <div class="text-xs flex flex-col justify-between ml-2">
          <!-- 作者发表 -->
          <div class="text-gray-400 text-xs" v-if="review.author">
            <a :href="`/user/`+review.author_id" class="text-blue-400 hover:bg-amber-100">{{ review.author.author  }}</a>
            发表于 {{ review.created_at }}
          </div>
          <!-- End 作者发表 -->
          <!-- 图书信息 -->
          <div class="" v-if="review.book">
            <a class="text-blue-400 text-xs hover:bg-amber-100" href="`/book/`+review.book_id">{{ review.book.name }}</a>
            <star-rating v-model="review.rating"
                         :star-size="14"
                         :inline="true"
                         read-only="true"
            ></star-rating>
          </div>
          <!-- End 图书信息 -->
      </div>

  </div>
  <!-- End 作者与图书信息 -->
  <!-- 书评内容 -->
  <div class="text-sm text-gray-600 mt-4 leading-5 whitespace-pre" v-show="review" v-html="review.content"></div>
  <!-- End 书评内容 -->

</div>
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from "@/api";
export default {
  name: "ReviewDetail",
  components:{
    Layout
  },
  async fetch() {
    await api.reviewDetail({'id':this.$route.params.id}).then((resp)=>{
      console.log(JSON.stringify(resp))
      if (resp.returncode === 1000) {
        this.review = resp.result
      }
    }).catch((e)=>{
      console.log(`review.detail.error:${e}`)
    })
  },
  data() {
    return {
      review:undefined
    }
  },
  head() {
    return {
      title: '书评'
    }
  }
}
</script>

<style scoped>

</style>
