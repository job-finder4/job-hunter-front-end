<template>
  <div>
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
      rounded
      close-delay="10000"
      max-height="300"
      auto
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          v-if="unreadedNotifications.length>0"
          color="blue"
          offset-x="16"
          offset-y="20"
          bordered :content="unreadedNotifications.length">
          <v-btn
            small
            color="blue-grey"
            class="ma-2 white--text"
            fab
            v-bind="attrs"
            text
            v-on="on"
          >
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </v-badge>
        <v-btn
          v-if="unreadedNotifications.length===0"
          small
          color="blue-grey"
          class="ma-2 white--text"
          fab
          v-bind="attrs"
          text
          v-on="on"
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-subheader class="text-h6">
        Notifications
      </v-subheader>
      <v-subheader v-if="notifications.length===0">
        There are no notifications yet
      </v-subheader>

      <v-list class="pa-0" flat v-else>
        <v-list-item
          v-for="(item) in notifications"
          :key="item.id"
          selectable
          :class="item.read_at == null?'cyan lighten-5':''"
          class="mt-1"
          :nuxt="item.action"
          @click="markAsRead(item)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{notificationReply(item).title}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{notificationReply(item).subtitle}}
            </v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>

  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters(["notifications"]),
      unreadedNotifications() {
        return this.$store.getters.getUnreadedNotifications
      }
    },
    methods: {
      notificationReply(notification) {
        let reply = {
          title: 's',
          subtitle:'s'
        }
        let inputText = notification.type
        const ApplicationApproved ="App\\Notifications\\ApplicationApproved"
        const RecommendedJob ="App\\Notifications\\RecommendedJob"
        const JobadEvaluationStatus ="App\\Notifications\\JobadEvaluationStatus"
        const JobadRefused ="App\\Notifications\\JobadRefused"

        if(inputText === ApplicationApproved){
          reply = {
            title: 'Application Approved',
            subtitle:'Your Application on '+notification.data.jobad_title +' has been approved'
          }
        }
        if(inputText === RecommendedJob){
          reply = {
            title: 'we have recommendation to you :',
            subtitle:notification.data.jobad_title
          }
        }
        if(inputText === JobadRefused){
          reply = {
            title: 'your job needs some modification to be published :',
            subtitle:notification.data.refusal_reason
          }
        }

        return reply
      },
      markAsRead($notification) {
        this.$store.dispatch('markNotificationAsRead', {notificationId: $notification.id})
        this.$router.push($notification.data.action)
      }
    },
    async fetch() {
      await this.$store.dispatch('retrieveNotification')
    }
  }
</script>
