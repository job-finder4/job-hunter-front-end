export default {
  state: {
    user: null,
    //--------------danie edit---------------
    myCvs: []
    //---------------------------------
  },
  getters: {
    user(state) {
      return state.user
    },
    //--------------danie edit---------------
    getMyCvs(state) {
      return state.myCvs
    }
    //---------------------------------
  },
  mutations: {
    LOGOUT() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
    SET_USER(state) {
      state.user = $auth.user.data
    },
    RETRIEVE_USER(state, user) {
      state.user = user;
    },

    //----------------daniel edit-------------------
    GET_MY_CVS(state, cvs) {
      console.log(cvs)
      state.myCvs = cvs
    }
    //------------------------------------------
  },
  actions: {
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        apiClient.post('logout')
          .then(response => {
            commit('LOGOUT')
            commit('SET_NOTIFICATION', {message: 'Logout Out Successfully', type: 'success'})
            resolve(response)
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.message, type: 'success'})
            reject(error)
          })
      })

    },
    login({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {

        apiClient.post('login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            commit('RETRIEVE_TOKEN', response.data)
            commit('SET_NOTIFICATION', {message: 'Hello', type: 'success'})
            dispatch('retrieveUser')
            resolve()
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
            reject(error)
          })
      })
    },
    register({dispatch, commit}, user) {
      let formData = new FormData()
      formData.append('file', user.profileImage)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('first_name', user.first_name)
      formData.append('last_name', user.last_name)

      return new Promise((resolve, reject) => {

        apiClient.post('register',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            commit('REGISTER', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
            reject(error)
          })
      })
    },
    retrieveUser({commit}) {
      apiClient.get('/user')
        .then(response => {
          commit('RETRIEVE_USER', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeMyPassword({commit}, {user, passwordInformations}) {
      apiClient.put('/users/' + user.id + '/change_password', {
        oldPassword: passwordInformations.oldPassword,
        newPassword: passwordInformations.newPassword
      })
        .then(response => {
          commit('SET_NOTIFICATION', {
            message: 'changed succussfully',
            type: 'success'
          })
        })
        .catch(error => {
          commit('SET_NOTIFICATION', {
            message: 'something go wrong',
            type: 'error'
          })
        })
    },

    //-daniel edit--------------------------
    getMyCvs({commit}) {
      this.$axios.$get('backend/api/users/' + this.$auth.user.data.id + '/cvs/')
        .then(response => {
          commit('GET_MY_CVS',response.data)
        })
      },
    }
    //---------------------------------------
}
