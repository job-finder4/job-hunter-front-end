<template>
  <v-row>
    <v-col>
      <div v-if="jobads.length===0" class="text-body-1">
        There are No jobs in this category
      </div>
      <div v-if="jobads.length!==0">
        <single-job v-for="(jobad,index) in jobads" :key="jobad.data.id" :jobad="jobad"/>
      </div>
      <div class="text-center" v-if="pagination.length>1">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.length"
          :total-visible="4"
        ></v-pagination>
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
          pagination: {
            page: 1,
            total: 1,
            per_page: 5,
            length: 1
          }
        }
      },
      destroyed() {
          this.$store.dispatch('clearJobads')
      }
    }
</script>
