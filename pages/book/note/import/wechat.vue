<template>
<Layout>
  <div class="flex flex-col">
    <div class="nav-text-color">导入微信读书笔记</div>
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
      <div class="flex content-center my-4">
        <div for="comment">粘贴微信读书笔记内容</div>
      <a href="" class="text-sky-600">(如何导出微信读书笔记?)</a>
      </div>
      <textarea placeholder="请将微信导出的笔记粘贴到此处" rows="10" class="border-gray-200 border rounded overflow-hidden p-2"></textarea>
      <div class="text-gray-500 mt-2 text-rose-700">复制笔记后不要修改笔记任何内容，以免造成笔记解析失败</div>
<!--      <div class="editor-container">-->

<!--&lt;!&ndash;        <div class="quill-editor"&ndash;&gt;-->
<!--&lt;!&ndash;             :content="comment"&ndash;&gt;-->
<!--&lt;!&ndash;             @change="onEditorChange($event)"&ndash;&gt;-->
<!--&lt;!&ndash;             @blur="onEditorBlur($event)"&ndash;&gt;-->
<!--&lt;!&ndash;             @focus="onEditorFocus($event)"&ndash;&gt;-->
<!--&lt;!&ndash;             @ready="onEditorReady($event)"&ndash;&gt;-->
<!--&lt;!&ndash;             v-quill:myQuillEditor="editorOption">&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </div>-->
      <!--        <textarea rows="5" name="comment" v-model="comment"/>-->
      <input type="button" value="导入微信读书数据" @click="submit">
    </div>
  </div>
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from "@/api";
export default {
  name: "wechat",
  components: {Layout},
  data() {
    return {
      bookid: this.$route.query.bookid,
      book:undefined,
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
      console.log(`Book.detail:${resp.result}`)
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
  }
}
</script>

<style scoped>

</style>
