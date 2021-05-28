<template>
  <v-card>
    <v-card-title>
      You are rejecting the job:<span class="cyan--text">{{jobad.data.attributes.title}}</span>
    </v-card-title>
    <v-card-text>
      let the employer know what should he improve in the job ad
      <v-textarea outlined v-model="description">
      </v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-btn outlined color="primary" @click="rejectJob">
        Send To Employer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      details: {
        type: Object,
        required:true
      },
    },
    data() {
      return {
        jobad:{},
        description: 'hi,we are rejecting this jobad,because some fields are not good'
      }
    },
    methods: {
      rejectJob() {
        this.$nuxt.$emit('jobRefused',{description:this.description})
      }
    },
    created() {
      this.jobad=this.details.jobad
    }
  }
</script>

<style scoped>

</style>
