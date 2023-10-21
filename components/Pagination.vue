<template>
<div class="flex gap-x-2 text-sky-600 text-sm py-2 items-center content-center justify-center">
  <span @click="open(1)">&lt;首页</span>
  <template v-for="i in total">
  <span  @click="open(i)" class="inline-block w-4 h-4 text-center cursor-pointer" :class="current===i? 'bg-orange-400 text-white':''">{{ i }}</span>
  </template>
  <span @click="open(total)">尾页&gt;</span>
</div>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    current:Number,
    total:Number,
  },
  computed: {
    firstPage() {
      return this.$route.path+'?q='+this.$route.query.q+'&p=1'
    },
    lastPage() {
      return this.$route.path+'?q='+this.$route.query.q+'&p='+this.total
    }
  },
  methods:{
    open(p) {
      // 获取当前 URL
      const currentUrl = new URL(location.href);
      const searchParams = currentUrl.searchParams;
      searchParams.delete('p');
      searchParams.set('p', p);
      const newUrl = currentUrl.origin + currentUrl.pathname + '?' + searchParams.toString();
      location.href = newUrl
    }
  }
}
</script>

<style scoped>

</style>
