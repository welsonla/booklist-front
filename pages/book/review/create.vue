<template>
<Layout>
  <div class="flex flex-col my-0 mx-auto review-form">
  <!-- 图书信息 -->
  <div class="book-info flex flex-row">
    <img src="~/assets/images/s2885632.jpg" class="book-cover">
    <div class="flex flex-col justify-around ml-2">
      <div class="text-blue-400">明朝那些事儿</div>
      <div class="text-xs text-gray-400">限量版/当年明月</div>
    </div>
  </div>
  <!-- End 图书信息 -->
  <!-- 评分 -->
  <div class="rating flex flex-row items-start py-4">
    <div class="leading-7 text-sm text-gray-700">打分:</div>
    <div class=" flex flex-col ml-2">
      <star-rating v-model="rating"
                   :star-size="18"
                   :animate="true"
                   :inline="true"
                   text-class="rating-text"></star-rating>
    </div>
  </div>
  <!-- End 评分 -->
  <!-- 编写内容 -->
  <div class="flex flex-col write-form ">
    <input type="text" class="review-title" placeholder="添加标题" v-model="title">
    <textarea rows="10" cols="8" class="mt-4 review-content" v-model="content">
    </textarea>
    <input type="button" class="submit-button" value="提交" @click="submit" />
  </div>
  <!-- End 编写内容 -->
  </div>
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from "@/api";
export default {
  name: "create",
  components: {
    Layout,
  },
  methods:{
    submit() {
      let params = {
        book_id:this.bookid,
        title:this.title,
        content:this.content,
        rating:this.rating
      }
      api.createReview(params).then((resp) => {
        console.log(`create.review.success:${JSON.stringify(resp)}`)
        if(resp.returncode === 1000) {
          let itemId = resp.result.id
          this.$router.push({
            path:`/book/review/${itemId}`
          })
        }
      }).catch((e) => {
        console.log(`create.review.error:${e}`)
      })
    }
  },
  mounted() {
    document.getElementsByClassName("vue-star-rating-rating-text").hide()
  },
  data() {
    return {
      title:'',
      rating: 0,
      content:'',
      bookid: this.$route.query.bookid,
      starStyle: {
        fullStarColor: '#ed8a19',
        emptyStarColor: '#737373',
        starWidth: 30,
        starHeight: 30
      }
    }
  }

}
</script>

<style scoped lang="scss">
@import "assets/style/style.scss";
.book-info{
  background-color: #f0f0f0;
  height: 80px;
}
.book-cover{
  object-fit: fill;
  height: 80px;
  width: 60px;
}

.review-form{
  width: 500px;
}

.review-title{
  border-radius: 8px;
  border: 1px solid #d8dee4;
  height: 35px;
  padding-left: 15px;
}

.review-content{
  border-radius: 8px;
  border: 1px solid #d8dee4;
  padding:15px;
}

.submit-button{
  width:  200px;
  height: 30px;
  background-color: $button-color;
  color: #FFF;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
