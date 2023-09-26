<template>
  <div class="container flex flex-col flex-1 h-full m-auto">
    <Header/>
    <!-- 搜索框 -->
    <div class="flex flex-col items-center content-center justify-center py-4 mb-6">
<!--      <div class="text-3xl font-bold nav-text-color">时光书单</div>-->
      <div class="flex flex-row rounded-md h-12 w-full border-gray-500  border-2 mt-4 items-center ml-2 px-2 py-0">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="inline-block w-6 h-6 text-gray-500"/>
        <input type="text" class="bg-transparent flex-1 ml-2" placeholder="搜索书名/作者/ISBN" v-model="searchText">
        <div class="w-10 h-10 rounded-full flex flex-row items-center justify-center cursor-pointer" @click="search">
          <font-awesome-icon :icon="['fas', 'arrow-right']"  class="text-gray-400 h-6 w-6"/>
        </div>
      </div>
    </div>
    <!-- End 搜索框 -->
    <!-- 热门书单 -->
    <Booklist />
    <!-- End 热门书单 -->

<!--    <Rank />-->

    <HotList :books="hotbooks"/>

    <!-- 最受欢迎的书评 -->
    <NoteList :notes="reviews"/>
    <!-- End 最受欢迎的书评 -->

    <!-- 图书分类 -->
    <Category :categories="categories"/>
    <!-- End 图书分类 -->

    <!-- Footer -->
    <Footer />
    <!-- End Footer -->
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import Header from "@/components/Header";
import Booklist from "@/components/Booklist";
import Category from '@/components/Category.vue';
import Footer from "@/components/Footer";
import Rank from "@/components/Rank";
import NoteList from "@/components/NoteList";
import HotList from "@/components/HotList";
import * as types from '@/store/types';
import {patch} from "axios";

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
  async fetch({store, params}) {
      await store.dispatch('home/home', {}).then((resp) => {
        // console.log(`${JSON.stringify(resp)}`)
      })
  },
  computed:{
    ...mapGetters({
      hotbooks:'home/hotbooks',
      notelist:'home/notelist',
      reviews: 'home/reviews',
      categories:'home/categories'
    })
  },
  data(){
    return {
      isLogin:undefined,
      user:undefined,
      searchText:undefined
    }
  },
  methods:{
    search() {
      let path = `/search?q=${this.searchText}`
      this.$router.push({
          path: path
      })
    }
  }
}
</script>
