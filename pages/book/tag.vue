

<template>
<Layout>
  <div class="text-lg nav-text-color font-medium">分类:{{ this.name }}({{items_count}})</div>
  <template v-for="b in books">
    <BookItem :book="b" />
  </template>
  <Pagination :total="total" :current="parseInt(p)" v-if="total>1"/>
</Layout>
</template>

<script>
import Layout from "~/pages/layout.vue";
import BookItem from "~/components/Favorite/BookItem.vue";
import Pagination from "~/components/Pagination.vue";
import * as api from '~/api';

export default {
  name:'book-tag',
  components: {BookItem, Layout},
  mounted() {
    // api.tag({name:this.name, p:this.p}).then((resp) => {
    //   console.log(JSON.stringify(resp))
    //   this.books = resp.result.list
    //   this.total = resp.result.total
    //   this.items_count = resp.result.total_items
    // }).catch((e) => {
    //
    // })
  },
  async fetch() {
    await api.tag({name:this.name, p:this.p}).then((resp) => {
      console.log(JSON.stringify(resp))
      this.books = resp.result.list
      this.total = resp.result.total
      this.items_count = resp.result.total_items
    }).catch((e) => {

    })
  },
  data(){
    return {
      books:[],
      p:this.$route.query.p || 1,
      total:0,
      items_count:0,
      name:this.$route.query.name
    }
  },
  head() {
    return {
      title: `分类:${this.name}`
    }
  }
}
</script>

<style scoped>

</style>
