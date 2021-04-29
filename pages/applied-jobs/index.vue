<template>
  <div style="height: 90vh; overflow-y: scroll" >
    <applications-container application-status="approved"/>
  </div>
</template>

<script>
  import ApplicationsContainer from "~/components/Applications/ApplicationsContainer";
  export default {
    middleware: ['auth', 'should-jobSeeker'],
    layout: 'default',
    components:{
      ApplicationsContainer
    }
  }
</script>

<style scoped>

</style>
