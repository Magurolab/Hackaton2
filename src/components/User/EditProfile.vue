<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Edit Profile</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent="userEdit">
        <v-layout column>
          <v-flex>
            <v-alert type="error" dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-flex>
            <v-text-field
              name="Description"
              label="Description"
              id="description"
              type="description"
              v-model="description"
              multi-line=""
            ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-right" mt-5>
            <v-btn color="primary" type="submit">update</v-btn>
          </v-flex>
        </v-layout>
      </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { auth } from '../../firebase'
  export default {
    data () {
      return {
        description: '',
        colleges: [
          'Mahidol University', 'Kasetsart University', 'Chulalongkorn University', 'Thammasat University',
          'Chiang Mai University', 'Prince of Songkla University', 'Khon Kaen University',
          'Burapha University', 'Sripatum University', 'King Mongkut\'s University of Technology Thonburi'
        ],
        alert: false
      }
    },
    created: function () {
      // this.$store.dispatch('loadUser')
      // console.log('curr user id:', auth.currentUser.uid)
      // console.log(' user :', this.$store.state.user)
      // console.log('username :', this.$store.state.user.username)
      // console.log('description:', this.$store.state.user.description)
      // console.log('uni:', this.$store.state.user.university)
      // console.log('email:', this.$store.state.user.email)
    },
    methods: {
      userEdit () {
        if (this.username.trim() === '' || this.description.trim() === '') {
          return
        }
        this.$store.dispatch('userEdit', {
          username: this.username,
          university: this.university,
          description: this.description
        })
      }
    },
    computed: {
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      },
      alert (value) {
        if (!value) {
          this.$store.commit('setError', null)
        }
      }
    }
  }
</script>


