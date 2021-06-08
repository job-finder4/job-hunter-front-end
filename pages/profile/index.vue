<template>
  <app-show-profile v-if="!!$store.getters.profileDetails"/>
</template>

<script>
import ShowProfile from "~/components/profile/ShowProfile";

export default {
  name: "index",
  // middleware:['should-jobSeeker'],
  components: {
    appShowProfile: ShowProfile,
  },
  async fetch() {
    let {data} = await this.$axios.get('backend/api/all-skills')
    this.$store.commit('setAllSkills', data);
    await this.$store.dispatch('retrieveProfile', this.$store.getters.getUser.data.id)
  },
}
</script>

<style scoped>

</style>
