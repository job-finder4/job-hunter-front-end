<template>
  <div>
      <v-row v-if="isLoading">
        <template v-for="i in 3" >
          <v-col md="4" sm="12" :key="i">
            <v-card >
              <v-skeleton-loader
                type="avatar,article, actions"
                class="mx-auto"
                color="blue-grey lighten-5"
                max-width="400px"
                max-height="400px"
              />
            </v-card>
          </v-col>
        </template>
      </v-row>

    <v-row class="my-2 mb-2 mx-auto">

      <v-row justify="center">
      <v-sheet class="text-center" >

        <p v-if="jobApplications.length>0">
          hi,{{userName}} ,here are your applied jobs
        </p>

        <template v-if="jobApplications.length===0&&!isLoading">
        <v-avatar>
          <v-icon x-large>mdi-briefcase</v-icon>
        </v-avatar>
        <p class="text-subtitle-2 text-md-h6">
          You haven't applied to any jobs
        </p>
        Come back here to keep track of the jobs you've applied to
        </template>
      </v-sheet>
      </v-row>

      <template v-for="(application,index) in jobApplications">
        <v-col md="4" sm="12" :key="application.data.id">
          <component :is="(userRole==='company')?'single-application':'job-seeker-application'"
                     :application="application"/>

        </v-col>
      </template>
    </v-row>

  </div>
</template>

<script>
  import SingleApplication from "~/components/Applications/SingleApplication";
  import JobSeekerApplication from "~/components/Applications/JobSeekerApplication";
  export default {
    name: "JobsContainer",
    components: {
      SingleApplication,JobSeekerApplication
    },
    props: {
      applicationStatus: {
        type: String,
        required: true
      },
      jobId: {
        type: Number,
      },
    },
    computed: {
      userName(){
        return this.$store.getters.getUser.data.attributes.name
      },
      jobApplications() {
        if (this.applicationStatus === 'approved') {
          return this.$store.getters.getApprovedJobApplications
        }
        if (this.applicationStatus === 'pending') {
          return this.$store.getters.getPendingJobApplications
        }
        if (this.applicationStatus === 'rejected') {
          return this.$store.getters.getRejectedJobApplications
        }
      },
      userRole(){
        return this.$store.getters.getUserRole
      }
    },
    data() {
      return {
        isLoading: true
      }
    },
    fetch() {
      if(this.$store.getters.getUserRole==='company'){
        return this.$store.dispatch('getJobApplications', {applicationStatus: this.applicationStatus, jobId: this.jobId})
          .then((res) => {
            this.isLoading = false
          })
      }
      else {
        return this.$store.dispatch('getJobSeekerApplications', {applicationStatus: this.applicationStatus})
          .then((res) => {
            this.isLoading = false
          })
      }

    },
    destroyed() {
      this.$store.dispatch('clearJobApplications')
    }
  }
</script>
