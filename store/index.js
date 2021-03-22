import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

import Cookie from "js-cookie";
// import axios from 'axios'

// Vue.use(axios)

const vuexStore = () => {
  return new Vuex.Store({
    state: {
      token: null
      // accessToken:localStorage.getItem('access_token') || null,
      // refreshToken:localStorage.getItem('refresh_token') || null,
    },
    getters: {
      isAuthenticated(state) {
        if (process.server){
          return state.token != null;
        }
        if(process.client){
          return state.auth.loggedIn
        }
      }
      // isLoggedIn(state){
      //   return !!state.accessToken
      // },
      // getFromQuestionAnswersUrl(state){
      //   return state.fromQuestionAnswersUrl
      // },
      // getAccessToken(state){
      //   return state.accessToken
      // }
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
      // RETRIEVE_TOKEN(state,data){
      //   state.accessToken=data.access_token
      //   state.refreshToken=data.refresh_token
      //   localStorage.setItem('access_token',state.accessToken)
      //   localStorage.setItem('refresh_token',state.refreshToken)
      // },
      // SET_FROM_QUESTION_ANSWERS_URL(state,payload){
      //   state.fromQuestionAnswersUrl = payload
      // },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        console.log('inside nuxtServerInit')
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          console.log('initssss')
          token = req.headers.cookie.split(";")
            .find(c => c.trim().startsWith("auth._token.laravelPassportPassword"))
          if (!token) {
            return;
          }
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("auth._token_expiration.laravelPassportPassword"))
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          // vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      }
    },

    modules: {user}
  })
}

export default vuexStore;
