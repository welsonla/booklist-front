<template>
  <Layout>
    <!-- 笔记标注 -->
    <div class="py-4" v-if="note">
      <div class="text-2xl font-bold text-gray-600 font-normal">{{ note.chapter }}</div>
      <div class="flex flex-row py-2">
        <img src="~/assets/images/avatar.png" class="w-10 h-10"/>
        <div class="flex flex-col text-sm ml-2 text-gray-400 justify-between">
          <p><a :href="'/user/'+note.user_id" class="text-sky-700">{{ note.author.name }}</a></p>
          <p>摘抄于:<a :href="'/book/'+note.book_id" class="text-sky-700">{{ note.book.name }}</a></p>
        </div>
      </div>
      <div class="text-lg font-light text-gray-600 mt-2 border-l-gray-300 border-l-4 pl-4 whitespace-pre-wrap" style="font-family: wenkai" v-html="note.content.replaceAll('　　','')">
      </div>
      <div class="mt-4 leading-12 text-lg text-gray-800" style="font-family: wenkai" v-html="note.comment"></div>
      <div class="leading-12  text-base text-gray-500 pl-4 mb-2 mt-4 py-1 text-right flex flex-row items-center justify-end">
        <span class=" text-right">----------------- <span v-if="note.page">引自第{{ note.page }}页 发表于</span>{{note.created_at}}</span>
        &nbsp;&nbsp;
          <template v-if="note.source === 1">
            来自微信读书&nbsp;<font-awesome-icon :icon="['fab', 'weixin']"  class="text-green-700 h-3 w-3"/>
          </template>
          <template v-else-if="note.source === 2">
            来自Kindle&nbsp;<font-awesome-icon :icon="['fab', 'amazon']" class="text-gray-700 h-4 w-4"/>
          </template>
      </div>
      <hr class="mt-4"/>
      <!-- 收藏 -->
      <div class="flex justify-end items-end content-end py-2 border-t-gray-300 border-t-0 mb-4">
        <div class="text-gray-400 text-sm mr-4">被&nbsp;{{ note.favorite_count }}&nbsp;人收藏</div>
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
    <!-- End 笔记标注 -->
  </Layout>
</template>

<script>
import Layout from "~/pages/layout";
import * as api from '@/api';
import {addFavorite, delFavorite, getFavorite, showSuccess} from "~/tool";
export default {
  name: "NoteDetail",
  components: {
    Layout
  },
  mounted() {
    getFavorite(api.fav_quote, this.noteId, (resp) => {
      this.favorite = resp
    })
  },
  async fetch() {
    await api.note({id:this.noteId}).then((resp) => {
      console.log(`${JSON.stringify(resp)}`)
      this.note = resp.result
    }).catch((e) => {
      console.log(e)
    })
  },
  head() {
    return {
      title: this.note?.chapter || '笔记'
    }
  },
  data() {
    return {
      noteId: this.$route.params.id,
      note:undefined,
      favorite:null
    }
  },
  methods: {
    toggleLike() {
      if (this.favorite === null) {
        // 添加收藏
        addFavorite(api.fav_quote, this.noteId, (resp) => {
          this.favorite = resp
          this.note.favorite_count += 1
          showSuccess('收藏成功')
        })
      } else {
        // 取消收藏
        delFavorite(api.fav_quote, this.noteId, () => {
          this.favorite = null
          this.note.favorite_count -= 1
          showSuccess('已取消收藏')
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
