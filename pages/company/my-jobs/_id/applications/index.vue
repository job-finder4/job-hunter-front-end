<template>
  <v-container>
<!--    {{jobApplicaions}}-->
<!--    <single-job :jobad="jobApplicaions.data[0].attributes.jobad"/>-->
    <v-row>
      <v-col md="4" sm="12" v-for="application in jobApplicaions">
        <single-application :application="application"/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import SingleApplication from "~/components/jobs/SingleApplication";
  import SingleJob from "~/components/jobs/SingleJob";

  export default {
    layout: 'company',
    components: {
      SingleApplication, SingleJob
    },
    data() {
      return {
        jobApplicaions:[],
        application: {
          "data": {
            "type": "applications",
            "id": 24,
            "attributes": {
              "user": {
                "data": {
                  "type": "users",
                  "id": 42,
                  "attributes": {"name": "Ahmad", "email": "ahmad48@gmail.com", "role": "jobSeeker"}
                }
              },
              "jobad": {
                "data": {
                  "type": "jobads",
                  "id": 39,
                  "attributes": {
                    "title": "Senior Manager",
                    "location": "California",
                    "company": {
                      "data": {
                        "type": "users",
                        "id": 41,
                        "attributes": {"name": "Spectrum", "email": "spectrum@gmail.com", "role": "company"}
                      }
                    },
                    "description": "hi this is new job from spectrum company",
                    "min_salary": 32900,
                    "max_salary": 65400,
                    "job_time": "FULL_TIME",
                    "job_type": "REMOTE",
                    "expiration_date": "1 week from now",
                    "skills": {
                      "data": [{
                        "data": {
                          "type": "skills",
                          "id": 2,
                          "attributes": {"name": "Aerospace Engineering", "parent_id": 1}
                        }
                      }],
                    },
                    "approved_at": "Apr 4, 2021"
                  }
                },
              },
              "cv": {
                "data": {
                  "type": "cvs",
                  "id": 29,
                  "attributes": {"title": "mycv", "user_id": 42, "download_link": "/api/cvs/29/download"}
                }
              },
              "status": 0,
              "applied_at": "Apr 4, 2021"
            }
          }
        },
      }
    },
    fetch(){
      return this.$store.dispatch('getJobApplications', {jobId:this.$route.params.id})
        .then((res) => {
          this.jobApplicaions = res.data.data
        })
    }
  }
</script>

<style scoped>

</style>
