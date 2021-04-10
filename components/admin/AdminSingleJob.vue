<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-title>
        <p class="blue--text headline bold--text">
          {{ job.data.attributes.title }}
        </p>
        <p class="blue--text  bold--text">
          <a href="">
            {{ job.data.attributes.company.data.attributes.name }}
          </a>
        </p>
      </v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col class="ml-2" md="2">
          Job Description
        </v-col>
        <v-col md="6">
          <v-card-subtitle class="pb-0">
            {{ job.data.attributes.description }}
          </v-card-subtitle>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="ml-2" md="2">
          Job Details
        </v-col>
        <v-col md="6">
          <v-row v-for="(attVal, attTitle,index) in job.data.attributes"
                 :class="{'grey lighten-4':index%2===0}">
            <v-col md="3">
              {{ attTitle }}
            </v-col>
            <v-col>
              {{ attVal }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card-text>
    <v-card flat>

      <v-card-title>
        Skills Requried For The Job
      </v-card-title>

      <v-card-text>
        <v-row v-for="skill in job.data.attributes.skills.data">
          <v-list-item>
            <v-list-item color="blue-grey">
              <v-list-item-content>
                <li>{{ skill.data.attributes.name }}</li>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-row>
      </v-card-text>

    </v-card>

    <v-card-actions>
      <v-btn v-if="!job.data.attributes.approved_at" color="blue" text rounded outlined
             @click="evaluateJob(1)">
        approve
      </v-btn>
      <v-btn v-if="!job.data.attributes.approved_at" color="blue" text rounded outlined
             @click="evaluateJob(-1)">
        reject
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

  export default {
    name: "index",
    props: {
      job: {
        type: Object,
        required: true
      },
    },
    methods: {
      evaluateJob(evaluationStatus) {
        this.$store.dispatch('evaluateJob', {jobId:this.job.data.id,evaluationStatus: evaluationStatus})
        console.log(evaluationStatus)
      }
    },
  }
</script>

