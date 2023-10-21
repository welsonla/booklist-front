<script>
export default {
  name:'NoteItem',
  props:{
    note:Object
  }
}
</script>

<template>
  <!-- 笔记标注 -->
  <div class="py-4 text-sm box-border overflow-hidden">
    <div class="text-gray-600 mt-2 note-quote leading-5  box-border">
      {{ note.content }}
    </div>
    <div class="text-gray-800 mt-2 note-comment leading-5 mb-2 box-border" v-if="note.comment">
      {{ note.comment }}
    </div>
    <!-- 底部信息 -->
    <nuxt-link :to="'/book/note/'+note.id">
      <div class="leading-12 note-quote-author flex">
        <div class="">
          <!--                <span class="text-blue-500">{{ note?.user?.name || note?.author.name }}</span>-->
          <span class="text-gray-400">{{ note?.created_at }}</span>
          <span class="text-gray-400"><span v-show="note.chapter">《{{ note.chapter }}》</span>　<span v-show="note.page > 0">页码:&nbsp;{{ note.page }}</span></span>
        </div>
        <div class="flex flex-row content-center items-center text-gray-400">&nbsp;&nbsp;
          <template v-if="note.source === 1">
            来自微信读书&nbsp;<font-awesome-icon :icon="['fab', 'weixin']"  class="text-green-700 h-3 w-3"/>
          </template>
          <template v-else-if="note.source === 2">
            来自Kindle&nbsp;<font-awesome-icon :icon="['fab', 'amazon']" class="text-gray-700 h-4 w-4"/>
          </template>
        </div>
      </div>
    </nuxt-link>
    <!-- End 底部信息 -->
  </div>
  <!-- End 笔记标注 -->
</template>

<style scoped>

</style>
