import Cookie from 'js-cookie';
import * as api from '@/api';
import Vue from "vue";
export function isLogin() {
  return Cookie.get('sign')
}

export function cover_url(url) {
  return `${api.host}/${url}`
}

export function toast(message, callback) {
  let options = {
    position: 'top-center',
    duration: 10000,
    singleton: true,
    theme: 'bubble',
    className:'bubble-default',
    containerClass: 'bubble-container',
    onComplete:function () {
      console.log('complete')
      callback()
    }
  }
  Vue.toasted.info(message, options)
}

export function success(message, callback) {
  let options = {
    position: 'top-center',
    duration: 2000,
    singleton: true,
    theme: 'bubble',
    onComplete:function () {
      console.log('complete')
      callback()
    }
  }
  Vue.toasted.success(message, options)
}


export function showError(message) {
  let options = {
    position: 'top-center',
    duration: 2000,
    singleton: true,
    theme: 'bubble',
  }
  Vue.toasted.error(message, options)
}
