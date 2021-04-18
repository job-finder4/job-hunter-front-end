<template>
  <div>
    <v-card rounded elevation="2">
      <jobad-information :jobad="jobad" :job-status="jobStatus"/>
      <v-card-actions>
        <v-btn v-if="!jobad.data.attributes.approved_at" color="blue" text rounded outlined
               @click="evaluateJob(1)">
          approve
        </v-btn>
        <v-btn v-if="!jobad.data.attributes.approved_at" color="blue" text rounded outlined
               @click="evaluateJob(-1)">
          reject
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import JobsInformation from "~/components/jobs/JobadInformation";
  export default {
    name: "index",
    components:{
      JobsInformation
    },
    props: {
      jobad: {
        type: Object,
        required: true
      },
      jobStatus: {
        type: String,
        required: true
      }
    },
    methods: {
      evaluateJob(evaluationStatus) {
        this.$store.dispatch('evaluateJob', {jobId:this.jobad.data.id,evaluationStatus: evaluationStatus})
      }
    },
  }
</script>

