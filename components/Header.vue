<template>
  <div class="flex flex-row items-end content-end justify-end 12 p-4 text-gray-500 nav-text-color">
    <div class="user-info flex flex-row">
      <nuxt-link to="/login">登录/注册</nuxt-link>
      <template v-if="user !== undefined">
        <div>{{ user.name }}</div>
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
