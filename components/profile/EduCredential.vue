<template>
  <v-card flat>
    <v-card-title class="py-0">Education Credentials</v-card-title>
    <v-divider class="mb-6"></v-divider>

    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="form">

        <v-text-field name="institution" label="institution/University" type="string"
                      v-model="edu.institution" :rules="[required]"
        />

        <v-text-field name="study field" label="Study Field" type="string"
                      v-model="edu.study_field"
        />


        <v-text-field name="degree" label="Degree Type (B.A. , M.S. , ph.D.)" type="string"
                      v-model="edu.degree" :rules="[required]"
        />

        <v-select label="Graduation Year" :items="years"
                  v-model=edu.graduation_year :rules="[required]"
        />

        <v-divider class="mt-12 mt-md-6 mb-4"></v-divider>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn :disabled="requestUnderProcessing" color="success" class="mx-1" type="submit">Save</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>


export default {
  name: "EduCredential",
  props: {
    details: {
      type: Object,
      default: function () {
        return Object.freeze({
          study_field: '',
          institution: '',
          degree: '',
          graduation_year: '',
        })
      }
    },
  },
  data() {
    const defaultEdu = this.details == null ?
      Object.freeze({
        study_field: '',
        institution: '',
        degree: '',
        graduation_year: '',
      })
      : this.details

    return {
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      edu: Object.assign({}, defaultEdu),
      defaultEdu,
      requestUnderProcessing: false
    }
  },
  methods: {
    required(value) {
      return !!value || 'this field is required'
    },
    submitForm() {
      if (!this.$refs.form.validate()) return
      this.requestUnderProcessing = true

      let action = (this.edu.hasOwnProperty('id')) ? 'updateProfile' : 'addDetails'

      this.$store.dispatch(action, {
        details: {
          educations: [this.edu]
        }
      }).finally(() => {
        this.requestUnderProcessing = false
        this.cancel()
      })
    },
    cancel() {
      this.edu = Object.assign({}, this.defaultEdu)
      this.$refs.form.reset()
      this.$emit('cancel')
    }
  },
}
</script>

<style scoped>

</style>
