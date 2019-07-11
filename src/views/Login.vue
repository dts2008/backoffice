<template>
    <v-content>
        <v-snackbar v-model="snackbar" :timeout="2000" top color="error">
            <span>
                {{ $t('loginissue') }}
            </span>
            <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-form @submit.prevent="authenticate()" ref="form">
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="login" :rules="rulesLogin"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password" :rules="rulesPass"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      loading: false,
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
  computed: {

  }
  ,
  methods: {
    authenticate () {
      if (this.$refs.form.validate())
      {
        this.loading = true;

        api.authorization(this.login, this.password)
          .then((result) => {
              
              this.loading = false;
              
              if (result) {
                //router.repalce({ name: 'home' })
                //this.$router.push({name: 'login'});
                this.$router.push({ name: 'home' })
              }
              else {
                this.snackbar = true;
              }
            }  
          ).catch((e) => {
            console.log('authorization - LOG catch');
          });
      } 
    }
  }
}

</script>
