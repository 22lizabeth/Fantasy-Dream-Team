import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'

Vue.use(VModal)

Vue.config.productionTip = false

import charactersData from './character-data.js'

let data = {
  characters: charactersData,
  team: [],
  fightTeam: [],
  enemyTeam: [],
  fightLog: "",
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
