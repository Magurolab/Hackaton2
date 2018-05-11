<template>
  <v-layout column wrap class="my-5" align-center>
    <v-flex md12>
      <v-container grid-list-xl>
        <v-layout row wrap align-center>
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout row wrap align-center>
                <v-flex
                  v-for="card in cards"
                  v-bind="{ [`xs${card.flex}`]: true }"
                  :key="card.title"
                  xs12 md4
                >
                  <v-card >
                    <v-card-media
                      :src="card.src"
                      height="200px"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline black--text" v-text="card.title"></span>
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
        </v-layout>
      </v-container>

    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg'},
        { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg'}
        // { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'},
        // { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'},
        // { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'},
        // { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'},
        // { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'},
        // { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg'}
      ]
    })
  }
</script>
