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
          <div class="text-gray-400 text-sm" v-if="review.author">
            <a :href="`/user/`+review.author_id" class="text-blue-400 hover:bg-amber-100">{{ review.author.name  }}</a>
            发表于 {{ review.created_at }}
          </div>
          <!-- End 作者发表 -->
          <!-- 图书信息 -->
          <div class="" v-if="review.book != null">
            <a class="text-blue-400 text-sm hover:bg-amber-100" :href="'/book/'+review.book_id">{{ review.book.name }}</a>
            <client-only>
            <star-rating v-model="review.rating"
                         :star-size="14"
                         :inline="true"
                         :read-only="true"
            ></star-rating>
            </client-only>
          </div>
          <!-- End 图书信息 -->
      </div>
  </div>
  <!-- End 作者与图书信息 -->
  <!-- 书评内容 -->
  <div class="text-sm text-gray-600 mt-4 mb-4 leading-6  whitespace-pre-wrap"
       v-show="review" v-html="review.content"></div>
  <!-- End 书评内容 -->
  <!-- 收藏 -->
  <div class="flex justify-end items-end content-end py-2 border-t-gray-300 border-t mb-4">
    <div class="text-gray-400 text-sm mr-4">被&nbsp;{{ review.like_count }}&nbsp;人收藏</div>
    <div class="bg-green-200 text-green-800 text-xs border-green-400 px-2 py-1 border rounded flex justify-center items-center cursor-pointer" @click="toggleLike">
      <template v-if="favorite">
        <font-awesome-icon :icon="['fas', 'bookmark']"  class="text-green-800 h-3 w-3"/>
        &nbsp; 已收藏
      </template>
      <template v-else>
        <font-awesome-icon :icon="['far','bookmark']"  class="text-green-800 h-3 w-3"/>
        &nbsp; 收藏
      </template>
    </div>
  </div>
  <!-- End 收藏 -->
</div>
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from "@/api";
import {addFavorite, delFavorite, getFavorite, showSuccess} from "~/tool";
export default {
  name: "ReviewDetail",
  components:{
    Layout
  },
  async fetch() {
    await api.reviewDetail({'id':this.reviewId}).then((resp)=>{
      // console.log(JSON.stringify(resp))
      if (resp.returncode === 1000) {
        this.review = resp.result
        this.title= this.review.title
      }
    }).catch((e)=>{
      // console.log(`review.detail.error:${e}`)
    })
  },
  mounted() {
    getFavorite(api.fav_review, this.reviewId, (resp) => {
      this.favorite = resp
    })
  },
  data() {
    return {
      review:undefined,
      title: '书评',
      favorite: false,
      reviewId:this.$route.params.id
    }
  },
  methods:{
    toggleLike() {
      if(this.favorite === null) {
        // 添加收藏
        addFavorite(api.fav_review, this.reviewId, (resp) => {
          this.favorite = resp
          this.review.like_count += 1
          showSuccess('收藏成功')
        })
      } else {
        // 取消收藏
        delFavorite(api.fav_review, this.reviewId, () => {
          this.favorite = null
          this.review.like_count -= 1
          showSuccess('已取消收藏')
        })
      }
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped>

</style>
