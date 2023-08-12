import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/user';
import home from '@/store/home';

// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    user,
    home
  }
})
