export default {
  state: {
    skills: [],
    languages: [
      { code : 'ab', name : 'Abkhazian' },
      { code : 'aa', name : 'Afar' },
      { code : 'af', name : 'Afrikaans' },
      { code : 'ak', name : 'Akan' },
      { code : 'sq', name : 'Albanian' },
      { code : 'am', name : 'Amharic' },
      { code : 'ar', name : 'Arabic' },
      { code : 'an', name : 'Aragonese' },
      { code : 'hy', name : 'Armenian' },
      { code : 'as', name : 'Assamese' },
      { code : 'av', name : 'Avaric' },
      { code : 'ae', name : 'Avestan' },
      { code : 'ay', name : 'Aymara' },
      { code : 'az', name : 'Azerbaijani' },
      { code : 'bm', name : 'Bambara' },
      { code : 'ba', name : 'Bashkir' },
      { code : 'eu', name : 'Basque' },
      { code : 'be', name : 'Belarusian' },
      { code : 'bn', name : 'Bengali' },
      { code : 'bi', name : 'Bislama' },
      { code : 'bs', name : 'Bosnian' },
      { code : 'br', name : 'Breton' },
      { code : 'bg', name : 'Bulgarian' },
      { code : 'my', name : 'Burmese' },
      { code : 'km', name : 'Central Khmer' },
      { code : 'ch', name : 'Chamorro' },
      { code : 'ce', name : 'Chechen' },
      { code : 'zh', name : 'Chinese' },
      { code : 'cv', name : 'Chuvash' },
      { code : 'kw', name : 'Cornish' },
      { code : 'co', name : 'Corsican' },
      { code : 'cr', name : 'Cree' },
      { code : 'hr', name : 'Croatian' },
      { code : 'cs', name : 'Czech' },
      { code : 'da', name : 'Danish' },
      { code : 'nl', name : 'Dutch, Flemish' },
      { code : 'dz', name : 'Dzongkha' },
      { code : 'en', name : 'English' },
      { code : 'eo', name : 'Esperanto' },
      { code : 'et', name : 'Estonian' },
      { code : 'ee', name : 'Ewe' },
      { code : 'fo', name : 'Faroese' },
      { code : 'fj', name : 'Fijian' },
      { code : 'fi', name : 'Finnish' },
      { code : 'fr', name : 'French' },
      { code : 'ff', name : 'Fulah' },
      { code : 'gl', name : 'Galician' },
      { code : 'lg', name : 'Ganda' },
      { code : 'ka', name : 'Georgian' },
      { code : 'de', name : 'German' },
      { code : 'ki', name : 'Gikuyu, Kikuyu' },
      { code : 'gn', name : 'Guarani' },
      { code : 'gu', name : 'Gujarati' },
      { code : 'ha', name : 'Hausa' },
      { code : 'he', name : 'Hebrew' },
      { code : 'hz', name : 'Herero' },
      { code : 'hi', name : 'Hindi' },
      { code : 'ho', name : 'Hiri Motu' },
      { code : 'hu', name : 'Hungarian' },
      { code : 'is', name : 'Icelandic' },
      { code : 'io', name : 'Ido' },
      { code : 'ig', name : 'Igbo' },
      { code : 'id', name : 'Indonesian' },
      { code : 'ia', name : 'Interlingua' },
      { code : 'ie', name : 'Interlingue' },
      { code : 'iu', name : 'Inuktitut' },
      { code : 'ik', name : 'Inupiaq' },
      { code : 'ga', name : 'Irish' },
      { code : 'it', name : 'Italian' },
      { code : 'ja', name : 'Japanese' },
      { code : 'jv', name : 'Javanese' },
      { code : 'kn', name : 'Kannada' },
      { code : 'kr', name : 'Kanuri' },
      { code : 'ks', name : 'Kashmiri' },
      { code : 'kk', name : 'Kazakh' },
      { code : 'rw', name : 'Kinyarwanda' },
      { code : 'kv', name : 'Komi' },
      { code : 'kg', name : 'Kongo' },
      { code : 'ko', name : 'Korean' },
      { code : 'ku', name : 'Kurdish' },
      { code : 'ky', name : 'Kyrgyz' },
      { code : 'lo', name : 'Lao' },
      { code : 'la', name : 'Latin' },
      { code : 'lv', name : 'Latvian' },
      { code : 'ln', name : 'Lingala' },
      { code : 'lt', name : 'Lithuanian' },
      { code : 'lu', name : 'Luba-Katanga' },
      { code : 'mk', name : 'Macedonian' },
      { code : 'mg', name : 'Malagasy' },
      { code : 'ms', name : 'Malay' },
      { code : 'ml', name : 'Malayalam' },
      { code : 'mt', name : 'Maltese' },
      { code : 'gv', name : 'Manx' },
      { code : 'mi', name : 'Maori' },
      { code : 'mr', name : 'Marathi' },
      { code : 'mh', name : 'Marshallese' },
      { code : 'mn', name : 'Mongolian' },
      { code : 'na', name : 'Nauru' },
      { code : 'ng', name : 'Ndonga' },
      { code : 'ne', name : 'Nepali' },
      { code : 'se', name : 'Northern Sami' },
      { code : 'no', name : 'Norwegian' },
      { code : 'nb', name : 'Norwegian Bokmål' },
      { code : 'nn', name : 'Norwegian Nynorsk' },
      { code : 'ii', name : 'Nuosu, Sichuan Yi' },
      { code : 'oj', name : 'Ojibwa' },
      { code : 'or', name : 'Oriya' },
      { code : 'om', name : 'Oromo' },
      { code : 'pi', name : 'Pali' },
      { code : 'fa', name : 'Persian' },
      { code : 'pl', name : 'Polish' },
      { code : 'pt', name : 'Portuguese' },
      { code : 'qu', name : 'Quechua' },
      { code : 'rm', name : 'Romansh' },
      { code : 'rn', name : 'Rundi' },
      { code : 'ru', name : 'Russian' },
      { code : 'sm', name : 'Samoan' },
      { code : 'sg', name : 'Sango' },
      { code : 'sa', name : 'Sanskrit' },
      { code : 'sc', name : 'Sardinian' },
      { code : 'sr', name : 'Serbian' },
      { code : 'sn', name : 'Shona' },
      { code : 'sd', name : 'Sindhi' },
      { code : 'sk', name : 'Slovak' },
      { code : 'sl', name : 'Slovenian' },
      { code : 'so', name : 'Somali' },
      { code : 'st', name : 'Sotho, Southern' },
      { code : 'nr', name : 'South Ndebele' },
      { code : 'su', name : 'Sundanese' },
      { code : 'sw', name : 'Swahili' },
      { code : 'ss', name : 'Swati' },
      { code : 'sv', name : 'Swedish' },
      { code : 'tl', name : 'Tagalog' },
      { code : 'ty', name : 'Tahitian' },
      { code : 'tg', name : 'Tajik' },
      { code : 'ta', name : 'Tamil' },
      { code : 'tt', name : 'Tatar' },
      { code : 'te', name : 'Telugu' },
      { code : 'th', name : 'Thai' },
      { code : 'bo', name : 'Tibetan' },
      { code : 'ti', name : 'Tigrinya' },
      { code : 'ts', name : 'Tsonga' },
      { code : 'tn', name : 'Tswana' },
      { code : 'tr', name : 'Turkish' },
      { code : 'tk', name : 'Turkmen' },
      { code : 'tw', name : 'Twi' },
      { code : 'uk', name : 'Ukrainian' },
      { code : 'ur', name : 'Urdu' },
      { code : 'uz', name : 'Uzbek' },
      { code : 've', name : 'Venda' },
      { code : 'vi', name : 'Vietnamese' },
      { code : 'vo', name : 'Volap_k' },
      { code : 'wa', name : 'Walloon' },
      { code : 'cy', name : 'Welsh' },
      { code : 'fy', name : 'Western Frisian' },
      { code : 'wo', name : 'Wolof' },
      { code : 'xh', name : 'Xhosa' },
      { code : 'yi', name : 'Yiddish' },
      { code : 'yo', name : 'Yoruba' },
      { code : 'za', name : 'Zhuang, Chuang' },
      { code : 'zu', name : 'Zulu' }
    ],
    categories: [
      {"id": 1, "name": "Account Management"}, {"id": 2, "name": "Accounting & Finance"}, {
      "id": 3,
      "name": "Administrative"
    }, {"id": 4, "name": "Advertising & PR"}, {"id": 5, "name": "Animals & Wildlife"}, {
      "id": 6,
      "name": "Art & Creative"
    }, {"id": 7, "name": "Bilingual"}, {"id": 8, "name": "Business Development"}, {
      "id": 9,
      "name": "Call Center"
    }, {"id": 10, "name": "Communications"}, {"id": 11, "name": "Computer & IT"}, {
      "id": 12,
      "name": "Consulting"
    }, {"id": 13, "name": "Customer Service"}, {"id": 14, "name": "Data Entry"}, {
      "id": 15,
      "name": "Editing"
    }, {"id": 16, "name": "Education & Training"}, {"id": 17, "name": "Engineering"}, {
      "id": 18,
      "name": "Entertainment & Media "
    }, {"id": 19, "name": "Environmental & Green"}, {"id": 20, "name": "Event Planning"}, {
      "id": 21,
      "name": "Fashion & Beauty"
    }, {"id": 22, "name": "Food & Beverage"}, {"id": 23, "name": "Government & Politics"}, {
      "id": 24,
      "name": "Graphic Design"
    }, {"id": 25, "name": "HR & Recruiting"}, {"id": 26, "name": "Human Services"}, {
      "id": 27,
      "name": "Insurance"
    }, {"id": 28, "name": "International"}, {"id": 29, "name": "Internet & Ecommerce"}, {
      "id": 30,
      "name": "Legal"
    }, {"id": 31, "name": "Manufacturing"}, {"id": 32, "name": "Marketing"}, {
      "id": 33,
      "name": "Math & Economics"
    }, {"id": 34, "name": "Medical & Health"}, {"id": 35, "name": "Mortgage & Real Estate"}, {
      "id": 36,
      "name": "News & Journalism "
    }, {"id": 37, "name": "Nonprofit & Philanthropy"}, {"id": 38, "name": "Operations"}, {
      "id": 39,
      "name": "Project Management"
    }, {"id": 40, "name": "Research"}, {"id": 41, "name": "Retail"}, {"id": 42, "name": "Sales"}, {
      "id": 43,
      "name": "Science"
    }, {"id": 44, "name": "Software Development"}, {"id": 45, "name": "Sports & Fitness"}, {
      "id": 46,
      "name": "Telemarketing"
    }, {"id": 47, "name": "Transcription"}, {"id": 48, "name": "Translation"}, {
      "id": 49,
      "name": "Travel & Hospitality"
    }, {"id": 50, "name": "Web Design"}, {"id": 51, "name": "Writing"}, {"id": 52, "name": "Youth & Children"}
    ],
    states: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
  },
  getters: {
    getAllSkills(state) {
      return state.skills
    },
    getAllCategories(state) {
      return state.categories
    },
    getAllStates(state){
      return state.states
    },
    getAllLanguages(state){
      return state.languages
    }
  },
  mutations: {
     SET_SKILLS(state, skills) {
      state.skills = skills
    }
  },
  actions: {
    getAvailableSkills({commit}) {
      return new Promise((resolve, reject) => {
        return this.$axios.get('backend/api/skills')
          .then((response) => {
            commit('SET_SKILLS', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
