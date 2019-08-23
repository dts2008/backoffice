<template>
      <v-dialog v-model="show" max-width="600px" persistent>
        <v-card>
            <v-card-title>
                <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-text >
                <v-form class="px-3" ref="form" autocomplete="off">
                    <v-text-field :label="this.$t('partners.contact.name')" v-model="contactItem.name" prepend-icon="person"></v-text-field>
                    <v-text-field :label="this.$t('partners.contact.email')" v-model="contactItem.email" prepend-icon="email" ></v-text-field>
                    <v-text-field :label="this.$t('partners.contact.phone')" v-model="contactItem.phone" prepend-icon="phone" ></v-text-field>
                    <v-text-field :label="this.$t('partners.contact.skype')" v-model="contactItem.skype" prepend-icon="chat" ></v-text-field>
                    <v-text-field :label="this.$t('partners.contact.telegram')" v-model="contactItem.telegram" prepend-icon="chat" ></v-text-field>
                    <v-text-field :label="this.$t('partners.contact.whatsapp')" v-model="contactItem.whatsapp" prepend-icon="chat" ></v-text-field>
                    <v-textarea :label="this.$t('partners.contact.comment')" v-model="contactItem.comment"  prepend-icon="comment" ></v-textarea>
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
            contactItem: { id: 0, name: '', partnerid: 0, email: '', phone: '', skype: '', telegram: '', whatsapp: '', comment: ''},
            partnerid: 0
        }
    },
    computed:{
        
        title() {
            if (this.contactItem.id != 0) 
                return this.$t('partners.contact.edit', { "id": this.contactItem.id }) 
            
            return this.$t('partners.contact.add') 
        },

        inputNameRules()
        {
            return [
                v => (v && v.length >= 3) || this.$t('minLength', {'chars': 3} ),
                v => (v && v.length <= 32) || this.$t('maxLength', {'chars': 32} )
            ]
        },

    }
    ,
    methods: {
        submit() {
            if (this.$refs.form.validate()) {   
                this.show = false
                this.$emit('accept', this.contactItem)
            }
        },

        resetValidation() {
            this.$refs.form.resetValidation()
        },

        showForm(contact, partner_id) {
            if (contact) {
                this.contactItem = Object.assign({}, contact)
            } 
            else {
                this.contactItem = { id: 0, name: '', partnerid: partner_id, email: '', phone: '', skype: '', telegram: '', whatsapp: '', comment: ''}
            }

            this.show = true
            this.$refs.form.resetValidation()
        }
    }
}
</script>