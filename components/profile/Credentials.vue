<!--<template>-->
<!--  <v-card flat color="transparent">-->
<!--    <div class="title">Credentials & Highlights</div>-->
<!--    <v-divider/>-->
<!--    <v-list v-if="!blocked" dense flat max-width="max-content">-->
<!--      <v-list-item class="pl-0" link @click="openDialog('appEmpCredential')">-->
<!--        <v-list-item-icon class="mr-2"></v-list-item-icon>-->
<!--        <v-list-item-content class="blue-grey&#45;&#45;text">-->
<!--          <v-list-item-title>-->
<!--            Add Employment Credentials-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      <v-list-item class="pl-0" link @click="openDialog('appEduCredential')">-->
<!--        <v-list-item-icon class="mr-2"></v-list-item-icon>-->
<!--        <v-list-item-content class="blue-grey&#45;&#45;text">-->
<!--          <v-list-item-title>-->
<!--            Add Education Credentials-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      <v-list-item class="pl-0" link @click="openDialog('appLocCredential')">-->
<!--        <v-list-item-icon class="mr-2"></v-list-item-icon>-->
<!--        <v-list-item-content class="blue-grey&#45;&#45;text">-->
<!--          <v-list-item-title>-->
<!--            Add location Credentials-->
<!--          </v-list-item-title>-->

<!--        </v-list-item-content>-->
<!--      </v-list-item>-->
<!--    </v-list>-->
<!--    <v-divider style="width:70%"/>-->
<!--    <app-short-credentials :credentials="userShortCredentials"/>-->
<!--    <v-btn class="d-block mx-auto" small color="indigo"-->
<!--           rounded dark @click="openDialog('appShortCredentials')"-->
<!--    >-->
<!--      Show All-->
<!--    </v-btn>-->
<!--    <v-divider class="mt-12"/>-->
<!--&lt;!&ndash;    <app-topic-knows-about :userTopics="userShortTopics"/>&ndash;&gt;-->
<!--    <v-btn class="d-block mx-auto" small color="indigo"-->
<!--           rounded dark @click="openDialog('appTopicKnowsAbout')"-->
<!--    >-->
<!--      Show All-->
<!--    </v-btn>-->
<!--    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown"-->
<!--              :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"-->
<!--              v-model="dialog" width="600px">-->
<!--      <v-card flat>-->
<!--        <v-card-title>-->
<!--          <v-spacer/>-->
<!--          <v-btn text color="red" icon outlined small @click="dialog=false">x</v-btn>-->
<!--        </v-card-title>-->
<!--        <v-card-text>-->
<!--          <component :credentials="userCredentials" :userTopics="userTopics"-->
<!--                     :is="dialogComponent" @cancel="dialog=false"/>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-dialog>-->
<!--  </v-card>-->
<!--</template>-->
de
<!--<script>/* eslint-disable */-->
<!--import EmpCredential from "./EmpCredential";-->
<!--import EduCredential from "./EduCredential";-->
<!--import LocCredential from "./LocCredential";-->
<!--import {mapGetters} from 'vuex'-->
<!--import ShortCredentials from "./ShortCredentials";-->

<!--export default {-->
<!--    name: "Credentials",-->
<!--    props: {-->
<!--        userId: {-->
<!--            type: Number,-->
<!--            required: true-->
<!--        },-->
<!--        blocked: {-->
<!--            type: Boolean,-->
<!--            default: false-->
<!--        }-->
<!--    },-->
<!--    components: {-->
<!--        appEmpCredential: EmpCredential,-->
<!--        appEduCredential: EduCredential,-->
<!--        appLocCredential: LocCredential,-->
<!--        appShortCredentials: ShortCredentials,-->
<!--        appTopicKnowsAbout: TopicKnowsAbout,-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            dialog: false,-->
<!--            dialogComponent: 'appEmpCredential',-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        openDialog(componentName) {-->
<!--            this.dialogComponent = componentName-->
<!--            this.dialog = true-->
<!--        }-->
<!--    },-->
<!--    computed: mapGetters(['userShortTopics', 'userTopics', 'userProfile', 'userShortCredentials', 'userCredentials'])-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
