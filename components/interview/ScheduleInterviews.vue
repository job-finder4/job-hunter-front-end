<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-form>
      <div class="ma-12">
        <v-row class="my-4 d-flex justify-space-between">
          <v-col cols="8">

            <div class="my-6">

              <p>
                <span class="text-h6 text--primary overline">1-</span>
                <span class="body-1 primary--text text--darken-1">
                  How much Should Take Each Interview ?
                </span>
              </p>

              <div style="width: 50%">
                <VTextFieldWithValidation
                  class="my-4 ml-12"
                  color="primary"
                  style="width: 50%"
                  label="Duration"
                  placeholder="interview duration"
                  v-model="interviewDuration"
                  rules="required|numeric|max_value:120"
                  hint="in minutes"
                />
              </div>

            </div>

            <div class="my-6">
              <p>
            <span class="text-h6 text--primary overline">
            2-
            </span>
                <span class="body-1 primary--text text--darken-1">
                  Now for a break between interviews how much should take ?
                </span>
              </p>

              <div style="width: 50%">
                <VTextFieldWithValidation
                  class="mx-auto my-4 ml-12"
                  label="Break"
                  placeholder="break duration"
                  v-model="breakDuration"
                  rules="required|numeric|max_value:60"
                  hint="in minutes"
                />
              </div>
            </div>

          </v-col>
          <v-col cols="4">
            <v-sheet color="yellow lighten-3" height="100%" width="100%"></v-sheet>
          </v-col>
          <v-col cols="10">
            <div class="my-6">
              <p>
            <span class="text-h6  overline">
            3-
            </span>
                <span class="body-1 primary--text text--darken-1">
             for now lets choose what days should interval take place and  work hours for each day.
            </span>
              </p>
            </div>
            <app-day-items/>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent width="500px">
          <v-card class="pa-4" v-if="dialog">
            <v-card-text>
              <v-card-title class="py-2">
                <div class="mx-auto">One Step Further</div>
              </v-card-title>
              <v-divider/>
              <div class="mb-8 text-center text-subtitle-2">This Information Is Important To Interviewer</div>
              <div class="mb-5">
                <VTextFieldWithValidation
                  color="primary"
                  label="Interview Communication Way"
                  outlined
                  v-model="contactInfo"
                  rules="required|max:40"
                  hint="the way wish interview should establish"
                />
              </div>
              <ValidationProvider name="Message" rules="required|max:100" v-slot="{ errors, valid }">
                <v-textarea
                  :error-messages="errors"
                  :success="valid"
                  color="primary"
                  label="A Message We send to user"
                  outlined background-color="grey lighten-5"
                  v-model="interviewMessage"
                  counter
                  hint="At most 100 character"
                />
              </ValidationProvider>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn text color="red" class="mx-2" @click="dialog=false">Close</v-btn>
              <v-btn outlined
                     color="primary"
                     class="mx-2"
                     @click="passes(scheduleInterviews)"
                     :disabled="invalid || !validated || isLoading"
                     :loading="isLoading"
                     style="position: relative"
              >
                Schedule
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="d-flex justify-end">
          <v-btn text color="red" class="mx-2" @click="cancelScheduling">Cancel Scheduling</v-btn>
          <v-btn outlined
                 color="primary"
                 class="mx-2"
                 :disabled="invalid || !validated || !requiredInterviewDays"
                 @click="passes(validateInterviewIntervals)"
          >schedule job interviews
          </v-btn>
        </div>
      </div>
    </v-form>

  </ValidationObserver>
</template>

<script>
  import DayItems from "~/components/interview/DayItems";
  import {ValidationObserver, ValidationProvider} from "vee-validate";
  import VTextFieldWithValidation from '~/components/inputs/VTextFieldWithValidation';
  import {mapGetters} from 'vuex'

  export default {
    name: "scheduleInterviews",
    components: {
      appDayItems: DayItems,
      ValidationObserver,
      ValidationProvider,
      VTextFieldWithValidation,
    },
    props: {
      jobId: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        dialog: false,
        isLoading: false
      }
    },
    computed: {
      ...mapGetters({
        getInterviewDays: 'getInterviewDays',
        interviewersCount: 'getInterviewersCount'
      }),
      interviewDuration: {
        get() {
          return this.$store.getters.getInterviewDuration
        },
        set(value) {
          this.$store.commit('SET_INTERVIEW_DURATION', value)
        }
      },
      breakDuration: {
        get() {
          return this.$store.getters.getBreakDuration
        },
        set(value) {
          this.$store.commit('SET_BREAK_DURATION', value)
        }
      },
      contactInfo: {
        get() {
          return this.$store.getters.getContactInfo
        },
        set(value) {
          this.$store.commit('SET_CONTACT_INFO', value)
        }
      },
      interviewMessage: {
        get() {
          return this.$store.getters.getInterviewMessage
        },
        set(value) {
          this.$store.commit('SET_INTERVIEW_MESSAGE', value)
        }
      },
      requiredInterviewDays() {
        return this.getInterviewDays.length > 0 &&
          this.getInterviewDays.every((value, index) => {
            return value.hours.length > 0
          })
      },
      validateInterviewIntervals() {
        let diffInMinutes = (st, en) => {
          let st_hour = parseInt(st.substr(0, 2))
          let st_minute = parseInt(st.substr(3, 2))

          let en_hour = parseInt(en.substr(0, 2))
          let en_minute = parseInt(en.substr(3, 2))

          return ((en_hour - st_hour) * 60) + (en_minute - st_minute)
        }

        let interviewsCount = 0;
        this.getInterviewDays.forEach(day => {
          day.hours.forEach(interval => {
            let st = interval.start_time
            let en = interval.end_time

            interviewsCount +=
              Math.floor(
                (diffInMinutes(st, en) + this.breakDuration) /
                (this.interviewDuration + this.breakDuration)
              )
          })
        })
        if (interviewsCount < this.interviewersCount) {
          this.$toast.error(
            'your interviewers count are about '
            + this.interviewersCount
            + ' and your interviews count are about '
            + interviewsCount
            + ' those you must add new interval or extend currently intervals'
          )
        } else {
          this.dialog = true
        }
      }
    },
    methods: {
      async scheduleInterviews() {
        this.dialog = false
        try {
          await this.$store.dispatch('scheduleInterviews', this.jobId);
          this.$router.replace(`/jobs/${this.$route.params.id}/interviews`)
        } catch (e) {
          this.$toast.error(e.response.data.errors.description)
        }
      },
      cancelScheduling() {
        this.$store.commit('CLEAR_INTERVIEWS_DATA')
      },
    },
  }
</script>

<style scoped>

</style>
