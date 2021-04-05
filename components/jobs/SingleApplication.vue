<template>
  <v-card
    class="mx-auto"
    color="blue-grey lighten-5"
    max-width="400px"
    max-height="400px"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="title font-weight-bold">
            {{application.data.attributes.user.data.attributes.name}}
          </span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <v-text-field
        disabled
        :value="application.data.attributes.user.data.attributes.email"
        outlined>
      </v-text-field>

      Uploaded Cv
      <v-btn text  exact-active-class="no-active">
        {{application.data.attributes.cv.data.attributes.title}}
        <a target="_blank"
          :href="'backend'+application.data.attributes.cv.data.attributes.download_link">
          <v-icon>mdi-download</v-icon>
        </a>
      </v-btn>

    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "SingleApplication",
    props: {
      application: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style scoped>
  .v-btn--active.no-active::before {
    opacity: 0 !important;
  }
</style>
