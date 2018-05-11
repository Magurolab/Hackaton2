<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Add items</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5>
        <img v-bind:src=image height="300px" width="300px"/>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="addItem">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex xs6 sm3>
              <v-text-field
                name="image"
                label="Image Source"
                id="image"
                v-model="image"
              ></v-text-field>
              For image, please upload your
           </v-flex>
            <v-flex>
              <v-text-field
                name="name"
                label="Item Name"
                id="name"
                type="text"
                v-model="name"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                type="text"
                v-model="description"
                full-width
                multi-line></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="price"
                label="Price"
                id="price"
                prefix="฿"
                required
                v-model="price"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                name="category"
                label="Category"
                id="university"
                :items="categories"
                single-line
                v-model="category"
              ></v-select>
            </v-flex>

            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Sell It</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        alert: false,
        categories: ['Book', 'Furniture', 'Electronics', 'Clothing', 'Other']
      }
    },
    computed: {
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      }
    },
    methods: {
      addItem () {
        this.$store.dispatch('addItem', {name: this.name, description: this.description, price: this.price, category: this.category})
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      },
      alert (value) {
        if (!value) {
          this.$store.commit('setError', null)
        }
      }
    }
  }
</script>

