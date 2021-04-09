<template>
  <div >
    <template v-if="isInitialLoading">
      <v-card v-for="i in 3" :key="i" class="mt-3">
        <v-skeleton-loader
                           class="mx-auto"
                           type="article, actions"
        />
      </v-card>
    </template>

    <v-divider/>

    <template v-if="jobs.length>0" v-for="(jobad,index) in jobs">
      <company-single-job  class="mt-2" :jobStatus="jobStatus"  :jobad="jobad" :key="jobad.data.id"/>
    </template>

<!--    <v-row v-if="jobs.length===0" justify="center" class="display-1 text-center">-->
<!--      <v-container>-->
<!--        <v-card flat>-->
<!--          <v-card-text class="font-italic">-->
<!--            There are no {{jobStatus}} Jobs-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-container>-->
<!--    </v-row>-->

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
      jobStatus: {
        type: String,
        required: true
      }
    },
    computed: {
      jobs() {
        if(this.jobStatus==='active'){
          return this.$store.getters.getMyActiveJobs.data
        }
        if(this.jobStatus==='expired'){
          return this.$store.getters.getMyExpiredJobs.data
        }
        if(this.jobStatus==='pending'){
          return this.$store.getters.getMyPendingJobs.data
        }
        return []
      }
    },
    data() {
      return {
        isInitialLoading: true
      }
    },

    async fetch() {
      return this.$store.dispatch('getMyJobs', {jobStatus: this.jobStatus})
        .then((response) => {
          this.isInitialLoading=false
          // this.jobs = response.data.data
        })
    }
  }
</script>
