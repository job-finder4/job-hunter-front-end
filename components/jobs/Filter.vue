<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-filter</v-icon>
      Filter
      <v-btn text @click="cancelFilters" class="caption">
        remove all filters
      </v-btn>
    </v-card-title>
    <v-chip-group class="mx-2" column>
      <v-chip outlined label color="cyan" close v-for="(value, name) in filter" @click:close="removeFilter(name)">
        <template v-if="name=='category'">
          {{findCategory(value)}}
        </template>
        <template v-else-if="name=='min_salary'||name=='max_salary'">
          {{name}} {{value}}$
        </template>
        <template v-else>
          {{value}}
        </template>
      </v-chip>
    </v-chip-group>
    <v-divider/>

    <v-list-group
      no-action
      v-model="salaryOptions"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Salary Range</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-range-slider
        hint="select the min,max salary"
        max="20000"
        min="1000"
        step="1000"
        v-model="salaryRange"
        persistent-hint
      ></v-range-slider>
    </v-list-group>

    <v-divider/>

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

        <v-list-item dense :value="category.id" v-for="category in categories" link>
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
    props: {
      parentFilters: {
        type: Object,
        default: {}
      },
    },
    computed: {
      categories() {
        return this.$store.getters.getAllCategories
      },
      states() {
        return this.$store.getters.getAllStates
      },
      min_salary() {
        return this.filter.min_salary
      },
      max_salary() {
        return this.filter.max_salary
      }
    },
    data() {
      return {
        model: '',
        salaryOptions: false,
        job_types: ['remote', 'on_site'],
        job_times: ['full_time', 'part_time'],
        filter: {},
        salaryRange: [0, 20000],
        keyNameExceptionsArray:['min_salary','max_salary']
      }
    },
    watch: {
      salaryOptions(newVal) {
        if (!newVal) {
          this.removeFilter('min_salary')
          this.removeFilter('max_salary')
        }
      },
      salaryRange(oldVal, newVal) {
        this.filter.min_salary = newVal[0]
        this.filter.max_salary = newVal[1]
        this.getFilteredJobs()
      },
      min_salary(oldVal, newVal) {
        if (newVal) {
          this.salaryRange[0] = newVal
        } else {
          this.salaryRange[0] = 0
        }
      },
      max_salary(oldVal, newVal) {
        if (newVal) {
          this.salaryRange[1] = newVal
        } else {
          this.salaryRange[1] = 50000
        }
      }
    },
    methods: {
      findCategory(id){
        return this.categories.find(item=>item.id===id).name
      },
      getFilteredJobs() {
        this.$emit('jobsFilterChanged', {filters: this.filter})
      },
      cancelFilters() {
        if (Object.keys(this.filter).length === 0) {
          return
        }
        this.filter = {}
        this.getFilteredJobs()
      },
      removeFilter(keyyy) {
        let tmp = Object.keys(this.filter).filter(key =>
          key !== keyyy).reduce((obj, key) => {
            obj[key] = this.filter[key];
            return obj;
          }, {}
        );
        this.filter = tmp
        this.getFilteredJobs()
      }
    },
    created() {
      this.filter = this.parentFilters
      this.$emit('filterCreated')
    }
  }
</script>


