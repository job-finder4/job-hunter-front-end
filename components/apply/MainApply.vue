<template>
  <div class="text-center">
    <v-dialog
      width="800"
      v-model="dialog"
      v-if="dialog"
      @click:outside="cancel"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2 justify-center">
          You Are applying For:{{jobad.data.attributes.title}}
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            @click="cancel"
            icon
          >
            <v-icon color="red">
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-card v-if="!uploadNewCv">


            <v-card-text>

              <v-row justify="center">
                <v-col md="6">
                  <v-card-title>
                    <h2 class="title mb-2 grey--text">
                      Choose From Your Cvs
                    </h2>
                  </v-card-title>
                </v-col>

                <v-col
                  md="6"
                >
                  <v-sheet
                    elevation="10"
                    rounded="xl"
                  >

                    <v-sheet
                      class="pa-3 text-right blue-grey lighten-4"
                      rounded="t-xl"
                    >
                      Cvs:
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
                    <v-sheet    elevation="10"
                                      rounded="xl"   class="pa-3  blue-grey lighten-4">
                      Or
                      <v-btn v-if="!uploadNewCv" @click="uploadNewCv=true" color="blue" outlined>Upload a New one</v-btn>
                    </v-sheet>
                  </v-sheet>
                </v-col>
              </v-row>

<!--              <v-radio-group row v-model="selectedCv" color="error" text>-->
<!--                <v-row v-for="(cv,index) in cvs">-->
<!--                  <template v-if="isLoadingCvs">-->
<!--                    <v-progress-circular-->
<!--                      :size="50"-->
<!--                      color="primary"-->
<!--                      indeterminate-->
<!--                    ></v-progress-circular>-->
<!--                  </template>-->

<!--                  <v-chip-group>-->
<!--                    <v-chip-->
<!--                      color="primary"-->
<!--                      class="ma-2"-->
<!--                      outlined-->
<!--                      label-->
<!--                    >-->
<!--                      <v-radio :value="cv.data.id" :label="cv.data.attributes.title"/>-->
<!--                      <v-btn icon small><a target="_blank" :href="'/backend/api/cvs/'+cv.data.id+'/download'">-->
<!--                        <v-icon>mdi-download</v-icon>-->
<!--                      </a></v-btn>-->
<!--                    </v-chip>-->
<!--                  </v-chip-group>-->
<!--                </v-row>-->
<!--              </v-radio-group>-->

            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!uploadNewCv" @click="uploadNewCv=true" color="blue" outlined>Upload a New one</v-btn>
            </v-card-actions>
          </v-card>

          <v-btn v-if="uploadNewCv" @click="uploadNewCv=false">Choose from currently cvs</v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <upload-cv @cancel48="refreshMyCvs" v-if="uploadNewCv"/>

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
        isLoadingCvs:true,
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
      }
    },
    created() {
      this.$store.dispatch('getMyCvs').then(res=>{
        this.isLoadingCvs=false
      })
    },

  }
</script>
