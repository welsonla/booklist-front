<template>
<div class="flex-col">
  <div class="text-xl section-title">热门书单</div>
  <div class="flex-col">
    <div class="">
      <div class="text-sm text-gray-800 font-bold mb-2">纪念米兰·昆德拉</div>
      <div class="flex flex-row">
        <template v-for="i in 8">
          <div class="flex flex-col mr-6">
            <img src="~/assets/images/s2885632.jpg" class="w-32 book-item-cover"/>
<!--            <div class="text-blue-700 text-sm font-300 leading-8">-->
<!--              声明不可承受之轻-->
<!--            </div>-->
<!--            <div class="text-sm text-gray-400">-->
<!--              共1024人读过-->
<!--            </div>-->
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
export default {
  name: "Booklist"
}
</script>

<style scoped>

</style>
