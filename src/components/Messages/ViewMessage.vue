<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
          <v-btn flat > <v-icon>arrow_left</v-icon> Back to Message </v-btn>
          <v-space></v-space>
          <v-btn > Delete Message </v-btn>
      </v-flex>

      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Message from</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="addItem">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
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
                v-model="message"
                multi-line></v-text-field>
            </v-flex>
            <v-flex class="text-xs-right" mt-5>
              <v-btn color="primary" type="submit"  :disabled="!formIsValid">Send</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>
