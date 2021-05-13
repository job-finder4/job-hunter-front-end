<template>
  <div
    class="ma-4 mt-12"
    style="position: relative;"
  >
    <v-divider style="border-style: dashed;width:100%;position: absolute;top:45px"/>

    <v-slide-x-transition mode="out-in" class="d-flex days-items-container" group>
      <template v-for="day in interviewDays">
        <app-day-item :day="day" :key="day.date"/>
      </template>

      <app-day-item :day="{}" :key="'new day'">

        <template v-slot:title>
          {{!!newDate?newDate:'Add New Day'}}
        </template>

        <template v-slot:icon>
          <v-icon dark @click="datePicker=true">+</v-icon>
        </template>

        <template v-slot:content>

          <v-expand-transition mode="out-in">

            <v-date-picker
              v-model="newDate"
              no-title
              scrollable
              v-if="datePicker"
              :allowed-dates="allowedDates"
              :min="new Date().toISOString()"
            >
              <v-spacer/>

              <v-btn
                text
                color="primary"
                @click="cancelDatePicker"
              >
                Cancel
              </v-btn>

              <v-btn
                :disabled="!newDate"
                text
                color="primary"
                @click="addNewDay"
              >
                OK
              </v-btn>

            </v-date-picker>

          </v-expand-transition>

        </template>

      </app-day-item>
    </v-slide-x-transition>

  </div>

</template>

<script>
  import DayItem from "~/components/interview/DayItem";
  import {mapGetters} from "vuex";

  export default {
    name: "DayItems",
    components: {
      appDayItem: DayItem
    },
    data() {
      return {
        newDate: '',
        datePicker: false
      }
    },
    methods: {
      cancelDatePicker() {
        this.datePicker = false
        this.newDate = ''
      },
      addNewDay() {
        this.$store.commit('ADD_INTERVIEW_DAY', this.newDate)
        this.cancelDatePicker()
      },
      allowedDates($dates) {
        let allowed =  $dates.split(' ').filter(item => {
          return !this.interviewDays.find(day => day.date === item)
        })
        return allowed.join(' ')
      }
    },
    computed: {
      ...mapGetters(
        {
          interviewDays: 'getInterviewDays'
        }
      ),
    },

  }
</script>

<style scoped>
  .days-items-container {
    width: border-box;
    overflow-x: auto;
  }
</style>
