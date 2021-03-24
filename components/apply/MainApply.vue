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

        <v-divider></v-divider>
        <upload-cv />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
          >
            I accept
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
            components: {
                UploadCv
            }
        },
        methods: {
            cancel() {
             this.$emit('cancel4')
            }
        },
    }
</script>

<style scoped>

</style>
