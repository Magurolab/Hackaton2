import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'
import router from '@/router'
import { auth, db } from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'My Awesome App',
    user: null,
    error: null,
    loading: false,
    database: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        const uid = auth.currentUser.uid
        db.ref('Users/' + uid).set({
          university: payload.university
        })
        commit('setLoading', false)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        commit('setError', null)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    userEdit ({commit}, payload) {
      commit('setLoading', true)
      const uid = auth.currentUser.uid
      if (payload.email !== '') {
        firebase.auth().currentUser.updateEmail(payload.email)
      }
      if (payload.description !== '') {
        db.ref('Users/' + uid).set({
          description: payload.description
        })
      }
      if (payload.university !== '') {
        db.ref('Users/' + uid).set({
          university: payload.university
        })
      }
      commit('setLoading', false)
      router.push('/home')
    },
    addItem ({commit}, payload) {
      commit('setLoading', true)
      const uid = auth.currentUser.uid
      var postKey = db.ref('Posts/').push().key
      var updates = {};
      var postData = {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        category: payload.category,
        user: uid
      }
      updates['/Posts/' + postKey] = postData
      db.ref().update(updates)
      router.push('/home')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },

    getEmail () {
      return auth.currentUser.email
    },
    getUserUniversity (state) {
      state.loading = true
      const uid = auth.currentUser.uid
      const ref = db.ref('Users/' + uid + '/university')
      // var university = null
      ref.on('value', function (snapshot) {
        state.database = (snapshot.val())
        // console.log(store.state.database)
        // console.log(university)
      })
      state.loading = false
      return state.database
    }
  }
})
