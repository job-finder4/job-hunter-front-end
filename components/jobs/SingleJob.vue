<template>
  <div>
    <v-card rounded shaped>
      <v-card-title class="font-weight-medium ">

        <v-list>
          <v-list-item :to="'/'+jobad.links.self">
            <v-list-item-title>
              <p class="blue--text headline">
                {{jobad.data.attributes.title}}
              </p>
            </v-list-item-title>
          </v-list-item>
          <v-divider>s</v-divider>

          <v-list-item class="subtitle-2">
            <p><v-icon>mdi-map-marker</v-icon>{{jobad.data.attributes.location}}</p>
            <p class="ml-2"><v-icon>mdi-calendar-month</v-icon>{{jobad.data.attributes.approved_at}}</p>
          </v-list-item>

          <v-list-item>
            {{jobad.data.attributes.min_salary}}
          </v-list-item>
        </v-list>
      </v-card-title>

      <v-card-text class="subtitle">
        job-description
        <p>
          {{jobad.data.attributes.description}}
        </p>
      </v-card-text>

      <v-card-actions>
        <div v-if="this.$auth.loggedIn">
          <v-btn color="blue" rounded outlined>Save</v-btn>
          <v-btn color="blue" rounded outlined>Apply</v-btn>
        </div>
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>
    export default {
        name: "SingleJob",
        props: {
            jobad: {
                type: Object,
                required: true
            },
        },
        methods: {
            apply() {

            }
        },

    }
</script>

<style scoped>
</style>
