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


    <v-divider/>
    <v-row class="my-2 mb-2 mx-auto">
      <template v-for="(application,index) in jobApplications">
        <v-col md="4" sm="12" :key="application.data.id">
          <single-application :application="application"/>
        </v-col>
      </template>
    </v-row>

  </div>
</template>

<script>
  import SingleApplication from "~/components/Applications/SingleApplication";

  export default {
    name: "JobsContainer",
    components: {
      SingleApplication
    },
    props: {
      applicationStatus: {
        type: String,
        required: true
      },
      jobId: {
        type: Number,
        required: true
      },
    },
    computed: {
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

      }
    },
    data() {
      return {
        isLoading: true
      }
    },
    fetch() {
      return this.$store.dispatch('getJobApplications', {applicationStatus: this.applicationStatus, jobId: this.jobId})
        .then((res) => {
          this.isLoading = false
        })
    },
    destroyed() {
      this.$store.dispatch('clearJobApplications')
    }
  }
</script>
