<template>
  <div>
    <v-card flat>
      <v-card-title class="py-0">Advanced Search</v-card-title>
      <v-divider class="mb-6"></v-divider>
      <v-container>
        <v-row>
          <v-col sm="12" md="6">
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
                        <label>Work Schedule</label>
                 <v-select
                  placeholder="JOB_time"
                  :items="jobTimes"
                  outlined
                  dense
                  multiple
                  v-model="searchData.selectedJobTime"
                />
  <label>Key Words</label>
                <v-text-field dense outlined placeholder="enter some keywords" v-model="searchData.keywords">
                </v-text-field> 

            <!--        <v-expansion-panels>-->
            <!--        <v-expansion-panel >-->
            <!--          <v-expansion-panel-header>-->
            <!--            Item-->
            <!--          </v-expansion-panel-header>-->
            <!--          <v-expansion-panel-content>-->
            <!--            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.-->
            <!--          </v-expansion-panel-content>-->
            <!--        </v-expansion-panel>-->
            <!--        </v-expansion-panels>-->


<!--            <v-row >-->
<!--              <v-col-->
<!--                cols="6"-->
<!--                v-for="item in jobTimes"-->
<!--              >-->
<!--                <v-checkbox  multiple hide-details dense  v-model="searchData.selectedJobTimes"-->
<!--                            :label="item" :value="item">-->
<!--                </v-checkbox>-->
<!--              </v-col>-->
<!--            </v-row>-->

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
      }
    },
    data() {
      return {
        job: null,
        searchData: {
          category: '',
          selectedJobTimes: ''
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
