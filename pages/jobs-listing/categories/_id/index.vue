<template>
  <div>
    <v-skeleton-loader v-for="i in 5" :key="i" v-if="jobs.length===0&&isLoading"
                       class="mx-auto"
                       type="card"
    ></v-skeleton-loader>
    <JobsFilterContainer v-if="!isLoading" />
  </div>
</template>

<script>
  import JobsFilterContainer from "~/components/jobs/JobsFilterContainer";
  export default {
    name: "index",
    componenets:{
      JobsFilterContainer
    },
    computed:{
      jobs(){
        return this.$store.getters.getAllJobads
      }
    },
    fetch() {
      return this.$store.dispatch('getJobads', {params:{category: this.$route.params.id}})
      .then(res=>{
        this.isLoading=false
      })
      .catch(err=>{
        this.isLoading=false
      })
    }
  }
</script>
