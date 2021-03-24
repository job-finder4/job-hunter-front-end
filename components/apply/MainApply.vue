<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-divider></v-divider>
<upload-cv/>

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
            components:{
                UploadCv
            }
        },
    }
</script>

<style scoped>

</style>
