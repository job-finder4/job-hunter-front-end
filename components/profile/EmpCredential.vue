<template>
  <v-card flat>
    <v-card-title>Employment Credentials</v-card-title>
    <v-divider class="mb-6"></v-divider>

    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="form">

        <v-text-field name="job title" label="Job Title"
                      v-model="emp.job_title" :rules="[required]"/>

        <v-text-field name="company name" label="Company Name"
                      v-model="emp.company_name" :rules="[required]"/>
        <app-date-picker :date="emp.start_date" @update:date="emp.start_date = $event"/>

        <app-date-picker :date="emp.end_date" @update:date="emp.end_date = $event"/>

        <v-text-field name="industry" label="industry"
                      v-model="emp.industry"/>

        <v-text-field name="job category" label="Job Category"
                      v-model="emp.job_category"/>

        <v-text-field name="job subcategory" label="Job Subcategory"
                      v-model="emp.job_subcategory"/>

        <v-text-field name="job description" label="job_description"
                      v-model="emp.job_description"/>


        <v-divider class="mt-12 mt-md-6 mb-4"/>

        <div class="d-flex">
          <v-spacer/>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn color="success" class="mx-1" type="submit">Save</v-btn>
        </div>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import DatePicker from "~/components/DatePicker";

export default {
  name: "EmpCredential",
  components: {
    appDatePicker: DatePicker
  },
  props: {
    details: {
      type: Object,
      default: null
    },
  },
  data() {
    const defaultEmp = this.details == null ?
      Object.freeze({
        job_title: '',
        company_name: '',
        start_date: null,
        end_date: null,
        industry: '',
        job_category: '',
        job_subcategory: '',
        job_description: ''
      })
      : this.details

    return {
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      emp: Object.assign({}, defaultEmp),
      defaultEmp,
      requestUnderProcessing:false,
    }
  },
  methods: {
    required(value) {
      return !!value || 'this field is required'
    },
    submitForm() {
      if (!this.$refs.form.validate()) return
      this.requestUnderProcessing = true

      let action = (this.emp.hasOwnProperty('id')) ? 'updateProfile' : 'addDetails'

      this.$store.dispatch(action, {
        details: {
          works_experience: [this.emp]
        }
      }).finally(() => {
        this.requestUnderProcessing = false
        this.cancel()
      })
    },
    cancel() {
      this.emp = Object.assign({}, this.defaultEmp)
      this.$refs.form.reset()
      this.$emit('cancel')
    }
  },

}

</script>

<style scoped>

</style>
