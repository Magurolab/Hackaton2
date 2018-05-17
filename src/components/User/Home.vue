<template>

  <v-container fluid>
    <v-layout row wrap>

      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-card >
          <v-card-media src="/static/material.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="display-1 mb-1">{{this.$store.state.userInfo.username}}</h3>

              <div>
                <div> <v-icon class="mr-1">mail_outline </v-icon> {{this.$store.state.userInfo.email}} </div>
                <div> <v-icon class="mr-1">school </v-icon> {{this.$store.state.userInfo.university}} </div>
              </div>

              <v-spacer></v-spacer>

              <div class="mt-3">
                <h2 class="subheading" >About me:</h2>
                <div class="caption"> {{this.$store.state.userInfo.description}} </div>
              </div>

              <v-btn flat color="orange" v-if="this.$store.getters.getUserUniversity==null">Loading</v-btn>
            </div>
          </v-card-title>
          <v-subheader> MY ITEMS </v-subheader>
          <v-container v-bind="{ [`grid-list-lg`]: true }" fluid>
            <v-layout row wrap>
              <v-flex
                v-for=" card in cards"
                :key="card.id"
                xs12 md6 mt-3 >
                <v-card-media
                  :src= "card.url"
                  height="300px"
                  style="cursor: pointer"
                >
                </v-card-media>
                <v-card-actions>
                  <div  xs12 align-end flexbox>
                    <h3> {{card.name}}</h3>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    {{'฿ ' + card.price}}
                  </div>
                  <v-btn icon
                         @click="deleteItem(card.id)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

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
    computed: {
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      },
      cards () {
        return this.$store.getters.getCards.filter(function (u) {
          return u.user === auth.currentUser.uid
        })
      }
    },
    methods: {
      deleteItem (id) {
        db.ref('Posts/').child(id).remove()
        this.$store.dispatch('loadCards')
        this.$router.push('/home')
      }
    },
    beforeMount () {
      this.$store.dispatch('loadCards')
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

<style scoped>
  .title {
    position: absolute;
    bottom: 5px;
    color: white;
    font-size: 2em;
    margin-left: 5px;
  }
</style>

