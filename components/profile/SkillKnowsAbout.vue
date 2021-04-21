<template>
  <v-card flat class="my-6">
    <v-overlay absolute :value="requestUnderProcess">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
    <v-card-title class="text-h5">
      Knows About
    </v-card-title>
    <v-divider/>
    <v-card-text>

      <div v-if="controlleable" class="d-flex mb-4">
        <v-spacer/>
        <v-btn text @click="toggleEdit" color="primary">
          {{ editButtonLabel }}
        </v-btn>
      </div>

      <v-slide-y-transition leave-absolute>
        <v-autocomplete
          v-if="editMode"
          key="select-new-skill"
          label="Add New Skill"
          v-model="newSkill"
          :items="unSelectedSkills"
          item-value="data.id"
          item-text="data.attributes.name"
          class="my-8"
          return-object
          hint="select skill from the above list"
          @input="addSkill"
        />
      </v-slide-y-transition>


      <v-chip v-for="skill in selectedSkills"
              :key="skill.data.id"
              :close="editMode && controlleable"
              @click:close="removeSkill(skill.data.id)"
              color="primary"
              class="ma-2"
              outlined
              label
      >
        {{ skill.data.attributes.name }}
      </v-chip>
    </v-card-text>
    <v-card-actions class="justify-center mt-4" v-if="editMode">
      <v-btn color="primary" large rounded :disabled="requestUnderProcess" @click="editSkills">Done</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      controlleable: {
        type: Boolean,
        default: true
      },
    },
    name: "skillKnowsAbout",
    computed: {
      ...mapGetters(["userSkills", 'allSkills']),
      unSelectedSkills() {
        return this.allSkills.filter(
          item => !this.selectedSkills.find(selectedItem => selectedItem.data.id == item.data.id)
        )
      }
    },
    data() {
      return {
        editMode: false,
        editButtonLabel: 'edit or add skill',
        selectedSkills: Array.from(this.$store.getters.userSkills),
        newSkill: '',
        requestUnderProcess: false
      }
    },
    methods: {
      toggleEdit() {
        this.editMode = !this.editMode
        this.editButtonLabel = this.editMode ? 'cancel' : 'edit or add skill'
        !this.editMode ? this.selectedSkills = Array.from(this.userSkills) : ''
      },
      removeSkill(skillId) {
        this.selectedSkills = this.selectedSkills.filter(item => item.data.id != skillId)
      },
      addSkill() {
        this.selectedSkills.push(this.newSkill)
        this.newSkill = ''
      },
      async editSkills() {
        this.requestUnderProcess = true
        await this.$store.dispatch('updateProfile', {
          skills: this.selectedSkills.map(item => item.data.id)
        });
        this.toggleEdit()
        this.requestUnderProcess = false
      }

    },
  }
</script>

<style scoped>
</style>
