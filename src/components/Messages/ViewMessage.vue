<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
          <v-btn flat to='/inbox' > <v-icon>arrow_left</v-icon> Back to Message </v-btn>
          <v-btn > Delete Message </v-btn>
      </v-flex>

      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Message from</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="addItem">
          <v-layout column>

            <v-flex >
              <p>item details: price, item name</p>
              <p>Date: </p>
              <p>Message: </p>
            </v-flex>
            <v-flex xs6 sm3>
              <v-text-field
                name="reply"
                label="Reply to "
                id="reply"
                type="text"
                v-model="reply"
                multi-line></v-text-field>
            </v-flex>
            <v-flex class="text-xs-right" mt-5>
              <v-btn color="primary" type="submit">Send</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { auth, db } from '../../firebase'
  export default {
    props: ['id'],
    components: {
      auth, db
    },
    data () {
      return {
        reply: '',
        messageId: this.id
      }
    },
    created: function () {
      // console.log('current date:', this.messageItem.date)
      console.log('message id: ', this.messageId)
    },
    methods: {
      // sendMessage () {
      //   console.log('MEHHHH')
      //   const itemData = {
      //     message: this.message,
      //     itemId: this.itemId,
      //     currentItem: this.currentItem,
      //     dateTime: this.$store.getters.getDate
      //   }
      //   this.$store.dispatch('sendMessage', itemData)
      //   this.dialog = false
      // }
    }
  }
</script>

