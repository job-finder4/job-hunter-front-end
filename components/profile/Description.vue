<template>
  <v-card flat class="d-flex align-center"
          style="word-break: break-all;">
    <v-overlay absolute :value="requestUnderProcess">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
    <div class="mx-3">
      <UploaderImage
        :controlleable="controlleable"
        :image-url="profileOwner.image"
        :target-url="`/backend/api/users/${$store.getters.userProfile.data.id}/image`"
        @imageUploaded="$store.commit('UPDATE_PROFILE_IMAGE',$event)"
      />
    </div>

    <div class="d-flex flex-wrap align-center">
      <div class="mr-6">
        <div class="my-2 text-h5">
          {{ profileOwner.name }}
        </div>

        <div class="text-body-2 d-flex my-2 grey--text text--darken-2">
          <v-icon left>mdi-map-marker</v-icon>
          <template v-if="editMode">
            <v-text-field style="max-width: 125px" color="primary" dense class="mx-1" label="country"
                          v-model="country"/>
            <v-text-field style="max-width: 125px" color="primary" dense class="mx-1" label="city" v-model="city"/>
          </template>
          <template v-else-if="!!profileDetails.location">
            {{ profileDetails.location }}
          </template>

          <template v-else>
            <v-btn @click="edit" small text color="primary">
              Add location details
              <v-icon right dense>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>
        </div>

      </div>

      <div class="text-body-2 ml-6 grey--text text--darken-3">
        <div class="my-2">
          <v-icon left>mdi-email-edit-outline</v-icon>
          {{ profileOwner.email }}
        </div>

        <div class="my-2 d-flex">
          <v-icon left>mdi-cellphone</v-icon>

          <template v-if="editMode">
            <v-text-field color="primary" label="phone number" dense v-model="phoneNumber"/>
          </template>

          <template v-else-if="!!profileDetails.phone_number">
            {{ profileDetails.phone_number }}
          </template>

          <template v-else>
            <v-btn @click="edit" small color="primary" text>
              Add phone number
              <v-icon dense right>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>

        </div>
      </div>
    </div>
    <template v-if="controlleable">
      <v-spacer/>
      <v-btn @click="editMode = true" icon color="primary" v-if="!editMode">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-if="editMode" @click="edit" icon color="primary">
        <v-icon>mdi-check-outline</v-icon>
      </v-btn>
      <v-btn @click="editMode=false" v-if="editMode" icon color="red">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import UploaderImage from "~/components/profile/ImageUploader";

  export default {
    name: "Description",
    props: {
      controlleable: {
        type: Boolean,
        default: true
      },
    },
    components: {UploaderImage},
    computed: {
      ...mapGetters(['profileDetails', 'profileOwner']),
    },
    data() {
      return {
        requestUnderProcess: false,
        editMode: false,
        country: this.$store.getters.profileDetails.location.split(', ')[0],
        city: this.$store.getters.profileDetails.location.split(', ')[1],
        phoneNumber: this.$store.getters.profileDetails.phone_number
      }
    },
    watch: {
      profileDetails(newVal, oldVal) {
        this.country = newVal.location.split(', ')[0]
        this.city = newVal.location.split(', ')[1]
        this.phoneNumber = newVal.phone_number
      }
    },
    methods: {
      async edit() {
        this.requestUnderProcess = true
        await this.$store.dispatch('updateProfile', {
          details: {
            location: {
              country: this.country,
              city: this.city,
            },
            phone_number: this.phoneNumber,
          }
        })
        this.requestUnderProcess = false
        this.editMode = false
      }
    },

  }
</script>

<style scoped>
</style>
