<template>
  <v-app>
    
    <Navbar v-if="loggedIn"/>
    <v-content v-if="loggedIn">
      <router-view></router-view>
    </v-content>
    
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    loggedIn () {
      return this.$store.getters.LOGGEDIN
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>
