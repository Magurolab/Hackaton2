<template>
  <!--<v-container>-->
    <!--<v-layout row wrap fluid>-->
      <!--<v-flex xs12>-->
        <!--<h1> Inbox</h1>-->
        <!--<p>-->
          <!--Received Messages-->
          <!--<v-spacer></v-spacer>-->
          <!--Sent message-->
        <!--</p>-->
      <!--</v-flex>-->
    <!--</v-layout>-->
  <!--</v-container>-->

  <v-layout row>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <v-card>

        <v-subheader> Received Messages</v-subheader>

        <v-list two-line>
          <template v-for="(rec, index) in receivedMessage ">
            <v-list-tile :key="rec"
                         avatar ripple
                         @click="onLoadMessage">
              <v-list-tile-content>
                <v-list-tile-title> Username </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ rec.date }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ rec.message }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
          </template>
        </v-list>

        <v-subheader> Sent Messages</v-subheader>

        <v-list two-line>
          <template v-for="(sent, index) in sentMessage">
            <v-list-tile :key="index"
                         avatar ripple
                         @click="onLoadMessage(sent.id)"
            >
              <v-list-tile-content>
                <v-list-tile-title> Username </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ sent.date }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ sent.message }}</v-list-tile-sub-title>
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
        return this.$store.getters.getReceivedMessage(auth.currentUser.uid)
      },
      sentMessage () {
        return this.$store.getters.getSentMessage(auth.currentUser.uid)
      }
    },
    created: function () {
      console.log('sentMessages', this.sentMessage)
      // console.log('current user', auth.currentUser.uid)
    }
  }
</script>
