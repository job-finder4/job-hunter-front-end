<template>
  <div>
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown" @click:outside="cancel"
      :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
      v-model="showingDialog" width="500px">
      <v-card flat>
        <v-overlay absolute :value="requestUnderProcess">
          <v-progress-circular indeterminate size="64"/>
        </v-overlay>
        <v-card-title class="red white--text">
          {{ title }}
        </v-card-title>
        <v-card-text v-html="body" class="py-4 black--text"/>
        <v-card-actions>
          <v-spacer/>
          <v-btn outlined color="red" :disabled="requestUnderProcess" @click="action">delete</v-btn>
          <v-btn outlined @click="cancel" color="indigo">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  export default {
    name: "DeleteDialog",
    data() {
      return {
        showingDialog: false,
        title: '',
        body: '',
        fn: null,
        attrs: null,
        requestUnderProcess: false,
      }
    },
    methods: {
      show(payload) {
        this.showingDialog = true
        this.title = payload.title
        this.body = payload.body
        this.fn = payload.fn
        this.args = payload.args
      },
      cancel() {
        this.showingDialog = false
      },
      action() {
        this.requestUnderProcess = true

        this.fn(this.args)
          .then(() => {
            this.requestUnderProcess = false
            this.cancel()
          })
          .catch(() => {
            this.requestUnderProcess = false
          })
      }
    },
    created() {
      this.$nuxt.$on('showDeleteDialog', this.show);
    },
  }
</script>

<style scoped>

</style>
