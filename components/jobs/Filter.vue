<template>
  <v-card>
    {{filter}}
    <v-card-title>
      <v-icon>mdi-filter</v-icon>
      Filter
      <v-btn right icon @click="cancelFilters">
        <v-icon>
          mdi-window-close
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-divider/>

    <v-range-slider
      hint="select the min,max salary"
      max="50000"
      min="1000"
      step="1000"
      v-model="salaryRange"
      persistent-hint
    ></v-range-slider>

    <v-list-group
      no-action
      :value="true"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Job Time</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item-group @change="getFilteredJobs" v-model="filter.job_time">
        <v-list-item dense class="" :value="job_time" v-for="job_time in job_times" link>
          <v-list-item-title>{{job_time}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>
    <v-divider/>
    <v-list-group
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>category</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item-group @change="getFilteredJobs" v-model="filter.category">

        <v-list-item dense  :value="category.id" v-for="category in categories" link>
          <v-list-item-title>{{category.name}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>
    <v-divider/>
    <v-list-group
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Country</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item-group @change="getFilteredJobs" class="v-list-group-- v-list-group--no-action"
                         v-model="filter.location">
        <v-list-item dense class="cyan--text" :value="state" v-for="state in states" link>
          <v-list-item-title>{{state}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>

    <v-divider/>
    <v-list-group
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Job Type</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item-group @change="getFilteredJobs" class="v-list-group-- v-list-group--no-action"
                         v-model="filter.job_type">
        <v-divider/>
        <v-list-item dense class="" :value="job_type" v-for="job_type in job_types" link>
          <v-list-item-title>{{job_type}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>

  </v-card>
</template>

<script>
  export default {
    computed: {
      categories() {
        return this.$store.getters.getAllCategories
      },
      states() {
        return this.$store.getters.getAllStates
      }
    },
    data() {
      return {
        model: '',
        job_types: ['remote', 'on_site'],
        job_times: ['full_time', 'part_time'],
        filter: {},
        salaryRange:[1400,40000]
      }
    },
    watch:{
      salaryRange(oldVal,newVal){
        this.filter.min_salary=newVal[0]
        this.filter.max_salary=newVal[1]
        this.getFilteredJobs()
      }
    },
    methods: {
      getFilteredJobs() {
        this.$emit('jobsFilterChanged',{filters:this.filter})
      },
      cancelFilters(){
        this.filter={}
        this.getFilteredJobs()
      }
    },
  }
</script>


