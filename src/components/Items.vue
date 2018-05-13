<template>
    <v-flex xs12>
      <v-card >
        <v-container v-bind="{ [`grid-list-lg`]: true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for=" card in cards"
              :key="card"
              xs12 sm6  md3 lg3 mt-3 >
              <v-card-media
                :src= "card.url"
                height="300px"
              >
                <div  xs12 align-end flexbox>
                  <h3 class="title"> {{card.name}}</h3>
                  <!--<div> {{card.description}} </div>-->
                </div>

              </v-card-media>
              <!--<v-card-text>-->
                <!--<div>-->
                  <!--<h3 class="headline mb-0"> {{card.name}}</h3>-->
                  <!--&lt;!&ndash;<div> {{card.description}} </div>&ndash;&gt;-->
                <!--</div>-->
              <!--</v-card-text>-->
              <v-card-actions>
                <v-spacer></v-spacer>
                <div>
                  {{'฿ ' + card.price}}
                </div>
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
    /*background-color: rgba(0,0,0,0.5);*/
    color: white;
    font-size: 2em;
    margin-left: 5px;
  }
</style>

