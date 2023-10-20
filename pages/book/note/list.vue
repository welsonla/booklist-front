
<template>
<Layout>

</Layout>
</template>

<script>
import Layout from "~/pages/layout.vue";

export default {
  name: 'notelist',
  components: {Layout},
  async fetch() {

  },
  methods:{

  },
  data() {
    return {
      userId: this.$route.params.userid,
      bookId: this.$route.params.bookid
    }
  },
  head() {
    return {
      title: '笔记列表'
    }
  }
}
</script>


<style scoped>

</style>
