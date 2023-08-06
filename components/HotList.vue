<template>
  <div class="flex-col mt-6">
    <div class="text-xl section-title">热门图书榜单</div>
    <div class="flex flex-col">
      <template v-for="i in 4">
        <div class="flex flex-row py-4 border-b border-gray-200">
          <div class="text-sm font-semibold text-gray-800">
            <img src="~/assets/images/s2885632.jpg" class="note-item-cover"/>
          </div>
          <div class="flex flex-col flex-1 text-sm text-gray-500 ml-4">
            <div class="text-blue-900 text-sm note-title">
              <a href="">又去的博物之旅</a>
            </div>
            <div class="text-slate-400 text-sm leading-8">welsonla 评论 《百年孤独》</div>
            <div class="text-gray-600">博物馆是什么，看起来是个简单的问题。真正找到一个相对客观而详实的答案却不容易。看了这本张小溪先生采访陈馆的深度对话，才知道自己之前的想法有多么浅薄。博物馆不是简单的文物陈列馆，更不是保存标本和文物博物馆是什么，看起来是个简单的问题。真正找到一个相对客观而详实的答案却不容易。看了这本张小溪先生采访陈馆的深度对话，才知道自己之前的想法有多么浅薄。博物馆不是简单的文物陈列馆，更不是保存标本和文物... (全文)</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotList"
}
</script>

<style scoped>

</style>
