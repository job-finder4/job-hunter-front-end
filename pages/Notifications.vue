<template>
  <div>
    <p>dsadsa</p>
    {{notifications}}
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
        <v-btn
          small
          color="blue-grey"
          class="ma-2 white--text"
          fab
          v-bind="attrs"
          text
          v-on="on"
        >
          click
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

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
                  {{ item.type }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  we invite you to see this job id:{{ item.data.jobad_id }}
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
    },
    methods: {
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
