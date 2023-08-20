<template>
<div class="text-sm text-gray-400 h-20 py-4 text-center">
  {{ message || "暂无内容"}}
</div>
</template>

<script>
export default {
  name: "NoData",
  props:{
    message:String
  }
}
</script>

<style scoped>

</style>
