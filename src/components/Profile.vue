<template>
  <v-container fluid>
    <v-layout row wrap>
      {{this.getEmail()}}
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: this.$store.dispatch(''),
        password: '',
        alert: false
      }
    },
    methods: {
      getEmail () {
        return this.$store.dispatch('getEmail')
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
