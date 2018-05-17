import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/User/Home'
import Landing from '@/components/Authentication/Landing'
import NotFound from '@/components/Authentication/NotFound'
import Signup from '@/components/Authentication/Signup'
import Signin from '@/components/Authentication/Signin'
import EditProfile from '@/components/User/EditProfile'
import Wishlist from '@/components/User/Wishlist'
import AddItem from '@/components/Items/AddItem'
import Items from '@/components/Items/Items'
import Item from '@/components/Items/Item'
import Inbox from '@/components/Messages/Inbox'
import ViewMessage from '@/components/Messages/ViewMessage'

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
      // beforeEnter: isAuthorized
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
      path: '/inbox',
      name: 'Inbox',
      component: Inbox,
      beforeEnter: AuthGuard
    },
    {
      path: '/view-message/:id',
      name: 'ViewMessage',
      props: true,
      component: ViewMessage,
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
