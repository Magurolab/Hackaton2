<template>
  <v-flex xs12>
    <v-card>
      <v-container v-bind="{ [`grid-list-lg`]: true }" fluid >
        <v-layout row wrap>
          <v-flex
            v-for=" card in cards"
            :key="card"
            xs12 sm6  md3 lg3  >
            <v-card-media
              :src= "card.url"
              height="300px"
            >
            </v-card-media>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn icon>
              <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
              <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
              <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>

</template>
<script>
  import { auth, db } from '../firebase'
  export default {
    data () {
      return {
        hello:[]
      }
    },
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
        console.log(this.$store.getters.getCards)
        return this.$store.getters.getCards
      }
    },
    methods: {
      // not now
    },
    beforeMount () {
      // this.getAllPosts()
      this.$store.dispatch('loadCards')
      // var i = 0
      // while (i < 30) { // you can delete this loop na
      //   console.log(this.$store.state.cards)
      //   i += 1
      // }
      // console.log('helloooooo')
      // console.log(this.$store.state.cards.length)
      // for (i = 0; i < this.$store.state.cards.length; i += 1) {
      //   console.log(this.$store.state.cards[i])
      // }
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
