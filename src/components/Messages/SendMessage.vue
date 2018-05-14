<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 >
        <h1>New Message</h1>
      </v-flex>

      <v-flex xs12 mt-3 >
        <p> User: (seller name) </p>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent>
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>

            <v-flex xs6 sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                type="text"
                v-model="description"
                multi-line></v-text-field>
            </v-flex>

            <v-flex class="text-xs-right" mt-5>
              <v-btn color="primary" type="submit" > Send </v-btn>
            </v-flex>

          </v-layout>
        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>
