<template>
  <div class="container flex flex-col flex-1 h-full m-auto">
    <Header/>
    <!-- 搜索框 -->
    <div class="flex flex-col items-center content-center justify-center p-4">
      <div class="text-3xl font-bold nav-text-color">时光书单</div>
      <div class="flex flex-row rounded-full h-12  w-4/5 border-gray-500  border-2 mt-4 items-center ml-2 px-2 py-0">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="inline-block w-6 h-6 text-gray-500"/>
        <input type="text" class="bg-transparent flex-1 ml-2" placeholder="搜索书名/作者/ISBN">
        <div class="w-10 h-10 rounded-full bg-gray-800 flex flex-row items-center justify-center">
          <font-awesome-icon :icon="['fas', 'arrow-right']"  class="text-gray-400 h-6 w-6"/>
        </div>
      </div>
    </div>
    <!-- End 搜索框 -->
    <!-- 热门书单 -->
    <Booklist />
    <!-- End 热门书单 -->

<!--    <Rank />-->

    <HotList />

    <NoteList />

    <!-- 图书分类 -->
    <Category />
    <!-- End 图书分类 -->

    <!-- Footer -->
    <Footer />
    <!-- End Footer -->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Booklist from "@/components/Booklist";
import Category from '@/components/Category.vue';
import Footer from "@/components/Footer";
import Rank from "@/components/Rank";
import NoteList from "@/components/NoteList";
import HotList from "@/components/HotList";
import * as Tool from "@/tool";

export default {
  name: 'IndexPage',
  components:{
    Header,
    Booklist,
    Category,
    Rank,
    NoteList,
    HotList,
    Footer
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('mouted')
    // this.user = Tool.user()
    // this.isLogin = Tool.isLogin()
  },
  mounted() {
    console.log('mouted')
    // this.user = Tool.user()
    // this.isLogin = Tool.isLogin()
  },
  computed:{
    // isLogin() {
    //   return Tool.isLogin()
    // },
    // user() {
    //   return Tool.user()
    // }
  },
  data(){
    return {
      isLogin:undefined,
      user:undefined
    }
  }
}
</script>
