<template>
<div class="flex-col">
  <div class="text-xl section-title">热门书单</div>
  <div class="flex-col">
    <div class="">
      <div class="flex flex-row justify-between">
        <template v-for="collect in collections">
          <nuxt-link :to="'/book/list/'+collect.id">
          <div class="flex flex-col mr-6 collect-item" :key="'collection-'+collect.id">
            <img :src="cover_url(collect.cover_url)" class="w-32 book-item-cover border border-gray-300"/>
            <div class="text-sky-700 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis" style="width: 120px"> {{ collect.name }}</div>
            <div class="bg-gray-300 text-gray-500 text-sm radius- text-center p-1 mt-3">
              查看书单· 7本书
            </div>
          </div>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {cover_url} from "@/tool";

export default {
  name: "Booklist",
  methods: {cover_url},
  props:{
    collections:Array
  }
}
</script>

<style scoped>

</style>
