<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      fixed
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Job Hunter</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


          <nuxt-link to="/login">
            Sign In
          </nuxt-link>


      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
          >
            <v-list-item-title>Option ss</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                accountDropdownIsOpen: false,
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
