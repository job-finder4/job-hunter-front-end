<template>
  <v-container fluid class="px-8" style="min-height: 900px">

    <div class=" mt-5 text-h5 text-center">-- My Interviews --</div>

    <v-row style="min-height: 700px" class="justify-center d-flex mt-8">

      <v-col>
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
        <v-calendar
          ref="calendar"
          v-model="focus"
          :event-color="getEventColor"
          :events="getMyInterviews"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        />
      </v-col>
      <v-scroll-x-reverse-transition mode="out-in">
        <v-col md="3" sm="4" cols="5" v-if="!!selectedOpen">
          <v-card
            color="grey lighten-5"
            flat
            height="60%"
          >
            <v-toolbar
              :color="getEventColor(selectedEvent)"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"/>
              <v-spacer/>
              <v-btn text @click="selectedOpen = false">
                <v-icon>X</v-icon>
              </v-btn>
            </v-toolbar>
            <div style="height: 100%" class="d-flex flex-column justify-space-between">
              <v-card-text class="interview-details">
                <div>
                  <span>Start at:</span>
                  <span>{{selectedEvent.start}}</span>
                </div>

                <div>
                  <span>End at:</span>
                  <span>{{selectedEvent.end}}</span>
                </div>
                <div>
                  <span>Interview Communication Way:</span>
                  <span>{{selectedEvent.contact_info}}</span>
                </div>

                <div class="py-4">
                  <v-divider inset/>
                  <span>Job Title:</span>
                  <span>{{selectedEvent.jobad.title}}</span>
                </div>

                <div class="py-4" v-if="getUserRole === 'jobSeeker'">
                  <v-divider inset/>
                  <div>
                    <span>Company Name:</span>
                    <span>{{selectedEvent.company.name}}</span>
                  </div>
                  <div>
                    <span>Company Email:</span>
                    <span>{{selectedEvent.company.email}}</span>
                  </div>
                </div>

                <div class="py-4" v-if="!!selectedEvent.jobSeeker && getUserRole==='company'">
                  <v-divider inset/>
                  <div>
                    <span>Interviewer Name:</span>
                    <span>{{selectedEvent.jobSeeker.name}}</span>
                  </div>
                  <div>
                    <span>Interviewer Email:</span>
                    <span>{{selectedEvent.jobSeeker.email}}</span>
                  </div>

                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  dark
                  :color="getEventColor(selectedEvent)"
                  @click="selectedOpen = false"
                >
                  Hide
                </v-btn>
              </v-card-actions>

            </div>
          </v-card>
        </v-col>
      </v-scroll-x-reverse-transition>

    </v-row>

  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "my-interviews",
    middleware:['auth'],
    layout(context) {
      return context.store.getters.getUserRole == 'company'?'company':'default'
    },
    data() {
      return {
        focus: '',
        type: 'month',
        selectedEvent: null,
        selectedOpen: false,
      }
    },
    mounted() {
      this.$refs.calendar.checkChange()
    },
    computed: {
      ...mapGetters(["getMyInterviews", "getUserRole"]),
    },
    methods: {
      viewDay({date}) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor(event) {
        let id = event.jobad_id
        let r = (id * 249) % 255
        let g = (id * 199) % 255
        let b = (id * 99) % 255
        return `rgb(${r},${g},${b})`
      },
      showEvent({nativeEvent, event}) {
        const open = () => {
          this.selectedEvent = event
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      reserveInterview() {
        this.$store.dispatch('reserveInterview', this.selectedEvent)
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
    // async fetch(context) {
    // try {
    //   await context.store.dispatch('fetchMyInterviews', context.route.params.id)
    // } catch (e) {
    //   context.error(e)
    // }
    // },
    async created() {
      await this.$store.dispatch('fetchMyInterviews', this.$route.params.id)

      // this.$echo.private(`jobads.${this.$route.params.id}.interviews`)
      //   .listen('.InterviewReserved', function ($event) {
      //     console.log($event)
      //   })
    }
  }
</script>

<style scoped>
  .interview-details > div span:last-child {
    color: #008282;
  }

  .interview-details > div span:first-child {
    font-weight: bold;
  }

  .interview-details div {
    margin-bottom: 10px;
    font-family: "Noto Serif CJK SC";
  }

  .interview-details {
    margin-top: 15px;
  }
</style>
