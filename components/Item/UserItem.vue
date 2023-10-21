<script>
export default  {
  name: 'UserItem',
  props:{
    user:Object,
    message:String
  }
}
</script>

<template>
  <!-- 作者与图书信息 -->
  <div class="flex flex-row items-center box-border mt-2" v-if="user">
    <!-- 头像 -->
    <div class="flex w-8 h-8 flex flex-col items-center">
      <a :href="`/user/`+user.id">
        <img src="~/assets/images/avatar.png"/>
      </a>
    </div>
    <!-- End 头像 -->
    <div class="text-xs flex flex-col justify-between ml-2">
      <!-- 作者发表 -->
      <div class="nav-text-color text-lg">
        <a :href="`/user/`+user.id" class="text-blue-400 hover:bg-amber-100">{{ user.nickname }} </a>的{{ message || '内容' }}
      </div>
      <!-- End 作者发表 -->
    </div>
  </div>
  <!-- End 作者与图书信息 -->
</template>

<style scoped>

</style>
