<template>
  <div>
    <v-card rounded shaped>
      <v-card-title class="font-weight-medium ">
        <v-list>

          <v-list-item :to="/jobs/+jobad.data.id">
            <v-list-item-title>
              <p class="blue--text headline">
                {{jobad.data.attributes.title}}
              </p>
            </v-list-item-title>
          </v-list-item>

          <v-divider>s</v-divider>

          <v-list-item class="text--secondary">
            <v-row>
              <v-col>
                <p><v-icon>mdi-map-marker</v-icon>{{jobad.data.attributes.location}}</p>
                <p class="ml-2"><v-icon>mdi-calendar-month</v-icon>{{jobad.data.attributes.approved_at}}</p>
              </v-col>
              <v-col>
                <p class="ml-2"><v-icon>mdi-clock-time-four-outline</v-icon>
                  job time {{ jobad.data.attributes.job_time}}
                </p>
                <p class="ml-2">
                  <v-icon>
                    mdi-briefcase
                  </v-icon>
                  job type
                  {{jobad.data.attributes.job_type}}
                </p>
              </v-col>
            </v-row>
          </v-list-item>

          <v-list-item>
            Salary:
            <v-icon>
              mdi-cash-multiple
            </v-icon>
            from
            ${{jobad.data.attributes.min_salary}}
            to
            ${{jobad.data.attributes.max_salary}}
          </v-list-item>

          <v-list-item>

          </v-list-item>
        </v-list>
      </v-card-title>

      <v-card-text class="subtitle">
        job-description
        <p>
          {{jobad.data.attributes.description}}
        </p>
      </v-card-text>
      <v-card-text>
        <MainApply v-if="applyDialog" @cancel4="applyDialog=false" :jobad="jobad" :dialog="applyDialog"/>
      </v-card-text>

      <v-card-actions>
        <div v-if="this.$auth.loggedIn">
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
