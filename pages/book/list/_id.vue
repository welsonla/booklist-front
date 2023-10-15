<template>
<Layout>
<div class="flex flex-col" v-if="collect">
  <div class="text-2xl mb-2"> {{ collect.name }}</div>
  <!-- 作者与图书信息 -->
  <div class="flex flex-row items-center box-border mt-2 mb-2">
    <!-- 头像 -->
    <div class="flex w-8 h-8 flex flex-col items-center">
      <a :href="`/user/`+collect.author_id">
        <img src="~/assets/images/avatar.png"/>
      </a>
    </div>
    <!-- End 头像 -->

    <div class="text-xs flex flex-col justify-between ml-2">
      <!-- 作者发表 -->
      <div class="text-gray-400 text-sm" v-if="collect.author">
        <a :href="`/user/`+collect.author_id" class="text-blue-400 hover:bg-amber-100">{{ collect.author.name  }}</a>
        发表于 {{ collect.created_at }}
      </div>
      <!-- End 作者发表 -->
    </div>

  </div>
  <!-- End 作者与图书信息 -->

  <!-- 详情 -->
  <div class="text-sm text-gray-700 mb-2 leading-6" v-html="collect.content"></div>
  <!-- End 详情 -->

  <!-- 书单内包含的图书 -->
  <div class="">
    <template v-for="book in collect.books">
      <div class="flex flex-row">
        <div class="flex flex-row py-4 box-border pr-3 cursor-pointer" :key="`book-`+book.id" @click="showBook(book.id)">
          <div class="text-sm font-semibold text-gray-800">
            <img :src="cover_url(book.image_url)" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="text-blue-900 text-sm note-title">
              {{ book.name }}
            </div>
            <div class="">作者: {{ book.author }}</div>
            <div class="">评分: {{ book.rating }}</div>
            <div class="text-gray-400">{{ book.desc }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <!-- End 书单内包含的图书 -->
</div>
</Layout>
</template>

<script>
import Layout from "~/pages/layout.vue";
import * as api from '~/api';
import {cover_url} from "~/tool";
export default {
  name: 'CollectDetail',
  components:{
    Layout
  },
  async fetch() {
    let params = {id:this.$route.params.id}
    await api.collectDetail(params).then((resp) => {
      console.log(JSON.stringify(resp))
      this.collect = resp.result
    }).catch((e) => {

    })
  },
  data() {
    return {
      collectId: this.$route.params.id,
      collect:null,
    }
  },
  methods:{
    cover_url
  },
  mounted() {
    console.log(`collectId:${this.collectId}`)
  }
}
</script>

<style scoped>

</style>
