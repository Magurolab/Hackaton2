<template>
  <v-layout column>
    <v-flex xs12 sm6 >

      <v-card>
        <v-container fluid grid-list-sm>

          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
              xs4
            >
              <v-card>
                <v-card-media
                  :src="card.src"
                  height="200px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
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
              </v-card>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card>

    </v-flex>
  </v-layout>
</template>
<script>
  import { auth, db } from '../firebase'
  export default {
    data () {
      return {
        cards: [
          { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg', flex: 6 },
          { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg', flex: 6 },
          { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg', flex: 6 }],
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
      var i = 0
      while (i < 1000) { // you can delete this loop na
        console.log(this.$store.state.cards)
        i += 1
        if (i === 1000) {
          break
        }
      }
    },
    watch: {
      // getPosts () {
      //   let postsRef = db.ref('Posts/').orderByKey().limitToLast(100)
      //   postsRef.on('child_added', snapshot => {
      //     let note = {text: snapshot.val(), id: snapshot.id}
      //     this.snapshot = [note].concat(this.snapshot)
      //   })
      // },
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
