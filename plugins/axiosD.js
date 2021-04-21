export default function ({$axios, store, redirect}) {

  $axios.interceptors.request.use((config) => {
    // console.log(config)
    if (process.server) {
      // console.log(config.url)
      if(config.url.startsWith('backend/')){
        config.url = config.url.replace('backend/', '/')
      }
    }
    // console.log(config.url)
    return config
  })

  $axios.interceptors.response.use((response) => {
    // console.log(response)
    // console.log(config.url)
    return response
  })
}
