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
  export default {
    data () {
      return {
        message: '',
        sellerId: '',
        dialog: false
      }
    },
    methods: {
      sendMessage () {
        const itemData = {
          message: this.message,
          sellerId: this.userId
        }
        this.$store.dispatch('sendMessage', itemData)
        this.dialog = false
      }
    }
  }
</script>
