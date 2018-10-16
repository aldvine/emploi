import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import counter from './modules/Counter'

// fonctionne avec le composant vuex voir sur internt la doc
export default new Vuex.Store({
  modules: {
    counter: counter
  }
  
})