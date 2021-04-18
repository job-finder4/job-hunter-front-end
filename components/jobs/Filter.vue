<template>

  <v-list-group
    :value="true"
    no-action
    sub-group
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>Country</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item
      v-for="([title, icon], i) in states"
      :key="i"
      link
    >
      <v-list-item-title v-text="title"></v-list-item-title>

      <v-list-item-icon>
        <v-icon v-text="icon"></v-icon>
      </v-list-item-icon>
    </v-list-item>
  </v-list-group>

</template>

<script>
    export default {
        name: "Filter",
      data() {
        return {
          states:['lattakia','newYork']
        }
      },
    }
</script>

<style scoped>

</style>
