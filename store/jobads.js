export default {
  state: {
    jobads: []
  },
  getters: {
    //jobSeeker
    getAllJobads(state) {
      return state.jobads
    },
    //company

  },
  mutations: {
    //jobSeeker
    APPLY_JOB(state, data) {
      let oldJob = state.jobads.find((job => job.data.id === data.attributes.jobad.data.id))
      console.log(oldJob)
      oldJob.data.attributes.applied_at = data.attributes.applied_at
    },
    GET_ALL_JOBS(state, data) {
      state.jobads = data
    }

    //Company

  },
  actions: {
    //jobSeeker
    applyJob({commit}, data) {
      this.$axios.post('backend/api/jobads/' + data.job_id + '/applications', {
        'cv_id': data.cv_id,
      })
        .then(response => {
          console.log(response.data.data)
          commit('APPLY_JOB', response.data.data)
        })
        .catch(error => {
        })
    },
    getJobads({commit}) {
      return new Promise((resolve, reject) => {
        this.$axios.get('backend/api/jobads')
          .then(response => {
            commit('GET_ALL_JOBS', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //company
    postJob({commit}, {jobData}) {
      return new Promise((resolve, reject) => {
        this.$axios.post('backend/api/jobads', {
          title: jobData.title,
          min_salary: jobData.range[0],
          max_salary: jobData.range[1],
          job_time: jobData.selectedJobTime,
          location: jobData.location,
          expiration_date: jobData.expirationDate,
          description: jobData.description,
          job_type: jobData.selectedJobType,
          skills: jobData.skills,
        })
          .then(response => {
            // commit('POST_JOB', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },



  },
}
