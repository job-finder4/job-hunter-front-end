<template>
  <v-card flat color="transparent" v-if="!!userId">
    <v-row class="justify-space-around">
      <v-col sm="8">
        <app-profile-description :userId="userId"/>
        <v-divider class="mt-5 mb-12" style="border-width:1px"/>
<!--        <app-profile-dashboard :blocked="blocked" :userId="userId"/>-->
      </v-col>
<!--      <v-col sm="4">-->
<!--        <app-profile-credentials :blocked="blocked" :userId="userId"/>-->
<!--      </v-col>-->
    </v-row>
  </v-card>
</template>

<script>/* eslint-disable */
import Description from "../../components/profile/Description";
import Credentials from "../../components/profile/Credentials";
// import Dashboard from "./tabs/Dashboard";

export default {
    name: "ShowProfile",
    components: {
        appProfileDescription: Description,
        appProfileCredentials: Credentials,
        // appProfileDashboard: Dashboard,
    },
    data() {
        return {
            blocked: false
        }
    },
    computed: {
        userId() {
            console.log('dd')
            return 1;
            //my profile case this.$route.name=='myProfile'?
            // if (this.$route.name == 'myProfile') {
            //     this.blocked = false
            //     return this.$store.getters.user.id
            //
            // } else if (this.$route.name == 'profile') {
            //     //any user profile case
            //     this.blocked = true
            //     return parseInt(this.$route.params.id)
            // }
        }
    },
}
</script>

<style scoped>

</style>
