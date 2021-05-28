export default {
  state: {
    jobads: [],
    search:null,
    advancedSearch:null,
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
      oldJob.data.attributes.applied_at = data.attributes.applied_at
    },
    GET_ALL_JOBS(state, data) {
      state.jobads = data
    },
    CLEAR_JOBADS(state){
      state.jobads=[]
    },
    SET_SEARCH_PARAMS(state,search){
      state.search = search
    },
    SET_ADVANCED_SEARCH_PARAMS(state,advancedSearch){
      state.advancedSearch = advancedSearch
    },
    CLEAR_SEARCH_ATTRIBUTE(state){
      state.search = null
      state.advancedSearch = null
    },


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
    getJobads({commit, state}, {params}) {

      if (!!state.search)
        params.search = state.search

      if (!!state.advancedSearch)
        params.advancedSearch = state.advancedSearch

      return new Promise((resolve, reject) => {
        this.$axios.get('backend/api/jobads', {
          params: params
        })
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
          category_id:jobData.category
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
    editJob({commit}, {jobData,jobId}) {
      return new Promise((resolve, reject) => {
        this.$axios.put('backend/api/jobads/' + jobId, {
          title: jobData.title,
          min_salary: jobData.range[0],
          max_salary: jobData.range[1],
          job_time: jobData.selectedJobTime,
          location: jobData.location,
          expiration_date: jobData.expirationDate,
          description: jobData.description,
          job_type: jobData.selectedJobType,
          skills: jobData.skills,
          category_id: jobData.category
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    clearJobads({commit}) {
      commit('CLEAR_JOBADS')
    }
  },
}
