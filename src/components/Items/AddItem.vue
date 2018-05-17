<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Add item</h1>
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
              <h1 class="body-1">My File Selector: <file-select v-model="file"></file-select></h1>
              <p v-if="file">{{file.name}}</p>
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
            <v-flex xs6 >
              <v-select
                name="category"
                label="Category"
                id="university"
                :items="categories"
                single-line
                v-model="category"
              ></v-select>
            </v-flex>
            <v-flex xs6 sm3>
              <v-text-field
                name="price"
                label="Price"
                id="price"
                prefix="฿"
                required
                v-model="price"
              ></v-text-field>
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
              <v-btn color="primary" type="submit"  :disabled="!formIsValid">Sell It</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import FileSelect from './FileSelect.vue'
  export default {
    data () {
      return {
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        alert: false,
        file: null,
        categories: ['Book', 'Furniture', 'Electronics', 'Clothing', 'Other']
      }
    },
    components: {
      FileSelect
    },
    computed: {
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      },
      formIsValid () {
        return this.name !== '' &&
          this.description !== '' &&
          this.price !== '' &&
          this.category !== ''
      }
    },
    methods: {
      addItem () {
        const itemData = {
          name: this.name,
          description: this.description,
          price: this.price,
          category: this.category,
          file: this.file
        }
        this.$store.dispatch('addItem', itemData)
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

