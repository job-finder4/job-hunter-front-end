export default function ({$echo, $auth, store},inject) {
  // Echo is available here
  $echo.connector.pusher.config.auth = {
    headers: {
      'Authorization': $auth.strategy.token.get()
    }
  }

  if (store.getters.isAuthenticated) {
    $echo.private(`users.${store.getters.getUser.data.id}`)
      .notification((notification) => {
        store.commit('ADD_NOTIFICATION',notification)
      })
  }

  inject('connectToChannels',function () {
    if (store.getters.isAuthenticated) {
      $echo.private(`users.${store.getters.getUser.data.id}`)
        .notification((notification) => {
          store.commit('ADD_NOTIFICATION',notification)
        })
    }
  })


}
