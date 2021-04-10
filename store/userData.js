export default {
  state: {
    myCvs: [],

    //company
    activeJobs: [],
    pendingJobs: [],
    expiredJobs: [],
    pendingJobApplications: [],
    approvedJobApplications: [],
    rejectedJobApplications: [],
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
    getMyPendingJobs(state){
      return state.pendingJobs
    },
    getMyActiveJobs(state){
      return state.activeJobs
    },
    getMyExpiredJobs(state){
      return state.expiredJobs
    },

    //job applications
    getApprovedJobApplications(state){
      return state.approvedJobApplications
    },
    getRejectedJobApplications(state){
      return state.rejectedJobApplications
    },
    getPendingJobApplications(state){
      return state.pendingJobApplications
    },


  },
  mutations: {
    //----------------daniel edit-------------------
    GET_MY_CVS(state, cvs) {
      state.myCvs = cvs
    },
    CLEAR_USER_CVS(state) {
      state.myCvs = []
    },

    //company
    GET_MY_JOBS(state, {myJobs, jobStatus}) {
      if (jobStatus === 'pending') {
        state.pendingJobs = myJobs
      }
      if (jobStatus === 'expired') {
        state.expiredJobs = myJobs
      }
      if (jobStatus === 'active') {
        state.activeJobs = myJobs
      }
    },

    GET_JOB_APPLICATIONS(state, {applications,applicationStatus}) {
      if(applicationStatus==='pending'){
          state.pendingJobApplications.push(...applications)
      }
      if(applicationStatus==='approved'){
          state.approvedJobApplications.push(...applications)
      }
      if(applicationStatus==='rejected'){
        state.rejectedJobApplications.push(...applications)
      }
    },

    CHANGE_APPLICATION_STATUS(state, {jobId, applicationWithStatus}) {
      state.pendingJobApplications.find(item => item.data.id == applicationWithStatus.id)
        .data.attributes.status = applicationWithStatus.attributes.status

      let appl=state.pendingJobApplications.find(item => item.data.id == applicationWithStatus.id)
      let idx=state.pendingJobApplications.findIndex(item => item.data.id == applicationWithStatus.id)

      if(applicationWithStatus.attributes.status==1){
        state.approvedJobApplications.push(appl)
      }
      if(applicationWithStatus.attributes.status==-1){
        state.rejectedJobApplications.push(appl)
      }
      state.pendingJobApplications.splice(idx,1)

      // console.log(
      //     state.jobsApplications.find(item => item.jobId == jobId)
      //       .applications.data.find(item => item.data.id == applicationWithStatus.id)
      //       .data.attributes.status
      //   )
    },
    CLEAR_JOB_APPLICATIONS(state){
      state.pendingJobApplications=[]
      state.approvedJobApplications=[]
      state.rejectedJobApplications=[]
    },

    //admin
    CHANGE_JOB_STATUS(state, {jobWithStatus}){
      state.pendingJobs.find(item => item.data.id == jobWithStatus.data.id)
        .data.attributes.approved_at = jobWithStatus.data.attributes.approved_at

      let job=state.pendingJobs.find(item => item.data.id == jobWithStatus.data.id)
      let idx=state.pendingJobs.findIndex(item => item.data.id == jobWithStatus.data.id)

      if(jobWithStatus.data.attributes.approved_at){
        state.activeJobs.push(job)
      }
      state.pendingJobs.splice(idx,1)
    }
  },
    //------------------------------------------
  actions: {
    //jobSeeker
    clearUserCvs({commit}) {
      commit('CLEAR_USER_CVS')
    },
    getMyCvs({commit}) {
      this.$axios.get('backend/api/user/my-cvs')
        .then(response => {
          commit('GET_MY_CVS', response.data.data)
        })
    },
    getMyAppliedJobs({commit}){
      this.$axios.get('backend/api/')
        .then(response => {
        })
    },

    //company
    getMyJobs({commit}, {jobStatus}) {
      return new Promise((resolve, reject) => {
        this.$axios.get('backend/api/myjobads', {
          params: {
            filter: jobStatus
          }
        })
          .then(response => {
            commit('GET_MY_JOBS', {myJobs: response.data.data, jobStatus: jobStatus})
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getJobApplications({commit}, {jobId,applicationStatus}) {
      return new Promise((resolve, reject) => {
        this.$axios.get('backend/api/jobads/' + jobId + '/applications',{
          params:{
            filter:applicationStatus
          }
        })
          .then(response => {
            console.log('jobId')
            console.log(jobId)
            commit('GET_JOB_APPLICATIONS', {applicationStatus:applicationStatus,jobId: jobId, applications: response.data.data})
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    evaluateApplication({commit}, {jobId, applicationId, evaluationStatus}) {
      return new Promise((resolve, reject) => {
        this.$axios.put('backend/api/jobads/' + jobId + '/applications/' + applicationId + '/manage',
          {
            'status': evaluationStatus
          })
          .then(response => {
            commit('CHANGE_APPLICATION_STATUS', {jobId: jobId, applicationWithStatus: response.data.data})
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //just For Cleanning the store
    clearJobApplications({commit}){
      commit('CLEAR_JOB_APPLICATIONS')
    },


    //Admin
    evaluateJob({commit},{jobId,evaluationStatus}){
      return new Promise((resolve, reject) => {
        const evaluation=(evaluationStatus===1)?'approve':'reject'
        this.$axios.put('backend/api/jobads/' + jobId + '/'+evaluation)
          .then(response => {
            console.log(response.data)
            commit('CHANGE_JOB_STATUS', {jobWithStatus:response.data})
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAdminJobs({commit}, {jobStatus}) {
      return new Promise((resolve, reject) => {
        this.$axios.get('backend/api/admin-jobads', {
          params: {
            filter: jobStatus
          }
        })
          .then(response => {
            commit('GET_MY_JOBS', {myJobs: response.data.data, jobStatus: jobStatus})
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  }
  //---------------------------------------
}
