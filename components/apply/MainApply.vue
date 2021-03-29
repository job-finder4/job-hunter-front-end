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
              Choose From Your Cvs
            </v-card-title>

            <v-card-text>
              <v-radio-group row v-model="selectedCv" color="error" text>
                <template v-for="(cv,index) in cvs">
                  <v-radio :value="cv.data.id" :label="cv.data.attributes.title"/>
                  <v-btn icon small><a target="_blank" :href="'/backend/api/cvs/'+cv.data.id+'/download'">
                    <v-icon>mdi-download</v-icon>
                  </a></v-btn>
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
        <upload-cv @cancel48="refreshMyCvs" v-if="uploadNewCv"/>

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
        computed:{
            cvs(){
                let res = this.$store.getters.getMyCvs
                return res
            },
        },
        data() {
            return {
                uploadNewCv: false,
                selectedCv: null,
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
                    })
            },
            refreshMyCvs() {
                this.$store.dispatch('getMyCvs')
                    .then(()=>{
                        this.uploadNewCv = false
                    })
                // this.$axios.$get('backend/api/users/' + this.$nuxt.context.store.$auth.$state.user.data.id + '/cvs/')
                //     .then(data => {
                //         this.cvs = data
                //         this.uploadNewCv = false
                //     })
            }
        },
        created(){
            this.$store.dispatch('getMyCvs')
        },
        // async fetch() {
        //     this.$axios.$get('backend/api/users/' + this.$nuxt.context.store.$auth.$state.user.data.id + '/cvs/')
        //         .then(data => {
        //             this.cvs = data
        //         })
        // }
    }
</script>
