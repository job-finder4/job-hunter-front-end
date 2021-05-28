<template>
  <v-card flat>
    <v-row justify="center">
      <v-card-title class="font-weight-bold">
          personal info
      </v-card-title>
      <v-card-text >
        <h3>{{personalInfo.name}}</h3>
        <v-icon>mdi-home-flood </v-icon>{{personalInfo.city}} {{personalInfo.state}}
        <br>
        <v-icon>mdi-phone</v-icon>{{personalInfo.phone}}
        <br>
        <v-icon>mdi-mail</v-icon>{{personalInfo.email}}
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: "CvHeader",
    props: {
      personalInfo: {
        type: Object,
        required:true
      },
    },
  }
</script>

<style scoped>

</style>
