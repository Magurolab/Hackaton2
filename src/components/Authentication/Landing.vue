<template>
  <v-container fluid>
    <!--<v-parallax src="static/antho.jpg" >-->
    <!--<v-layout row wrap>-->
      <!--<v-flex xs12 text-xs-center mt-5>-->
        <!--<h1 >Welcome to Awesome App</h1>-->
      <!--</v-flex>-->
      <!--<v-flex xs12 sm6 offset-sm3 mt-3>-->
        <!--<blockquote class="blockquote text-xs-center">-->
          <!--It's a basic Single Page application <br>-->
          <!--with Google Firebase authentication-->
        <!--</blockquote>-->
      <!--</v-flex>-->
    <!--</v-layout>-->
  <!--</v-parallax>-->
    <v-content>
      <section>
        <v-parallax src="static/antho.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="assets/vuetify.png" alt="Vuetify.js" height="200">
            <h1 class="white--text mb-2 display-1 text-xs-center">Parallax Template</h1>
            <div class="subheading mb-3 text-xs-center">Powered by Vuetify</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to start developing</h2>
              <span class="subheading">
                Cras facilisis mi vitae nunc
              </span>
            </div>
          </v-flex>

          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Material Design</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Completely Open Sourced</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <!--<section>-->
        <!--<v-layout >-->
          <!--<v-flex xs12>-->
            <!--<v-card  xs12 sm6  md3 lg3>-->
              <!--<v-container v-bind="{ [`grid-list-lg`]: true }">-->
                <!--<v-layout row wrap>-->
                  <!--<v-flex-->
                    <!--v-for=" item in items"-->
                    <!--:key="item.id"-->
                    <!--@click="onLoadItem(id)"-->
                    <!--&gt;-->
                    <!--<v-card-media-->
                      <!--:src= "item.url"-->
                      <!--height="300px"-->
                      <!--style="cursor: pointer"-->
                    <!--&gt;-->
                      <!--<div  xs12 align-end flexbox>-->
                        <!--<h3 class="title"> {{item.name}}</h3>-->
                      <!--</div>-->

                    <!--</v-card-media>-->
                    <!--<v-card-actions>-->
                      <!--<v-spacer></v-spacer>-->
                      <!--<div>-->
                        <!--{{'฿ ' + item.price}}-->
                      <!--</div>-->
                      <!--<v-btn icon :to="'/items/' + item.id">-->
                        <!--<v-icon>favorite</v-icon>-->
                      <!--</v-btn>-->
                      <!--<v-btn icon>-->
                        <!--<v-icon>bookmark</v-icon>-->
                      <!--</v-btn>-->
                    <!--</v-card-actions>-->
                  <!--</v-flex>-->
                <!--</v-layout>-->
              <!--</v-container>-->
            <!--</v-card>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
      <!--</section>-->

      <section>
        <v-layout>
          <v-flex
            v-for=" item in items"
            :key="item.id"
            @click="onLoadItem(id)"
            xs12 sm6  md3 lg3
          >
            <div class="black--text">
             <p>kjsdjkskjskjsk</p>
            </div>
          </v-flex>
        </v-layout>


      </section>

      <section>
        <v-parallax src="static/antho.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
            <em>Kick-start your application today</em>


            <v-flex xs12 sm6 mt-5 class="text-xs-center">
              <v-btn color="primary" to="/signup">Sign Up</v-btn>
              <v-btn to="/signin">Sign In</v-btn>
            </v-flex>

          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

    </v-content>
  </v-container>
</template>

<script>
export default {
  method: {
    beforeMount () {
      this.$store.dispatch('loadCards')
    },
    onLoadItem (id) {
      this.$router.push('/items/' + id)
    }
  },
  computed: {
    // items () {
    //   return this.$store.getters.featuredItems
    // }
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    },
    items () {
      console.log(this.$store.getters.getCards)
      return this.$store.getters.getCards
    }
  }
}
</script>
