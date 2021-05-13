export default {
  state: {
    myInterviews: []
  },
  getters: {
    getMyInterviews(state) {
      return state.myInterviews
    },
  },
  mutations: {
    SET_MY_INTERVIEWS(state, interviews) {
      state.myInterviews = interviews
    },
  },
  actions: {
    async fetchMyInterviews({commit}) {
      let {data} = await this.$axios.get(`backend/api/my-interviews`)
      commit('SET_MY_INTERVIEWS', data.data)
    },
  },
}
