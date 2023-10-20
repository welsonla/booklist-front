<template>
  <div class="flex flex-col" :class="bookId ? 'mt-4' : ''">
    <!--顶部导航 -->
    <div class="flex flex-row justify-between leading-12 border-b border-color pb-2" v-show="bookId">
      <div class="text-lg nav-text-color ">笔记与摘录(共{{ total || notes.length}}条)</div>
      <div class="flex flex-row bg-green-200 text-green-600 text-sm px-4 rounded-md items-center note-write-button" @click="writeComment">
        <font-awesome-icon :icon="['fas', 'pen-to-square']"  class="text-green-600 h-3 w-3"/>&nbsp;写笔记
      </div>
    </div>
    <!-- End 顶部导航 -->
    <template v-if="notes.length > 0">
      <template v-for="note in notes">
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
    </template>
    <template v-else>
      <NoData :message="`暂无笔记`"/>
    </template>
  </div>
</template>

<script>
import NoData from "~/components/NoData";
import {mapGetters} from "vuex";
export default {
  name: "NoteList",
  props:{
    bookId:String,
    notes:Array,
    total:Number,
    userid:Number
  },
  components:{
    NoData
  },
  computed: {
    ...mapGetters({
      user:'user/user',
    })
  },
  methods:{
    writeComment() {
      this.$router.push({
        path: '/book/note/create',
        query:{
          bookid:this.bookId
        }
      })
    }
  },
  mounted() {
    // console.log(`${this.user.id}`)
  }
}
</script>

<style scoped>

</style>
