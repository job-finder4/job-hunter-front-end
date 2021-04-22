<template>
  <v-card flat>
    <v-card-title class="py-0">Location Credentials</v-card-title>
    <v-divider class="mb-6"/>
    <v-form @submit.prevent="submitForm" ref="form">

      <v-card-text>

        <v-text-field name="country" label="country"
                      v-model="loc.country" :rules="[required]"
        />

        <v-text-field name="city" label="city"
                      v-model="loc.city" :rules="[required]"
        />

        <v-divider class="mt-12 mt-md-6 mb-4"></v-divider>
        <div class="d-flex">
          <v-spacer/>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn color="success"
                 class="mx-1"
                 type="submit">
            Save
          </v-btn>
        </div>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>

export default {
  name: "LocCredential",
  props: {
    details: {
      type: Object,
      default: null
    },
  },
  data() {
    const defaultLoc = this.details == null ?
      Object.freeze({
        city: '',
        country: ''
      })
      : this.details

    return {
      loc: Object.assign({}, defaultLoc),
      defaultLoc,
    }
  },
  methods: {
    required(value) {
      return !!value || 'this field is required'
    },
    async submitForm() {
      if (!this.$refs.form.validate()) return
      await this.$store.dispatch('updateProfile', {
        details: {
          location: {
            country: this.loc.country,
            city: this.loc.city,
          },
        }
      })
      this.cancel()
    },
    cancel() {
      this.loc = Object.assign({}, this.defaultLoc)
      this.$refs.form.reset()
      this.$emit('cancel')
    }

  },
}
</script>

<style scoped>

</style>
