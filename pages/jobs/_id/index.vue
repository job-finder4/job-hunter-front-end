<template>
  <v-card
    class="mx-auto"
    v-if="loadedJobad!=null"
  >
    <v-list-item>
      <v-list-item-title>
        <p class="blue--text headline bold--text">
          {{loadedJobad.data.attributes.title}}
        </p>
      </v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col class="ml-2" md="2">
          Job Description
        </v-col>
        <v-col md="6">
          <v-card-subtitle class="pb-0">
            {{loadedJobad.data.attributes.description}}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-2" md="2">
          Job Details
        </v-col>
        <v-col md="6">
          <v-row v-for="(attVal, attTitle,index) in loadedJobad.data.attributes"
                 :class="{'grey lighten-4':index%2===0}">
            <v-col md="3">
              {{attTitle}}
            </v-col>
            <v-col>
              {{attVal}}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <MainApply :dialog="dialog"/>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Save
      </v-btn>
      <v-btn color="orange" text>
        Apply
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import MainApply from "~/components/apply/MainApply";

    export default {
        name: "index",
        components:{
            MainApply
        },
        data() {
            return {
                loadedJobad: null,
                dialog:true
            }
        },
        methods: {},
        // asyncData(context) {
        //     console.log('ddddddddddd')
        //     return context.app.$axios
        //         .$get('backend/api/jobads/' + context.params.id)
        //         .then(data => {
        //             return {
        //                 loadedJobad: {...data, id: context.params.id}
        //             };
        //             console.log(data)
        //         })
        //         .catch(e => context.error());
        // },
        async fetch() {
            this.$axios.$get('backend/api/jobads/' + this.$route.params.id)
                .then(data => {
                    this.loadedJobad=data
                })
        }

    }
</script>

<style scoped>
</style>
