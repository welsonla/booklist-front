import axios from 'axios';

const host = "http://127.0.0.1:5000"

function request(method, route, obj, domain = '') {
  let url =`${host}${route}`
  return new Promise(function (resolve, reject) {
    axios({
      method: method.toLocaleString(),
      url,
      data: obj || {}
    }).then(function (response) {
      // console.log(`JSON.output2:${response}`)
      resolve(response.data, url)
    }).catch(function (error) {
      reject(error);
    });
  });
}

//  登录
export const login = (params = {}) => request(`post`, '/api/login', params)

// 注册
export const register = (params = {}) => request(`post`, '/api/register', params)

export const home = (params = {}) => request(`post`, '/api/home', params)

export const book = (params = {}) =>request(`post`, `/api/book/${params.id}`, params)
