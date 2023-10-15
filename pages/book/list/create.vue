<template>
<Layout>
  <div class="flex flex-col review-form mx-auto">
    <div class="leading-8">
      创建书单
    </div>
    <input type="text" placeholder="书单名" class="review-title" v-model="title">
    <div class="editor-container mt-4">
        <div class="quill-editor"
          :content="content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption">
        </div>
      </div>
    <!-- 图书列表 -->
    <div class="mt-4">
      <div class="leading-8">添加图书</div>
      <!-- 搜索框 -->
      <div class="flex mb-4 bg-white">
        <input type="text"
               placeholder="请输入书名进行搜索"
               class="border border-solid border-l-gray-300 bg-white h-8 w-4/5 px-2"
               v-model="keyword">
        <input type="button" value="搜索" class="w-1/5 bg-green-500 text-white" @click="search">
      </div>
      <!-- End 搜索框 -->
      <!-- 搜索结果 -->
      <div class="flex flex-row gap-x-4 overflow-x-auto">
        <template v-for="book in bookArray">
        <div class="book-list-item">
          <div class="book-list-cover" @mouseover="mouseover(book)" @mouseleave="mouseleave(book)">
            <img :src="cover_url(book.image_url)" class="w-full h-full object-cover"/>
            <div class="book-list-select" :key="'cover-'+book.id" v-show="showId === 'select-'+book.id">
              <p class="text-sky-600 text-sm cursor-pointer" @click="addBook(book)">添加到书单</p>
            </div>
          </div>
          <div class="text-gray-700 text-sm text-left book-list-title">
            <p>{{ book.title }}</p>
          </div>
        </div>
        </template>
      </div>
      <!-- End 搜索结果 -->
    </div>
    <!-- End 图书列表 -->
    <!-- 已添加图书 -->
    <div class="flex flex-col gap-y-2" v-show="selectArray.length > 0">
      <div class="leading-8">
        已添加图书
      </div>
      <template v-for="book in selectArray">
        <div class="flex flex-row w-full justify-between">
          <div class="flex flex-row">
            <img :src="cover_url(book.image_url)" class="book-cover">
            <div class="ml-2">
              <p class="text-sm text-sky-700">{{ book.title }}</p>
              <p class="text-xs text-gray-500">{{ book.author }}</p>
            </div>
          </div>

          <div class="text-pink-600 text-sm self-end w-16 h-5 leading-5 rounded-md text-center cursor-pointer self-center" @click="removeBook(book)">移除</div>
        </div>
      </template>
    </div>
    <!-- End 已添加图书 -->
    <input type="button" class="submit-button cursor-pointer" value="提交" @click="submit">
  </div>
</Layout>
</template>

<script>
import Layout from '@/pages/layout';
import * as api from '@/api';
import {cover_url, toast, showError} from "~/tool";
import {createCollect} from "@/api";
// import api from "js-cookie";
export default {
  name: "create",
  components: {
    Layout
  },
  data() {
    return {
      title: '',
      content: '',
      bookArray:[],
      selectArray:[],
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        },
        placeholder:"写下这些书给你的收获"
      },
      keyword:'',
      showId:''
    }
  },
  methods:{
    cover_url,
    submit() {
      console.log("submit")
      if (this.title.length === 0) {
        showError('标题不能为空')
        return
      }

      if(this.content.length === 0) {
        showError('内容不能为空')
        return
      }

      if(this.selectArray.length === 0) {
        showError('请至少添加一本图书到书单')
        return
      }
      let params = {
        "list": this.selectArray,
        "name":this.title,
        "content":this.content
      }
      api.createCollect(params).then((resp) => {
        console.log(JSON.stringify(resp))
        toast('书单创建成功', function () {
          this.$router.replace({ path: `/collect/${resp.result.id}` })
        })
      }).catch((e) => {
        showError('服务器繁忙，请稍候重试')
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
    },
    search() {
      console.log('click search')
      let params = { "q": this.keyword }
      api.search(params).then((resp) => {
        console.log(JSON.stringify(resp.result.list))
        this.bookArray = resp.result.list
      }).catch((e) => {
        console.log(`error:${e.stackTrace}`)
      })
    },
    mouseover(book){
      console.log('mouseover')
      this.showId = 'select-'+book.id
    },
    mouseleave(book) {
      this.showId = ''
      console.log('moseleave')
    },
    addBook(book) {
      const result = this.selectArray.find((item)=> item.id === book.id)
      if(result == null) {
        this.selectArray.push(book)
      }
    },
    removeBook(book) {
      this.selectArray = this.selectArray.filter((item) => {
        return item.id != book.id
      })
    }
  },
  head() {
    return {
      title: '创建书单',
    }
  }
}
</script>

<style scoped>
.book-list-item{
  width: 100px;
  height: 200px;
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

}

.book-list-cover{
  height: 150px;
  width: 100px;
  object-fit: contain;
  border: 1px solid #d8dee4;
  position: relative;
}

.book-list-title {
  min-height: 40px;
  max-height: 42px;
  overflow: hidden;
  padding: 3px 5px;
}

.book-list-select {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.book-list-add{
  width: 100px;
  height: 150px;
  border-radius: 3px;
  border-width: 1px;
  border-style: dashed;
  border-color: #d8dee4;
  /*border: 1px dashed #d8dee4;*/
}

.book-add-modal{
  position: fixed;
  z-index: 10;
  width: 500px;
  height: 200px;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
