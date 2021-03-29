<template>
  <v-row>
    <v-col md="5">
      <div v-if="jobads.length!==0">
        <single-job v-for="(jobad,index) in jobads" class="mt-2" :key="jobad.id" :jobad="jobad"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
    import SingleJob from "~/components/jobs/SingleJob";

    export default {
        components: {
            SingleJob
        },
        computed: {
            jobads() {
                let res = this.$store.getters.getAllJobads
                return res
            },
        },
        data() {
            return {
                jobs: [],
                applyDialog: false
            }
        },
        // asyncData(context) {
        //     return context.app.$axios
        //         .$get('backend/api/jobads')
        //         .then(data => {
        //             return {
        //                 jobs: data
        //             };
        //         })
        //         .catch(e => context.error());
        // },
        async fetch() {
          this.$store.dispatch('getJobads')
        }
    }
</script>
