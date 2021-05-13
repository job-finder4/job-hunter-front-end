<template>
  <v-dialog
    ref="dialog"
    persistent
    max-width="min-content"
    width="700px" class="my-dialog"
    v-model="dialog"
  >

    <template v-slot:activator="{on,attrs}">
      <v-btn v-on="on" :attrs="attrs" rounded outlined color="primary">
        +
      </v-btn>
    </template>

    <div style="box-shadow: none" class="d-flex my-dialog justify-space-between">

      <div>
        <div class="white--text text-h5 overline">Start At :</div>

        <v-time-picker
          v-if="dialog"
          title="Interview Start Time"
          v-model="start_time"
          :max="end_time"
        />

      </div>

      <div>
        <div class="white--text text-h5 overline">End At :</div>
        <v-time-picker
          v-if="dialog"
          title="Interview End Time"
          v-model="end_time"
          :min="start_time"
        />
      </div>

    </div>
    <div class="d-flex my-4">
      <v-spacer/>
      <v-btn class="mr-4" @click="cancelDialog">Cancel</v-btn>
      <v-btn @click="addInterviewHours">Ok</v-btn>
    </div>
  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "createWorkHours",
    props: {
      day: {
        type: Object,
        required: true
      },
    },

    data() {
      return {
        dialog: false,
        start_time: '',
        end_time: ''
      }
    },
    methods: {
      cancelDialog() {
        this.dialog = false
        this.start_time = ''
        this.end_time = ''
      },
      addInterviewHours() {
        this.$store.commit('ADD_INTERVIEW_HOURS', {
          date:this.day.date,
          start_time: this.start_time,
          end_time: this.end_time
        })
        this.cancelDialog()
      }
    },
  }
</script>

<style scoped>
  .my-dialog {
    box-shadow: 0 0 0;
  }
</style>
