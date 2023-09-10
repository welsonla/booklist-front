<template>
<Layout>
  <div class="flex flex-col review-form mx-auto">
    <div class="leading-8">
      创建书单
    </div>
    <input type="text" placeholder="书单名" class="review-title">
<!--    <textarea name="content" id="content" cols="30" rows="10" placeholder="输入书单介绍" class="review-content mt-4"></textarea>-->
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
        <input type="text" placeholder="请输入书名进行搜索" class="border border-solid border-l-gray-300 bg-white h-8 w-4/5 px-2">
        <input type="button" value="搜索" class="w-1/5 bg-green-500 text-white">
      </div>
      <!-- End 搜索框 -->
      <div class="flex gap-x-4">
        <div class="book-list-item">
          <img src="~/assets/images/s2885632.jpg" class="w-full h-full object-cover"/>
        </div>
<!--        &lt;!&ndash; 添加图书 &ndash;&gt;-->
<!--        <div class="book-list-add flex justify-center items-center bg-slate-100 cursor-pointer">-->
<!--          <font-awesome-icon :icon="['fas', 'plus']"  class="text-gray-400 w-4 h-4"/>-->
<!--        </div>-->
<!--        &lt;!&ndash; End 添加图书 &ndash;&gt;-->
      </div>
    </div>
    <!-- End 图书列表 -->
    <input type="button" class="submit-button" value="提交" @click="submit">
  </div>
<!--  <div class="fixed border border-l-gray-300 book-add-modal">-->
<!--    <div class="flex items-center px-4 border-b h-12 nav-text-color">添加图书</div>-->
<!--    &lt;!&ndash; 搜索框 &ndash;&gt;-->
<!--    <div class="p-4 flex">-->
<!--      <input type="text" placeholder="请输入书名进行搜索" class="border border-solid border-l-gray-300 bg-gray-100 h-8 w-4/5 px-2">-->
<!--      <input type="button" value="搜索" class="w-1/5 bg-green-500 text-white">-->
<!--    </div>-->
<!--    &lt;!&ndash; End 搜索框 &ndash;&gt;-->
<!--  </div>-->
</Layout>
</template>

<script>
import Layout from '@/pages/layout';
export default {
  name: "create",
  components: {
    Layout
  },
  data() {
    return {
      title: null,
      content: null,
      bookArray:[],
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        },
        placeholder:"写下这些书给你的收获"
      }
    }
  },
  methods:{
    submit() {
      console.log("submit")
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
  }
}
</script>

<style scoped>
.book-list-item{
  width: 100px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid #d8dee4;
  overflow: hidden;
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
