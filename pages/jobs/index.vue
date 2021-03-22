<template>
  <div>
    <v-btn @click="fetchJobs" color="orange" text>Share</v-btn>
    <div v-if="jobs.length!==0">
      <single-job v-for="(jobad) in jobs.data.data" class="mt-2" :jobad="jobad"/>
    </div>
  </div>
</template>

<script>
  import SingleJob from "~/components/jobs/SingleJob";
    export default {
        components:{
          SingleJob
        },
        data() {
            return {
                jobs: []
            }
        },
        methods: {
            fetchJobs() {
                this.$axios.get('/backend/api/jobads')
                    .then((data) => {
                        this.jobs = data
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
    }
</script>
