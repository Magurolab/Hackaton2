<template>
    <v-flex xs12>
      <v-card >
        <v-container v-bind="{ [`grid-list-lg`]: true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for=" card in cards"
              :key="card.id"
              xs12 sm6  md3 lg3 mt-3 >
              <v-card-media
                :src= "card.url"
                height="300px"
                style="cursor: pointer"
                @click="onLoadItem(card.id)"
              >
                <div  xs12 align-end flexbox>
                  <h3 class="title"> {{card.name}}</h3>
                </div>
              </v-card-media>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div>
                  {{'฿ ' + card.price}}
                </div>
                <v-btn icon @click="addWishlist(card.id)">
                  <v-icon>bookmark</v-icon>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
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
          return u.user !== auth.currentUser.uid
        })
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/items/' + id)
      },
      addWishlist (id) {
        const uid = auth.currentUser.uid
        db.ref('Users/' + uid + '/wishlist').push(id)
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

