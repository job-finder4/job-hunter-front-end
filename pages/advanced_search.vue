<template>
  <div>
    <v-card flat>
      {{searchData}}
      <v-card-title class="py-0">Advanced Search</v-card-title>
      <v-divider class="mb-6"></v-divider>
      <v-container>

        <label>Category</label>
        <v-autocomplete
          outlined
          :items="availableCategories"
          color="white"
          item-text="name"
          item-value="id"
          :value="searchData.category"
          v-model="searchData.category"
          dense
        >
        </v-autocomplete>

        <label>Work Schedule</label>
        <v-container class="d-flex">
          <v-chip  v-for="item in jobTimes" label class="ml-2">
          <v-checkbox
            v-model="searchData.selectedJobTimes"
            :value="item"
            :label="item"
          ></v-checkbox>
          </v-chip>
        </v-container>

        <label>Job Type</label>
        <v-container class="d-flex">
          <v-chip  v-for="item in jobTypes" label class="ml-2">
            <v-checkbox
              v-model="searchData.selectedJobTypes"
              :value="item"
              :label="item"
            ></v-checkbox>
          </v-chip>
        </v-container>


        <label>Skills</label>
        <v-autocomplete
          outlined
          multiple
          :items="availableSkills"
          color="white"
          item-text="name"
          :value="searchData.skills"
          v-model="searchData.skills"
          dense
        >
        </v-autocomplete>
        <v-row>
          <v-col md="6">
            <label>Min Salary</label>
            <v-text-field v-model="searchData.min_salary" rules="salary">
              Min Salary
            </v-text-field>
          </v-col>
          <v-col md="6">
            <label>Max Salary</label>
            <v-text-field v-model="searchData.max_salary"
            >
              Max Salary
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn color="blue" @click="search">
          <v-icon>mdi-magnify</v-icon>
          Search
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    layout: 'default',
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
          selectedJobTimes: [],
          selectedJobTypes:[],
          skills: [],
          min_salary:0,
          max_salary:10000
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
    methods: {
      search() {
        this.$store.commit('SET_ADVANCED_SEARCH_PARAMS', {
          skills: JSON.stringify(this.searchData.skills),
          category: this.searchData.category
        })
        this.$router.push('/jobs');

        // return this.$axios.get('backend/api/search_job',{
        //   params: {
        //     skills: JSON.stringify(this.searchData.skills)
        //   }
        // })
      }
    },

  }
</script>
