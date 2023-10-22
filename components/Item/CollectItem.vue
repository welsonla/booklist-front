
<template>
  <!-- 图书信息 -->
  <div class="flex flex-row mt-4" v-if="collect">
    <img :src="'http://127.0.0.1:5000/'+collect.cover_url" style="width:120px;height:178px;">
    <div class="flex flex-col gap-y-2 ml-2 flex-1">
      <div class="text-sky-600  flex justify-between">
        <nuxt-link :to="'/book/list/'+collect.id">{{ collect.name }}</nuxt-link>
        <div class="text-sky-700" v-if="user && parseInt(user.id) === parseInt(collect.author_id)" >
          <a :href="'/book/list/create?ation=edit&id='+collect.id">编辑</a>
          <span @click="deleteNote" class="cursor-pointer">删除</span>
        </div>
      </div>
      <div class="text-sm text-gray-400">创建者:{{ collect.author.name}}</div>
      <div class="text-sm text-gray-400">发布时间: {{collect.created_at }}</div>
    </div>
  </div>
  <!-- End 图书信息 -->
</template>
<script>
import * as api from "@/api";
import {showError, showSuccess} from "@/tool";
import {mapGetters} from "vuex";

export default {
  name:"CollectItem",
  computed:{
    ...mapGetters({
      user:'user/user',
    })
  },
  props:{
    collect:Object
  },
  methods:{
    deleteNote() {
      if(confirm('是否删除本条内容')) {
        api.deleteCollect({id:this.collect.id}).then((resp) => {
          if(resp.returncode === 1000) {
            showSuccess('删除成功')
            location.reload()
          }
        }).catch((e) => {
          showError('系统繁忙，请稍候重试')
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
