<template>
  <div>
    <div v-if="userEducations.length>0">
      <v-list three-line>
        <v-list-item class="my-8" v-for="education in userEducations" :key="education.id">
          <v-list-item-content>
            <v-divider/>
            <v-list-item-title class="text-h6">
              {{ education.degree }} in {{ education.study_field }}
            </v-list-item-title>
            <v-list-item-title class="text-body-1">
              school - {{ education.institution }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-overline">
              graduated at {{ education.graduation_year }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-btn @click="editEducation(education)" style="background-color: white" rounded color="indigo" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-avatar>
          <v-list-item-avatar>
            <v-btn @click="showDeleteDialog(education)" style="background-color: white" rounded color="red" icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </div>
    <div style="height:100px" class="text-center" v-else>
      There Is No Education Credentials Yet
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Educations",
  computed: mapGetters(['userEducations']),
  methods: {
    editEducation(education) {
      this.$nuxt.$emit('openDialog', {
        componentName: 'appEduCredential',
        details: education,
      })
    },
    showDeleteDialog($education) {
      this.$nuxt.$emit('showDeleteDialog', {
        title: 'Delete Education',
        body: 'Are you sure to delete this item !',
        fn: this.deleteEdu,
        args: $education
      })
    },
    async deleteEdu($education) {

      await this.$store.dispatch('deleteFromProfile', {
        details: {
          educations: [
            $education
          ]
        }
      })

    }

  },
}
</script>

<style scoped>

</style>
