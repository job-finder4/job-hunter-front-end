<template>
  <div>
    <v-card rounded>
      <v-card-title class="font-weight-medium">
        <v-list>
          <v-list-item :to="'my-jobs/'+jobad.data.id">
            <v-list-item-title class="blue--text headline">
              {{jobad.data.attributes.title}}
              <v-btn x-small outlined color="red" v-if="jobad.data.attributes.approved_at">Approved</v-btn>
              <v-btn color="blue" outlined v-if="!jobad.data.attributes.approved_at">Waiting For Approval</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-title>
      <v-divider>s</v-divider>

      <v-card-text class="subtitle">
        <v-list>
          <v-list-item>
              <p>
                <v-icon>mdi-map-marker</v-icon>
                {{jobad.data.attributes.location}}
              </p>
              <p class="ml-2">
                <v-icon>mdi-calendar-month</v-icon>
                {{jobad.data.attributes.approved_at}}
              </p>
              <p class="ml-2">
                <v-icon>mdi-clock-time-four-outline</v-icon>
                {{ jobad.data.attributes.job_time}}
              </p>
              <p class="ml-2">
                <v-icon>
                  mdi-briefcase
                </v-icon>
                {{jobad.data.attributes.job_type}}
              </p>
              <p class="ml-2">
                <v-icon>
                  mdi-cash-multiple
                </v-icon>
                from
                ${{jobad.data.attributes.min_salary}}
                to
                ${{jobad.data.attributes.max_salary}}
              </p>
          </v-list-item>

          <v-list-item class="text--black text-md-body-1">
            <v-list-item-content>
              <v-list-item-title>
                Description
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <p>
              {{jobad.data.attributes.description}}
            </p>
          </v-list-item>

        </v-list>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>

  export default {
    components: {},
    props: {
      jobad: {
        type: Object,
        required: true
      },
    },
    methods: {},
  }
</script>

<style scoped>
</style>
