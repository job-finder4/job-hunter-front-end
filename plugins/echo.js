export default function ({$echo, $auth, store}, inject) {
  // Echo is available here
  $echo.connector.pusher.config.auth = {
    headers: {
      'Authorization': $auth.strategy.token.get()
    }
  }

  let setChannelListener = () => {
    if (store.getters.isAuthenticated) {
      $echo.private(`users.${store.getters.getUser.data.id}`)
        .notification((notification) => {
          console.log(notification)
        })
    }
  }

  setChannelListener()

  inject('connectToChannels', setChannelListener)
}
