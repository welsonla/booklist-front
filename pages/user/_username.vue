<template>
<Layout>
<!--  {{ $route.params.username }}-->
<!--  {{ user.name }}-->
  <div class="flex flex-row py-4 px-4 mb-4">
    <img src="~/assets/images/avatar.png" class="w-12 h-12"/>
    <div class="flex flex-col ml-2 justify-between">
      <div class="flex text-xl text-sky-600 flex-row items-center">
        {{ userInfo.name }} 的读书主页
        <template v-if="user && userInfo.id !== user.id">
<!--          <button class="bg-amber-100 w-20 text-sm rounded border border-amber-400 ml-2">关注</button>-->
        </template>
      </div>
      <div class="text-sm">
        <ul class="flex items-center gap-x-8">
          <li><a :href="`/user/`+userInfo.id" class="hover:bg-orange-300 hover:text-white">主页</a></li>
          <li><a :href="`/book/notes?userid=`+userInfo.id" class="hover:bg-orange-300 hover:text-white">笔记</a></li>
          <li><a :href="`/book/reviews?userid=`+userInfo.id" class="hover:bg-orange-300 hover:text-white">书评</a></li>
          <li><a :href="`/book/collects?userid=`+userInfo.id" class="hover:bg-orange-300 hover:text-white">书单</a></li>
          <li><a :href="`/user/favorite/`+userInfo.id" class="hover:bg-orange-300 hover:text-white">收藏({{ favorite_count }})</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex flex-row">
    <!--  主页列表 -->
    <div class="flex flex-col ml-4 flex-1" style="width:920px;">
      <!-- 读过的书 -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between leading-12 border-b pb-2 mb-2">
          <div class="text-lg nav-text-color">书单(共{{collections.length}}条)</div>
          <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="createList">
            <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;创建书单
          </div>
        </div>
        <template v-if="collections.length > 0">
          <div class="flex flex-row gap-x-4 overflow-x-auto">
            <template v-for="collection in collections">
              <div class="flex flex-col collect-item" :key="'collect-'+collection.id">
                <img :src="cover_url(collection.cover_url)">
                <div class="text-sm text-sky-600">
                  <nuxt-link :to="'/book/list/'+collection.id">{{ collection.name }}</nuxt-link>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <NoData :message="`还没有书单`"/>
        </template>
      </div>
      <!-- End 读过的书  -->
      <!-- 笔记列表 -->
      <div class="flex flex-col">
        <template v-if="notes.length > 0">
          <!--读书笔记 -->
          <NoteList bookId="0" :notes="notes"/>
        </template>
        <template v-else>
          <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
            <div class="text-lg nav-text-color">我的笔记</div>
          </div>
          <NoData :message="`还没有记录过笔记`"/>
        </template>
      </div>
      <!-- End 笔记列表 -->

      <!-- 书评列表 -->
      <div class="flex flex-col">
        <template v-if="reviews.length > 0">
          <!-- 书评列表 -->
          <CommentList bookId="0" :reviews="reviews" />
        </template>
        <template v-else>
          <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
            <div class="text-lg nav-text-color">我的书评</div>
          </div>
          <NoData :message="`还没有发布过书评`"/>
        </template>
      </div>
      <!-- End 书评列表 -->
    </div>
    <!-- End 主页列表 -->
    <!-- 左侧栏 -->
    <div class="side-bar px-4 h-full">
      <div class="flex flex-col">
        <div class="flex-col items-center content-center py-2 text-sm">
          <div class="text-gray-700">注册日期: {{ userInfo.created_at }}</div>
          <div class="text-gray-700 text-sm leading-6">
            {{ userInfo.bio }}
          </div>
          <div class="flex flex-row" v-show="user && user.id === parseInt(userid)">
            <a @click="logout" class="text-sky-600 underline">退出登录</a>
          </div>
        </div>
      </div>
    </div>
    <!-- End 左侧栏 -->
  </div>
</Layout>
</template>

<script>
import { mapGetters } from 'vuex';
import NoData from "@/components/NoData";
import Layout from "@/pages/layout";
import * as api from '@/api';
import NoteList from "@/components/Book/NoteList";
import CommentList from "@/components/Book/CommentList";
import {cover_url, showSuccess} from "@/tool";
import Cookie from "js-cookie";
import user from "@/store/user";
// import {mapGetters, mapMutations, mapState} from 'vuex';
export default {
  name: "user",
  components: {
    Layout,
    NoteList,
    CommentList,
    NoData
  },
  async fetch() {
    await api.user({userid:this.$route.params.username}).then((resp) => {
      // console.log(`user.data:${JSON.stringify(resp)}`)
      this.userInfo = resp.result
      this.notes = resp.result.notes || []
      this.reviews = resp.result.reviews || []
      this.favorite_count = resp.result.favorite_count
      this.collections = resp.result.collects
    }).catch((error) => {
      // console.log(`error:${error}`)
    })
  },
  mounted() {
    api.getFavoriteByUserId({}).then((resp) => {
      if (resp.returncode === 1000 && resp.result.length > 0) {
        // this.collections = resp.result
      }
    }).catch((e) => {
    })

    console.log(`user.id:${this.user.id}`)
  },
  computed: {
    ...mapGetters({
      user:'user/user',
    })
  },
  methods: {
    cover_url,
    createList() {
      this.$router.push({
        path:'/book/list/create'
      })
    },
    logout() {
      if (confirm('是否退出登录')) {
        showSuccess('退出成功')
        this.$store.dispatch('user/logout').then((resp) => {
          this.$router.push({
            path: '/'
          })
        })
      }
    }
  },
  data() {
    return {
        userid: this.$route.params.username,
        userInfo:{},
        notes:[],
        reviews:[],
        collections:[],
        favorite_count: 0
    }
  }
}
</script>

<style scoped>
.leftBar{
  width: 250px;
  background-color: #F6F6F2;
}


</style>
