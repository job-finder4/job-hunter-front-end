<template>
  <div>
    <template v-if="controlleable">
      <dropzone v-show="false" id="image-dropzone" ref="dropzoneImage" :options="dzOptions"/>

      <v-avatar
        style="cursor: pointer"
        left
        size="85"
        class="mx-4"
        @click="openDropzone"
        color="grey darken-2"
      >
        <v-img :src="imageUrl"/>
        <v-progress-circular v-show="progressRate!==100" size="64" :value="progressRate"/>
      </v-avatar>
    </template>

    <template v-else>
      <v-avatar
        left
        size="85"
        class="mx-4"
        color="grey darken-2"
      >
        <v-img :src="imageUrl"/>
      </v-avatar>
    </template>

  </div>
</template>

<script>
  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'

  export default {
    name: "UploaderImage",
    props: {
      imageUrl: {
        type: String,
        required: true
      },
      targetUrl: {
        type: String,
        required: true
      },
      controlleable: {
        type: Boolean,
        default: true
      },
    },
    components: {
      Dropzone
    },
    data() {
      return {
        progressRate: 100,
        dzOptions: {
          url: this.targetUrl,
          maxFilesize: 4,
          acceptedFiles: 'image/*',
          paramName: "image",
          maxFiles: 1,
          headers: {"Authorization": this.$auth.strategy.token.get()},
        }
      }
    },
    methods: {
      openDropzone() {
        this.$refs['dropzoneImage'].$el.click()
      },
    },
    mounted() {
      if (this.controlleable) {
        const dropzone = this.$refs['dropzoneImage'].dropzone

        dropzone.on('success', (file, res) => {
          this.$emit('imageUploaded', res.image)
        })

        dropzone.on('error', (file, error) => {
          console.log(error)
        })

        dropzone.on('sending', (file, form) => {
          this.progressRate = 0
        })

        dropzone.on('uploadprogress', (file, progress) => {
          this.progressRate = progress
        })
      }
    }
  }
</script>

<style scoped>
</style>
