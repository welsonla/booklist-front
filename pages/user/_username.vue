<template>
<Layout>
<!--  {{ $route.params.username }}-->
<!--  {{ user.name }}-->
  <div class="flex flex-row py-4 px-4 mb-4">
    <img src="~/assets/images/avatar.png" class="w-12 h-12"/>
    <div class="flex flex-col ml-2">
      <div class="flex text-xl font-medium flex-row items-center">
        {{ userInfo.name }} 的读书主页
        <tepmate v-if="userInfo.id !== user.id">
          <button class="bg-amber-100 w-20 text-sm rounded border border-amber-400 ml-2">关注</button>
        </tepmate>
      </div>
      <div class="text-sm">
        <ul class="flex items-center gap-x-8">
          <li><a :href="`/user/`+userInfo.id" class="hover:bg-orange-300 hover:text-white">主页</a></li>
          <li><a :href="`/user/notes/`+userInfo.id" class="hover:bg-orange-300 hover:text-white">笔记</a></li>
          <li><a :href="`/user/reviews`+userInfo.id" class="hover:bg-orange-300 hover:text-white">书评</a></li>
          <li><a :href="`/user/booklist`+userInfo.id" class="hover:bg-orange-300 hover:text-white">书单</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex flex-row">
    <!--  主页列表 -->
    <div class="flex flex-col ml-8 flex-1">
      <!-- 读过的书 -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
          <div class="text-lg nav-text-color ">书单(共0条)</div>
          <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="createList">
            <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;创建书单
          </div>
        </div>
        <template v-if="booklist.length > 0">
          <div>书</div>
        </template>
        <template v-else>
          <NoData :message="`还没有书单`"/>
        </template>
      </div>
      <!-- End 读过的书  -->
      <!-- 笔记列表 -->
      <div class="flex flex-col">
        <template v-if="reviews.length > 0">
          <!--读书笔记 -->
          <NoteList bookId="0" :notes="notes"/>
        </template>
        <template v-else>
          <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
            <div class="text-lg nav-text-color">我的笔记(共0条)</div>
          </div>
          <NoData :message="`还没有读过的书`"/>
        </template>
      </div>
      <!-- End 笔记列表 -->

      <!-- 书评列表 -->
      <div class="flex flex-col">
        <template v-if="reviews.length > 0">
          <!-- 书评列表 -->
          <CommentList bookId="0" :reviews="reviews"/>
        </template>
        <template v-else>
          <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
            <div class="text-lg nav-text-color">我的书评</div>
          </div>
          <NoData :message="`还没有读过的书`"/>
        </template>
      </div>
      <!-- End 书评列表 -->
    </div>
    <!-- End 主页列表 -->
    <!-- 左侧栏 -->
    <div class="leftBar px-4 h-full">
      <div class="flex flex-col">
        <div class="flex-col items-center content-center py-2 text-sm">
          <div class="">注册日期: {{ userInfo.created_at }}</div>
          <div class="text-gray-700 text-sm leading-6">
            {{ userInfo.bio }}
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
      console.log(`user.data:${JSON.stringify(resp)}`)
      this.userInfo = resp.result
      this.notes = resp.result.notes || []
      this.reviews = resp.result.reviews || []
    }).catch((error) => {
      console.log(`error:${error}`)
    })
  },
  computed: {
    ...mapGetters({
      user:'user/user',
    })
  },
  methods: {
    fetchUser() {
      // this.$store.dispatch('user/login')
    },
    createList() {
      this.$router.push({
        path:'/book/list/create'
      })
    }
  },
  data() {
    return {
        userid: this.$route.params.username,
        userInfo:{},
        notes:[],
        reviews:[],
        booklist:[]
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
