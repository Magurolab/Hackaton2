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
    database: null,
    uid: null
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
    // rewritten needed.
    userEdit ({commit}, payload) {
      console.log('hello world!!!!!')
      commit('setLoading', true)
      var newData = {
        description: payload.description,
        university: payload.university
      }
      // var newPostKey = firebase.database().ref().child('Users').push().key
      var updates = {}
      // updates['/Users/' + newPostKey] = newData
      updates['/Users/' + auth.currentUser.uid] = newData
      commit('setLoading', false)

      firebase.database().ref().update(updates).then(() => {
        router.push('/home')
      })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
      router.push('/home')
    },
    addItem ({commit}, payload) {
      commit('setLoading', true)
      const uid = auth.currentUser.uid
      var postKey = db.ref('Posts/').push().key
      var updates = {}
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
