import * as api from '@/api';
import * as types from '@/store/types';

const state = () => ({
  booklist: [],
  hotbooks: [],
  notelist: [],
  categories: []
})


const getters = {
  booklist:state => state.booklist,
  hotbooks:state => state.hotbooks,
  notelist:state => state.notelist,
  categories:state => state.categories
}

const actions = {
   home({commit, state}, params = {}) {
      api.home(params).then((resp) => {
        console.log(`JSON.output3:${JSON.stringify(resp.result.hotbooks)}`)
        let dict = resp.result
        if(resp.returncode === 1000) {
          console.log('获取首页信息')
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
