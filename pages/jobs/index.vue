<template>
  <v-row>
    <v-col md="3">
      <app-filter @jobsFilterChanged="onFilterChange" />
    </v-col>
    <v-col md="9">
      <v-card>
        <v-skeleton-loader v-for="i in 5" v-if="isLoading" type="card" :key="i"/>

<!--        <v-card-title class="text-center">-->
<!--          <v-row class="justify-center text-center">-->
<!--            All Job Categories-->
<!--          </v-row>-->
<!--        </v-card-title>-->
<!--        <v-card-text>-->
<!--          <v-list>-->
<!--            <v-row>-->
<!--              <v-col cols="4" class="pa-0 ma-0 cyan&#45;&#45;text" v-for="category in categories">-->
<!--                <v-list-item class="pa-0 mx-2 " dense :to="'jobs-listing/categories/'+category.id">-->
<!--                  {{category.name}}-->
<!--                </v-list-item>-->
<!--                <v-divider/>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-list>-->
<!--        </v-card-text>-->

        <JobsFilterContainer v-if="!isLoading" />
        <div class="text-md-end" v-if="pagination.length>1">
          <v-pagination
            v-model="pagination.page"
            :length="pagination.length"
            :total-visible="4"
          ></v-pagination>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import SingleJob from "~/components/jobs/SingleJob";
  import Filter from "~/components/jobs/Filter";
  import JobsFilterContainer from "~/components/jobs/JobsFilterContainer";

  export default {
    middleware: ['should-not-company'],
    components: {
      SingleJob,AppFilter:Filter,JobsFilterContainer
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
        filters:{},
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
        this.onPageChange()
      }
    },
    methods: {
      onFilterChange({filters}){
        this.filters=filters
        this.resetPaginationData()
        this.$store.dispatch('getJobads', {params:{...filters,page:this.pagination.page}})
          .then(res => {
            this.setPaginationDetails({paginationDetails: res.data.meta})
          })
          .catch(errr => {
            this.$toast.error(err)
          })
      },
      onPageChange() {
        this.isLoading = true
        this.$store.dispatch('getJobads', {params:{...this.filters,page:this.pagination.page}})
          .then(res => {
            this.isLoading = false
            this.setPaginationDetails({paginationDetails:res.data.meta})
          })
          .catch(errr => {
            this.isLoading = false
            this.$toast.error(err)
          })
      },
      setPaginationDetails({paginationDetails}){
        this.isLoading = false
        this.pagination.total = paginationDetails.total
        this.pagination.per_page = paginationDetails.per_page
        this.pagination.length = paginationDetails.last_page
      },
      resetPaginationData(){
        this.pagination.total = 1
        this.pagination.per_page = 5
        this.pagination.length = 1
      }
    },
    fetch() {
      this.isLoading = false
      return this.$store.dispatch('getJobads', {params:{page: this.pagination.page}}).then(res => {
        this.isLoading = false
        this.pagination.total = res.data.meta.total
        this.pagination.per_page = res.data.meta.per_page
        this.pagination.length = res.data.meta.last_page
      })
        .catch(err => {
          this.isLoading = false
        })
    }
  }
</script>
