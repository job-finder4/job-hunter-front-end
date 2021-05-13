export default {
  state: {
    jobadInterviews: []
  },
  getters: {
    getJobadInterviews(state) {
      return state.jobadInterviews
    },
    isUserHasReservation(state, rootState, getters, rootGetters) {
      return state.jobadInterviews.findIndex(
        item => item.user_id === rootGetters.getUser.data.id
      ) != -1
    }
  },
  mutations: {
    SET_JOBAD_INTERVIEWS(state, interviews) {
      state.jobadInterviews = interviews
    },
    RESERVE_INTERVIEW(state, interview) {
      let index = state.jobadInterviews.findIndex(item => item.id == interview.id)

      state.jobadInterviews.splice(index, 1, interview)
    }
  },
  actions: {
    async fetchJobadInterviews({state, commit}, jobadId) {
      let {data} = await this.$axios.get(`backend/api/jobads/${jobadId}/interviews`)
      commit('SET_JOBAD_INTERVIEWS', data.data)
    },
    async reserveInterview({state, commit}, interview) {
      let {data} = await this.$axios.put(`backend/api/jobads/${interview.jobad_id}/interviews/${interview.id}/reserve`)
      commit('RESERVE_INTERVIEW', data)
    }
  },
}
