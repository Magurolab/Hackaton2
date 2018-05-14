<template>
  <v-app id="inspire">
    <v-toolbar color="pink darken-1" app absolute clipped-left dense app >
      <v-toolbar-title class="white--text mr-3">Alibaybay</v-toolbar-title>
      <v-text-field
        solo-inverted
        flat
        label="Search"
        prepend-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>

          {{ item.title }}
        </v-btn>
        <v-btn flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left >exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
      <v-tabs
        icons-and-text
        dark
        v-if="isAuthenticated"
        slot="extension"
        centered
        color="pink darken-1"
        slider-color="pink lighten-5"
      >
        <v-tab
          v-for="(item,i) in items"
          :key="i"
          :href="`#tab-${i}`"
          :to="item.path"
        >
          {{ item.text }}
          <v-icon left dark>{{ item.icon }}</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
      <!--<v-container fluid fill-height class="grey lighten-4">-->
      <!--</v-container>-->
    </v-content>
    <v-footer class="primary white--text pa-5">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'home', text: 'Home', path: '/home' },
        { icon: 'assignment_ind', text: 'Edit Profile', path: '/edit-profile' },
        { icon: 'add_shopping_cart', text: 'Buy', path: '/items' },
        { icon: 'attach_money', text: 'Sell', path: '/add-item' },
        { icon: 'bookmark_border', text: 'Wishlist', path: '/Wishlist' },
        { icon: 'inbox', text: 'Inbox', path: '/inbox' }
        // { divider: true },
        // { heading: 'Labels' },
        // { icon: 'add', text: 'Create new label' },
        // { divider: true },
        // { icon: 'archive', text: 'Archive' },
        // { icon: 'delete', text: 'Trash' },
        // { divider: true },
        // { icon: 'settings', text: 'Settings' },
        // { icon: 'chat_bubble', text: 'Trash' },
        // { icon: 'help', text: 'Help' },
        // { icon: 'phonelink', text: 'App downloads' },
        // { icon: 'keyboard', text: 'Keyboard shortcuts' }
      ]
    }),
    props: {
      source: String
    },
    computed: {
      loading () {
        return this.$store.state.loading
      },
      appTitle () {
        return this.$store.state.appTitle
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      menuItems () {
        if (this.isAuthenticated) {
          return [
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      }
    }
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }
  .navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>
