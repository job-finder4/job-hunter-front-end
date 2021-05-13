<template>
  <div>

    <v-card
      flat class="bg d-flex align-center flex-column" height="600px"
    >
      <v-card-title class="text-h3 flex-column mb-12 font-weight-bold pt-12 white--text">
        <div class="mx-auto">Search for your next job</div>
        <div class="mx-auto">Find the right fit.</div>
      </v-card-title>

      <div style="width: 70%" class="d-flex flex-wrap align-center pt-12 justify-center">

        <v-combobox
          v-model="location"
          :items="items"
          :loading="isLoading"
          :search-input.sync="fetchSuggestion"
          label="Location"
          placeholder="Start typing to Search"
          prepend-icon="mdi-map-marker"
          multiple
          hide-no-data
          solo outlined background-color="white"
          class="flex-grow-0"
          style="min-width: 30%"
        />

        <v-combobox
          v-model="term"
          :items="items"
          :loading="isLoading"
          :search-input.sync="fetchSuggestions"
          label="Job title, keywords, or skills"
          hide-no-data
          multiple
          placeholder="Start typing to Search"
          prepend-icon="mdi-magnify"
          solo outlined background-color="white"
          class="flex-grow-0 mx-4"
          style="min-width: 30%"
        />
        <div>
          <v-btn
            class="mb-8 mx-2"
            x-large
            color="indigo darken-2 white--text"
            @click="search"
          >
            Search
          </v-btn>
          <v-btn
            class="mb-8 mx-2 px-3"
            outlined
            style="background-color: white"
            x-large
            color="indigo darken-1"
          >
            Advanced<br>Search
          </v-btn>

        </div>
      </div>
    </v-card>

    <v-tabs class="mt-n12" v-model="tab" centered background-color="transparent" dark>
      <v-tab key="0">Jobs By Categories</v-tab>
      <v-tab key="1">Trended Search</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="py-6">
      <v-tab-item :key="0">
        <div style="width: 60%" class="mx-auto">
          <v-row class="justify-center">
            <v-col
              cols="3"
              v-for="category in allCategories"
              :key="category.id"
            >
              <v-btn text
                     dark
                     @click="$router.push({name:'jobs',params:{categoryId:category.id}})"
              >
                {{category.name}} <span class="indigo--text">(2885)</span>
              </v-btn>

            </v-col>
          </v-row>
        </div>

      </v-tab-item>

      <v-tab-item :key="1">
        <div class="d-flex justify-center align-center flex-wrap mx-auto" style="max-width: 70%">
          <v-chip class="ma-2"
                  large
                  outlined
                  dark
                  link
                  v-for="(i,index) in 10"
                  :key="index"

          >
            software development
          </v-chip>
        </div>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tab: 0,
        isLoading: false,
        term: [],
        location: [],
        items: [
        ]
      }
    },
    methods: {
      async search() {
        this.$store.commit('SET_SEARCH_PARAMS', {
          location: this.location,
          term: this.term
        })
        this.$router.push('/jobs');
      },
      fetchSuggestions() {

      }
    },
    computed: {
      allCategories() {
        return this.$store.getters.getAllCategories.slice(0,16);
      },
      allSkills(){
        return this.$store.getters.getAllSkills
      }
    },
    created() {
      this.items=this.$store.getters.getAllSkills.map(item=>item.data.attributes.name)
      // this.items=this.allCategories.map(item=>item.name)
    },
    destroyed() {
      // console.log('destorysasdasdas')
      // this.$store.commit('CLEAR_SEARCH_ATTRIBUTE')
    },
    async fetch() {
      let {data} = await this.$axios.get('backend/api/all-skills')
      this.$store.commit('setAllSkills', data);
    }
  }
</script>

<style scope>
  .bg {
    background-image: url("~assets/h.png");
    background-size: cover;
    background-position: center;
    height: 100%;
  }

  .v-tab {
    background-color: rgba(19, 55, 82, 0.73);
  }

  .v-tabs-items {
    background-color: #133752 !important;
    color: white;
  }
</style>
