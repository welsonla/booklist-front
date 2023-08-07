<template>
  <div class="flex flex-row items-end content-end justify-end 12 p-4 text-gray-500 nav-text-color">
    <div class="user-info flex flex-row">
      <nuxt-link to="/login" :title="登录">登录</nuxt-link>
      <nuxt-link to="/register" :title="注册">注册</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name:"Header"
}
</script>

<style lang="scss">

</style>
