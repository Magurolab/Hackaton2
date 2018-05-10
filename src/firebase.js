import firebase from 'firebase'

// const config = {
//   apiKey: "AIzaSyBw2Vf-CCQedkG0i_7385N_88VBz9S9330",
//   authDomain: "login-7ded6.firebaseapp.com",
//   databaseURL: "https://login-7ded6.firebaseio.com",
//   projectId: "login-7ded6",
//   storageBucket: "login-7ded6.appspot.com",
//   messagingSenderId: "487699141753"

var config = {
  apiKey: 'AIzaSyA8YBu0mev63vnBzIQiYy6M4G3Ehnt_mtQ',
  authDomain: 'hackaton2-7d785.firebaseapp.com',
  databaseURL: 'https://hackaton2-7d785.firebaseio.com',
  projectId: 'hackaton2-7d785',
  storageBucket: 'hackaton2-7d785.appspot.com',
  messagingSenderId: '1048977951330'
}

firebase.initializeApp(config)

export default firebase
export const db = firebase.database()
export const auth = firebase.auth()
