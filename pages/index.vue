<template>
  <v-row>
    <v-col md="7">
      <v-card
        flat
      >
        <v-card-title class="headline blue-grey--text">
          Search for your next job<br>
          Find the right fit.
        </v-card-title>

        <v-card-text>
          <v-row width="80%" class="d-flex justify-start">
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              label="Location"
              placeholder="Start typing to Search"
              prepend-icon="mdi-map-marker"
              return-object
              menu-props="false"
              color="purple lighten-5"
            ></v-autocomplete>

            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              label="Job title, keywords, or company"
              placeholder="Start typing to Search"
              prepend-icon="mdi-magnify"
              return-object
            ></v-autocomplete>
            <div class="d-flex align-center">
              <v-btn rounded outlined color="purple">Search</v-btn>
            </div>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-expand-transition>
          <v-list
            v-if="model"
            class="red lighten-3"
          >
            <v-list-item
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="field.value"></v-list-item-title>
                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col md="5">
      <v-img src=""></v-img>
    </v-col>
    <v-row>
<!--      <v-timeline-->
<!--        align-top-->
<!--        :dense="$vuetify.breakpoint.smAndDown"-->
<!--      >-->
<!--        <v-timeline-item-->
<!--          v-for="(item, i) in timelineItems"-->
<!--          :key="i"-->
<!--          :color="item.color"-->
<!--          :icon="item.icon"-->
<!--          fill-dot-->
<!--        >-->
<!--          <v-card-->
<!--            :color="item.color"-->
<!--            dark-->
<!--          >-->
<!--            <v-card-title class="title">-->
<!--              Lorem Ipsum Dolor-->
<!--            </v-card-title>-->
<!--            <v-card-text class="white text&#45;&#45;primary">-->
<!--              <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod-->
<!--                convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an-->
<!--                salutandi sententiae.</p>-->
<!--              <v-btn-->
<!--                :color="item.color"-->
<!--                class="mx-0"-->
<!--                outlined-->
<!--              >-->
<!--                Button-->
<!--              </v-btn>-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-timeline-item>-->
<!--      </v-timeline>-->
    </v-row>
  </v-row>

</template>

<script>
  export default {
    middleware: ['should-not-company'],
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      timelineItems: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star',
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-book-variant',
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-airballoon',
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
        },
      ],
    }),

    computed: {
      fields() {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items() {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, {Description})
        })
      },
    },

    watch: {
      search(val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const {count, entries} = res
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
  }
</script>
