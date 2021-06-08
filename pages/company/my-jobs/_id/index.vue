<template>
  <v-container>
    <v-skeleton-loader
      v-if="isLoading"
      class="mx-auto"
      type="card"
    ></v-skeleton-loader>

    <v-card
      v-if="loadedJobad"
    >
      <v-card-title>
        <v-list-item>
          <v-list-item-title class="blue--text headline bold--text">
            {{ loadedJobad.data.attributes.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item class="font-weight-light text-sm-body-1" to="/company/profile">
          {{ loadedJobad.data.attributes.company.data.attributes.name }}
        </v-list-item>
      </v-card-title>


      <v-divider/>
      <v-card  v-if="loadedJobad.data.attributes.refusal_report">
        <v-card-title class="font-weight-bold red--text">
          Your Job is Refused due to some incorrect fields,see admin notes below:
        </v-card-title>
        <v-card-text>
          <p class=" v-alert__border--left" >{{loadedJobad.data.attributes.refusal_report.data.attributes.description}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" @click="editJobad">Lets Fix it</v-btn>
        </v-card-actions>
      </v-card>


      <div v-if="!isShowApplications">
        <v-card-text>
          <v-row>
            <v-col class="ml-2" md="2">
              Job Description
            </v-col>
            <v-col md="6">
              <v-card-subtitle class="pb-0">
                {{ loadedJobad.data.attributes.description }}
              </v-card-subtitle>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="ml-2" md="2">
              Job Details
            </v-col>
            <v-col md="6">
              <v-row class="grey lighten-4">
                <v-col md="3">
                  location
                </v-col>
                <v-col>
                  {{ loadedJobad.data.attributes.location }}
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  Job time
                </v-col>
                <v-col>
                  {{ loadedJobad.data.attributes.job_time }}
                </v-col>
              </v-row>
              <v-row class="grey lighten-4">
                <v-col md="3">
                  Job Type
                </v-col>
                <v-col>
                  {{ loadedJobad.data.attributes.job_type }}
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  Salary Range
                </v-col>
                <v-col>
                  ${{ loadedJobad.data.attributes.min_salary }} - ${{ loadedJobad.data.attributes.max_salary }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>

        </v-card-text>
        <v-divider></v-divider>

        <v-card-title>
          Skills Requried For The Job
        </v-card-title>
        <v-card-text class="ml-2">
          <ul>
            <v-row v-for="(skill,index) in loadedJobad.data.attributes.skills.data">
              <li>{{ skill.data.attributes.name }}</li>
            </v-row>
          </ul>
        </v-card-text>
      </div>
      <v-divider/>

      <v-divider class="mt-5"/>

      <v-card-actions >
        <v-row  align="center" class="ma-2" v-if="loadedJobad.data.attributes.approved_at">
          <v-btn v-if="(new Date()>new Date(loadedJobad.data.attributes.exact_expiration_date))" @click="scheduleAppointments">Schedule Appointments</v-btn>
          <v-spacer/>
          <v-btn v-if="!isShowApplications"  @click="isShowApplications=true">See Applicants for this Job</v-btn>
          <v-btn v-else  @click="isShowApplications=false">hide</v-btn>
        </v-row>
      </v-card-actions>

      <company-job-applications-tabs :job-id="parseInt(this.$route.params.id)" v-if="isShowApplications"/>
    </v-card>

  </v-container>

</template>

<script>
  import CompanyJobApplicationsTabs from "~/components/Applications/CompanyJobApplicationsTabs";

  export default {
    layout: 'company',
    components: {
      CompanyJobApplicationsTabs
    },
    data() {
      return {
        loadedJobad: null,
        dialog: false,
        applied: false,
        isLoading: true,
        isShowApplications: false
      }
    },
    methods: {
      editJobad(){
        this.$nuxt.$emit('openDialog',{componentName:'appPostOrUpdateJob',details:this.loadedJobad})
      },
      scheduleAppointments() {
        if(this.$store.getters.getPendingJobApplications.length>0){
          this.$toast.error('You Should evalutate All pending Jobs')
          return
        }
        this.$router.push(`/jobs/${this.$route.params.id}/interviews/schedule`)
      }
    },
    async fetch() {
      return this.$axios.get('backend/api/jobads/' + this.$route.params.id)
        .then((response) => {
          this.loadedJobad = response.data
          this.isLoading = false
        })
    }
  }
</script>

