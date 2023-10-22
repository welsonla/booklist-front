<template>
  <Layout>
    <div class="text-lg nav-text-color font-medium">书单列表</div>
    <UserItem :user="user"  :message="'书单'" v-if="user" />
    <template v-if="collects.length > 0">
      <template v-for="collect in collects">
        <CollectItem :collect="collect" />
      </template>
      <Pagination :current="parseInt(p)" :total="parseInt(total)" v-if="total>1"/>
    </template>
    <template v-else>
      <NoData :message="'还没有书单'"/>
    </template>
  </Layout>
</template>

<script>
import * as api from '~/api';
import Layout from "@/pages/layout.vue";
import {reviews} from "~/api";
import ReviewItem from "@/components/Item/ReviewItem.vue";
import {showError} from "@/tool";
import BookItem from "@/components/Item/BookItem.vue";
import UserItem from "@/components/Item/UserItem.vue";
import NoteItem from "@/components/Item/NoteItem.vue";
import CollectItem from "@/components/Item/CollectItem.vue";
export default {
  name: 'reviews',
  components: {CollectItem, UserItem, Layout},
  async fetch() {
    if(this.userid > 0) {
      await api.user({userid: this.userid}).then((resp) => {
        this.user = resp.result
      }).catch((e) => {

      })
    }

    let params = {
      userid:this.userid,
      p:this.p
    }

    await api.collects(params).then((resp) => {
      console.log(JSON.stringify(resp))
      if (resp.result.list.length > 0){
        if (resp.result.list.length > 0) {
          this.collects = resp.result.list
          this.total = resp.result.total
          this.total_count = resp.result.total_items
        }
      }
    }).catch((e) => {
      showError('服务繁忙，请稍候重试')
    })
  },
  data() {
    return {
      userid: this.$route.query.userid || 0,
      collects:[],
      p:this.$route.query.p || 1,
      total:0,
      items_count:0,
      user:null
    }
  },
  head() {
    return {
      title: '书单列表'
    }
  }
}
</script>

<style scoped>

</style>
