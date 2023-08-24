<template>
<Layout>
  <div class="flex flex-col w-3/5">
  <!-- 图书信息 -->
  <div class="book-info flex flex-row">
    <img src="~/assets/images/s2885632.jpg" class="book-cover">
    <div class="flex flex-col justify-around ml-2">
      <div class="text-blue-400">明朝那些事儿</div>
      <div class="text-xs text-gray-400">限量版/当年明月</div>
    </div>
    <div class="rating">
      打分:  <star-rating></star-rating>
    </div>
  </div>
  <!-- End 图书信息 -->
  <!-- 编写内容 -->
  <div class="flex flex-col write-form mt-2">
    <input type="text" placeholder="添加标题">
    <textarea rows="10" cols="8" class="mt-4">
    </textarea>
  </div>
  <!-- End 编写内容 -->
  </div>
</Layout>
</template>

<script>
import Vue from "vue";
import {StarRating} from 'vue-star-rating';
import Layout from "@/pages/layout";
export default {
  name: "create",
  components: {
    Layout,
    StarRating
  }

}
</script>

<style scoped>
.book-info{
  background-color: #f0f0f0;
  height: 80px;
}
.book-cover{
  object-fit: fill;
  height: 80px;
  width: 60px;
}
</style>
