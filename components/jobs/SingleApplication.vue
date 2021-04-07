<template>
  <v-card
    class="mx-auto"
    color="blue-grey lighten-5"
    max-width="400px"
    max-height="400px"
  >
    <v-card-title>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="teal lighten-4"
            v-bind="attrs"
            v-on="on"
            v-if="application.data.attributes.status===1"
          >
            <v-icon>mdi-checkbox-marked-circle-outline </v-icon>
            approved
          </v-btn>
          <v-btn
            color="red lighten-4"
            v-bind="attrs"
            v-on="on"
            v-if="application.data.attributes.status===-1"
          >
            <v-icon>mdi-account-off </v-icon>
            rejected
          </v-btn>
          <v-btn
            color="orange lighten-4"
            v-bind="attrs"
            v-on="on"
            v-if="application.data.attributes.status===0"
          >
            <v-icon>mdi-clock-time-eight-outline</v-icon>
            waiting
          </v-btn>
        </template>
        <span>Application Status</span>
      </v-tooltip>


      <v-row justify="end">
        <v-menu
          transition="slide-y-transition"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-account-cog-outline </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-icon color="green">mdi-check-bold</v-icon>
              <v-btn text @click="evaluateJob(1)">approve</v-btn>
            </v-list-item>
            <v-list-item>
              <v-icon color="red">mdi-cancel</v-icon>
              <v-btn text @click="evaluateJob(-1)">disapprove</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-card-title>

    <v-row>
        <v-col md="4">
          <v-avatar size="120">
            <img
              alt="user"
              src="https://philadelphiapsychology.org/wp-content/uploads/2018/07/male-profile-picture.png"
            >
          </v-avatar>
        </v-col>
        <v-col md="8">
          <v-card-title class="headline">
            <v-list-item to="/user/profile">
              {{application.data.attributes.user.data.attributes.name}}
            </v-list-item>
          </v-card-title>

          <v-card-text class="text-body-1">
          <p><v-icon>mdi-cake-variant </v-icon>12,april,1983</p>
          <p> <v-icon>mdi-email</v-icon>{{application.data.attributes.user.data.attributes.email}}</p>
             <p><v-icon>mdi-phone</v-icon>0931869085</p>
          <p><v-icon>mdi-map-marker</v-icon>Latakia</p>
            <strong>
              <v-icon>mdi-file-account</v-icon>Cv</strong>
            <v-btn x-small outlined color="blue-grey">
              {{application.data.attributes.cv.data.attributes.title}}
              <a target="_blank"
                 :href="'/backend'+application.data.attributes.cv.data.attributes.download_link">
                <v-icon>mdi-download</v-icon>
              </a>
            </v-btn>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-col>
      </v-row>

  </v-card>
</template>

<script>
  export default {
    name: "SingleApplication",
    props: {
      application: {
        type: Object,
        required: true
      },
    },
    methods: {
      evaluateJob(evaluationStatus){
        this.$store.dispatch('evaluateJob', {
          jobId:this.application.data.attributes.jobad.data.id,
          applicationId:this.application.data.id,
          evaluationStatus:evaluationStatus
        })
          .then((res) => {

          })
      },
    },
  }
</script>

<style scoped>
  .v-btn--active.no-active::before {
    opacity: 0 !important;
  }
</style>
