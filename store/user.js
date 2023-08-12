import * as api from '@/api';
import * as types from '@/store/types';

const state = () => ({
  counter: 0,
  user:undefined,
  sign:undefined
})

const getters = {
  user:state => state.user,
  sign:state => state.sign
}

const actions = {
  login({commit, state}, params = {}) {
    api.login(params).then((res) => {
      let result = res.result
      if(res.returncode === 1000) {
        commit(types.LOGIN, result)
        return Promise.resolve(result)
      } else {
        return Promise.reject(resp);
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
  [types.LOGIN](state, res) {
    state.user = res.user
    state.sign = res.sign
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
