import Cookie from 'js-cookie';
import * as api from '@/api';
import Vue from "vue";
export function isLogin() {
  return Cookie.get('sign')
}

export function cover_url(url) {
  return `${api.host}/${url}`
}

export function showLoading(message) {
  let options = {
    position: 'top-center',
    singleton: true,
    theme: 'bubble',
    className:'bubble-default',
    containerClass: 'bubble-container'
  }
  Vue.toasted.info(message, options)
}

export function stopLoading() {
  Vue.toasted.clear()
}

export function toast(message, callback) {
  let options = {
    position: 'top-center',
    duration: 2000,
    singleton: true,
    theme: 'bubble',
    className:'bubble-default',
    containerClass: 'bubble-container',
    onComplete:function () {
      callback()
    }
  }
  Vue.toasted.info(message, options)
}

export function showSuccess(message) {
  let options = {
    position: 'top-center',
    duration: 2000,
    singleton: true,
    theme: 'bubble'
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

export function addFavorite(type, item_id, complete) {
  let params = {
    type:type,
    item_id: item_id
  }
  api.addFavorite(params).then((resp) => {
    console.log('addfavorite.success')
    console.log(JSON.stringify(resp.result))
    if (resp.returncode === 1000) {
      complete(resp.result)
    } else {
      showError(resp.message)
    }
  }).catch((e) => {
    showError('服务繁忙，请稍候重试11111')
  })
}

export function delFavorite(type, item_id, complete) {
  let params = {
    type:type,
    item_id: item_id
  }
  api.delFavorite(params).then((resp) => {
    if (resp.returncode === 1000) {
      complete()
    } else {
      showError(resp.message)
    }
  }).catch((e) => {
    showError('服务繁忙，请稍候重试')
  })
}

export function getFavorite(type, item_id, complete) {
  let params = {
    type:type,
    item_id: item_id
  }
  api.getFavorite(params).then((resp) => {
    complete(resp.result)
  }).catch((e) => {
    showError('服务繁忙，请稍候重试')
  })
}

