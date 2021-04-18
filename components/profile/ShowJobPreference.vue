<template>
  <v-card v-if="!!$store.getters.jobPreference" class="my-2" outlined>
    <v-card-title class="pb-0">
      <span>My Preference Job:</span>
      <v-spacer/>

      <v-btn @click="editJobPreference" style="background-color: white" rounded color="indigo" icon>
        <v-icon dense>mdi-pencil</v-icon>
      </v-btn>
      <v-btn @click="showDeleteDialog" style="background-color: white" rounded color="red" icon>
        <v-icon dense>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row class="text-body-1 justify-space-around text-capitalize job-preference">
        <v-col cols="5">

          <div>
            <strong>Job Title:</strong> {{ jobPreference.job_title }}
          </div>
          <v-divider/>

          <div>
            <strong>Job Category:</strong> {{ jobPreference.job_category }}
          </div>
          <v-divider/>

          <div>
            <strong>salary:</strong> {{ jobPreference.salary }}
          </div>
          <v-divider/>

        </v-col>

        <v-col cols="5">
          <div>
            <strong>Job Location:</strong> {{ jobPreference.location }}
          </div>
          <v-divider/>

          <div>
            <strong>Work Type:</strong> {{ jobPreference.work_type }}
          </div>
          <v-divider/>

        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "ShowJobPreference",
  computed: {
    ...mapGetters(['jobPreference'])
  },
  methods: {
    showDeleteDialog() {
      this.$nuxt.$emit('showDeleteDialog', {
        title: 'Delete Job Preference',
        body: 'Are you sure to delete this item !',
        fn: this.deleteJobPreference,
        args: ''
      })
    },
    async deleteJobPreference() {
      await this.$store.dispatch('deleteJobPreference')
    },
    editJobPreference() {
      this.$nuxt.$emit('openDialog', {
        componentName:'appAddJobPreference'
      })
    }
  }
}
</script>

<style scoped>
.job-preference div {
  margin-top: 20px;
}

.job-preference strong {
  color: #008282;
}
</style>
