<template>
  <v-card>
    <v-card-title>
      You are reject the job:{{jobad.data.attributes.name}}
    </v-card-title>
    <v-card-text>
      let the employer know what should he improve in the job ad
      <v-text-field v-model="discription">

      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "RejectJobad",
    data() {
      return {
        discription: 'hi,we are rejecting this jobad,because some fields are not good'
      }
    },
  }
</script>

<style scoped>

</style>
