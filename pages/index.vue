<template>
  <div class="container flex flex-col flex-1 w-full h-full bg-amber-400 m-auto">
    <Header />
    <!-- 搜索框 -->
    <div class="flex flex-col items-center content-center justify-center p-4">
      <div class="text-3xl font-bold">晓书单</div>
      <div class="flex flex-row rounded-full h-12  w-4/5 border-gray-500  border-2 mt-4 items-center ml-2 px-2 py-0">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="inline-block w-10 h-10 text-gray-500"/>
        <input type="text" class="bg-transparent flex-1" placeholder="搜索书名/作者/ISBN">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex flex-row items-center">
          <font-awesome-icon :icon="['fas', 'arrow-right']"  class="text-gray-400 h-12 w-12"/>
        </div>
      </div>
    </div>
    <!-- End 搜索框 -->
    <!-- 热门书单 -->
    <Booklist />
    <!-- End 热门书单 -->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Booklist from "@/components/Booklist";
export default {
  name: 'IndexPage',
  components:{
    Header,
    Booklist
  }
}
</script>
