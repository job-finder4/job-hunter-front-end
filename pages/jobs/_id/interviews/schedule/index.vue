<template>
  <div>
    <app-schedule-interviews :job-id="$route.params.id"/>
  </div>
</template>

<script>
  import ScheduleInterviews from "~/components/interview/ScheduleInterviews";

  export default {
    name: "scheduleInterview",
    middleware:['should-interviewable-job'],
    components: {
      appScheduleInterviews: ScheduleInterviews,
    },
  }
</script>

<style scoped>

</style>
