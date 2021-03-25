<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="dialog"
      v-if="dialog"
      @click:outside="cancel"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Apply the Job
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            @click="cancel"
          >
            <v-icon>
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-card v-if="!uploadNewCv">
            <v-card-title>
              Choose From Your Cvs Or
            </v-card-title>

            <v-card-text>
              <v-radio-group row v-model="selectedCv" color="error" text >
                <template v-for="(cv,index) in cvs">
                  <v-radio :value="cv.id" :label="cv.title"/>
                  <v-btn icon small><v-icon>mdi-eye</v-icon></v-btn>
                </template>
              </v-radio-group>

            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!uploadNewCv" @click="uploadNewCv=true">Upload a New one</v-btn>
            </v-card-actions>
          </v-card>


          <v-btn v-if="uploadNewCv" @click="uploadNewCv=false">Choose from currently cvs</v-btn>

        </v-card-text>

        <v-divider></v-divider>
        <upload-cv v-if="uploadNewCv"/>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="apply"
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
        data() {
            return {
                uploadNewCv: false,
                cvs: [{'id': 1, 'title': 'web developer cv', 'download_link': 'ss'},
                    {'id': 2, 'title': 'my laravel cv', 'download_link': 'sss'}
                ],
                selectedCv: null,
            }
        },
        props: {
            dialog: {
                type: Boolean,
                default: false
            },
            components: {
                UploadCv
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel4')
            },
            // apply(){
            //     this.$store.dispatch('apply_job',[
            //         cv_details:{
            //         'title' => 'newCv',
            //             'file' => $file,
            //     }
            //
            //     ])
            // }
        },
    }
</script>

<style scoped>
</style>
