<template>
  <v-row>
    <v-col md="5">
      <div v-if="jobads.length!==0">
        <single-job v-for="(jobad,index) in jobads" class="mt-2" :key="jobad.data.id" :jobad="jobad"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
    import SingleJob from "~/components/jobs/SingleJob";
    export default {
      middleware:['should-not-company'],
      components: {
            SingleJob
        },
        computed: {
            jobads() {
                return this.$store.getters.getAllJobads
            },
        },
        data() {
            return {
                applyDialog: false
            }
        },
      fetch() {
         return   this.$store.dispatch('getJobads')
        }
    }
</script>
