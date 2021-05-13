<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown"
            :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
            v-model="dialog" width="700px"
            @click:outside="closeDialog"
  >
    <v-card flat>
      <v-overlay absolute :value="requestUnderProcess">
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>
      <v-card-title class="pa-2 pb-0">
        <v-spacer/>
        <v-btn text color="red" icon outlined small @click="closeDialog">x</v-btn>
      </v-card-title>
      <v-card-text class="pa-3 pt-0">

        <component :details="details"
                   :is="componentName"
                   @cancel="closeDialog"
        />

      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import LocCredential from "~/components/profile/LocCredential";
import EduCredential from "~/components/profile/EduCredential";
import EmpCredential from "~/components/profile/EmpCredential";
import AddJobPreference from "~/components/profile/AddJobPreference";
import createWorkHours from '~/components/interview/createWorkHours';

export default {
  name: "AddOrUpdateDialog",
  components:{
    appLocCredential: LocCredential,
    appEduCredential: EduCredential,
    appEmpCredential: EmpCredential,
    appAddJobPreference: AddJobPreference,
    appCreateWorkHours: createWorkHours,
  },
  data() {
    return {
      componentName: '',
      details: {},
      dialog:false,
      requestUnderProcess:false
    }
  },
  methods: {
    closeDialog() {
      this.componentName = ''
      this.details = null
    },
    renderDialog(content)
    {
      this.componentName = content.componentName
      this.details = !!content.details?content.details:null
      this.dialog = true
    }
  },
  watch:{
    componentName(newVal,oldVal)
    {
      this.dialog = !!newVal
    }
  },
  created() {
    this.$nuxt.$on('openDialog',this.renderDialog)
  }

}
</script>

<style scoped>

</style>
