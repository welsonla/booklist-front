<template>
<div class="flex-col mt-6">
  <div class="text-xl section-title">分类</div>
  <div class="flex flex-row flex-wrap">
    <template v-for="category in categories">
      <div class="flex flex-col  bg-gray-200  border book-category justify-center text-center p-2 mr-2 mb-4 rounded">
        <div class="text-sm text-sky-700"><a :href="'/book/tag?name='+category.title">{{ category.title }}</a></div>
        <div class="text-sm nav-text-color">{{ category.count }}</div>
      </div>
    </template>
  </div>
</div>
</template>

<script>
export default {
  name: 'Category',
  props:{
    categories:Array
  }
}
</script>
