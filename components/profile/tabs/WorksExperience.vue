<template>
  <div>
    <div v-if="userWorksExperience.length>0">
      <v-list three-line>
        <v-list-item class="my-8" v-for="workExperience in userWorksExperience" :key="workExperience.id">
          <v-list-item-content>
            <v-divider/>
            <v-list-item-title class="text-h6">
              {{ workExperience.job_title }} | {{ workExperience.job_category }} |
              {{ workExperience.job_subcategory }}
            </v-list-item-title>
            <v-list-item-title class="text-body-1">
              {{ workExperience.company_name }} | {{ workExperience.industry }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2">
              {{ workExperience.job_description }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-overline">
              {{ new Date(workExperience.start_date).toISOString().substr(0,7) }}
              To
              {{ new Date(workExperience.end_date).toISOString().substr(0,7) }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <template v-if="controlleable">
            <v-list-item-avatar>
              <v-btn @click="editExperience(workExperience)" style="background-color: white" rounded color="indigo"
                     icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-avatar>
              <v-btn @click="showDeleteDialog(workExperience)" style="background-color: white" rounded color="red" icon>
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-list-item-avatar>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <div style="height:100px" class="text-center" v-else>
      There Is No Work Experience Credentials Yet
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "WorksExperience",
    props: {
      controlleable: {
        type: Boolean,
        default: true
      },
    },
    computed: mapGetters(['userWorksExperience']),
    methods: {
      editExperience(workExperience) {
        this.$nuxt.$emit('openDialog', {
          componentName: 'appEmpCredential',
          details: workExperience,
        })
      },
      showDeleteDialog($work) {
        this.$nuxt.$emit('showDeleteDialog', {
          title: 'Delete Work Experience',
          body: 'Are you sure to delete this item !',
          fn: this.deleteWork,
          args: $work
        })
      },
      async deleteWork($work) {
        await this.$store.dispatch('deleteFromProfile', {
          details: {
            works_experience: [
              $work
            ]
          }
        })

      }
    },
  }
</script>

<style scoped>

</style>
