<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-row class="d-flex justify-center">
      <v-col cols="10" md="7">
        <v-card flat>
          <v-card-text class="px-8">
            <v-form>
              <VTextFieldWithValidation
                outlined
                label="name"
                v-model="form.name"
                :counter="50"
                rules="required|max:50|name|name2"
              />
              <VTextFieldWithValidation
                outlined
                label="E-mail"
                v-model="form.email"
                rules="required|email"
              />
              <VTextFieldWithValidation
                outlined
                type="password"
                label="Password"
                v-model="form.password"
                counter
                rules="required"
              />
              <VTextFieldWithValidation
                outlined
                type="password"
                label="Confirm Password"
                v-model="form.confirmation"
                name="Password"
                :rules="'required|confirmed:'+form.password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-list-item>
              already have an account
              <v-btn
                to="/login"
                class="text-decoration-underline"
                text
                color="blue"
              >
                Sign in
              </v-btn>
            </v-list-item>

            <!--            <v-btn @click="clear">-->
            <!--              Clear-->
            <!--            </v-btn>-->

            <v-spacer/>

            <v-btn color="indigo" outlined
                   @click="passes(register)"
                   :disabled="invalid || !validated"
                   :loading="isLoading"
            >
              Continue
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </ValidationObserver>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";
import VTextFieldWithValidation from '~/components/inputs/VTextFieldWithValidation';

export default {
  middleware: ['guest'],
  layout: 'default',
  auth: 'guest',
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      error: null,
      isLoading: false
    }
  },
  methods: {
    async register() {
      this.error = null

      await this.$axios
        .$post('/backend/api/register/jobseeker', {
          ...this.form,
          password_confirmation: this.form.password,
        })
        .then(() => {
          this.isLoading=false
          this.$toast.success('Your account was created successfully!')
          this.$router.push('/login')
        })
        .catch((e) => {this.isLoading=false
          this.$toast.error(e)
        })
    },
  },
}
</script>
