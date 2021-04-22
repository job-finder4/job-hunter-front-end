<template>
  <v-card flat>
    <v-card-title class="pt-0 justify-center">
      {{!!$store.getters.jobPreference?'Edit Job Preference':'Add Job Preference'}}
    </v-card-title>
    <v-card-text>
      <v-stepper class="elevation-0" alt-labels v-model="currentStep">

        <v-stepper-header>
          <template v-for="(header,index) in stepsHeader">
            <v-stepper-step
              :complete="false"
              :step="index+1"
            >
              {{ header }}
            </v-stepper-step>
            <v-divider v-if="index<4"/>
          </template>
        </v-stepper-header>

        <v-stepper-items>

          <v-stepper-content step="1">
            <v-card flat class="d-flex align-center justify-center">
              <v-card-title class="text-break py-0">
                What is your job title ?
              </v-card-title>
              <v-card-text>
                <v-text-field class="mt-2" v-model="jobPreference.job_title" outlined label="Job Title"/>
              </v-card-text>
            </v-card>
          </v-stepper-content>


          <v-stepper-content step="2">
            <v-card flat class="d-flex align-center justify-center">
              <v-card-title class="text-break py-0">
                What is your job category ?
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="jobPreference.job_category" class="mt-2" outlined label="Job Category"/>
              </v-card-text>
            </v-card>
          </v-stepper-content>


          <v-stepper-content step="3">
            <v-card flat class="d-flex align-center justify-center">
              <v-card-title class="text-break py-0">
                What is your location ?
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="jobPreference.location" class="mt-2" outlined label="Location"/>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card flat class="d-flex align-center justify-center">
              <v-card-title class="text-break py-0">
                What is your salary ?
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="jobPreference.salary" class="mt-2" outlined label="Salary"/>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card flat class="d-flex align-center justify-center">
              <v-card-title class="text-break py-0">
                What is your work type ?
              </v-card-title>
              <v-card-text>
                <v-select :items="['full_time','part_time']" v-model="jobPreference.work_type" class="mt-2" outlined
                          label="Work Type"/>
              </v-card-text>
            </v-card>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-card-text>
    <v-card-actions>

      <v-btn
        color="primary" v-if="currentStep>1" text
        @click="currentStep--"
      >
        Back
      </v-btn>
      <v-spacer/>

      <v-btn @click="$emit('cancel')" outlined color="red">
        Cancel
      </v-btn>
      <v-btn
        color="primary" outlined
        @click="nextStep"
      >
        {{ currentStep !== 5 ? 'Go Next' : 'Save' }}
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "AddJobPreference",
    props: {
      details: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        currentStep: 1,
        stepsHeader: [
          'Job Title', 'Job Category', 'Location', 'Salary', 'Work Type'
        ],
        jobPreference: Object.assign(
          {
            job_title: '',
            job_category: '',
            location: '',
            salary: '',
            work_type: ''
          }, this.details)
      }
    },
    methods: {
      async nextStep($event) {
        if (this.currentStep < this.stepsHeader.length) {
          this.currentStep++
          return
        }

        let action = (!!this.$store.getters.jobPreference) ? 'updateJobPreference'
          : 'createJobPreference'

        await this.$store.dispatch(action, this.jobPreference)

        this.$emit('cancel')
      }
    },
  }
</script>

<style scoped>

</style>
