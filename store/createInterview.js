export default {
  state: {
    interviewDays: [],
    interviewDuration: 0,
    breakDuration: 0,
    contactInfo: '',
    interviewMessage: '',
    interviewersCount: 0
  },
  getters: {
    getInterviewDays(state) {
      return state.interviewDays
    },
    getInterviewDuration(state) {
      return state.interviewDuration
    },
    getBreakDuration(state) {
      return state.breakDuration
    },
    getInterviewMessage(state) {
      return state.interviewMessage
    },
    getContactInfo(state) {
      return state.contactInfo
    },
    getInterviewersCount(state) {
      return state.interviewersCount
    }
  },
  mutations: {
    ADD_INTERVIEW_DAY(state, $date) {

      let day = {
        date: $date,
        hours: []
      }
      state.interviewDays.push(day)

      state.interviewDays.sort((a, b) => a.date > b.date)
    },
    ADD_INTERVIEW_HOURS(state, {date, start_time, end_time}) {
      let day = state.interviewDays.find(item => item.date === date)

      day.hours.push({
        start_time,
        end_time
      })

      day.hours.sort((a, b) => a.start_time > b.start_time)
    },
    SET_INTERVIEW_DURATION(state, duration) {
      state.interviewDuration = !!duration ? parseInt(duration) : 0
    },
    SET_BREAK_DURATION(state, duration) {
      state.breakDuration = !!duration ? parseInt(duration) : 0
    },
    SET_INTERVIEW_MESSAGE(state, message) {
      state.interviewMessage = message
    },
    SET_CONTACT_INFO(state, contactInfo) {
      state.contactInfo = contactInfo
    },
    SET_INTERVIEWERS_COUNT(state, {interviewers_count}) {
      state.interviewersCount = interviewers_count
    },
    CLEAR_INTERVIEWS_DATA(state) {
      state.interviewDays = []
      state.interviewDuration = ''
      state.breakDuration = ''
    }
  },
  actions: {
    async scheduleInterviews({state}, jobId) {

      let days = state.interviewDays.flatMap(day => {
        return day.hours.map(interval => {
          return {
            date: day.date,
            start_time: interval.start_time,
            end_time: interval.end_time
          }
        })
      })

      await this.$axios.post(`backend/api/jobads/${jobId}/interviews`, {
        days,
        duration: state.interviewDuration,
        break: state.breakDuration,
        contact_info: state.contactInfo,
        message: state.interviewMessage
      })

    },
  },
}
