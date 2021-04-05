<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-row class="d-flex justify-center">
      <v-col cols="10" md="7">
        <v-card flat>
          <div style="font-family: Chango" class="indigo text-center white--text py-3 headline">
            Login
          </div>
          <v-card-text class="px-8 px-md-12">
            <v-form>
              <VTextFieldWithValidation
                rules="required|email"
                v-model="form.username"
                label="E-mail"
              />
              <VTextFieldWithValidation
                rules="required"
                type="password"
                label="Password"
                vid="password"
                v-model="form.password"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pa-8">
            <nuxt-link style="text-decoration: none"
                       class="app-link"
                       :to="{name:'email_reset_password'}"
            >
              Forget My Password
            </nuxt-link>

            <v-spacer/>
            <!--        <v-btn @click="submit(validate)">Validate</v-btn>-->
            <v-btn color="indigo" outlined
                   :loading="isLoading"
                   :disabled="invalid || !validated"
                   @click="passes(loginPassport)"
            >
              LogIn
            </v-btn>

          </v-card-actions>

          <v-card-actions class="px-8">
            <div class="teal--text">
              If Dont Have An Account
              <v-btn>
                <nuxt-link style="text-decoration: none"
                           class="app-link"
                           to="/auth/register_jobseeker"
                >SignUp As JobSeeker
                </nuxt-link>
              </v-btn>
              <v-btn>
                <nuxt-link style="text-decoration: none"
                           class="app-link"
                           to="/auth/register_company"
                >SignUp As Company
                </nuxt-link>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </ValidationObserver>
</template>

<script>/* eslint-disable */
import {ValidationObserver, ValidationProvider} from "vee-validate";
import VTextFieldWithValidation from '~/components/inputs/VTextFieldWithValidation';
import VSelectWithValidation from '~/components/inputs/VSelectWithValidation';

export default {
  middleware: ['guest'],
  layout: 'default',
  auth: 'guest',
  data() {
    return {
      isLoading: false,
      user: {},
      isLogin: false,
      isSignUp: true,
      password: 'Password',
      form: {
        username: '',
        password: '',
      },
      error: null,
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation
  },
  methods: {
    async loginPassport() {
      this.isLoading = true
      this.error = null

      await this.$auth
        .loginWith('laravelPassportPassword', {data: this.form})
        .then((response) => {
          // this.$store.commit('SET_USER')
          this.isLoading = false
          this.$toast.success('Successfully authenticated')

          this.$axios.defaults.headers.common["Authorization"] = this.$auth.strategy.token.get()
          this.$axios.$get('backend/api/user').then((res) => {
            this.$store.commit('setUserData', res);

            if(this.$store.getters.getUserRole==='company'){
              this.$router.push('/company')
            }
            if(this.$store.getters.getUserRole==='jobseeker'){
              this.$router.push('/')
            }
          })
          .catch((error)=>{
            this.$toast.error('Error while authenticating')
          })
        })
        .catch((e) => {
          this.error = 'Incorrect email or password.'
          this.isLoading = false
        })
    },
  },
}
</script>

<style>
</style>
