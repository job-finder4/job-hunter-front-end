<template>
  <div>
        <template v-if="isLoading">
          <v-card v-for="i in 3" :key="i" class="mt-3">
            <v-skeleton-loader
              class="mx-auto"
              type="article, actions"
            />
          </v-card>
        </template>

    <v-divider/>

    <template v-if="jobs.length>0" v-for="(jobad,index) in jobs">
      <component class="mt-3" :is="(userRole==='company')?'company-single-job':'admin-single-job'"
                 :jobad="jobad" :key="jobad.data.id" :job-status="jobStatus"
      />
    </template>

    <v-row v-if="!isLoading&&jobs.length===0" justify="center" class="display-1 text-center">
      <v-container>
        <v-card flat>
          <v-card-text class="display-3 font-italic">
            There are no {{jobStatus}} Jobs
          </v-card-text>
        </v-card>
      </v-container>
    </v-row>

    <div class="text-center" v-if="pagination.length>1">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.length"
        :total-visible="4"
      ></v-pagination>
    </div>

  </div>

</template>

<script>
  import AdminSingleJob from "~/components/admin/AdminSingleJob";
  import CompanySingleJob from "~/components/jobs/CompanySingleJob";

  export default {
    name: "JobsContainer",
    components: {
      AdminSingleJob, CompanySingleJob
    },
    props: {
      jobStatus: {
        type: String,
        required: true
      }
    },
    computed: {
      jobs() {
        if (this.jobStatus === 'active') {
          return this.$store.getters.getMyActiveJobs
        }
        if (this.jobStatus === 'expired') {
          return this.$store.getters.getMyExpiredJobs
        }
        if (this.jobStatus === 'pending') {
          return this.$store.getters.getMyPendingJobs
        }
        if (this.jobStatus === 'refused') {
          return this.$store.getters.getMyRefusedJobs
        }
        return []
      },
      page() {
        return this.pagination.page;
      },
      userRole() {
        return this.$store.getters.getUserRole
      }
    },
    data() {
      return {
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
        const action = (this.$store.getters.getUserRole === 'company') ? 'getMyJobs' : 'getAdminJobs'

        this.$store.dispatch(action, {jobStatus: this.jobStatus, page: this.pagination.page})
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
    async fetch() {
      const action = (this.$store.getters.getUserRole === 'company') ? 'getMyJobs' : 'getAdminJobs'
      return this.$store.dispatch(action, {params: {job_status: this.jobStatus}})
        .then((response) => {
          this.isLoading = false
        })
    }
  }
</script>
