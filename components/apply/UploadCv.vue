<template>
  <v-card>
    <v-card-text>
      <div>
        <div v-if="dropzoneError">
          errors
          {{dropzoneError}}
        </div>
        <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true">
          <p>Upload New Cv</p>
        </dropzone>
      </div>
      <div>
        <v-text-field class="mt-3 mx-auto"  dense style="max-width: 50%"
                      outlined v-model="options.params.title"
                      placeholder="enter the title of Your cv" color="primary"
        />
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="primary" @click="uploadDaniel">proceed upload</v-btn>
      <v-btn text @click="reset">reset</v-btn>
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
            title: 'mycv'
          },
          headers: {"Authorization": this.$auth.strategy.token.get()},
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
        if (xhr) {
          comp.dropzoneError = {'code': xhr.status, 'message': xhr.statusText}
        }
      });
      c.on("success", function (cv,response) {
        comp.$emit('fileUploaded',{cvId:response.data.id})
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
  .vue-dropzone{
    border-style: dashed;
    border-color: #0004ff;
  }
</style>
