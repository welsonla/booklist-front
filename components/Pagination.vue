<template>
<div class="flex gap-x-2 text-sky-600 text-sm py-2 items-center content-center justify-center">
  <a :href="firstPage">&lt;首页</a>
  <template v-for="i in total">
  <span  @click="open(i)" class="inline-block w-4 h-4 text-center cursor-pointer" :class="current===i? 'bg-orange-400 text-white':''">{{ i }}</span>
  </template>
  <a :href="lastPage">尾页&gt;</a>
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
      const currentUrl = new URL("http://localhost:3000/book/tag?name=Web&p=1");
      var searchParams = currentUrl.searchParams;
      searchParams.delete('p');
      searchParams.set('p', p);
      var newUrl = currentUrl.origin + currentUrl.pathname + '?' + searchParams.toString();
      console.log(newUrl);
      location.href = newUrl
    }
  }
}
</script>

<style scoped>

</style>
