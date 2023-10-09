<template>
<Layout>
  <!-- 搜索框 -->
  <div class="flex flex-col items-center content-center justify-center py-4 mb-6">
    <!--      <div class="text-3xl font-bold nav-text-color">时光书单</div>-->
    <div class="flex flex-row rounded-md h-12 w-full border-gray-500  border-2 mt-4 items-center ml-2 px-2 py-0">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="inline-block w-6 h-6 text-gray-500"/>
      <input type="text"
             class="bg-transparent flex-1 ml-2 searchText"
             placeholder="搜索书名/作者/ISBN"
             v-model="keyword">
      <div class="w-10 h-10 rounded-full flex flex-row items-center justify-center cursor-pointer" @click="search">
        <font-awesome-icon :icon="['fas', 'arrow-right']"  class="text-gray-400 h-6 w-6"/>
      </div>
    </div>
  </div>
  <!-- End 搜索框 -->
  <div class="text-lg mb-4">
    <p>搜索 <span class="nav-text-color">"{{ keyword }}"</span></p>
    <p class="text-sm text-gray-400">共找到 {{ totalItem }} 条结果</p>
  </div>
  <template v-for="item in listArray">
    <div class="flex flex-col border-b border-b-gray-200 py-2 cursor-pointer" ::key="item.id" @click="detail(item)">
      <div class="text-sm text-sky-700">{{ item.title }}</div>
      <div class="text-xs text-gray-400 my-2">{{ item.author }}</div>
       <div class="text-xs text-gray-400 leading-4">{{ item.content }}</div>
    </div>
  </template>
  <Pagination v-show="parseInt(totalPage)>1"
              :current="parseInt(pageIndex)"
              :total="parseInt(totalPage)"
              class="mb-2"/>
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import Pagination from "@/components/Pagination";
import * as api from '@/api';
export default {
  name: "search",
  mounted() {
    console.log(this.$route.query.q)
  },
  async fetch() {
    this.keyword = this.$route.query.q || ''
    this.pageIndex = parseInt(this.$route.query.p) || 1

    let params = { "q": this.keyword }
    await api.search(params).then((resp) => {
      console.log(JSON.stringify(resp))
      this.listArray = resp.result.list
      this.totalPage = resp.result.total_page
      this.totalItem = resp.result.total_count
    }).catch((e) => {
      console.log(e)
    })
  },
  components: {
    Layout,
    Pagination
  },
  data() {
    return {
      keyword: '',
      listArray: [],
      totalPage: 0,
      totalItem: 0,
      pageIndex:1
    }
  },
  methods:{
    detail(item){
      this.$router.push({
        path:`/book/${item.id}`
      })
    }
  }
}
</script>

<style scoped>

</style>
