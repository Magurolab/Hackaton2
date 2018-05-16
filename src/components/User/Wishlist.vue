<template>
  <v-flex xs12>
    <v-card >
      <v-container v-bind="{ [`grid-list-lg`]: true }" fluid>
        <v-layout row wrap>
          <v-flex
            v-for=" card in this.wishlist"
            :key="card.id"
            xs12 sm6  md3 lg3 mt-3 >
            <v-card-media
              :src= "card.url"
              height="300px"
              style="cursor: pointer"
              @click="onLoadItem(card.id)"
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
                     @click="deleteItem(card.key)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import firebase from '@/firebase'
  import { auth, db } from '../../firebase'
  export default {
    data () {
      return {
        wishlist: []
      }
    },
    components: {
      auth, db, firebase
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
          return this.wishlist.includes(u)
        })
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/items/' + id)
      },
      deleteItem (id) {
        const uid = auth.currentUser.uid
        db.ref('/Users/' + uid + '/wishlist').child(id).remove()
        db.ref('/Users/' + uid + '/wishlist').once('value')
          .then((data) => {
            const postObject = data.val()
            this.wishlist = []
            for (let key in postObject) {
              this.wishlist.push({
                key: key,
                id: postObject[key].id,
                category: postObject[key].category,
                description: postObject[key].description,
                name: postObject[key].name,
                price: postObject[key].price,
                url: postObject[key].url,
                user: postObject[key].user
              })
            }
          })
          .catch(
            (error) => {
              console.log(error)
            }
          )
      },
      addWishlist (id) {
        const uid = auth.currentUser.uid
        db.ref('Users/' + uid + '/wishlist').push(id)
      }
    },
    beforeMount () {
      const uid = auth.currentUser.uid
      db.ref('/Users/' + uid + '/wishlist').once('value')
        .then((data) => {
          const postObject = data.val()
          for (let key in postObject) {
            this.wishlist.push({
              key: key,
              id: postObject[key].id,
              category: postObject[key].category,
              description: postObject[key].description,
              name: postObject[key].name,
              price: postObject[key].price,
              url: postObject[key].url,
              user: postObject[key].user
            })
          }
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
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





