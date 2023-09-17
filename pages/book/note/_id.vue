<template>
  <Layout>
    <!-- 笔记标注 -->
    <div class="py-4" v-if="note">
      <div class="text-2xl font-bold text-gray-600 font-normal">{{ note.chapter }}</div>
      <div class="flex flex-row py-2">
        <img src="~/assets/images/avatar.png" class="w-10 h-10"/>
        <div class="flex flex-col text-sm ml-2 text-gray-400 justify-between">
          <p><a :href="'/user/'+note.user_id" class="text-sky-700">{{ note.user.name }}</a></p>
          <p>摘抄于:<a :href="'/book/'+note.book_id" class="text-sky-700">{{ note.book.name }}</a></p>
        </div>
      </div>
      <div class="leading-12 bg-gray-100 border-gray-200 border text-gray-800 pl-4 mb-2 py-1">
        <span class="text-gray-700 text-sm"><span v-if="note.page">引自第{{ note.page }}页 发表于</span>{{note.created_at}}</span>
      </div>
      <div class="text-sm text-gray-600 mt-2 border-l-green-400 border-l-4 pl-4 whitespace-pre-line" v-html="note.content">
      </div>
      <div class="mt-4 leading-12 text-sm text-gray-900" v-html="note.comment"></div>
      <hr class="mt-4"/>
      <div class="flex justify-end items-end content-end py-2">
       <div class="text-gray-400 text-sm mr-4">被3人收藏</div>
        <div class="bg-green-200 text-green-800 text-xs border-green-400 px-2 py-1 border rounded flex justify-center items-center">
          <font-awesome-icon :icon="['fas', 'bookmark']"  class="text-green-800 h-3 w-3"/>
          &nbsp;已收藏</div>
      </div>

    </div>
    <!-- End 笔记标注 -->
  </Layout>
</template>

<script>
import Layout from "~/pages/layout";
import * as api from '@/api';
export default {
  name: "NoteDetail",
  components: {
    Layout
  },
  mounted() {
    console.log(this.$route.params)
  },
  async fetch() {
    await api.note({id:this.noteId}).then((resp) => {
      console.log(`${JSON.stringify(resp)}`)
      this.note = resp.result
    }).catch((e) => {
      console.log(e)
    })
  },
  data() {
    return {
      noteId: this.$route.params.id,
      note:undefined
    }
  }

}
</script>

<style scoped>

</style>
