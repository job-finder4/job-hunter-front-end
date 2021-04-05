<template>
  <v-card
    class="mx-auto"
    color="blue-grey lighten-5"
    max-width="400px"
    max-height="400px"
  >
    <v-row justify="end">
      <v-menu
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account-cog-outline </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-row>
        <v-col md="4">
          <v-avatar size="120">
            <img
              alt="user"
              src="https://philadelphiapsychology.org/wp-content/uploads/2018/07/male-profile-picture.png"
            >
          </v-avatar>
        </v-col>
        <v-col md="8">
          <v-card-title class="headline">
            <v-list-item to="/user/profile">
              {{application.data.attributes.user.data.attributes.name}}
            </v-list-item>
          </v-card-title>

          <v-card-text class="text-body-1">
          <p><v-icon>mdi-cake-variant </v-icon>12,april,1983</p>
          <p> <v-icon>mdi-email</v-icon>{{application.data.attributes.user.data.attributes.email}}</p>
             <p><v-icon>mdi-phone</v-icon>0931869085</p>
          <p><v-icon>mdi-map-marker</v-icon>Latakia</p>
            <strong>
              <v-icon>mdi-file-account</v-icon>Cv</strong>
            <v-btn x-small outlined color="blue-grey">
              {{application.data.attributes.cv.data.attributes.title}}
              <a target="_blank"
                 :href="'backend'+application.data.attributes.cv.data.attributes.download_link">
                <v-icon>mdi-download</v-icon>
              </a>
            </v-btn>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-col>
      </v-row>



<!--    <v-card-title>-->
<!--      <v-list-item to="/profile/user">-->
<!--        <v-icon-->
<!--          large-->
<!--          left-->
<!--        >-->
<!--          mdi-twitter-->
<!--        </v-icon>-->
<!--        <span class="title font-weight-bold">-->
<!--            {{application.data.attributes.user.data.attributes.name}}-->
<!--          </span>-->
<!--      </v-list-item>-->
<!--    </v-card-title>-->
<!--    <v-card-text class="font-weight-bold">-->

<!--      user email-->
<!--      <v-list-item>-->
<!--        {{application.data.attributes.user.data.email}}-->
<!--      </v-list-item>-->

<!--      <v-row>-->
<!--        Uploaded Cv-->
<!--        <v-spacer/>-->
<!--        <v-btn text exact-active-class="no-active">-->
<!--          {{application.data.attributes.cv.data.attributes.title}}-->
<!--          <a target="_blank"-->
<!--             :href="'backend'+application.data.attributes.cv.data.attributes.download_link">-->
<!--            <v-icon>mdi-download</v-icon>-->
<!--          </a>-->
<!--        </v-btn>-->
<!--      </v-row>-->


<!--    </v-card-text>-->
  </v-card>
</template>

<script>
  export default {
    name: "SingleApplication",
    props: {
      application: {
        type: Object,
        required: true
      },
      data() {
        return {
          items: [
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
          ],
        }
      },
    },
  }
</script>

<style scoped>
  .v-btn--active.no-active::before {
    opacity: 0 !important;
  }
</style>
