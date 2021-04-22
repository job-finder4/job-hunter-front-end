<template>
  <div>
    <v-card flat>
      <v-card-title class="py-0">Advanced Search</v-card-title>
      <v-divider class="mb-6"></v-divider>
      <v-container>
        <v-row>
          <v-col sm="12" md="6">
            <label>Language</label>
            <v-autocomplete
              outlined
              :items="availableLanguages"
              color="white"
              item-text="name"
              v-model="cv_data.languages.name"
              return-object
              dense
            >
            </v-autocomplete>
            <v-radio-group
              v-model="cv_data.language.level"
              mandatory
            >
              <v-radio
                label="Expert"
                value="Expert"
              ></v-radio>
              <v-radio
                label="Basic"
                value="Basic"
              ></v-radio>
              <v-radio
                label="Medium"
                value="Medium"
              ></v-radio>
            </v-radio-group>

            <label>Category</label>
            <v-autocomplete
              outlined
              :items="availableCategories"
              color="white"
              item-text="name"
              :value="searchData.category"
              v-model="searchData.category"
              dense
            >
            </v-autocomplete>
          </v-col>

          <v-col md="6" sm="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Item
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <label>Work Schedule</label>
            <v-select
              outlined
              dense
              placeholder="JOB_time"
              :items="jobTimes"
              v-model="searchData.selectedJobTime"
            />
          </v-col>
        </v-row>
        <v-btn color="blue">
          <v-icon>mdi-magnify</v-icon>
          Search
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    computed: {
      availableSkills() {
        return this.$store.getters.getAllSkills
      },
      availableCategories() {
        return this.$store.getters.getAllCategories
      },
      availableLanguages(){
        return this.$store.getters.getAllLanguages
      }
    },
    data() {
      return {
        job: null,
        cv_data:{
        },
        searchData: {
          category: '',

        },
        jobTimes: [
          'FULL_TIME', 'PART_TIME'
        ],
        jobTypes: [
          'REMOTE', 'ON_SITE'
        ],
      }
    },
    fetch() {
      return this.$store.dispatch('getAvailableSkills')
    },

  }
</script>
