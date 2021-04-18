<template>
  <v-card flat>
    <v-card-title class="text-h5">Credentials & Highlights</v-card-title>
    <v-divider/>
    <v-card-text class="py-0">
      <v-list flat max-width="max-content">
        <v-list-item v-for="btn in controlButtons">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ btn.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn color="primary" text @click="openDialog(btn.component)">
                {{ btn.btnLabel }}
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>


  </v-card>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "AddCredentials",
  computed: {
    ...mapGetters(['jobPreference']),
    controlButtons() {
      return [
        {
          icon: 'mdi-briefcase-outline',
          component: 'appEmpCredential',
          btnLabel: 'Add Employment Credentials',
        },
        {icon: 'mdi-school-outline', component: 'appEduCredential', btnLabel: 'Add Education Credentials'},
        {icon: 'mdi-map-marker', component: 'appLocCredential', btnLabel: 'Add location Credentials'},
        {
          icon: 'mdi-map-marker',
          component: 'appAddJobPreference',
          btnLabel: !!this.$store.getters.jobPreference ? 'Edit My Preference Job' : 'Add My Preference Job'
        },
      ]
    }
  },
  methods: {
    openDialog(componentName) {
      this.$nuxt.$emit('openDialog', {
        componentName,
      })
    }
  }
  ,
}

</script>

<style scoped>

</style>
