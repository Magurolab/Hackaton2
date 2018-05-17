<template>
  <v-container fluid>
    <!--<v-flex xs12 class="text-xs-center" mt-5 v-if="loading">-->
      <!--<v-progress-circular :size="70" :width="7" indeterminate color="purple"></v-progress-circular>-->
    <!--</v-flex>-->

    <v-layout row wrap>
              <!--v-if="!loading"-->
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>



        <v-card >
          <v-card-media src="/static/material.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>{{email}}</div>
              <div>{{this.$store.getters.getUserUniversity}}</div>
              <v-btn flat color="orange" v-if="this.$store.getters.getUserUniversity==null">Loading</v-btn>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>

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
  import { auth } from '../../firebase'
  export default {
    data () {
      return {
        email: this.$store.state.user.email,
        university: this.$store.getters.getUserUniversity
      }
    },
    computed: {
      loading () {
        return this.$store.getters.getUserUniversity == null
      },
      error () {
        return this.$store.state.error
      },
      cards () {
        return this.$store.getters.getCards.filter(function (u) {
          return u.user === auth.currentUser.uid
        })
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
