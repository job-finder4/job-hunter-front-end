<template>
  <v-card>
    <v-card-text>
      <div>
        Upload your Cv
        <div v-if="dropzoneError">
          errors
          {{dropzoneError}}
        </div>
        <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true">
          <p>click to browse or drag your file here</p>
        </dropzone>
      </div>
      <v-row justify="center" align-content-md="center">
        <v-text-field  v-model="options.params.title" placeholder="enter the title of Your cv"></v-text-field>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="uploadDaniel">proceed upload</v-btn>
      <v-btn @click="reset">reset</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
    import Dropzone from 'nuxt-dropzone'
    import 'nuxt-dropzone/dropzone.css'

    export default {
        components: {
            Dropzone,
        },
        data() {
            return {
                dropzoneError: null,
                // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
                options: {
                    // important : set autoProcessQueue on false
                    url: '/backend/api/cvs',
                    maxFilesize: 4,
                    acceptedFiles: 'application/pdf',
                    paramName: "cv_file",
                    autoProcessQueue: false,
                    addRemoveLinks: true,
                    maxFiles: 1,
                    params: {
                        title: 'default Name'
                    },
                    headers: {"Authorization": 'Bearer ' + this.$store.getters.getToken},
                }
            }
        },
        mounted() {
            // Everything is mounted and you can access the dropzone instance
            let c = this.$refs.el.dropzone
            let comp = this
            c.on("maxfilesexceeded", function (file) {
                c.removeFile(file);
            });
            c.on("error", function (file, errorMessage, xhr) {
                if(xhr){
                    comp.dropzoneError = {'code': xhr.status, 'message': xhr.statusText}
                }
            });
            c.on("success", function (cv) {
                comp.$emit('cancel48')
            });
        },
        methods: {
            reset() {
                this.$refs.el.dropzone.removeAllFiles()
            },
            uploadDaniel() {
                this.$refs.el.dropzone.processQueue()
            },
        },
    }
</script>

<style>
  .dz-max-files-reached {
    pointer-events: none;
    cursor: default;
  }
</style>
