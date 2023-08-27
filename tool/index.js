import Cookie from 'js-cookie';
import * as api from '@/api';
export function isLogin() {
  return Cookie.get('sign')
}

export function cover_url(url) {
  return `${api.host}/${url}`
}
