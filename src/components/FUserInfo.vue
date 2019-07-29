<template>
      <v-dialog v-model="show" max-width="600px" persistent>
        <v-card>
            <v-card-title>
                <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-text >
                <v-form class="px-3" ref="form" autocomplete="off">
                    <v-text-field :label="this.$t('login')" autocomplete="off" v-model="userItem.login" prepend-icon="person" :rules="inputLoginRules" readonly onfocus="this.removeAttribute('readonly');"></v-text-field>
                    <v-text-field :label="this.$t('password')" autocomplete="new-password" v-model="userItem.password" prepend-icon="lock" :rules="inputPasswordRules" type="password" readonly onfocus="this.removeAttribute('readonly');"></v-text-field>
                    <v-text-field :label="this.$t('name')" v-model="userItem.name" prepend-icon="folder" ></v-text-field>
                    <v-select :label="this.$t('role')" v-model="userItem.role" :items="roles" item-text="name" item-value="value"></v-select>
                    <v-spacer></v-spacer>
                    <v-card-actions class="mt-2">
                        <v-btn class="success" @click="submit" :loading="loading">{{ this.$t('accept') }}</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red lighten-2" @click="show = false">{{ this.$t('cancel') }}</v-btn>
                    </v-card-actions>
                </v-form>    
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script>

export default {
    data(){
        return {
            content: '',
            show: false,
            loading: false,
            userItem: { id: 0, login: '', password: '', name: '', contact: '', role: 3, activity: 0, partners: 0}
        }
    },
    computed:{
        roles()
        {
            return [
                { name: this.$t('users.roles.admin'), value: 1 },
                { name: this.$t('users.roles.manager'), value: 2 },
                { name: this.$t('users.roles.user'), value: 3 }
            ]
        },
        
        title() {
            if (this.userItem.id != 0) 
                return this.$t('users.edit', { "id": this.userItem.id }) 
            
            return this.$t('users.add') 
        },

        inputLoginRules()
        {
            return [
                v => (v && v.length >= 3) || this.$t('minLength', {'chars': 3} ),
                v => (v && v.length <= 32) || this.$t('maxLength', {'chars': 32} )
            ]
        },

        inputPasswordRules()
        {
            if (this.userItem.id != 0 && this.userItem.id > 0) return [];
            return [
                v => (v && v.length >= 3) || this.$t('minLength', {'chars': 3} ),
                v => (v && v.length <= 32) || this.$t('maxLength', {'chars': 32} )
            ]
        }
    }
    ,
    methods: {
        submit() {
            if (this.$refs.form.validate()) {   
                this.show = false
                this.$emit('accept', this.userItem)
            }
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        showForm(user) {
            if (user) {
                this.userItem = Object.assign({},user)
            } 
            else {
                this.userItem = { id: 0, login: '', password: '', name: '', contact: '', role: 3, activity: 0, partners: 0}
            }

            this.show = true
            this.$refs.form.resetValidation()
        }
    }
}
</script>