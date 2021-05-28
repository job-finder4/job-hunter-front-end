<template>
  <v-autocomplete
    v-model="model"
    :items="skills"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    item-text="Description"
    item-value="API"
    label="skills"
    placeholder="Start typing to Search"
    prepend-icon="mdi-map-marker"
    return-object
    menu-props="false"
    color="purple lighten-5"
  />
</template>

<script>
  export default {
    middleware:['should-not-company'],
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
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
      skills() {
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
        if (this.skills.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('backend/api/skills')
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

<style scoped>

</style>
