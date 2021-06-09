<template>
  <v-card class="my-5" flat color="transparent">
    <v-row class="justify-space-around">

      <v-col sm="8">
        <app-profile-description :controlleable="controlleable"/>
        <v-divider class="mt-5 mb-12" style="border-width:1px"/>
        <app-show-job-preference :controlleable="controlleable"/>
        <app-profile-dashboard :controlleable="controlleable"/>
      </v-col>

      <v-col sm="4">
        <app-add-credentials v-if="controlleable"/>
        <app-resume-privacy-setting v-if="controlleable"/>
        <app-skill-knows-about :controlleable="controlleable"/>
        <app-known-languages :controlleable="controlleable"/>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
import Description from "./Description";
import Dashboard from "./tabs/Dashboard";
import SkillKnowsAbout from "@/components/profile/SkillKnowsAbout";
import KnownLanguages from "@/components/profile/KnownLanguages";
import ResumePrivacySetting from "@/components/profile/ResumePrivacySetting";
import AddCredentials from "@/components/profile/AddCredentials";
import ShowJobPreference from "~/components/profile/ShowJobPreference";

export default {
  name: "ShowProfile",
  props: {
    controlleable: {
      type: Boolean,
      default: true
    },
  },
  components: {
    appProfileDescription: Description,
    appAddCredentials: AddCredentials,
    appProfileDashboard: Dashboard,
    appSkillKnowsAbout: SkillKnowsAbout,
    appKnownLanguages: KnownLanguages,
    appResumePrivacySetting: ResumePrivacySetting,
    appShowJobPreference: ShowJobPreference
  },

}
</script>

<style scoped>

</style>
