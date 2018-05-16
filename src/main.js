import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from './firebase'
import VueFire from 'vuefire'

/* eslint-disable */
Vue.use(Vuetify, {
  theme: {
    primary: "#AD1457",
    secondary: "#e57373",
    accent: "#9c27b0",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
})
Vue.use(VueFire)
Vue.config.productionTip = false

const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
        store.dispatch('loadCards')

      }
    }
  })
  unsubscribe()
})
