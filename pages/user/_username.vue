<template>
<Layout>
<!--  {{ $route.params.username }}-->
<!--  {{ user.name }}-->
  <div class="flex flex-row">
    <!-- 左侧栏 -->
    <div class="leftBar px-2 h-full">
      <div class="flex flex-col">
        <div class="flex flex-row items-center border-b h-14">
          <img src="~/assets/images/avatar.png" class="w-10 h-10"/>
          <div class="flex flex-col ml-2">
            <div class="">{{ userInfo.name }}</div>
<!--            <div class="mb-2">-->
              <button class="bg-amber-100 w-20 text-sm">关注</button>
<!--            </div>-->
          </div>
        </div>
        <div class="flex-col items-center content-center py-2">

          <div class="text-gray-700 text-sm leading-6">
            {{ userInfo.bio }}
          </div>
        </div>
      </div>
    </div>
    <!-- End 左侧栏 -->
    <div class="flex flex-col ml-8 flex-1">
      <!-- 读过的书 -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
          <div class="text-lg nav-text-color ">读过的书(共0条)</div>
        </div>
        <template v-if="notes.length > 0">
          <div>书</div>
        </template>
        <template v-else>
          <NoData :message="`还没有读过的书`"/>
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
  },
  data() {
    return {
        userid: this.$route.params.username,
        userInfo:{},
        notes:[],
        reviews:[]
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
