<template>
<div class="flex-col">
  <div class="text-xl section-title">热门书单</div>
  <div class="flex-col">
    <div class="">
      <div class="flex flex-row overflow-x-scroll">
        <template v-for="collect in collections">
          <div class="flex flex-col mr-6 collect-item" :key="'collection-'+collect.id">
            <img :src="cover_url(collect.cover_url)" class="w-32 book-item-cover"/>
            <div class="bg-gray-300 text-gray-500 text-sm radius- text-center p-1 mt-3">
              查看书单· 7本书
            </div>
          </div>
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
