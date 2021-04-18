<template>
  <v-card class="ma-10" flat color="transparent">
    <v-row class="justify-space-around">
      <v-col sm="8">
        <app-profile-description/>
        <v-divider class="mt-5 mb-12" style="border-width:1px"/>
        <app-show-job-preference/>
        <app-profile-dashboard/>
      </v-col>
      <v-col sm="4">
        <app-add-credentials/>
        <app-resume-privacy-setting/>
        <app-skill-knows-about/>
        <app-known-languages/>
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
