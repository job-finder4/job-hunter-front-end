import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Job Hunter',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  // runtime config
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
  },
  privateRuntimeConfig: {
    apiId: process.env.PASSPORT_CLIENT_ID,
    apiSecret: process.env.PASSPORT_CLIENT_SECRET,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~assets/main.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/vee-validate.js",
    "~/plugins/axiosD.js",
    { src: '~/plugins/vue-html-pdf.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',


    '@nuxtjs/vuetify'

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    // '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    // '@nuxtjs/laravel-echo',

  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: process.env.API_URL,
  },
  proxy: {
    '/backend': {
      target: process.env.API_URL,
      pathRewrite: {'^/backend': '/'},
    },
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // https://github.com/nuxt-community/modules/tree/master/packages/toast
  toast: {
    duration: 5000,
    keepOnHover: true,
    theme: 'outline',
  },
  // echo: {
  //   ssr: false,
  //   broadcaster: 'pusher',
  //   host: process.env.API_URL,
  //   key: process.env.PUSHER_APP_KEY,
  //   cluster: 'ap2',
  //   wsHost: process.env.WEBSOCKET_BASE_URL,
  //   wsPort: 6001,
  //   // authModule: true,
  //   // connectOnLogin:true,
  //   // disconnectOnLogout:true,
  //   // disableStats: true,
  //   authEndpoint: process.env.API_URL + '/api/broadcasting/auth',
  //   plugins: ['~/plugins/echo.js']
  // },

  // Auth module configuration (https://dev.auth.nuxtjs.org/)
  auth: {
    redirect: {
      home: '/',
    },
    strategies: {
      laravelPassportPasswordGrant: {
        name: 'laravelPassportPassword',
        provider: 'laravel/passport',
        url: '/backend',
        endpoints: {
          logout: '/api/auth/logout',
          user: false,
          // user: {
          //   url: '/api/user',
          // },
        },
        clientId: process.env.PASSPORT_CLIENT_ID,
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        grantType: 'password',
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
}
