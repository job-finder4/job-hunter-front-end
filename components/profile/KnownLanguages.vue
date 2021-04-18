<template>
  <div>
    <v-card flat class="my-4">
      <v-card-title class="text-h5">
        Known Languages
      </v-card-title>
      <v-divider/>
      <v-card-text>

        <div class="d-flex mb-4">
          <v-spacer/>
          <v-btn right text @click="toggleEdit" color="primary">
            {{ editButtonLabel }}
          </v-btn>
        </div>

        <v-slide-y-transition leave-absolute>
          <v-autocomplete
            v-if="editMode"
            key="select-new-language"
            label="Add New Language"
            v-model="newLanguage"
            :items="unSelectedLanguages"
            class="my-8"
            hint="select language from the above list"
            @input="addLanguage"
          />
        </v-slide-y-transition>


        <v-chip
          v-for="language in selectedLanguages"
          :key="language"
          :close="editMode"
          @click:close="removeLanguage(language)"
          color="primary"
          class="ma-2"
          outlined
          label
        >
          {{ language }}
        </v-chip>

      </v-card-text>
      <v-card-actions class="justify-center mt-4" v-if="editMode">
        <v-btn :disabled="requestUnderProcess" @click="changeLanguages" color="primary" large rounded>Done</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "KnownLanguages",
  computed: {
    ...mapGetters(["userLanguages", 'allLanguages']),
    unSelectedLanguages() {
      return this.allLanguages.filter(
        item => !this.selectedLanguages.find(selectedItem => selectedItem == item)
      )
    }
  },
  data() {
    return {
      editMode: false,
      editButtonLabel: 'edit or add language',
      selectedLanguages: Array.from(this.$store.getters.userLanguages),
      newLanguage: '',
      requestUnderProcess: false,
    }
  },
  methods: {
    toggleEdit() {
      this.editMode = !this.editMode
      this.editButtonLabel = this.editMode ? 'cancel' : 'edit or add language'
      !this.editMode ? this.selectedLanguages = Array.from(this.userLanguages) : ''
    },
    removeLanguage(language) {
      this.selectedLanguages = this.selectedLanguages.filter(item => item != language)
    },
    addLanguage() {
      this.selectedLanguages.push(this.newLanguage)
      this.newLanguage = ''
    },
    async changeLanguages() {
      this.requestUnderProcess = true
      await this.$store.dispatch('updateProfile', {
        details: {
          languages: this.selectedLanguages
        }
      });
      this.toggleEdit()
      this.requestUnderProcess = false
    }
  },

}
</script>

<style scoped>

</style>
