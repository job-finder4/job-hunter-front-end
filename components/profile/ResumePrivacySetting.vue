<template>
  <v-card flat>
    <v-card-title>
      Resume Privacy Setting
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-radio-group v-model="resumePrivacy">
        <v-radio class="mb-4" label="public" :value="true"/>
        <v-subheader class="mb-10">Your resume will be visible to anyone and may be made available to employers in accordance with our terms. Your phone numbers and email address are only provided to employers you apply or respond to</v-subheader>
        <v-radio label="private" :value="false"/>
        <v-subheader>Your resume is not visible. Employers cant find your resume. But you can attach it when you apply to a job</v-subheader>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ResumePrivacySetting",
  computed:{
    ...mapGetters(["resumeVisibility"]),
    resumePrivacy : {
      get(){
        return this.resumeVisibility
      },
      set(value){
        this.$store.dispatch('updateProfile',{
          visible: value
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
