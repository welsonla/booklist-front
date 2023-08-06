<template>
  <div class="flex-col mt-6">
    <div class="text-xl section-title">分类</div>
    <div class="flex flex-row flex-wrap">
      <template v-for="i in 12">
        <div class="flex flex-col  bg-gray-300 book-category justify-center text-center p-2 mr-2 mb-4 rounded">
          <div class="text-sm font-semibold text-gray-800">心理学</div>
          <div class="text-sm text-gray-500">200</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank"
}
</script>

<style scoped>

</style>
