<template>
    <v-footer
      padless
    >
      <v-card
        flat
        tile
        class="blue-grey lighten-4 black--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 "
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-row>
          <v-col>
            For JobSeeker
            <v-list>
              <v-list-item >
                <v-list-item-title>

                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col>
            For Employer
            <v-list>
              <v-list-item to="/pricing">
                <v-list-item-title>
                    pricing
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/pricing">
                <v-list-item-title>
                  pricing
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Job Hunter</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>
<script>
    export default {
        data: () => ({
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }),
    }
</script>
