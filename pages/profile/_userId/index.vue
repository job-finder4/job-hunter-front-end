<template>
  <app-show-profile :controlleable="false"/>
</template>
<script>

  import ShowProfile from "@/components/profile/ShowProfile";

  export default {
    name: "Profile",
    // middleware:['should-company'],
    components: {
      appShowProfile: ShowProfile,
    },
    async fetch() {
      let {data} = await this.$axios.get('backend/api/all-skills')
      this.$store.commit('setAllSkills', data);
      await this.$store.dispatch('retrieveProfile', this.$route.params.userId)
    },
  }
</script>

<style scoped>
</style>
