<template>
  <Layout>
    <!-- 笔记标注 -->
    <div class="py-4" v-if="note">
      <div class="text-2xl font-bold">{{ note.chapter }}</div>
      <div class="flex flex-row py-2 bg-amber-400">
        <img src="~/assets/images/avatar.png" class="w-10 h-10"/>
        <div class="flex flex-col text-sm ml-2 text-gray-400 justify-between">
          <p><a :href="'/user/'+note.user_id" class="text-blue-500">{{ note.user.name }}</a></p>
          <p>摘抄于:<a :href="'/book/'+note.book_id" class="text-blue-500">{{ note.book.name }}</a></p>
        </div>
      </div>
      <div class="text-sm text-gray-800 mt-2 note-quote">
        {{ note.content }}
      </div>
      <div class="leading-12 note-quote-author">
        <span class="text-blue-500 text-sm"><a :href="'/user/'+note.user.id"> {{ note.user.name }}</a></span>
        <span class="text-gray-400 text-sm">{{ note.created_at }}</span>
        <span class="text-gray-400 text-sm">{{ note.chapter }}　{{ note.page }}</span>
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
