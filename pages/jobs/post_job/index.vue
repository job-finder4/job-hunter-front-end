<template>
  <v-row>
    <v-col md="6">
      <v-card dark>
        <v-card-title class="daniel-title white--text headline">
          Hire. Jobot uses AI and experienced recruiters to build your team.<br>
          Our Jobot Pros are experienced recruiters powered with our proprietary AI technology.
        </v-card-title>
      </v-card>
      'min_salary' => 1000, 'max_salary' => 1500,
      'location' => 'london',
      'salary' => ['min_salary' => 1000, 'max_salary' => 1500],
      'expiration_date' => now()->addMonth(),
      'skills' => Skill::take(2)->get(),
    </v-col>

    <v-col md="6">
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
        <v-card color="blue-grey lighten-5"
        >
          <v-card-title>
            A bit More Information
          </v-card-title>

          <v-card-text>
            <v-textarea placeholder="description" v-model="description" outlined />
            <VTextFieldWithValidation
              outlined
              type="text"
              label="job title"
              v-model="job_title"
              name="job_title"
              rules='required'
            />
            <v-select
              placeholder="JOB_time"
              :items="job_time"
              v-model="selectedJobTime"
            />
            <v-select
              placeholder="JOB_type"
              :items="job_type"
              v-model="selectedJobType"
            />
            <v-btn color="cyan" outlined
            >
              Get Started
            </v-btn>
          </v-card-text>
        </v-card>
      </ValidationObserver>
    </v-col>
  </v-row>

</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";
import VTextFieldWithValidation from '~/components/inputs/VTextFieldWithValidation';
import VSelectWithValidation from "~/components/inputs/VSelectWithValidation";

export default {
  name: "index",
  components: {
    VSelectWithValidation,
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
  },
  data() {
    return {
      phone: '',
      job_title: '',
      email: '',
      name: '',
      description: '',
      selectedJobTime:'',
      selectedJobType:'',
      job_time:[
        'FULL_TIME','PART_TIME'
      ],
      job_type:[
        'REMOTE','ON_SITE'
      ],

    }
  },
}
</script>

<style scoped>
.daniel-title {
  font-family: Nunito;
}
</style>
