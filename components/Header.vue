<template>
  <div class="flex flex-row items-end content-end justify-between 12 py-4 text-gray-500 nav-text-color">
    <div class="nav-text-color text-center text-2xl font-semibold">
      <a href="/">时光书单</a>
    </div>
    <div class="user-info flex flex-row justify-between">

      <template v-if="user !== undefined">
        <div><a :href="`/user/`+user.id">{{ user.name }}的主页</a></div>
      </template>
      <template v-else>
        <nuxt-link to="/login">登录/注册</nuxt-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name:"Header",
  computed:{
    counter() {
      return this.$store.state.user
    },
    ...mapGetters({
      user:'user/user'
    })
  },
}
</script>

<style lang="scss">

</style>
