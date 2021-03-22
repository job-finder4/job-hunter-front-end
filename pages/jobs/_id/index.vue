<template>
  <v-card
    class="mx-auto"
    max-width="400"
    flat
  >
    <v-card-subtitle class="pb-0">
      Job Title
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="fetchJobs" color="orange" text>Share</v-btn>
      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "index",

        methods: {

        }
    }
</script>

<style scoped>

</style>
