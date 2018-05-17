<template>
  <v-layout column>
    <v-flex xs12 sm6 mt-3>
      <v-card>
        <v-subheader> Received Messages</v-subheader>
        <v-list two-line>
          <template v-for="(rec, index) in receivedMessage ">
            <v-list-tile :key="index"
                         avatar ripple
                         @click="onLoadMessage(rec.id)"
            >
              <v-list-tile-content>
                <v-list-tile-title> Username </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ rec.date }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ rec.message }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ rec.id }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>

    <v-flex  xs12 sm6 mt-2>
      <v-card>
        <v-subheader> Sent Messages</v-subheader>
        <v-list two-line>
          <template v-for="(sent, index) in sentMessage">
            <v-list-tile :key="index"
                         avatar ripple
            >
              <v-list-tile-content>
                <v-list-tile-title> Username </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ sent.date }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ sent.message }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ sent.id }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import { auth, db } from '../../firebase'
  export default {
    components: {
      auth, db
    },
    methods: {
      onLoadMessage (id) {
        console.log('Mehhhhhhhhhhh')
        console.log('current id ' + id)
        this.$router.push('/view-message/' + id)
      }
    },
    computed: {
      receivedMessage () {
        console.log('getters', this.$store.getters)
        let messages = this.$store.getters.getReceivedMessages
        console.log('messages', messages)
        return messages
      },
      sentMessage () {
        return this.$store.getters.getSentMessages
      }
    },
    created: function () {
      console.log('store', this.$store.getters)
    },
    mounted () {
      this.$store.dispatch('loadSentMessage')
      this.$store.dispatch('loadReceivedMessage')
    }
  }
</script>
