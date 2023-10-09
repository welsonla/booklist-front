<template>
<div class="flex gap-x-2 text-sky-600 text-sm py-2 items-center content-center justify-center">
  <a :href="firstPage">&lt;首页</a>
  <template v-for="i in total">
  <a href="" class="inline-block w-4 h-4 text-center" :class="current===i? 'bg-orange-400 text-white':''">{{ i }}</a>
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
  }
}
</script>

<style scoped>

</style>
