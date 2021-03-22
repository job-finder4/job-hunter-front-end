<!--<template>-->
<!--  <v-card flat>-->
<!--    <v-card-title>Employment Credentials</v-card-title>-->
<!--    <v-divider class="mb-6"></v-divider>-->

<!--    <v-card-text>-->
<!--      <v-form @submit.prevent="submitForm" ref="form">-->

<!--        <v-text-field name="position" label="Position"-->
<!--                      v-model="emp.position" :rules="[required]"/>-->

<!--        <v-select label="Start Year" :items="years"-->
<!--                  v-model="emp.startYear" :rules="[required]"/>-->

<!--        <v-select label="End Year" :items="years"-->
<!--                  v-model="emp.endYear" :rules="[validDate]"/>-->

<!--        <v-divider class="mt-12 mt-md-6 mb-4"/>-->

<!--        <div class="d-flex">-->
<!--          <v-spacer/>-->
<!--          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>-->
<!--          <v-btn color="success" class="mx-1" type="submit">Save</v-btn>-->
<!--        </div>-->

<!--      </v-form>-->
<!--    </v-card-text>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script>/* eslint-disable */-->
<!--import {apiClient} from "../../services/apiService";-->

<!--export default {-->
<!--    name: "EmpCredential",-->
<!--    data() {-->
<!--        const defaultEmp = Object.freeze({-->
<!--            position: '',-->
<!--            startYear: '',-->
<!--            endYear: '',-->
<!--        })-->
<!--        return {-->
<!--            years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],-->
<!--            emp: Object.assign({}, defaultEmp),-->
<!--            defaultEmp-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        required(value) {-->
<!--            return !!value || 'this field is required'-->
<!--        },-->
<!--        validDate(value) {-->
<!--            if (typeof value === "undefined") return true-->
<!--            return (value > this.emp.startYear) || 'date is invalid'-->
<!--        },-->
<!--        submitForm() {-->
<!--            if(!this.$refs.form.validate())return-->
<!--            apiClient.post('credentials', {-->
<!--                type: 'emp',-->
<!--                body: this.emp-->
<!--            })-->
<!--                .then(response => {-->
<!--                    this.$store.commit('SET_NOTIFICATION', {-->
<!--                        'message': 'created successfully',-->
<!--                        'type': 'success'-->
<!--                    })-->
<!--                    this.cancel()-->
<!--                })-->
<!--                .catch(error => {-->
<!--                    this.$store.commit('SET_NOTIFICATION', {-->
<!--                        'message': error.response.data,-->
<!--                        'type': 'error'-->
<!--                    })-->
<!--                })-->
<!--        },-->
<!--        cancel() {-->
<!--            this.emp = this.defaultEmp-->
<!--            this.$refs.form.reset()-->
<!--            this.$emit('cancel')-->
<!--        }-->
<!--    }-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
