<template>
  <v-row>
    <v-col md="4">
      <filter/>
    </v-col>
    <v-col md="8">
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
                <v-list-item class="pa-0 mx-2 " dense :to="'jobs-listing/categories/'+category.id">
                  {{category.name}}
                </v-list-item>
                <v-divider/>
              </v-col>
            </v-row>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>

    <v-row>
      <v-col>
<!--        <v-skeleton-loader v-for="i in 5" :key="i" v-if="jobads.length===0"-->
<!--                           class="mx-auto"-->
<!--                           type="card"-->
<!--        ></v-skeleton-loader>-->
<!--        <JobsFilterContainer/>-->
<!--        <div v-if="jobads.length!==0">-->
<!--          <single-job v-for="(jobad,index) in jobads" :key="jobad.data.id" :jobad="jobad"/>-->
<!--        </div>-->
<!--        <div class="text-center" v-if="pagination.length>1">-->
<!--          <v-pagination-->
<!--            v-model="pagination.page"-->
<!--            :length="pagination.length"-->
<!--            :total-visible="4"-->
<!--          ></v-pagination>-->
<!--        </div>-->
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
  import SingleJob from "~/components/jobs/SingleJob";
  import Filter from "~/components/jobs/Filter";


  export default {
    middleware: ['should-not-company'],
    components: {
      SingleJob,Filter
    },
    computed: {
      jobads() {
        return this.$store.getters.getAllJobads
      },
      page() {
        return this.pagination.page;
      },
      categories() {
        return this.$store.getters.getAllCategories
      }
    },
    data() {
      return {
        applyDialog: false,
        isLoading: true,
        pagination: {
          page: 1,
          total: 1,
          per_page: 5,
          length: 1
        }
      }
    },
    watch: {
      page: function (newPage, oldPage) {
        this.onPageChange(newPage)
      }
    },
    methods: {
      onPageChange(newPage) {
        this.isLoading = true
        this.$store.dispatch('getJobads', {page: this.pagination.page})
          .then(res => {
            console.log(res.data.meta)
            this.isLoading = false
            this.pagination.total = res.data.meta.total
            this.pagination.per_page = res.data.meta.per_page
            this.pagination.length = res.data.meta.last_page
          })
          .catch(errr => {
            this.isLoading = false
            this.$toast.error(err)
          })
      }
    },
    // fetch() {
    //   this.isLoading = false
    //   return this.$store.dispatch('getJobads', {params:{page: this.pagination.page}}).then(res => {
    //     this.isLoading = false
    //     this.pagination.total = res.data.meta.total
    //     this.pagination.per_page = res.data.meta.per_page
    //     this.pagination.length = res.data.meta.last_page
    //   })
    //     .catch(err => {
    //       this.isLoading = false
    //     })
    // }
  }
</script>
