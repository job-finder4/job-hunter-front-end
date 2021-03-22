<template>
  <v-card flat>
    <v-card-title class="pa-0 d-flex flex-md-nowrap justify-center"
                  style="word-break: break-all;">

      <v-avatar left size="150" class="mx-4" color="red">
        <v-img v-if="userProfile.image!==null" :src="userProfile.image.url"/>

        <span v-else class="white--text" style="font-size: 200%">
          {{userProfile.first_name.charAt(0).toUpperCase()}}
          {{userProfile.last_name.charAt(0).toUpperCase()}}
        </span>
      </v-avatar>

      <div class="flex-grow-1 text-center text-md-left">
        {{userProfile.name}}
        <div class="subtitle-2 text--darken-1 grey--text">
          <div>{{userProfile.email}}</div>

          <span v-if="userProfile.description === '' && !editDescription">
            <v-btn text @click="editDescription = true">
              add description to your profile
            </v-btn>
          </span>

          <span v-if="userProfile.description !== '' && !editDescription">
            {{userProfile.description}}
            <v-btn icon @click="editDescription = true">
              edit
            </v-btn>
          </span>

          <v-text-field v-if="editDescription" @keydown.enter="updateDescription"
                        label="Add Description"
                        v-model="description"
          />
        </div>
      </div>

    </v-card-title>
  </v-card>
</template>

<script>/* eslint-disable */
import {mapGetters} from 'vuex'

export default {
    name: "Description",
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            editDescription: false,
            description:''
        }
    },
    methods: {
        updateDescription(){
            // this.$store.dispatch('updateDescription',this.description)
            //     .then(()=>{
            //         this.editDescription = false
            //     })
        }
    },
    computed: mapGetters(['userProfile']),
    watch: {
        userId(newValue, oldValue) {
            // this.$store.dispatch('retrieveUserProfile', newValue)
        }
    },
    created() {
        // this.$store.dispatch('retrieveUserProfile', this.userId)
    }
}
</script>

<style scoped>

</style>
