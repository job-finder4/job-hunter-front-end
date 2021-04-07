export default {
  state: {
    myCvs: [],

    //company
    myJobs: []
  },
  getters: {
    myCvs(state) {
      if (state) {
        if (state.myCvs) {
          return state.myCvs
        }
      }
    },

    //company
    getMyJobs(state){
      return state.myJobs
    }

  },
  mutations: {
    //----------------daniel edit-------------------
    GET_MY_CVS(state, cvs) {
      state.myCvs = cvs
    },
    CLEAR_USER_CVS(state) {
      state.myCvs=[]
    },

    //company
    GET_MY_JOBS(state, myJobs) {
      state.myJobs = myJobs
    }
    //------------------------------------------
  },
  actions: {
    //-daniel edit--------------------------
    clearUserCvs({commit}) {
      commit('CLEAR_USER_CVS')
    },
    getMyCvs({commit}) {
      this.$axios.get('backend/api/user/my-cvs')
        .then(response => {
          commit('GET_MY_CVS', response.data.data)
        })
    },


    //company
    getMyJobs({commit},jobType) {
      return new Promise((resolve, reject) => {
        this.$axios.get('backend/api/myjobads')
          .then(response => {
            commit('GET_MY_JOBS', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getJobApplications({commit}, {jobId}){
      return new Promise((resolve,reject)=>{
        this.$axios.get('backend/api/jobads/'+jobId+'/applications')
          .then(response => {
            // commit('GET_JOB_APPLICATIONS', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
  //---------------------------------------
}
