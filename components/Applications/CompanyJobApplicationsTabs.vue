<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">
        Job Applications
      </h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item.title">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item,index) in items">
          <applications-container :job-id="jobId" :application-status="item.type" :key="item.id"/>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>

  </v-card>
</template>

<script>
  import ApplicationsContainer from "~/components/Applications/ApplicationsContainer";

  export default {
    name: "CompanyJobApplicationsTabs",
    props: {
      jobId: {
        type: Number,
        required:true
      },
    },
    components: {
      ApplicationsContainer
    },
    data() {
      return {
        tab: null,
        items: [
          {
            id: 1, 'title': 'Approved', 'type': 'approved'
          },
          {
            id: 2, 'title': 'Rejected', 'type': 'rejected'
          },
          {
            id: 3, 'title': 'Pending', 'type': 'pending'
          }
        ],
      }
    },
  }
</script>
