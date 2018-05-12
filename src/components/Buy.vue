<template>
  <v-flex xs12>
    <v-card>
      <v-container v-bind="{ [`grid-list-lg`]: true }" fluid >
        <v-layout row wrap>
          <v-flex
            v-for="n in 24"
            :key="n"
            xs12 sm6  md3 lg3  >
            <v-card-media
              :src= "`https://unsplash.it/300/300?image=${Math.floor(Math.random() * 100) + 1}`"
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
        cards: [{ title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg'}],
        posts: []
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
      }
    },
    methods: {
      // not now
    },
    beforeMount () {
      // this.getAllPosts()
      this.$store.dispatch('loadCards')

      while (this.$store.state.cards === null) { // you can delete this loop na
        console.log(this.$store.state.cards)
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
