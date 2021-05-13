export default {
  state: {
    searchedJobs: null
  },
  getters: {
    getSearchedJobs(state) {
      return state.searchJobs
    }
  },
  mutations: {
    SET_SEARCHED_JOBS(state, payload) {
      state.searchedJoba = payload
    }
  },
  actions: {
    async fetchSearchedJobs({commit}, {location, term}) {
      try {
        let {data} = await this.$axios.get('backend/api/jobs/search', {
          params: {
            search: {
              location,
              term
            }
          }
        })
        commit('GET_ALL_JOBS', data.data)
      } catch (e) {
        console.log(e)
        this.$toast.error(e)
      }
    }
  },
}
