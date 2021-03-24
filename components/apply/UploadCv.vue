<template>
  <div>
    <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true">
      <p>da</p>
    </dropzone>
    <v-btn @click="uploadDaniel">upload</v-btn>
  </div>
</template>

<script>
    import Dropzone from 'nuxt-dropzone'
    import 'nuxt-dropzone/dropzone.css'

    export default {
        components: {
            Dropzone
        },
        data() {
            return {
                // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
                options: {
                    // important : set autoProcessQueue on false
                    url: '/backend/api/cvs',
                    maxFilesize: 4,
                    acceptedFiles: 'application/pdf',
                    paramName: "cv_file",
                    autoProcessQueue: false,
                    params: {
                        title: 's'
                    },
                    headers: {"Authorization": 'Bearer ' + this.$store.getters.getToken},
                }
            }
        },
        mounted() {
            // Everything is mounted and you can access the dropzone instance
            const c = this.$refs.el.dropzone
        },
        methods: {
            sendingFile(file) {
                // Dispatch your file
                console.log('ssssssssssssssssss')
            },
            uploadDaniel() {
                this.$refs.el.dropzone.processQueue();
            }
        },
    }
</script>
