import Cookie from 'js-cookie';
import user from '@/store/user';
import home from '@/store/home';
import * as types from './types';

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数， 返回数据对象
export const state = () => {
  return {
  }
}

export const mutations = {
}

export const actions = {
  nuxtServerInit({commit}, {req, app}) {
    let token = null
    let userObject = null
    if(req.headers.cookie) {
      token = Cookie.get('token')
      const cookies = req.headers.cookie.split(';')
      const tk = 'token='
      const us = 'user='
      cookies.forEach(e => {
        if(e.includes(tk)) {
          token = e.split(tk)[1]
          commit(types.SIGN, token)
          console.log(`Cookie.sign:${token}`)
          commit('user/SIGN', token)
        } else if (e.includes(us)){
          userCookie = e.split(us)[1]
          let userJSON = JSON.parse(decodeURIComponent(userCookie))
          commit('user/USER', userJSON)
        }
      });
      console.log(`Cookie.header.content:${req.headers.cookie}`)
    }
  }
}
