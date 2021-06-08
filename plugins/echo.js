export default function ({$echo, $auth, store}, inject) {
  // Echo is available here
  $echo.connector.pusher.config.auth = {
    headers: {
      'Authorization': $auth.strategy.token.get()
    }
  }


  let con=false;

  $echo.connector.pusher.connection.bind('connected', () => {
    console.log('connected');
    con=true
  });

  $echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('disconnected');
    con=false
  });


  let setChannelListener = () => {
    if (store.getters.isAuthenticated) {
      console.log($echo.conn)
      if(!con){
        $echo.connector.pusher.config.auth = {
          headers: {
            'Authorization': $auth.strategy.token.get()
          }
        }
      }
      console.log("store.getters.getUser.data.id");
      console.log(store.getters.getUser.data.id);
      $echo.private(`users.${store.getters.getUser.data.id}`)
        .notification((notification) => {
          store.commit('ADD_NOTIFICATION',notification)
        })
    }
  }

  setChannelListener()
  inject('connectToChannels', setChannelListener)
}
