<template>
  <Layout>
    <div class="flex flex-col">
      <div class="nav-text-color">写笔记或摘录</div>
      <!-- 图书信息 -->
      <div class="book-info flex flex-row mt-4" v-if="book">
        <img :src="'http://127.0.0.1:5000/'+book.image_url" class="book-cover">
        <div class="flex flex-col justify-around ml-2">
          <div class="text-sky-600">{{ book.name }}</div>
          <div class="text-xs text-gray-400">{{ book.author}}</div>
        </div>
      </div>
      <!-- End 图书信息 -->
      <div class="flex flex-col note-write-form">
        <label for="chapter">章节名</label>
        <input type="text" name="chapter" class="border border-gray-300" v-model="chapter">
        <label for="page">页码</label>
        <input type="text" name="page" class="border border-gray-300" v-model="page">
        <label for="quote">摘录</label>
        <textarea rows="5" name="quote" class="border border-gray-300" v-model="quote"/>
        <label for="comment">点评</label>
        <div class="editor-container">
          <div class="quill-editor"
               :content="comment"
               @change="onEditorChange($event)"
               @blur="onEditorBlur($event)"
               @focus="onEditorFocus($event)"
               @ready="onEditorReady($event)"
               v-quill:myQuillEditor="editorOption">
          </div>
        </div>
<!--        <textarea rows="5" name="comment" v-model="comment"/>-->
        <input type="button" value="发布" @click="submit">
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
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.comment = html
    }
  },
  data(){
    return {
      book:undefined,
      chapter: undefined,
      page: 0,
      quote: undefined,
      comment: undefined,
      bookid: this.$route.query.bookid,
      edit: (this.$route.query.ation || '')==='edit',
      editId: (this.$route.query.id || 0),
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        },
        placeholder:"随手记录，别让灵感消失"
      }
    }
  },
  mounted() {
    api.book({"id":this.bookid}).then((resp) => {
      // console.log(`Book.detail:${resp.result}`)
      if(resp.returncode === 1000) {
        this.book = resp.result
        // this.quotes = resp.result.quotes
        // this.reviews = resp.result.reviews || []
      } else {
        console.log(`error:${resp}`)
      }
    }).catch((e) => {
      console.log(e)
    })

    if(this.edit && this.editId > 0){
      api.note({id: this.editId}).then((resp) => {
        console.log(JSON.stringify(resp))
        if (resp.returncode === 1000) {
          let note = resp.result
          this.chapter = note.chapter
          this.page = note.page
          this.quote = note.content
          this.comment = note.comment
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  head() {
    return {
      title: '创建书单'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/style/style.scss";
//.note-write-form{
//  color: $content-color;
//  font-size: 14px;
//}
//
//.note-write-form input[type="text"] {
//  height: 35px;
//  border-radius: 8px;
//  border-color: $border-style;
//}
//
//.note-write-form textarea {
//  border-radius: 8px;
//  border-color: $border-style;
//}
//
//.note-write-form input[type="button"] {
//  width:  200px;
//  height: 30px;
//  background-color: $button-color;
//  color: #FFF;
//  border-radius: 5px;
//  margin-top: 20px;
//  margin-bottom: 20px;
//}
//
//.note-write-form label {
//  height: 25px;
//  line-height: 25px;
//  margin-top: 20px;
//  margin-bottom: 10px;
//}

</style>
