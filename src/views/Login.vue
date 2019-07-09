<template>
    <v-content>
        <v-snackbar v-model="snackbar" :timeout="2000" top color="error">
            <span>
                Awesome! You added a new project
            </span>
            <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-form @submit.prevent="authenticate()" ref="login">
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="login" :rules="rulesLogin"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="rulesPass"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

export default {
  data () {
    return {
      snackbar: false,
      login: '',
      password: '',
      rulesLogin: [
        v => v.length > 0 || 'Login is required',
        v => v.length >= 3 || 'Minimum lenght is 3 characters',
        v => v.length <= 16 || 'Maximum lenght is 16 characters'
      ],
      rulesPass: [
          v => v.length > 0 || 'Password is required',
        v => v.length >= 3 || 'Minimum lenght is 3 characters',
        v => v.length <= 16 || 'Maximum lenght is 32 characters'
      ]
    }
  },
  methods: {
    authenticate () {
      if (this.$refs.login.validate())
      {
        this.$store.dispatch('LOGIN', this.login, this.password)
        //this.snackbar = true;
      }
      
    }
  }
}

</script>
