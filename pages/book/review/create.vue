<template>
<Layout>
  <div class="flex flex-col my-0 mx-auto review-form">
    <div class="nav-text-color text-2xl font-medium mb-2">写书评</div>
  <!-- 图书信息 -->
  <div class="book-info flex flex-row">
    <img src="http://127.0.0.1:5000/static/images/book/s3745215.jpg" class="book-cover">
    <div class="flex flex-col justify-around ml-2">
      <div class="text-blue-400">明朝那些事儿</div>
      <div class="text-xs text-gray-400">限量版/当年明月</div>
    </div>
  </div>
  <!-- End 图书信息 -->
  <!-- 评分 -->
  <div class="rating flex flex-row items-start py-4">
    <div class="leading-7 text-sm text-gray-700">打分:</div>
    <div class=" flex flex-col ml-2">
      <star-rating v-model="rating"
                  :star-size="18"
                  :animate="true"
                  :inline="true"
                  text-class="rating-text"></star-rating>
    </div>
  </div>
  <!-- End 评分 -->
  <!-- 编写内容 -->
  <div class="flex flex-col write-form ">
    <input type="text" class="review-title" placeholder="添加标题" v-model="title">
    <!-- <textarea rows="10" cols="8" class="mt-4 review-content" v-model="content">
    </textarea> -->
    <div class="editor-container mt-2">
          <div class="quill-editor"
                :content="comment"
                @change="onEditorChange($event)"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                v-quill:myQuillEditor="editorOption">
          </div>
        </div>
    <input type="button" class="submit-button" value="提交" @click="submit" />
  </div>
  <!-- End 编写内容 -->
  </div>
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from "@/api";
import {showError, showSuccess} from "~/tool";
export default {
  name: "create",
  components: {
    Layout,
  },
  methods:{
    submit() {
      let params = {
        book_id:this.bookid,
        title:this.title,
        content:this.content,
        rating:this.rating
      }
      api.createReview(params).then((resp) => {
        console.log(`create.review.success:${JSON.stringify(resp)}`)
        if(resp.returncode === 1000) {
          let itemId = resp.result.id
          showSuccess('书评发表成功')
          this.$router.push({
            path:`/book/review/${itemId}`
          })
        }
      }).catch((e) => {
        showError('发生错误，请稍候重试')
        console.log(`create.review.error:${e}`)
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
      this.content = html
    }
  },
  mounted() {
    // document.getElementsByClassName("vue-star-rating-rating-text").hide()
  },
  data() {
    return {
      title:'',
      rating: 0,
      content:'',
      bookid: this.$route.query.bookid,
      starStyle: {
        fullStarColor: '#ed8a19',
        emptyStarColor: '#737373',
        starWidth: 30,
        starHeight: 30
      },
      editorOption: {
        // some quill options
        placeholder: "发表对这本书的看法...",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      }
    }
  }

}
</script>

<style scoped lang="scss">
@import "assets/style/style.scss";
.book-info{
  background-color: #f0f0f0;
  height: 80px;
}
.book-cover{
  object-fit: fill;
  height: 80px;
  width: 60px;
}


.editor-container {
  padding: 0 0 40px 0;
  background-color: white;
  .ql-toolbar{
    background-color: white;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    background-color: white;
  }
}
</style>
