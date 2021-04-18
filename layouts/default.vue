<template>
  <v-app id="inspire" class="light-blue lighten-4">
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
        <v-list-item nuxt to="/jobs">
          <v-list-item-action>
            <v-icon>mdi-airballoon</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Jobs</v-list-item-title>
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
        to="/"
      >
        Home
      </v-btn>

      <v-btn disabled v-if="this.$store.getters.isAuthenticated" text>
        <!--        {{user.data.attributes.name}}-->
      </v-btn>

      <v-btn
        text
        to="/login"
        v-if="!this.$auth.loggedIn"
      >
        Sign In
      </v-btn>

<!--      <notifications>-->
<!--        <template v-slot:activator="{ on, attrs }">-->
<!--          <v-btn @click="on" :attrs="attrs">-->
<!--            <v-icon>mdi-bell</v-icon>-->
<!--            Notifications-->
<!--          </v-btn>-->
<!--        </template>-->
<!--      </notifications>-->


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
        <v-list v-if="this.$auth.loggedIn">
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>
              Sign Out
            </v-list-item-title>
          </v-list-item>
          <template v-for="(item, index) in items">
            <v-list-item
              :key="item.id"
              :to="item.to"
              v-if="item.active"
            >
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>

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
    middleware: [],
    data() {
      return {
        drawer: false,
        error: '',
        items: [
          {
            title: 'Profile',
            to: '/profile',
            'active': true
          },
          {
            title: 'My Applications',
            to: '/applied-jobs',
            'active': this.$store.getters.isAuthenticated && this.$store.getters.getUserRole === 'jobSeeker'
          },
          {
            title: 'posted-jobs',
            to: '/admin/posted-jobs',
            'active': this.$store.getters.isAuthenticated && this.$store.getters.getUserRole === 'admin'
          },
        ],
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      }
    },
    methods: {
      async logout() {
        this.error = null

        await this.$auth.logout('laravelPassportPassword')
          .then(() => {
            this.$store.dispatch('logout')
            this.$router.push('/')
            this.$toast.success('Successfully LoggedOut')
          })
          .catch((e) => (this.$toast.error('Error while authenticating')))
      },
    },
  }
</script>

<style>
  .v-btn--active.no-active::before {
    opacity: 0 !important;
  }

  .b {
    border: 10px red;
  }
</style>
