<template>
  <div>
    <v-card rounded elevation="2" >
      <jobad-information :jobad="jobad" :job-status="jobStatus"/>
    </v-card>
  </div>
</template>

<script>
import JobadInformation from "~/components/jobs/JobadInformation";

  export default {
    components: {
      JobadInformation
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
  }
</script>

<style scoped>
  .apporval-btn {
    transform: rotate(30deg);
  }
  .border-left{
    border-left:grey solid 2px ;
  }
</style>
