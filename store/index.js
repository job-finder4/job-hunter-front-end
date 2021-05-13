import Vue from 'vue'
import Vuex from 'vuex'
import userData from './userData'
import jobads from './jobads'
import post_job from './post_job'
import notifications from './notifications'
import userInformation from './userInformation'
import jobSearch from './jobSearch'
import createInterview from './createInterview'
import jobadInterviews from './jobadInterviews'
import myInterviews from './myInterviews'

const vuexStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      user: null,
    },
    getters: {
      isAuthenticated(state) {
        if (process.server) {
          return state.user!=null
        }
        if (process.client) {
          return state.auth.loggedIn
        }
      },
      getToken(state) {
        return state.token
      },
      getUser(state) {
          return state.user
      },
      getUserRole(state) {
        if (state.user) {
          return state.user.data.attributes.role
        }
        return null
      },

    },
    mutations: {
      SET_TOKEN(state, token) {
        state.token = token;
      },
      SET_USER_DATA(state, user) {
        state.user = user
      },
      LOGOUT(state) {
        state.user = null
        state.myCvs = null
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        console.log('inside nuxtServerInit')

        if(context.$auth.strategy.token.get()){
          context.$axios.defaults.headers.common["Authorization"] = context.$auth.strategy.token.get()
          return context.$axios.get('backend/api/user').then((res) => {
            vuexContext.commit('SET_USER_DATA', res.data);
          });
        }

      },
      logout({commit, dispatch}) {
        commit('LOGOUT')
        dispatch('clearUserCvs')
      },
      // initAuth(vuexContext, req) {
      //   let token;
      //   let expirationDate;
      //
      //
      //   if (req) {
      //     if (!req.headers.cookie) {
      //       return;
      //     }
      //     token = req.headers.cookie.split(";")
      //       .find(c => c.trim().startsWith("auth._token.laravelPassportPassword"))
      //
      //     if (!token) {
      //       return;
      //     }
      //
      //     const c = 'auth._token.laravelPassportPassword=Bearer%'
      //     token = token.substring(c.length + 3)
      //
      //     expirationDate = req.headers.cookie
      //       .split(";")
      //       .find(c => c.trim().startsWith("auth._token_expiration.laravelPassportPassword"))
      //   } else {
      //
      //     token = localStorage.getItem("auth._token.laravelPassportPassword");
      //     expirationDate = localStorage.getItem("auth._token_expiration.laravelPassportPassword");
      //   }
      //   if (new Date().getTime() > +expirationDate || !token) {
      //     console.log("No token or invalid token");
      //     // vuexContext.dispatch("logout");
      //     return;
      //   }
      //   vuexContext.commit("setToken", token);
      // },
    },
    modules: {userData, jobads,post_job,notifications,userInformation
      ,jobSearch,createInterview,jobadInterviews,myInterviews}
  })
}

export default vuexStore;
