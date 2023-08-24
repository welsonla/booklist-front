
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'booklist',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // ssr:true,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js',
    {src:'~/plugins/rating.js', ssr:false}
    // {src:'~/plugins/localStorage.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // 'nuxt-rating'
  ],
  // axios: {
  //   proxy:true,
  //   prefix: '/api',
  //   credentials: true
  // },
  // proxy:{
  //   target: "http://localhost:5000",
  //   pathRewrite: {
  //     '^/api': '/api',
  //     changeOrigin: true
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios']
  }
}
