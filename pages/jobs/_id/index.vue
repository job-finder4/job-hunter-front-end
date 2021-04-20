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
        <v-list-item class="font-weight-light text-sm-body-1">
          Category
          {{ loadedJobad.data.attributes.category.data.attributes.name }}
        </v-list-item>
      </v-card-title>

      <v-divider></v-divider>
      <div >
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
          <v-sheet class="text-center  lighten-4" >
            <ul>
              <v-row v-for="(skill,index) in loadedJobad.data.attributes.skills.data">
                <v-icon color="green">mdi-check-circle-outline</v-icon>
                {{ skill.data.attributes.name }}
              </v-row>
            </ul>
          </v-sheet>
        </v-card-text>
      </div>
      <v-divider class="mt-5"/>
      <v-card-text>
        <MainApply @applied="applied=true" v-if="dialog" @cancel4="dialog=false" :jobad="loadedJobad"
                   :dialog="dialog"/>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>
          Save
        </v-btn>
        <v-btn v-if="!loadedJobad.data.attributes.applied_at" color="orange" text @click="dialog=true">
          Apply
        </v-btn>
        <v-btn v-if="loadedJobad.data.attributes.applied_at" color="blue" text rounded outlined disabled>Already
          Applied
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
  import MainApply from "~/components/apply/MainApply";

  export default {
    name: "index",
    components: {
      MainApply
    },
    data() {
      return {
        loadedJobad: null,
        dialog: false,
        applied: false
      }
    },
    methods: {},
    watch: {
      applied(oldVal, newVal) {
        this.loadedJobad.data.attributes.applied_at = new Date()
      }
    },
    async fetch() {
      return this.$axios.get('backend/api/jobads/' + this.$route.params.id)
        .then((res) => {
          this.loadedJobad = res.data
        })
    }
  }
</script>

