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
              <nuxt-link style="text-decoration: none"
                         class="app-link"
                         :to="{name:'register'}"
              >SignUp
              </nuxt-link>
              Now
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
    middleware: ['check-auth', 'guest'],
    layout: 'default',
    auth: 'guest',
    created() {
        console.log(this.$auth.loggedIn)
    },
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
            this.isLoading=true
            this.error = null

            await this.$auth
                .loginWith('laravelPassportPassword', {data: this.form})
                .then(() => {
                    this.$store.commit('SET_USER')
                    this.isLoading=false
                    this.$router.push('/profile')
                })
                .catch((e) => {
                    this.error = 'Incorrect email or password.'
                    this.isLoading=false
                })
        },
    },
}
</script>

<style>

</style>
