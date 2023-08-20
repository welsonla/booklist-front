<template>
<Layout>
<!--  {{ $route.params.username }}-->
<!--  {{ user.name }}-->
  <div class="flex flex-row">
    <!-- 左侧栏 -->
    <div class="leftBar px-2 h-full">
      <div class="flex flex-col">
        <div class="flex flex-row items-center border-b h-14">
          <img src="~/assets/images/avatar.png" class="w-10 h-10"/>
          <div class="ml-2">welsonla</div>
        </div>
        <div class="flex-col items-center content-center py-2">
          <div class="mb-2">
            <button class="bg-amber-100 w-20 text-sm">关注</button>
          </div>
          <div class="text-gray-700 text-sm leading-6">
            <pre>
blog地址：cmgs.me
Worked@Douban
Working@Changsha

Geek
攻城师
独立驴行者
电影爱好者
摄影爱好者

曾经是平台攻城师，
下一秒谁也不知道，
讨厌一切固定的事情，喜欢漂泊，
目前中国完成进度是大约80%+，
2012年世界毁灭前迈出国门第一步，
计划中力争30岁前开始环游地球。

人生在世哪有那么多条条框框……

我的主人是小绵羊。
            </pre>
          </div>
        </div>
      </div>
    </div>
    <!-- End 左侧栏 -->
    <div class="flex flex-col ml-8 flex-1">
      <!-- 读过的书 -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
          <div class="text-lg nav-text-color ">读过的书(共0条)</div>
        </div>
        <template v-if="list.length > 0">
          <div>书</div>
        </template>
        <template v-else>
          <NoData :message="`还没有读过的书`"/>
        </template>
      </div>
      <!-- End 读过的书  -->
      <!-- 笔记列表 -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
          <div class="text-lg nav-text-color">我的笔记(共0条)</div>
        </div>
        <template v-if="list.length > 0">
          <div>书</div>
        </template>
        <template v-else>
          <NoData :message="`还没有读过的书`"/>
        </template>
      </div>
      <!-- End 笔记列表 -->

      <!-- 书评列表 -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between leading-12 border-b border-color pb-2">
          <div class="text-lg nav-text-color">我的书评</div>
        </div>
        <template v-if="list.length > 0">
          <div>书</div>
        </template>
        <template v-else>
          <NoData :message="`还没有读过的书`"/>
        </template>
      </div>
      <!-- End 书评列表 -->
    </div>
  </div>
</Layout>
</template>

<script>
import NoData from "@/components/NoData";
import Layout from "@/pages/layout";
// import {mapGetters, mapMutations, mapState} from 'vuex';
export default {
  name: "user",
  components: {
    Layout,
    NoData
  },
  mounted() {
    // this.fetchUser()
  },
  computed: {
    // user() {
    //   return this.$store.getters.getUser
    // }
    // ...mapGetters({
    //   user:'user/user',
    //   sign:'user/sign'
    // }),
  },
  methods: {
    fetchUser() {
      // this.$store.dispatch('user/login')
    },
  },
  data() {
    return {
      list: []
  }
  }
}
</script>

<style scoped>
.leftBar{
  width: 250px;
  background-color: #f6f8fa;
}
</style>
