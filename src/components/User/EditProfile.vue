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
              name="username"
              label="Username"
              id="username"
              type="text"
              v-model="username"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-select
              name="university"
              label="University"
              id="university"
              :items="colleges"
              single-line
              v-model="university"
            ></v-select>
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
        <v-flex class="text-xs-right" mt-5>
          <v-btn color="primary" @click="sendVerifyEmail">Verify email</v-btn>
        </v-flex>
        <v-flex class="text-xs-right" mt-5>
          <v-btn color="primary" @click="sendPasswordReset">Password reset</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { auth, db } from '../../firebase'
  export default {
    components: {
      auth, db
    },
    data () {
      return {
        description: this.$store.state.userInfo.description,
        username: this.$store.state.userInfo.username,
        university: this.$store.state.userInfo.university,
        colleges: [
          'Mahidol University', 'Kasetsart University', 'Chulalongkorn University', 'Thammasat University',
          'Chiang Mai University', 'Prince of Songkla University', 'Khon Kaen University',
          'Burapha University', 'Sripatum University', 'King Mongkut\'s University of Technology Thonburi'
        ],
        alert: false
      }
    },
    created: function () {
    },
    methods: {
      sendPasswordReset () {
        const email = auth.currentUser.email
        auth.sendPasswordResetEmail(email).then(function () {
          alert('Password reset sent to your email')
        })
      },
      sendVerifyEmail () {
        const user = auth.currentUser
        user.sendEmailVerification().then(function () {
          alert('Email verification sent')
        })
      },
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


