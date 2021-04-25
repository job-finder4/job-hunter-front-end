export default {
  state: {
    profile: null,
    profileOwner: null,
    profileImage: null,
    jobPreference: null,
    allSkills: null
  },
  getters: {
    userLocationObject(state) {
      let location = state.profile.attributes.details.location

      return {
        country: !!location ? state.profile.attributes.details.location.split(', ')[0] : '',
        city: !!location ? state.profile.attributes.details.location.split(', ')[1] : '',
      }
    },
    resumeVisibility(state) {
      return !!state.profile.attributes.visible
    },
    jobPreference(state) {
      return !!state.jobPreference ? state.jobPreference.attributes : null
    },
    ProfileImage(state) {
      return state.profileImage
    },
    allSkills(state) {
      return state.allSkills
    },
    userLanguages(state) {
      return state.profile.attributes.details.languages
    },
    profileDetails(state) {
      return state.profile.attributes.details
    },
    userEducations(state) {
      return state.profile.attributes.details.educations
    },
    userWorksExperience(state) {
      return state.profile.attributes.details.works_experience
    },
    userSkills(state) {
      return state.profile.attributes.skills.data
    },
    profileOwner(state) {
      return state.profileOwner.data.attributes
    },
    allLanguages(state) {
      return [
        'english', 'arabic', 'germany', 'russian', 'persian', 'chinese', 'indian'
      ]
    },
    userProfile(state) {
      return state.profileOwner
    }
  },
  mutations: {
    SET_PROFILE(state, {data, included}) {
      state.profile = data
      state.profileOwner = included.user
      state.jobPreference = !!included.job_preference ? included.job_preference.data : null
      state.profileImage = included.user.data.attributes.image
    },
    RESET_PROFILE(state, {data}) {
      state.profile = data
    },
    RESET_JOB_PREFERENCE(state, newJobPreference) {
      state.jobPreference = newJobPreference
    },
    setAllSkills(state, allskills) {
      state.allSkills = allskills.data
    },
    CREATE_JOB_PREFERENCE(state, jobPreference) {
      state.jobPreference = jobPreference.data
    },
    UPDATE_JOB_PREFERENCE(state, newJobPreference) {
      state.jobPreference = newJobPreference.data
    },
    DELETE_JOB_PREFERENCE(state) {
      state.jobPreference = null
    },
    UPDATE_PROFILE_IMAGE(state, imageUrl) {
      state.profileOwner.data.attributes.image = imageUrl
    }
  },
  actions: {
    async retrieveProfile({commit}, userId) {
      let {data} = await this.$axios.get(`backend/api/users/${userId}/profile`)
      commit('SET_PROFILE', data)
    },
    async updateProfile({commit, getters}, editedItems) {
      let {data} = await this.$axios.put(`backend/api/users/${getters.getUser.data.id}/profile`, editedItems)
      commit('SET_PROFILE', data)
    },
    async addDetails({commit, getters}, newItems) {
      let {data} = await this.$axios.post(`backend/api/users/${getters.getUser.data.id}/profile`, newItems)
      commit('RESET_PROFILE', data)
    },
    async deleteFromProfile({commit, getters}, items) {
      let {data} = await this.$axios.put(`backend/api/users/${getters.getUser.data.id}/profile/delete-details`, items)
      commit('RESET_PROFILE', data)
    },

    async createJobPreference({commit, getters}, jobPreference) {
      let {data} = await this.$axios.post(`backend/api/users/${getters.getUser.data.id}/job-preference`, jobPreference)
      commit('CREATE_JOB_PREFERENCE', data)
    },
    async updateJobPreference({commit, getters}, jobPreference) {
      let {data} =
        await this.$axios.put(
          `backend/api/users/${getters.getUser.data.id}/job-preference`,
          jobPreference
        )
      commit('UPDATE_JOB_PREFERENCE', data)
    },
    async deleteMyJobPreference({commit, getters}) {
      await this.$axios.delete(`backend/api/users/${getters.getUser.data.id}/job-preference`)
      commit('DELETE_JOB_PREFERENCE')
    },
  },
}
