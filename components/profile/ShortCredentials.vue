<!--<template>-->
<!--  <v-card flat class="overflow-y-auto">-->
<!--    <v-list flat dense>-->
<!--      <v-list-item class="pl-0" :key="index"-->
<!--                   v-for="(credential,index) in credentials"-->
<!--      >-->
<!--        <template v-if="credential.type == 'emp'">-->
<!--          <v-list-item-icon class="mr-2">-->
<!--            <v-icon>mdi-briefcase</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>work in-->
<!--              {{credential.body.position}} from {{credential.body.startDate}}-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--          <v-list-item-action></v-list-item-action>-->
<!--        </template>-->
<!--        <template v-else-if="credential.type == 'edu'">-->
<!--          <v-list-item-icon class="mr-2">-->
<!--            <v-icon>mdi-school</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>-->
<!--              learn in {{credential.body.school}} gained a {{credential.body.degreeType}} at {{credential.body.startDate}} year-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--          <v-list-item-action></v-list-item-action>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <v-list-item-icon class="mr-2">-->
<!--            <v-icon>mdi-crosshairs-gps</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>live in {{credential.body.location}} from {{credential.body.startDate}}-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--          <v-list-item-action></v-list-item-action>-->
<!--        </template>-->
<!--      </v-list-item>-->
<!--    </v-list>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script>/* eslint-disable */-->
<!--export default {-->
<!--    name: "ShortCredentials",-->
<!--    props: {-->
<!--        credentials: {-->
<!--            type: Array,-->
<!--            required: true-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
