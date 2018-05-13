<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            {{item.name}}}
          </v-card-title>
          <v-card-media
            :src="item.url"
          >
          </v-card-media>
          <v-card-text>
            {{item.description}}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default{
    props: ['id'],
    computed: {
      item () {
        return this.$store.getters.getCard(this.id)
      }
    }
  }
</script>
