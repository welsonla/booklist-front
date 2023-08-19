import * as api from '@/api';
import * as types from '@/store/types';
import Cookie from "js-cookie";

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
    return api.login(params).then((res) => {
      let result = res.result
      if(res.returncode === 1000) {
        commit(types.LOGIN, result)
        // 将登录信息写入Cookie
        Cookie.set('token', result.sign)
        Cookie.set('user', JSON.stringify(result.user))
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
  },
  updateSign({commit, state}, sign) {
    commit(types.SIGN, sign)
  },
  updateUser({commit, state}, user) {
    commit(types.USER, user)
  }
}

const mutations = {
  [types.LOGIN](state, res) {
    state.user = res.user
    state.sign = res.sign
  },
  [types.SIGN](state, sign) {
    state.sign = sign
  },
  [types.USER](state, user) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
