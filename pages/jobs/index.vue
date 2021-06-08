<template>
  <v-row>
    <v-col md="3">
      <app-filter :parent-filters="filters" @filterCreated="isFilterFirstCreated=true"
                  @jobsFilterChanged="onFilterChange"/>
    </v-col>
    <v-col md="9">
      <v-card min-height="90%">

        <h2 v-if="!isLoading" style="text-align: center">
          Your search returned {{pagination.total}} jobs
        </h2>

        <v-sheet v-if="isLoading">
          <v-card-title class="mb-8">
            <v-list-item class="display-1">
              fetching Jobs ... ... .. ...
            </v-list-item>
          </v-card-title>
          <v-row justify="center" align="end">
            <v-progress-circular
              color="primary" size="200"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </v-sheet>

        <JobsFilterContainer v-if="!isLoading"/>
        <v-row class="justify-center" v-if="!isLoading&&pagination.length>1">
          <v-pagination
            v-model="pagination.page"
            :length="pagination.length"
            :total-visible="4"
          ></v-pagination>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import Filter from "~/components/jobs/Filter";
  import JobsFilterContainer from "~/components/jobs/JobsFilterContainer";

  export default {
    middleware: ['should-not-company'],
    components: {
      AppFilter: Filter, JobsFilterContainer
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
        filters: {},
        isFilterFirstCreated: false,
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
        if (oldPage !== newPage) {
          this.onPageChange()
        }
      },
      // '$route.params.categoryId': {
      //   handler: function(categoryId) {
      //     this.filters.category=categoryId
      //     this.onFilterChange(this.filters)
      //   },
      //   deep: true,
      //   immediate: true
      // }
    },
    methods: {
      onFilterChange({filters}) {
        // if (this.isFilterFirstCreated) {
        //   this.isFilterFirstCreated = false
        //   return;
        // }
        this.filters = filters
        this.resetPaginationData()
        this.isLoading = true
        this.$store.dispatch('getJobads', {params: {...filters, page: this.pagination.page}})
          .then(res => {
            this.setPaginationDetails({paginationDetails: res.data.meta})
          })

          .catch(errr => {
            this.$toast.error(err)
          })
      },
      onPageChange() {
        this.isLoading = true
        this.$store.dispatch('getJobads', {params: {...this.filters, page: this.pagination.page}})
          .then(res => {
            this.isLoading = false
            this.setPaginationDetails({paginationDetails: res.data.meta})
          })
          .catch(errr => {
            this.isLoading = false
            this.$toast.error(err)
          })
      },
      setPaginationDetails({paginationDetails}) {
        this.isLoading = false
        this.pagination.total = paginationDetails.total
        this.pagination.per_page = paginationDetails.per_page
        this.pagination.length = paginationDetails.last_page
      },
      resetPaginationData() {
        this.pagination.total = 1
        this.pagination.per_page = 5
        this.pagination.length = 1
      }
    },

    async fetch() {
      let tmpFilters = {}
      if (this.$route.params.categoryId) {
        tmpFilters.category = this.$route.params.categoryId
        this.filters.category = this.$route.params.categoryId
      }
      if (this.$route.params.location) {
        tmpFilters.location = this.$route.params.location
        this.filters.location = this.$route.params.location
      }
      return this.$store.dispatch('getJobads', {params: {...tmpFilters, page: this.pagination.page}}).then(res => {
        this.isLoading = false
        this.setPaginationDetails({paginationDetails: res.data.meta})
      })
        .catch(err => {
          this.isLoading = false
        })
    },

  }
</script>
