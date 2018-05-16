<template>
  <v-container>
    <v-layout row wrap fluid>
      <v-flex  xs12 >
        <v-card v-if="item">
          <v-card-title>
            {{item.name}}
          </v-card-title>
          <v-card-media
            :src="item.url"
            height="500px"
          >
          </v-card-media>
          <v-card-text>
            {{item.description}}
          </v-card-text>
          <v-card-actions>
            <sendMessageDialog :itemId="this.id" :currentItem="item"> </sendMessageDialog>
            {{ item.id }}
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import SendMessageDialog from '../Messages/SendMessageDialog'
  export default {
    props: ['id'],
    computed: {
      item () {
        return this.$store.getters.getCard(this.id)
      },
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      }
    },
    components: {
      SendMessageDialog
    },
    created: function () {
      console.log('id: ', this.id)
    }
  }
</script>
