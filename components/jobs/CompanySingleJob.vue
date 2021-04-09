<template>
  <div>
    <v-card rounded elevation="2" >
      <v-card-title class="font-weight-medium">

          <v-list>
            <v-list-item :disabled="!jobad.data.attributes.approved_at" :to="'my-jobs/'+jobad.data.id">
              <v-list-item-title class="blue--text headline">
                {{jobad.data.attributes.title}}
              </v-list-item-title>
            </v-list-item>
          </v-list>

        <v-row
          justify="center"
        >
          <v-btn class="apporval-btn" x-small color="orange" text v-if="!jobad.data.attributes.approved_at">Waiting For
            Approval
          </v-btn>
          <template v-if="jobad.data.attributes.approved_at">
            <v-btn v-if="jobStatus==='expired'" class="apporval-btn" x-small color="red" text >Expired
            </v-btn>
            <v-btn v-else class="apporval-btn" x-small color="teal" text >Approved
            </v-btn>
          </template>
        </v-row>

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
              <div class="border-left">
                <p class=" ml-md-5 mt-md-2 font-weight-light">
                  {{jobad.data.attributes.description}}
                </p>
              </div>
            </v-card-text>
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
      jobStatus: {
        type: String,
        required: true
      }
    },
    methods: {},
  }
</script>

<style scoped>
  .apporval-btn {
    transform: rotate(30deg);
  }
  .border-left{
    border-left:grey solid 2px ;
  }
</style>
