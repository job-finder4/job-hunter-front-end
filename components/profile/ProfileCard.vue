<!--<template>-->
<!--  <v-card flat>-->
<!--    <v-menu :value="showMenu"-->
<!--            offset-x offset-y left top eager open-on-hover transition="fade-transition"-->
<!--            :position-x="positionX"-->
<!--            :position-y="positionY"-->
<!--    >-->
<!--      <v-card v-if="showMenu" width="300px">-->
<!--        <v-img eager width="100%" height="150px" :src="userProfile.image.url"/>-->
<!--        <v-card-title class="justify-center text-capitalize headline indigo&#45;&#45;text">-->
<!--          {{ userProfile.first_name }} {{userProfile.last_name }}-->
<!--        </v-card-title>-->
<!--        <v-card-subtitle class="text-center">{{ userProfile.description }}</v-card-subtitle>-->
<!--        <v-card-text class="black&#45;&#45;text pb-0 d-flex justify-space-around flex-wrap">-->
<!--          <p><span class="pink&#45;&#45;text">{{ userProfile.points }}</span> points</p>-->
<!--          <p><span class="pink&#45;&#45;text">{{ userProfile.questions_count }}</span> questions</p>-->
<!--          <p><span class="pink&#45;&#45;text">{{ userProfile.answers_count }}</span> answers</p>-->
<!--        </v-card-text>-->
<!--        <v-divider v-if="userShortCredentials.length > 0"/>-->
<!--        <app-short-credentials :credentials="userShortCredentials"/>-->
<!--      </v-card>-->
<!--    </v-menu>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script>/* eslint-disable */-->
<!--import  {eventBus} from "../../main";-->
<!--import {mapGetters} from 'vuex'-->
<!--import ShortCredentials from "./ShortCredentials";-->
<!--export default {-->
<!--    name: "ProfileCard",-->
<!--    components:{-->
<!--        appShortCredentials:ShortCredentials-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            showMenu: false,-->
<!--            positionX: 0,-->
<!--            positionY: 0,-->
<!--            isLoading: true,-->
<!--            user: {},-->
<!--        }-->
<!--    },-->
<!--    computed: {-->
<!--        ...mapGetters(['userProfile','userShortCredentials'])-->
<!--    },-->
<!--    methods: {-->
<!--        retrieveUserInformation(userId) {-->
<!--            // this.isLoading = true-->
<!--            this.$store.dispatch('retrieveUserProfile',userId)-->
<!--                .then(()=>{-->
<!--                    this.showMenu = true-->
<!--                })-->
<!--        },-->
<!--        showUserCardM(payload) {-->
<!--            this.positionX = payload.event.clientX-->
<!--            this.positionY = payload.event.clientY-->
<!--            this.retrieveUserInformation(payload.userId)-->
<!--        },-->
<!--        hideUserCardM(event) {-->
<!--            this.positionX = event.clientX-->
<!--            this.positionY = event.clientY-->
<!--            this.showMenu = false-->
<!--        },-->
<!--    },-->
<!--    created() {-->
<!--        eventBus.$on('showUserCard', this.showUserCardM)-->
<!--        eventBus.$on('hideUserCard', this.hideUserCardM)-->
<!--    }-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->
<!--  p {-->
<!--    margin: 2px;-->
<!--  }-->
<!--</style>-->
