<template>
  <div>

    <app-paper/>
    <!--    <v-card flat>-->
    <!--      <v-container>-->
    <!--        <v-row>-->
    <!--          <v-col sm="12" md="6">-->
    <!--            <label>Language</label>-->
    <!--            &lt;!&ndash;            <v-autocomplete&ndash;&gt;-->
    <!--            &lt;!&ndash;              outlined&ndash;&gt;-->
    <!--            &lt;!&ndash;              :items="availableLanguages"&ndash;&gt;-->
    <!--            &lt;!&ndash;              color="white"&ndash;&gt;-->
    <!--            &lt;!&ndash;              item-text="name"&ndash;&gt;-->
    <!--            &lt;!&ndash;              v-model="cv_data.languages.name"&ndash;&gt;-->
    <!--            &lt;!&ndash;              return-object&ndash;&gt;-->
    <!--            &lt;!&ndash;              dense&ndash;&gt;-->
    <!--            &lt;!&ndash;            >&ndash;&gt;-->
    <!--            &lt;!&ndash;            </v-autocomplete>&ndash;&gt;-->
    <!--            &lt;!&ndash;            <v-radio-group&ndash;&gt;-->
    <!--            &lt;!&ndash;              v-model="cv_data.language.level"&ndash;&gt;-->
    <!--            &lt;!&ndash;              mandatory&ndash;&gt;-->
    <!--            &lt;!&ndash;            >&ndash;&gt;-->
    <!--            &lt;!&ndash;              <v-radio&ndash;&gt;-->
    <!--            &lt;!&ndash;                label="Expert"&ndash;&gt;-->
    <!--            &lt;!&ndash;                value="Expert"&ndash;&gt;-->
    <!--            &lt;!&ndash;              ></v-radio>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <v-radio&ndash;&gt;-->
    <!--            &lt;!&ndash;                label="Basic"&ndash;&gt;-->
    <!--            &lt;!&ndash;                value="Basic"&ndash;&gt;-->
    <!--            &lt;!&ndash;              ></v-radio>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <v-radio&ndash;&gt;-->
    <!--            &lt;!&ndash;                label="Medium"&ndash;&gt;-->
    <!--            &lt;!&ndash;                value="Medium"&ndash;&gt;-->
    <!--            &lt;!&ndash;              ></v-radio>&ndash;&gt;-->
    <!--            &lt;!&ndash;            </v-radio-group>&ndash;&gt;-->

                <label>Category</label>
                <v-autocomplete
                  outlined
                  :items="availableCategories"
                  color="white"
                  item-text="name"
                  :value="searchData.category"
                  v-model="searchData.category"
                  dense
                >
                </v-autocomplete>
    <!--          </v-col>-->

    <!--          <v-col md="6" sm="12">-->
    <!--            <v-expansion-panels>-->
    <!--              <v-expansion-panel>-->
    <!--                <v-expansion-panel-header>-->
    <!--                  Item-->
    <!--                </v-expansion-panel-header>-->
    <!--                <v-expansion-panel-content>-->
    <!--                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et-->
    <!--                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut-->
    <!--                  aliquip ex ea commodo consequat.-->
    <!--                </v-expansion-panel-content>-->
    <!--              </v-expansion-panel>-->
    <!--            </v-expansion-panels>-->
    <!--            <label>Work Schedule</label>-->
    <!--            <v-select-->
    <!--              outlined-->
    <!--              dense-->
    <!--              placeholder="JOB_time"-->
    <!--              :items="jobTimes"-->
    <!--              v-model="searchData.selectedJobTime"-->
    <!--            />-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--        <v-btn color="blue">-->
    <!--          <v-icon>mdi-magnify</v-icon>-->
    <!--          Search-->
    <!--        </v-btn>-->
    <!--      </v-container>-->
    <!--    </v-card>-->
  </div>
</template>

<script>
  import Paper from "~/components/Cv/Paper";

  export default {

    components: {
      AppPaper: Paper
    },
    computed: {
      availableSkills() {
        return this.$store.getters.getAllSkills
      },
      availableCategories() {
        return this.$store.getters.getAllCategories
      },
      availableLanguages() {
        return this.$store.getters.getAllLanguages
      }
    },
    data() {
      return {
        job: null,
        title: 'this is title',
        price_currency: 'US',
        title_color: 'red',
        cv_data: {},
        searchData: {
          category: '',
        },

        jobTimes: [
          'FULL_TIME', 'PART_TIME'
        ],
        jobTypes: [
          'REMOTE', 'ON_SITE'
        ],
      }
    },
    methods: {
      createPDF() {
        window.print()
      },
    },
    fetch() {
      return this.$store.dispatch('getAvailableSkills')
    }
  }
</script>
