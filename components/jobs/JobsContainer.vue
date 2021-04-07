<template>
  <div>
<!--    <div v-if="jobs.length>0">-->
      <company-single-job v-for="(jobad,index) in jobs" class="mt-2" :key="jobad.data.id" :jobad="jobad"/>
<!--    </div>-->
  </div>

</template>

<script>
  import CompanySingleJob from "~/components/jobs/CompanySingleJob";

  export default {
    name: "JobsContainer",
    components: {
      CompanySingleJob
    },
    props: {
      jobType: {
        type: String,
        required: true
      }
    },
    computed: {
      jobs() {
        if (this.$store.getters.getMyJobs) {
          return this.$store.getters.getMyJobs.data
        }
        return null
      }
    },

    async fetch() {
      return this.$store.dispatch('getMyJobs', {jobType: this.jobType})
        .then((response) => {
          // this.jobs = response.data.data
        })
    }
  }
</script>
