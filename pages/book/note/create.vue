<template>
  <Layout>
    <div class="flex flex-col">
      <div class="nav-text-color">写笔记或摘录</div>
      <div class="flex flex-col note-write-form">
        <label for="chapter">章节名</label>
        <input type="text" name="chapter" v-model="chapter">
        <label for="page">页码</label>
        <input type="text" name="page" v-model="page">
        <label for="quote">摘录</label>
        <textarea rows="5" name="quote" v-model="quote"/>
        <label for="comment">点评</label>
        <textarea rows="5" name="comment" v-model="comment"/>
        <input type="button" value="发表" @click="submit">
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from "@/api";
import Cookie from "js-cookie";
export default {
  name: "create",
  components: {
    Layout
  },
  methods: {
    submit() {
      let params = {
        bookid: this.bookid,
        chapter: this.chapter,
        content: this.quote,
        comment: this.comment,
        page: this.page
      }
      api.createNote(params).then((resp) => {
        console.log(`create.quote.success:${resp}`)
        if (resp.returncode === 1000) {
          this.$router.push({
            path: `/book/note/${resp.result.id}`
          })
        }
      }).catch((e) => {
        console.log(`create.quote.error:${e}`)
      })
    }
  },
  data(){
    return {
      chapter: undefined,
      page: 0,
      quote: undefined,
      comment: undefined,
      bookid: this.$route.query.bookid
    }
  },
  mounted() {
    console.log(Cookie.get('token'))
  }
}
</script>

<style lang="scss" scoped>
@import "assets/style/style.scss";
.note-write-form{
  color: $content-color;
  font-size: 14px;
}

.note-write-form input[type="text"] {
  height: 35px;
  border-radius: 8px;
  border-color: $border-style;
}

.note-write-form textarea {
  border-radius: 8px;
  border-color: $border-style;
}

.note-write-form input[type="button"] {
  width:  200px;
  height: 30px;
  background-color: $button-color;
  color: #FFF;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.note-write-form label {
  height: 25px;
  line-height: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
