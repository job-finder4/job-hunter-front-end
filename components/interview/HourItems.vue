<template>
  <div class="my-6">

    <v-slide-y-transition group mode="out-in">
      <template v-for="hour in hours">
        <app-hour-item :hour="hour" :key="day.date+'_'+hour"/>
      </template>
    <app-hour-item :key="day.date+'_new_hour'" :hour="{}">

      <template v-slot:title>
        <p class="mx-auto my-0">Add Work Hours</p>
      </template>

      <template v-slot:content>
        <div class="text-center">
          <create-work-hours :day="day"/>
        </div>
      </template>

    </app-hour-item>
    </v-slide-y-transition>

  </div>
</template>

<script>
  import HourItem from "~/components/interview/HourItem";
  import CreateWorkHours from "~/components/interview/createWorkHours";

  export default {
    name: "HourItems",
    components: {
      CreateWorkHours,
      appHourItem: HourItem,
    },
    props: {
      day: {
        type: Object,
        required: true
      },
    },
    computed: {
      hours() {
        return this.day.hours;
      }
    },
    methods: {
      // addNewWorkHours() {
      //   this.$nuxt.$emit('openDialog', {
      //     componentName: 'appCreateWorkHours',
      //     details: {
      //       day: this.day
      //     }
      //   })
      // }
    },
  }
</script>

<style scoped>

</style>
