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
              <v-btn color="primary" text @click="openDialog(btn.component,btn.details)">
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
      ...mapGetters(['jobPreference', 'userLocationObject', 'jobPreference']),
      controlButtons() {
        return [
          {
            icon: 'mdi-briefcase-outline',
            component: 'appEmpCredential',
            btnLabel: 'Add Employment Credentials',
            details: ''
          },
          {
            icon: 'mdi-school-outline',
            component: 'appEduCredential',
            btnLabel: 'Add Education Credentials',
            details: ''
          },
          {
            icon: 'mdi-map-marker',
            component: 'appLocCredential',
            btnLabel: !!this.userLocationObject.country && !!this.userLocationObject.country ? 'Edit location Credentials' : 'Add location Credentials',
            details: this.userLocationObject
          },
          {
            icon: 'mdi-map-marker',
            component: 'appAddJobPreference',
            btnLabel: !!this.jobPreference ? 'Edit My Preference Job' : 'Add My Preference Job',
            details: this.jobPreference
          },
        ]
      }
    },
    methods: {
      openDialog(componentName, details) {
        this.$nuxt.$emit('openDialog', {
          componentName, details
        })
      }
    }
    ,
  }

</script>

<style scoped>

</style>
