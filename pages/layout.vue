<template>
  <div class="container flex flex-col h-full m-auto">
    <Header />
    <div class="flex flex-col flex-1">
    <slot>
    </slot>
    </div>
    <!-- Footer -->
    <Footer />
    <!-- End Footer -->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Booklist from "@/components/Booklist";
import Category from '../components/Category.vue';
import Footer from "@/components/Footer";
import Rank from "@/components/Rank";
import ReviewList from "~/components/ReviewList.vue";
import HotList from "@/components/HotList";
export default {
  name: 'Layout',
  components:{
    Header,
    Booklist,
    Category,
    Rank,
    ReviewList,
    HotList,
    Footer
  }
}
</script>
