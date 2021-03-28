export default {
  state: {
    jobads:[]
  },
  getters: {
    getAllJobads(state) {
      return state.jobads
    },
  },
  mutations: {
    APPLY_JOB(state,data) {
      let oldJob=state.jobads.find((job => job.data.id === data.attributes.jobad.data.id))
      console.log(oldJob)
      oldJob.data.attributes.applied_at=data.attributes.applied_at
      // console.log(oldJob)
    },
    GET_ALL_JOBS(state,data){
      state.jobads=data
    }
  },
  actions: {
    applyJob({commit}, data) {
      console.log(data)
      this.$axios.post('backend/api/jobads/'+data.job_id+'/applications', {
        'cv_id':data.cv_id,
      })
        .then(response => {
          console.log(response.data.data)
          commit('APPLY_JOB', response.data.data)
        })
        .catch(error => {})
    },
    getJobads({commit}) {
      this.$axios.get('backend/api/jobads/')
        .then(response => {
          console.log(response.data.data)
          commit('GET_ALL_JOBS',response.data.data)
        })
        .catch(error => {})
    }
  },
}
