// store/index.js
// 仅在服务端渲染时加载cookieparser
const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数， 返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法，这个action 会在服务端渲染期间自动调用，且仅在服务端渲染时运行
  // 主要作用是：初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把cookie 字符串转换为 JavaScript 对象， 使用前需要安装
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // NO valid cookie found
      }
    }
    // 提交 mutation 修改 state 状态
    commit('setUser', user)
  }
}