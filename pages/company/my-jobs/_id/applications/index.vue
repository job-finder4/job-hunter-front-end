<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="12" v-for="application in jobApplicaions">
        <single-application :application="application"/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import SingleApplication from "~/components/jobs/SingleApplication";
  import SingleJob from "~/components/jobs/SingleJob";

  export default {
    layout: 'company',
    components: {
      SingleApplication, SingleJob
    },
    data() {
      return {
        jobApplicaions:[],
      }
    },
    methods: {
    },
    fetch(){
      return this.$store.dispatch('getJobApplications', {jobId:this.$route.params.id})
        .then((res) => {
          this.jobApplicaions = res.data.data
        })
    }
  }
</script>

<style scoped>

</style>
