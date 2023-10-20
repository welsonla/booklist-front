import axios from 'axios';
import Cookie from "js-cookie";

export const host = "http://127.0.0.1:5000"
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

export const fav_book = 1
export const fav_collect = 2
export const fav_review = 3
export const fav_quote = 4



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

// 创建微信摘抄
export const importWechat = (params = {}) => request(`post`, '/api/book/note/wechat/import', params)

// 某用户的某本书的所有笔记
export const notelist = (params = {}) => request(`post`, `/api/book/note/list`, params)

// 摘抄详情
export const note = (params = {}) => request(`post`, `/api/book/quote/${params.id}`, params)

export const user = (params = {}) =>request(`post`, `/api/user/${params.userid}`, params)

// 发表书评
export const createReview = (params = {}) => request(`post`,'/api/book/review/create', params)

// 获取书评详情
export const reviewDetail = (params = {}) => request(`post`, `/api/book/review/${params.id}`, params)

// 创建书单
export const createCollect = (params = {}) => request(`post`, '/api/book/collect/create', params)

// 获取书单详情
export const collectDetail = (params = {}) => request(`post`, `/api/collect/${params.id}`, params)

// 添加收藏
export const addFavorite = (params = {}) => request(`post`, `/api/favorite/add`, params)

// 取消收藏
export const delFavorite = (params = {}) => request(`post`, `/api/favorite/del`, params)

// 检查收藏状态
export const getFavorite = (params = {}) => request(`post`, `/api/favorite/get`, params)

export const getFavoriteList = (params = {}) => request(`post`, `/api/favorite/list`, params)

export const getFavoriteByUserId = (params = {}) => request(`post`, `/api/collect/getList`, params)

// 搜索
export const search = (params = {}) => request(`post`, '/api/search', params)
