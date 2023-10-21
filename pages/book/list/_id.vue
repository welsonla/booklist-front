<template>
<Layout>
  <div class="flex flex-row">
    <!-- 书单详情 -->
    <div class="flex flex-col flex-1" v-if="collect">
      <div class="text-2xl mb-2"> {{ collect.name }}</div>
      <!-- 作者与图书信息 -->
      <div class="flex flex-row items-center box-border mt-2 mb-2">
        <!-- 头像 -->
        <div class="flex w-8 h-8 flex-col items-center">
          <a :href="`/user/`+collect.author_id">
            <img src="~/assets/images/avatar.png"/>
          </a>
        </div>
        <!-- End 头像 -->

        <div class="text-xs flex flex-col justify-between ml-2">
          <!-- 作者发表 -->
          <div class="text-gray-400 text-sm" v-if="collect.author">
            来自&nbsp;<a :href="`/user/`+collect.author_id" class="text-sky-700 hover:bg-amber-100">{{ collect.author.name  }}</a>
            &nbsp;创建于 {{ collect.created_at }}
          </div>
          <!-- End 作者发表 -->
        </div>
      </div>
      <!-- End 作者与图书信息 -->

      <!-- 详情 -->
      <div class="text-sm text-gray-700 mb-2 leading-6" v-html="collect.content"></div>
      <!-- End 详情 -->

      <!-- 书单内包含的图书 -->
      <div class="">
        <template v-for="book in collect.books">
          <nuxt-link :to="'/book/'+book.id">
          <div class="flex flex-row">
            <div class="flex flex-row py-4 box-border pr-3 cursor-pointer" :key="`book-`+book.id">
              <div class="text-sm font-semibold text-gray-800">
                <img :src="cover_url(book.image_url)" class="note-item-cover"/>
              </div>
              <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
                <div class="text-blue-900 text-sm note-title">
                  {{ book.name }}
                </div>
                <div class="">作者: {{ book.author }}</div>
                <div class="">评分: {{ book.rating }}</div>
                <div class="text-gray-400">{{ book.desc }}</div>
              </div>
            </div>
          </div>
          </nuxt-link>
        </template>
      </div>
      <!-- End 书单内包含的图书 -->

      <!-- 收藏 -->
      <div class="flex justify-end items-end content-end py-2 border-t-gray-300 border-t mb-4">
        <div class="text-gray-400 text-sm mr-4">被&nbsp;{{ collect.like_count }}&nbsp;人收藏</div>
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
    <!-- End 书单详情 -->
    <!-- 侧边栏 -->
    <div class="side-bar">
      <div class="nav-text-color mb-2">
        什么是书单  · · · · · ·
      </div>
      <div class="text-gray-500 text-sm leading-6">
        书单是收集图书的工具, 是系统整理图书与学习进阶的一种学习路径, 将感兴趣的图书收藏到书单，方便以后查找。<br/><br/>

        你还可以看看其他人的收集，收藏你感兴趣的书单。
      </div>
    </div>
    <!-- End 侧边栏 -->
  </div>
</Layout>
</template>

<script>
import Layout from "~/pages/layout.vue";
import * as api from '~/api';
import {addFavorite, cover_url, delFavorite, getFavorite, showSuccess} from "~/tool";
export default {
  name: 'CollectDetail',
  components:{
    Layout
  },
  async fetch() {
    let params = {id:this.$route.params.id}
    await api.collectDetail(params).then((resp) => {
      // console.log(JSON.stringify(resp))
      this.collect = resp.result
      this.title = this.collect.name
    }).catch((e) => {

    })
  },
  data() {
    return {
      collectId: this.$route.params.id,
      collect:null,
      title:'书单',
      favorite:null
    }
  },
  methods:{
    cover_url,
    toggleLike() {
      if(this.favorite === null) {
        // 添加收藏
        addFavorite(2, this.collectId, (resp) => {
          this.favorite = resp
          this.collect.like_count += 1
          // console.log('收藏成功')
          showSuccess('收藏成功')
        })
      } else {
        // 取消收藏
        delFavorite(2, this.collectId, () => {
          this.favorite = null
          this.collect.like_count -= 1
          // console.log('收藏失败')
          showSuccess('已取消收藏')
        })
      }
    }
  },
  mounted() {
    // console.log(`collectId:${this.collectId}`)
    getFavorite(api.fav_collect, this.collectId, (resp) => {
      this.favorite = resp
    })
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
