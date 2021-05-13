<template>
  <v-row>
    <v-col>
      <div v-if="jobads.length===0" class="text-body-1">
        There are No jobs Matching this criteria
      </div>
      <div v-if="jobads.length!==0">
        <single-job class="mt-2" v-for="(jobad,index) in jobads" :key="jobad.data.id" :jobad="jobad"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
    import SingleJob from "~/components/jobs/SingleJob";

    export default {
        name: "JobsFilterContainer",
      middleware: ['should-not-company'],
      components: {
        SingleJob
      },
      computed: {
        jobads() {
          return this.$store.getters.getAllJobads
        },
        page() {
          return this.pagination.page;
        },
      },
      data() {
        return {
          isLoading:true,
        }
      },
      destroyed() {
          this.$store.dispatch('clearJobads')
      }
    }
</script>
