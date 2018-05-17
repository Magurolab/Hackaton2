<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-left" mt-5 offset-sm3 mt-3>
        <h1 class="display-1">Account Settings</h1>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3 mt-5>
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
        </v-layout>
        <v-flex class="text-xs-left mt-1" >
          <v-btn color="secondary" @click="sendVerifyEmail">Verify email</v-btn>
          <v-btn color="secondary" @click="sendPasswordReset">Password reset</v-btn>
        </v-flex>
        <v-flex class="text-xs-right" mt-5>
          <v-btn color="primary" type="submit" @click="userEdit">update</v-btn>
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
        email: this.$store.state.userInfo.email,
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
          email: this.email,
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


