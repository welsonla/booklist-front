<template>
<Layout>

</Layout>
</template>

<script>
import Layout from "@/pages/layout";
import * as api from '@/api';
export default {
  name: "search",
  mounted() {
    console.log(this.$route.query.q)
  },
  async fetch() {
    let keyword = this.$route.query.q || ''

    let params = { "q": keyword }
    console.log(`keyword:${keyword}`)
    console.log(`params:${JSON.stringify(params)}`)
    await api.search(params).then((resp) => {
      console.log(`resp:${JSON.stringify(resp)}`)
    }).catch((e) => {
      console.log(e)
    })
  },
  components: {
    Layout
  }
}
</script>

<style scoped>

</style>
