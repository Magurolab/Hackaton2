<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" flat><v-icon left dark>favorite</v-icon>BUYYY</v-btn>

      <v-card>
        <form  @submit.prevent="sendMessage">
          <v-card-title>
            <span class="headline">CONTACT SELLER</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 >
                  <v-text-field
                    name="message"
                    label="Message"
                    id="message"
                    type="text"
                    v-model="message"
                    multi-line></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              flat
              type="submit"
            >Send</v-btn>
          </v-card-actions>
        </form>
      </v-card>

    </v-dialog>
  </v-layout>
</template>

<script>
  import { auth, db } from '../../firebase'
  export default {
    components: {
      auth, db
    },
    firebase: function () {
      return {
        seller: {
          source: db.ref('Users/' + this.sellerId)
        }
      }
    },
    props: ['itemId', 'currentItem'],
    data () {
      return {
        message: '',
        dialog: false,
        itemId: this.itemId,
        currentItemState: this.currentItem
      }
    },
    created: function () {
      console.log('current item:', this.currentItem.name)
      console.log('current seller:', this.currentItem.user)
      console.log('current item id:', this.itemId)
    },
    methods: {
      sendMessage () {
        console.log('MEHHHH')
        const itemData = {
          message: this.message,
          itemId: this.itemId,
          currentItem: this.currentItem,
          dateTime: this.$store.getters.getDate
        }
        this.$store.dispatch('sendMessage', itemData)
        this.dialog = false
      }
    }
  }
</script>
