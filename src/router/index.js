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
import Items from '@/components/Items'
import Item from '@/components/Item'

Vue.use(Router)

const AuthGuard = (to, from, next) => {
  if (firebase.auth().currentUser) {
    next()
  } else {
    next('/')
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
      beforeEnter: isAuthorized
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
      path: '/items',
      name: 'Items',
      component: Items,
      beforeEnter: AuthGuard
    },
    {
      path: '/items/:id',
      props: true,
      name: 'Item',
      component: Item,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
