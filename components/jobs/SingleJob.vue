<template>
  <div>
    <v-card rounded elevation="2" >
      <v-card-title class="font-weight-medium">
        <v-list>
          <v-list-item :disabled="!jobad.data.attributes.approved_at" :to="'/jobs/'+jobad.data.id">
            <v-list-item-title class="blue--text headline">
              {{jobad.data.attributes.title}}
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

          <v-card-text>
            Description
            <p class="border-left ml-md-5 mt-md-2 font-weight-light">
              {{jobad.data.attributes.description}}
            </p>
          </v-card-text>
        </v-list>
      </v-card-text>

      <v-card-text>
        <MainApply v-if="applyDialog" @cancel4="applyDialog=false" :jobad="jobad" :dialog="applyDialog"/>
      </v-card-text>

      <v-card-actions>
        <div v-if="this.$auth.loggedIn&&this.$store.getters.getUserRole!=='company'">
          <v-btn color="blue" rounded outlined>Save</v-btn>
          <v-btn v-if="!jobad.data.attributes.applied_at" @click="applyDialog=true" color="blue" rounded outlined>Apply</v-btn>
          <v-btn v-if="jobad.data.attributes.applied_at"  color="blue" text rounded outlined disabled>Already Applied</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
    import MainApply from "~/components/apply/MainApply";

    export default {
        name: "SingleJob",
        components:{
          MainApply
        },
        props: {
            jobad: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                applyDialog: false
            }
        },
        methods: {
            apply() {

            }
        },

    }
</script>

<style scoped>
</style>
