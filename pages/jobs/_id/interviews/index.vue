<template>
  <v-row class="justify-center d-flex mt-8">
    <div>
      <div class="text-h5 text-center">Job Interviews Dashboard</div>
      <div class="text-subtitle-2 grey--text text--darken-1 text-center">{{getJobadInterviews[0].jobad.title}}</div>
    </div>
    <v-col cols="11">
      <v-toolbar
        outlined
        flat
      >
        <v-btn
          outlined
          class="mr-4"
          color="grey darken-2"
          @click="setToday"
        >
          Today
        </v-btn>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="prev"
        >
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="next"
        >
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer/>
        <v-menu
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="grey darken-2"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ type }}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>

      <v-sheet max-height="100%">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :event-color="getEventColor"
          :events="getJobadInterviews"
          :type="type"
          event-more
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="500px"
            flat
          >
            <v-toolbar
              :color="getEventColor(selectedEvent)"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"/>
              <v-spacer/>
              <div v-if="!!selectedEvent.user_id">
                Reserved By {{selectedEvent.jobSeeker.name}}
              </div>
              <div v-else>
                Un Reserved Interview
              </div>

            </v-toolbar>

            <v-card-text>

              <div>
                <span class="font-weight-bold">Start at: </span>
                <span class="primary--text">{{selectedEvent.start}}</span>
              </div>

              <div>
                <span class="font-weight-bold">End at: </span>
                <span class="primary--text">{{selectedEvent.end}}</span>
              </div>
              <div>
                <span class="font-weight-bold">Contact Info: </span>
                <span class="primary--text">{{selectedEvent.contact_info}}</span>
              </div>

            </v-card-text>

            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
              <v-btn
                v-if="getUserRole === 'jobSeeker' && !isUserHasReservation"
                text
                color="primary"
                @click="reserveInterview"
              >
                Reserve
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    layout:'company',
    name: "jobInterviews",
    middleware:['auth'],
    layout(context) {
      return context.store.getters.getUserRole == 'company'?'company':'default'
    },
    data() {
      return {
        focus: '',
        type: 'month',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
      }
    },
    mounted() {
      this.$refs.calendar.checkChange()
    },
    computed: {
      ...mapGetters(["getJobadInterviews", "isUserHasReservation", "getUserRole"]),
    },
    methods: {
      viewDay({date}) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor(event) {
        return !!event.user_id ? (event.user_id === this.$store.getters.getUser.data.id ? 'orange' : 'grey') : 'green'
      },
      showEvent({nativeEvent, event}) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          this.selectedOpen = true
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          open()
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      async reserveInterview() {
        this.isLoading = true
        try {
          await this.$store.dispatch('reserveInterview', this.selectedEvent)
          this.$toast.success('reserved successfully')
          this.isLoading = false
          this.selectedOpen = false
        } catch (e) {
          this.$toast.error(e.response.data.errors.description)
          this.selectedOpen = false
          this.isLoading = false
        }
      },
      setToday() {
        this.focus = ''
      },
      prev() {
        this.$refs.calendar.prev()
      },
      next() {
        this.$refs.calendar.next()
      },
    },
    async fetch(context) {
      try {
        await context.store.dispatch('fetchJobadInterviews', context.route.params.id)
      } catch (e) {
        context.error(e)
      }
    },
    created() {
      if (process.client) {
        let that = this

        this.$echo.private(`jobads.${this.$route.params.id}.interviews`)
          .listen('.InterviewReserved', function ($event) {
            console.log($event.interview)
            that.$store.commit('RESERVE_INTERVIEW', $event.interview)
          })
      }
    }

  }
</script>

<style scoped>

</style>
