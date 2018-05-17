import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'
import router from '@/router'
import { auth, db } from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cards: [],
    appTitle: 'My Awesome App',
    user: null,
    error: null,
    loading: false,
    database: null,
    sentMessage: null,
    receivedMessage: null,
    uid: null,
    date: new Date()
  },
  mutations: {
    setLoadedCards (state, payload) {
      state.cards = payload
      console.log(state.cards)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setSentMessage (state, payload) {
      state.sentMessage = payload
    },
    setReceivedMessage (state, payload) {
      state.receivedMessage = payload
    },
  },
  actions: {
    loadSentMessage ({commit}) {
      const uid = auth.currentUser.uid
      const ref = db.ref('Messages/' + uid + '/sent/')
      ref.once('value', function (snapshot) {
        commit('setSentMessage', snapshot.val())
      })
    },
    loadReceivedMessage ({commit}) {
      const uid = auth.currentUser.uid
      const ref = db.ref('Messages/' + uid + '/received/')
      ref.once('value', function (snapshot) {
        commit('setReceivedMessage', snapshot.val())
      })
    },
    loadCards ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('/Posts/').once('value')
        .then((data) => {
          const tmp = []
          const postObject = data.val()
          for (let key in postObject) {
            tmp.push({
              id: key,
              category: postObject[key].category,
              description: postObject[key].description,
              name: postObject[key].name,
              price: postObject[key].price,
              url: postObject[key].url,
              user: postObject[key].user
            })
          }
          commit('setLoadedCards', tmp)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: payload.email})
        const uid = auth.currentUser.uid
        db.ref('Users/' + uid).set({
          email: payload.email,
          username: payload.username,
          university: payload.university,
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
        commit('setUser', payload)
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
      commit('setUser', payload)
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    // rewritten needed.
    userEdit ({commit}, payload) {
      commit('setLoading', true)
      var newData = {
        username: payload.username,
        description: payload.description,
        university: payload.university
      }
      var updates = {}
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
      var fileName = payload.file.name
      var storageRef = firebase.storage().ref('images/' + fileName)
      var uploadTask = storageRef.put(payload.file)
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
          case firebase.storage.TaskState.SUCCESS:
            console.log('Upload success')
        }
      }, function (error) {
        console.log(error)
      }, function () {
        const uid = auth.currentUser.uid
        var postKey = db.ref('Posts/').push().key
        var updates = {}
        var postData = {
          name: payload.name,
          description: payload.description,
          price: payload.price,
          category: payload.category,
          user: uid,
          url: ''
        }
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          db.ref('Posts/' + postKey + '/url').set(url)
        })
        updates['/Posts/' + postKey] = postData
        db.ref().update(updates)
        // console.log('File available at', downloadURL)
      })
      commit('setLoading', false)
      router.push('/items')
    },
    sendMessage ({commit}, payload) {
      console.log('sendMessage na ja')
      commit('setLoading', true)
      const uid = auth.currentUser.uid
      const currentItem = payload.currentItem
      const itemId = payload.itemId

      const sentKey = db.ref('Messages/' + uid).child('sent').push(
        {
          message: payload.message,
          receiver: currentItem.user,
          postId: itemId,
          date: payload.dateTime
        }
      ).key
      console.log('this key:' + sentKey)
      db.ref('Messages/' + uid).child('sent').child(sentKey).update({id: sentKey})

      const recKey = db.ref('Messages/' + currentItem.user).child('received').push(
        {
          message: payload.message,
          sender: uid,
          postId: itemId,
          date: payload.dateTime
        }
      ).key
      db.ref('Messages/' + currentItem.user).child('received').child(recKey).update({id: recKey})
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    getUser (state) {
      return state.user
    },
    getEmail () {
      return auth.currentUser.email
    },
    getUserUniversity (state) {
      state.loading = true
      const uid = auth.currentUser.uid
      const ref = db.ref('Users/' + uid + '/university')
      ref.on('value', function (snapshot) {
        state.database = (snapshot.val())
      })
      state.loading = false
      return state.database
    },
    getCards (state) {
      return state.cards
    },
    getCard (state) {
      state.loading = true
      return (itemId) => {
        const ref = db.ref('Posts/' + itemId)
        ref.on('value', function (snapshot) {
          state.database = (snapshot.val())
        })
        state.loading = false
        return state.database
      }
    },
    getSentMessages (state) {
      return state.sentMessage
    },
    getReceivedMessages (state) {
      return state.receivedMessage
    },
    getOneReceivedMessage (state) {
      state.loading = true
      return (mid) => {
        const uid = auth.currentUser.uid
        const ref = db.ref('Messages/' + uid + '/received/' + mid)
        ref.on('value', function (snapshot) {
          state.database = (snapshot.val())
        })
        state.loading = false
        return state.database
      }
    },
    featuredItems (state, getters) {
      return getters.getCards.slice(0, 5)
    },
    getDate (state) {
      return state.date.toLocaleString()
    }
  }
})
