<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">
        Your Published Jobs
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab v-for="item in items" :key="item.title">
          {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item,index) in items">
          <jobs-container :job-status="item.type" :key="item.id"/>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>

  </v-card>
</template>

<script>
  import JobsContainer from "~/components/jobs/JobsContainer";

  export default {
    components: {
      JobsContainer
    },
    data() {
      return {
        tab: 0,
        items: [
          {
            id: 1, 'title': 'Active Jobs', 'description': 'approved & Unexpired',
            'type': 'active'
          },
          {
            id: 2, 'title': 'Pending Jobs', 'description': 'waiting for approval',
            'type': 'pending'
          },
          {
            id: 3, 'title': 'Refused Jobs', 'description': 'needs modification',
            'type': 'refused'
          },
          {
            id: 4, 'title': 'Expired Jobs', 'description': 'active in the past,but expired now',
            'type': 'expired'
          }
        ],
      }
    },
  }
</script>
