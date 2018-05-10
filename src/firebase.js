import firebase from 'firebase'

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
