<template>
  <div class="container flex flex-col flex-1 h-full m-auto">
    <Header />
    <slot>
    </slot>
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
import NoteList from "@/components/NoteList";
import HotList from "@/components/HotList";
export default {
  name: 'Layout',
  components:{
    Header,
    Booklist,
    Category,
    Rank,
    NoteList,
    HotList,
    Footer
  }
}
</script>
