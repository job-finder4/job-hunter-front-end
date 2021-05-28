<template>
  <v-card>
    <v-row justify="center">
      <v-btn icon @click="downloadCv">
        <v-icon>mdi-download</v-icon>
        Download
      </v-btn>
    </v-row>
    <v-row>
      <v-col md="6">
        <app-cv-header :personalInfo="cv_data.personalInfo"/>
        <v-btn right color="primary" text @click="isAddPersonalInfo=true">Add Or Edit Personal Info</v-btn>
        <app-add-personal-info v-if="isAddPersonalInfo" @personalInfoAdded="addPersonalInfo"
                               @cancel="isAddPersonalInfo=false"/>
        <v-divider/>
        <v-card-title class="py-0">
          <v-icon>mdi-school</v-icon>
          Education Credentials
        </v-card-title>
        <v-btn color="primary" text @click="isAddEdu=true">Add edu</v-btn>
        <app-cv-education class="py-0" v-for="(edu,index) in cv_data.edu" :education="edu"/>
        <app-add-edu-credentials v-if="isAddEdu" @eduAdded="addEdu" @cancel="isAddEdu=false"/>
        <v-divider/>

        <v-card-title class="py-0">
          <v-icon>mdi-briefcase</v-icon>
          Employment Credentials
        </v-card-title>
        <v-btn color="primary" text @click="isAddWorkExp=true">Add Work Exp</v-btn>
        <app-cv-experience v-for="(work,index) in cv_data.emp" :work-exp="work"/>

        <app-add-work-experience-credentials v-if="isAddWorkExp" @workExpAdded="addWorkExp"
                                             @cancel="isAddWorkExp=false"/>
        <v-divider/>


        <app-skill-knows-about @skillsAdded="addSkills" :is_cv_page="controllable" :controlleable="controllable"/>
        <app-known-languages @languagesAdded="addLanguages" :is_cv_page="controllable"
                             :controlleable="controllable"></app-known-languages>
      </v-col>
      <v-col md="6">
        <iframe v-if="preview&!isLoading" :src="pdfSource" style="width: 100%;height: 100%;border: none;"></iframe>
      </v-col>
    </v-row>


  </v-card>
</template>

<script>
  import CvHeader from "~/components/Cv/CvHeader";
  import CvExperience from "~/components/Cv/CvExperience";
  import CvEducation from "~/components/Cv/CvEducation";
  import AddEduCredentials from "~/components/Cv/AddEduCredentials";
  import AddWorkExperienceCredentials from "~/components/Cv/AddWorkExperienceCredentials";
  import SkillKnowsAbout from "~/components/profile/SkillKnowsAbout";
  import AddPersonalInfo from "~/components/Cv/AddPersonalInfo";
  import KnownLanguages from "~/components/profile/KnownLanguages";

  export default {
    name: "Paper",
    components: {
      AppSkillKnowsAbout: SkillKnowsAbout,
      AddEduCredentials,
      AppCvHeader: CvHeader,
      AppCvExperience: CvExperience,
      AppCvEducation: CvEducation,
      AppAddEduCredentials: AddEduCredentials,
      AppAddWorkExperienceCredentials: AddWorkExperienceCredentials,
      AppAddPersonalInfo: AddPersonalInfo,
      AppKnownLanguages: KnownLanguages
    },
    computed: {
      cv_data() {
        return this.$store.getters.getCvDetails
      },
      preview_now() {
        return this.$store.getters.getPreviewCvVariable
      }
    },
    watch: {
      preview_now: function (newPage, oldPage) {
        this.previewPdf()
      },
    },
    data() {
      return {
        preview: false,
        controllable: true,
        pdfSource: '',
        isAddEdu: false,
        isAddWorkExp: false,
        isAddPersonalInfo: false,
        isLoading: false,
        showAddWorkExp: true
      }
    },
    methods: {
      addEdu(eduInfo) {
        this.cv_data.edu.push(eduInfo.edu)
        this.isAddEdu = false
        this.previewPdf()
      },
      addPersonalInfo(personalInfo) {
        this.cv_data.personalInfo = personalInfo.personalInfo
        this.isAddPersonalInfo = false
        this.previewPdf()
      },
      addWorkExp(workInfo) {
        this.$store.commit('ADD_CV_WORK_EXP', workInfo.emp)
        this.isAddWorkExp = false
        this.previewPdf()
      },
      addSkills(skills) {
        this.cv_data.skills = skills.skills
        this.$store.commit('SET_CV_SKILLS', skills.skills)
        this.previewPdf()
      },
      addLanguages(languages) {
        this.cv_data.languages = languages.languages
        this.$store.commit('SET_CV_LANGUAGES', languages.languages)
        this.previewPdf()
      },
      previewPdf() {
        this.isLoading = true
        this.$store.commit('SET_PREVIEW', true)

        this.$axios
          .post("api/pdf", this.cv_data)
          .then(data => {
            this.pdfSource = 'data:application/pdf;base64,' + data.data
            this.preview = true
            this.isLoading = false
          })
          .catch(err => {
            console.log(err)
            this.isLoading = false
          })
        this.$store.commit('SET_PREVIEW', false)
      },
      downloadCv() {
        this.$axios
          .post("api/pdf", this.cv_data)
          .then(data => {
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created() {
      this.previewPdf()
    },
    async fetch() {
      let {data} = await this.$axios.get('backend/api/all-skills')
      this.$store.commit('setAllSkills', data);
      await this.$store.dispatch('retrieveProfile', this.$store.getters.getUser.data.id)
    }
  }
</script>
