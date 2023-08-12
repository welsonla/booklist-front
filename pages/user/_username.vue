<template>
<Layout>
<!--  {{ $route.params.username }}-->
<!--  {{ user.name }}-->
</Layout>
</template>

<script>
import Layout from "@/pages/layout";
// import {mapGetters, mapMutations, mapState} from 'vuex';
export default {
  name: "user",
  components: {Layout},
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

</style>
