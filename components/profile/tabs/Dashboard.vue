<template>
  <v-card flat>
    <v-card-title>
      <v-tabs color="indigo" v-model="tab" style="border-bottom:solid #cccccc 1px ">
        <v-tab v-for="(item,index) in items" :key="index">
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text class="ml-10">
      <v-row>
        <v-col cols="9">
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item,index) in items" :key="index">
              <component :is="item.component"/>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>

import WorksExperience from "@/components/profile/tabs/WorksExperience";
import Educations from "@/components/profile/tabs/Educations";

export default {
  name: "Dashboard",
  data() {
    return {
      tab: null,
      items: [
        {title: "works Experience", component: WorksExperience},
        {title: "educations", component: Educations},
      ],
    }
  },
}
</script>

<style scoped>

</style>
