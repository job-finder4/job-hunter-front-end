<template>
  <div class="day-item mx-6 flex-shrink-0">

    <div class="day-header text-center">

      <div class="day-title">

        <slot name="title">
          {{new Date(day.date).toUTCString().substr(0,16)}}
        </slot>

      </div>

      <div class="day-icon">

        <v-avatar color="primary white--text">

          <slot name="icon" >
            <v-icon dark>{{ new Date(day.date).getUTCDate() }}</v-icon>
          </slot>

        </v-avatar>

      </div>

    </div>
    <slot name="content">
      <app-hour-items :day="day"/>
    </slot>
  </div>
</template>

<script>
  import HourItems from "~/components/interview/HourItems";

  export default {
    name: "DayContainer",
    props: {
      day: {
        type: Object,
        required: true
      },
    },
    components: {
      appHourItems: HourItems
    },
  }
</script>

<style scoped>
  .day-item {
    width: 300px;
  }
</style>
