import * as api from '@/api';
import * as types from '@/store/types';

const state = () => ({
  booklist: [],
  hotbooks: [],
  notelist: [],
  categories: [],
  reviews: []
})


const getters = {
  booklist:state => state.booklist,
  hotbooks:state => state.hotbooks,
  notelist:state => state.notelist,
  reviews: state => state.reviews,
  categories:state => state.categories
}

const actions = {
  home({commit }, params = {}) {
    return api.home(params).then((resp) => {
        let dict = resp.result
        if(resp.returncode === 1000) {
          commit(types.HOME, dict)
          return Promise.resolve(dict)
        } else {
          return Promise.reject(dict)
        }
      }).catch((e) => {
        return Promise.reject({
          returncode:-999,
          message: e.message || 'request error'
        })
      })
  }
}

const mutations = {
  [types.HOME](state, res) {
    state.booklist = res.booklist,
    state.hotbooks = res.hotbooks,
    state.notelist = res.notelist,
    state.reviews = res.reviews,
    state.categories = res.categories
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
