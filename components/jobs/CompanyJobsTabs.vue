<template>
  <v-card >
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
      <v-tab v-for="item in items" :key="item">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item,index) in items" :key="index">
          <jobs-container  :job-type="item.type" />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>

  </v-card>

</template>

<script>
  import JobsContainer from "~/components/jobs/JobsContainer";

  export default {
    components:{
      JobsContainer
    },
    data () {
      return {
        tab: null,
        items: [
          {
            'title':'Approved Jobs','type':'approved'
          },
          {
            'title':'Rejected Jobs','type':'rejected'
          },
          {
            'title':'Pending Jobs','type':'pending'
          }
        ],
      }
    },

  }
</script>
