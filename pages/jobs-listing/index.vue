<template>
  <v-container>
  <v-card>
  <v-card-title class="text-center">
    <v-row class="justify-center text-center">
      All Job Categories
    </v-row>
  </v-card-title>
  <v-card-text>
    <v-list>
      <v-row>
        <v-col cols="4" class="pa-0 ma-0 cyan--text" v-for="category in categories">
          <v-list-item class="pa-0 mx-2 " dense  @click="pushToRouteWithCategory(category.id)">
            {{category.name}}
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-row>
    </v-list>
  </v-card-text>
  </v-card>
    <v-card>
      <v-card-title class="text-center">
        <v-row class="justify-center text-center">
          All Cities
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-row>
            <v-col cols="4" class="pa-0 ma-0 cyan--text" v-for="city in states">
              <v-list-item class="pa-0 mx-2 " dense @click="pushToRouteWithCity(city)">
                {{city}}
              </v-list-item>
              <v-divider/>
            </v-col>
          </v-row>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "index",
    computed: {
      categories() {
        return this.$store.getters.getAllCategories
      },
    },
    data() {
      return {
        states: [
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ],
      }
    },
    methods: {
      pushToRouteWithCategory(categoryId){
        this.$router.push({name: 'jobs', params: {categoryId:categoryId }})
      },
      pushToRouteWithCity(city){
        this.$router.push({name: 'jobs', params: {location:city }})
      }
    },

  }
</script>

<style scoped>

</style>
