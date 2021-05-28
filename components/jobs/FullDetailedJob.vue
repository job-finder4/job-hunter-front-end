<template>
  <v-container>
    <v-skeleton-loader
      v-if="isLoading"
      class="mx-auto"
      type="card"
    ></v-skeleton-loader>

    <v-card
      v-if="loadedJobad"
    >
      <v-card-title>
        <v-list-item>
          <v-list-item-title class="blue--text headline bold--text">
            {{ loadedJobad.data.attributes.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item class="font-weight-light text-sm-body-1" to="/company/profile">
          {{ loadedJobad.data.attributes.company.data.attributes.name }}
        </v-list-item>
      </v-card-title>

      <v-divider></v-divider>
      <div>
        <v-card-text>
          <v-row>
            <v-col class="ml-2" md="2">
              Job Description
            </v-col>
            <v-col md="6">
              <v-card-subtitle class="pb-0">
                {{ loadedJobad.data.attributes.description }}
              </v-card-subtitle>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="ml-2" md="2">
              Job Details
            </v-col>
            <v-col md="6">
              <v-row class="grey lighten-4">
                <v-col md="3">
                  location
                </v-col>
                <v-col>
                  {{ loadedJobad.data.attributes.location }}
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  Job time
                </v-col>
                <v-col>
                  {{ loadedJobad.data.attributes.job_time }}
                </v-col>
              </v-row>
              <v-row class="grey lighten-4">
                <v-col md="3">
                  Job Type
                </v-col>
                <v-col>
                  {{ loadedJobad.data.attributes.job_type }}
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3">
                  Salary Range
                </v-col>
                <v-col>
                  ${{ loadedJobad.data.attributes.min_salary }} - ${{ loadedJobad.data.attributes.max_salary }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>

        </v-card-text>
        <v-divider></v-divider>

        <v-card-title>
          Skills Requried For The Job
        </v-card-title>
        <v-card-text class="ml-2">
          <ul>
            <v-row v-for="(skill,index) in loadedJobad.data.attributes.skills.data">
              <li>{{ skill.data.attributes.name }}</li>
            </v-row>
          </ul>
        </v-card-text>
      </div>
      <v-divider class="mt-5"/>

    </v-card>

  </v-container>
</template>

<script>
  export default {
    name: "FullDetailedJob",
    props: {
      jobad: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style scoped>

</style>
