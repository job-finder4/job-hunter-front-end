<template>
  <p>
    hi,JobSeeker ,here are your applied jobs

  </p>
</template>

<script>
    export default {
      middleware: ['auth','should-jobSeeker'],
      layout: 'default',
    }
</script>

<style scoped>

</style>
