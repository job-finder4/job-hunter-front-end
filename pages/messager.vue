<template>
  <div>
    job<br>{{job}}
    <v-btn @click="broadcast">broadCast</v-btn>
  </div>
</template>

<script>
  export default {
    name: "pusher",
    data() {
      return {
        job:null
      }
    },
    methods: {
      broadcast() {
        this.$echo.channel('jobs')
          .listen('.TestJobEvent', (e) => {
            this.job=e.name
            console.log(e.name);
          });
        console.log(this.$echo)
      }
    }
  }
</script>
