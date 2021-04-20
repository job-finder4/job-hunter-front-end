export default {
  state: {
    notifications: []
  },
  getters: {
    notifications(state) {
      return state.notifications
    }
  },
  mutations: {
    RETRIEVE_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    },
    MARK_NOTIFICATION_AS_READ(state, notificationId) {
      state.notifications.find(item => item.id === notificationId).read_at = new Date()
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification)
    }
  },
  actions: {
    async retrieveNotification({commit}) {
      let {data} = await this.$axios.get('backend/api/notifications')
      commit('RETRIEVE_NOTIFICATIONS', data)
    },
    async markNotificationAsRead({commit}, {notificationId}) {
      await this.$axios.put(`backend/api/notifications/${notificationId}`, {
        notification_id: notificationId
      })
      commit('MARK_NOTIFICATION_AS_READ', notificationId)
    },
  },
}
