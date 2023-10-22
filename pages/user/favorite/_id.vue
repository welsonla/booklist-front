<template>
<Layout >
<div class="flex flex-col box-border"  v-if="userid">
  <!--顶部导航 -->
  <div class="flex flex-row py-4 mb-4">
    <img src="~/assets/images/avatar.png" class="w-12 h-12"/>
    <div class="flex flex-col ml-2">
      <div class="flex text-xl font-medium flex-row items-center text-gray-900">
        {{ userInfo.name }} 的收藏
      </div>
      <div class="text-sm" v-if="counts">
        <ul class="flex items-center gap-x-8 text-sky-700">
          <template v-for="c in counts">
            <template v-if="c.type===1">
              <li><span class="hover:bg-orange-300 hover:text-white cursor-pointer"
                        :class="c.type === type_id ? 'bg-orange-400 text-white':''"
                        @click="fetchData(1)">&nbsp;图书 · {{ c.count}}&nbsp;</span></li>
            </template>
            <template v-if="c.type===2">
              <li><span class="hover:bg-orange-300 hover:text-white cursor-pointer"
                        :class="c.type === type_id ? 'bg-orange-400 text-white':''"
                        @click="fetchData(2)">&nbsp;书单 · {{ c.count}}&nbsp;</span></li>
            </template>
            <template v-if="c.type===3">
              <li><span class="hover:bg-orange-300 hover:text-white cursor-pointer"
                        :class="c.type === type_id ? 'bg-orange-400 text-white':''"
                        @click="fetchData(3)">&nbsp;书评 · {{ c.count}}&nbsp; </span></li>
            </template>
            <template v-if="c.type===4">
              <li><span class="hover:bg-orange-300 hover:text-white"
                        :class="c.type === type_id ? 'bg-orange-400 text-white':''"
                        @click="fetchData(4)">&nbsp;笔记 · {{ c.count}}&nbsp;</span></li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
  <!-- End 顶部导航 -->
  <!-- 内容区域 -->
  <div class="flex flex-col" style="min-height: 500px;">
    <template v-if="type_id===1">
      <div class="flex flex-col">
      <template v-for="book in dataArray">
        <BookItem :book="book" />
      </template>
      </div>
    </template>
    <template v-else-if="type_id === 2">
      <div class="flex flex-row flex-1">
        <template v-for="collect in dataArray">
          <nuxt-link :to="'/book/list/'+collect.id">
            <div class="flex flex-col mr-6 collect-item" :key="'collection-'+collect.id">
              <img :src="cover_url(collect.cover_url)" class="w-32 book-item-cover"/>
              <div class="text-sky-700 text-sm text-nowrap"> {{ collect.name }}</div>
<!--              <div class="bg-gray-300 text-gray-500 text-sm radius- text-center p-1 mt-3">-->
<!--                查看书单· 7本书-->
<!--              </div>-->
            </div>
          </nuxt-link>
        </template>
      </div>
    </template>
    <template v-else-if="type_id === 3">
      <CommentList :bookId="'0'" :reviews="dataArray"/>
    </template>
    <template v-else>
      <NoteList :notes="dataArray"/>
    </template>
  </div>
  <!-- End 内容区域 -->
</div>
</Layout>
</template>

<script>

import Layout from "~/pages/layout.vue";
import * as api from '~/api';
import {cover_url, showError} from "~/tool";
import CollectDetail from "~/pages/book/list/_id.vue";
import CommentList from "~/components/Book/CommentList.vue";
import NoteList from "~/components/Book/NoteList.vue";
import BookItem from "~/components/Favorite/BookItem.vue";

export default {
  components: {
    BookItem,
    NoteList,
    CommentList,
    CollectDetail,
    Layout
  },
  async fetch() {
    await api.user({userid:this.userid}).then((resp) => {
      this.userInfo = resp.result
      this.favorite_count = resp.result.favorite_count
    })

    await this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      userid:this.$route.params.id,
      userInfo:null,
      favorite_count: 0,
      counts:[],
      type_id: 1,
      dataArray:[]
    }
  },
  head() {
    return {
      title: '收藏列表'
    }
  },
  methods: {
    cover_url,
    fetchData(typeid) {
      this.type_id = typeid || this.type_id
      this.dataArray = []
      api.getFavoriteList({userid: this.userid, type_id: this.type_id }).then((resp) => {
        console.log(JSON.stringify(resp.result))
        this.dataArray = resp.result.list || []
        if(this.counts.length === 0) {
          this.counts = resp.result.counts
        }
      }).catch((e) => {
        showError('加载失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
