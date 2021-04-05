<template>
    <div>
      <v-row>
        <v-col>
          <div v-if="jobs.length!==0">
            <company-single-job v-for="(jobad,index) in jobs" class="mt-2" :key="jobad.data.id" :jobad="jobad"/>
          </div>
        </v-col>
      </v-row>
    </div>
</template>

<script>
  import CompanySingleJob from "~/components/jobs/CompanySingleJob";
    export default {
      layout:'company',
      components:{
        CompanySingleJob
      },
      data() {
        return {
          jobs:[]
        }
      },
      async fetch() {
        return this.$store.dispatch('getMyJobs')
        .then((response)=>{
          this.jobs=response.data.data
        })
      }
    }
</script>
