<template>
  <div>
    <company-jobs-tabs/>
  </div>
</template>

<script>
  import CompanyJobsTabs from "~/components/jobs/CompanyJobsTabs";

  export default {
    layout: 'company',
    components: {
      CompanyJobsTabs
    },
  }
</script>
