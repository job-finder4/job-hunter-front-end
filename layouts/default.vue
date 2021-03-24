<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="drawer" v-model="drawer" fixed app light
    >
      <v-list dense>
        <v-list-item nuxt to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item nuxt to="/inspire">
          <v-list-item-action>
            <v-icon>mdi-airballoon</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inspire</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      color="blue-grey lighten-5" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

      <v-toolbar-title>

        <v-btn exact-active-class="b" active-class="no-active" link text to="/">
          Job Hunter
        </v-btn>

      </v-toolbar-title>

      <v-spacer/>

      <v-btn
        text
        to="/login"
      >
        Sign In
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            color="blue-grey"
            class="ma-2 white--text"
            fab
            v-bind="attrs"
            text
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list v-if="!this.$auth.loggedIn">
          <v-list-item>
            <v-list-item-title>
              You Are loggedOf, No Options
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list  v-if="this.$auth.loggedIn">
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>
               Sign Out
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
          >
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex class="light">
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <PageFooter/>
  </v-app>
</template>

<script>
    export default {
        middleware: ['check-auth'],
        data() {
            return {
                drawer: false,
                error: '',
                items: [
                    {title: 'Profile', to: '/profile'},
                ],
            }
        },
        methods: {
            async logout() {
                this.error = null

                await this.$auth
                    .logout('laravelPassportPassword')
                    .then(() => this.$router.push('/'))
                    .catch((e) => (this.error = e.response.data))
            },
        },
    }
</script>

<style>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
.b{
border: 10px red;
}
</style>
