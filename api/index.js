import axios from 'axios';
import Cookie from "js-cookie";

const host = "http://127.0.0.1:5000"
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(config => {
  config.headers["sign"] = Cookie.get('token')
  return config
}, error => {
  Promise.reject(error)
})

function request(method, route, obj, domain = '') {
  let url =`${host}${route}`
  return new Promise(function (resolve, reject) {
    axios({
      method: method.toLocaleString(),
      url:url,
      data: obj || {},
    }).then(function (response) {
      resolve(response.data, url)
    }).catch(function (error) {
      reject(error);
    });
  });
}

// 登录
export const login = (params = {}) => request(`post`, '/api/login', params)

// 注册
export const register = (params = {}) => request(`post`, '/api/register', params)

// 首页接口
export const home = (params = {}) => request(`post`, '/api/home', params)

// 图书详情
export const book = (params = {}) =>request(`post`, `/api/book/${params.id}`, params)

// 创建摘抄
export const createNote = (params = {}) => request(`post`, '/api/book/quote/create', params)

// 摘抄详情
export const note = (params = {}) => request(`post`, `/api/book/quote/${params.id}`, params)

export const user = (params = {}) =>request(`post`, `/api/user/${params.userid}`, params)
