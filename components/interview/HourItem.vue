<template>
  <v-card class="my-6">

    <div class="caret"/>

    <v-card-title>
      <slot name="title">
        <p class="mx-auto my-0">interview interval</p>
      </slot>
    </v-card-title>

    <v-card-text>
      <slot name="content">
        interview start from {{hour.start_time}} until {{hour.end_time}}
      </slot>
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
    name: "HourItem",
    props: {
      hour: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style scoped>
  .caret {
    position: absolute;
    left: 140px;
    top: -11px;
    transform: rotate(45deg);
    width: 20px;
    height: 20px;
    transform-origin: center center;
    opacity: 1;
    background-color: inherit;
    border-left: solid .5px rgba(42, 32, 32, 0.1);
    border-top: solid .5px rgba(42, 32, 32, 0.1);
    z-index: 20;
  }
</style>
