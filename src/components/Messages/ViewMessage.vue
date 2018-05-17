<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
          <v-btn flat to='/inbox' > <v-icon>arrow_left</v-icon> Back to Message </v-btn>
          <v-btn > Delete Message </v-btn>
      </v-flex>

      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Message from {{currentMessage.sender}}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="sendMessage">
          <v-layout column>
            <v-flex >
              <p>item details: </p>
              <p>Name: {{postItem.name}}</p>
              <p>Price: {{'฿ '+ postItem.price}}</p>

              <p>Date: {{currentMessage.date}}} </p>

              <p>Message: </p>
              <P> {{currentMessage.message}}</P>

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
        reply: ''
      }
    },
    created: function () {
      console.log('curr item name:', this.postItem.name)
      console.log('curr item id:', this.postItem.id)
    },
    computed: {
      currentMessage () {
        return this.$store.getters.getOneReceivedMessage(this.id)
      },
      postItem () {
        const original = this.$store.getters.getCard(this.currentMessage.postId)
        var modifiedUser = {
          category: original.category,
          description: original.description,
          name: original.name,
          price: original.price,
          url: original.url,
          user: this.currentMessage.sender
        }
        return modifiedUser
      }
    },
    methods: {
      sendMessage () {
        console.log('MEHHHH')
        const itemData = {
          message: this.reply,
          itemId: this.currentMessage.postId,
          currentItem: this.postItem,
          dateTime: this.$store.getters.getDate
        }
        this.$store.dispatch('sendMessage', itemData)
        this.$router.push('/inbox')
      }
    }
  }
</script>

