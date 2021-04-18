<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown" @click:outside="cancel"
    :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
    v-model="showingDialog" width="500px">
    <v-card flat>
      <v-card-title class="red white--text">
        {{ title }}
      </v-card-title>
      <v-card-text v-html="body" class="py-4 black--text"/>
      <v-card-actions>
        <v-spacer/>
        <v-btn outlined color="red" :disabled="isDisabled" @click="action">delete</v-btn>
        <v-btn outlined @click="cancel" color="indigo">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      isDisabled: false,
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
      this.isDisabled = true
      this.fn(this.args)
        .then(() => {
          this.isDisabled = false
          this.cancel()
        })
        .catch(() => {
          this.isDisabled = false
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
