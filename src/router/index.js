import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/Home'
import Landing from '@/components/Landing'
import NotFound from '@/components/NotFound'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import EditProfile from '@/components/EditProfile'
import AddItem from '@/components/AddItem'
import Wishlist from '@/components/Wishlist'
import Buy from '@/components/Buy'

Vue.use(Router)

const AuthGuard = (to, from, next) => {
  if (firebase.auth().currentUser) {
    next()
  } else {
    next('/signin')
  }
}

const isAuthorized = (to, from, next) => {
  if (firebase.auth().currentUser) {
    next('/')
  } else {
    next()
  }
}

// export default router
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: isAuthorized
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: isAuthorized
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: EditProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem,
      beforeEnter: AuthGuard
    },
    {
      path: '/wishlist',
      component: Wishlist,
      beforeEnter: AuthGuard
    },
    {
      path: '/buy',
      component: Buy,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
