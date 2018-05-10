import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDOhyQXZMYPxIDRhUL9R3ar5j-DnP8qlL0',
  authDomain: 'simple-note-31073.firebaseapp.com',
  databaseURL: 'https://simple-note-31073.firebaseio.com',
  projectId: 'simple-note-31073',
  storageBucket: 'simple-note-31073.appspot.com',
  messagingSenderId: '668969723863'
}

firebase.initializeApp(config)

export default firebase
export const db = firebase.database()
export const auth = firebase.auth()
