<template>
  <div class="text-center">
    <v-dialog
      width="800"
      v-model="dialog"
      v-if="dialog"
      @click:outside="cancel"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card flat>
        <v-card-title class="lighten-2 justify-center">
          You Are applying For:{{jobad.data.attributes.title}}
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="cancel"
            icon
          >
            <v-icon color="red">
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row justify="center">
            <v-col md="6">
              <upload-cv @fileUploaded="applyAfterUpload"/>
            </v-col>

            <v-col md="1" class="align-center d-flex">
              <div class="display-1">or</div>
            </v-col>

            <v-col
              md="5"
            >
              <v-sheet
                elevation="3"
                rounded="xl" min-height="100%"
              >

                <v-sheet
                  class="pa-3 text-right blue-grey lighten-4"
                  rounded="t-xl"
                >
                  Choose From Your Cvs:
                  <v-btn icon>
                    <v-icon>mdi-content-save-cog-outline</v-icon>
                  </v-btn>

                  <v-btn
                    class="ml-2"
                    icon
                  >
                    <v-icon>mdi-check-bold</v-icon>
                  </v-btn>
                </v-sheet>

                <div class="pa-4">
                  <v-chip-group
                    active-class="primary--text"
                    column
                    mandatory
                    v-model="selectedCv"
                  >
                    <v-chip
                      v-for="cv in cvs"
                      :key="cv.data.id"
                      :value="cv.data.id"
                    >
                      {{ cv.data.attributes.title }}
                      <v-btn icon small><a target="_blank" :href="'/backend/api/cvs/'+cv.data.id+'/download'">
                        <v-icon color="light-blue">mdi-download</v-icon>
                      </a></v-btn>
                    </v-chip>
                  </v-chip-group>
                </div>
              </v-sheet>
            </v-col>
          </v-row>

<!--          <v-btn v-if="uploadNewCv" @click="uploadNewCv=false">Choose from currently cvs</v-btn>-->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
          <v-btn
            color="blue"
            @click="apply"
            width="50%"
            :disabled="!selectedCv"
          >
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import UploadCv from "~/components/apply/UploadCv";

  export default {
    name: "MainApply",
    components: {UploadCv},
    props: {
      dialog: {
        type: Boolean,
        default: false
      },
      jobad: {
        type: Object,
        required: true
      },
    },
    computed: {
      cvs() {
        return this.$store.getters.myCvs
      },
    },
    data() {
      return {
        uploadNewCv: false,
        selectedCv: null,
        isLoadingCvs: true,
      }
    },
    methods: {
      cancel() {
        this.$emit('cancel4')
      },
      apply() {
        this.$store.dispatch('applyJob', {'job_id': this.jobad.data.id, 'cv_id': this.selectedCv})
          .then((data) => {
            this.cancel()
            this.$emit('applied')
            this.$toast.success('Your application sent successfully')
          })
      },
      refreshMyCvs() {
        this.$store.dispatch('getMyCvs')
          .then(() => {
            this.uploadNewCv = false
          })
      },
      applyAfterUpload({cvId}){
        this.selectedCv=cvId
        this.apply()
      }
    },
    created() {
      this.$store.dispatch('getMyCvs').then(res => {
        this.isLoadingCvs = false
      })
    },

  }
</script>
