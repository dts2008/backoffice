<template>
      <v-dialog v-model="show" max-width="600px" persistent>
        <v-card>
            <v-card-title>
                <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-text >
                <v-form class="px-3" ref="form" autocomplete="off">
                    <v-select :label="this.$t('partners.event.contact')" v-model="eventItem.contactid" :items="contacts" prepend-icon="face" item-text="name" item-value="id"></v-select>
                    <!-- <v-text-field :label="this.$t('partners.event.contact')" v-model="eventItem.contactid" prepend-icon="person"></v-text-field> -->
                    
                    <v-select :label="this.$t('partners.event.contactType')" v-model="eventItem.contactType" :items="contactTypes" prepend-icon="email" item-text="name" item-value="value"></v-select>

                    <!-- <v-text-field :label="this.$t('partners.event.contactType')" v-model="eventItem.contactType" prepend-icon="email" ></v-text-field> -->

                    <v-menu ref="menu" v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" lazytransition="scale-transition" offset-y full-width min-width="290px" >
                        <template v-slot:activator="{ on }">
                        <v-text-field :value="computedEventFormatted" :label="timeTitle" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="timeMenu = false"></v-date-picker>
                    </v-menu>


                    <v-textarea :label="this.$t('partners.event.description')" v-model="eventItem.description"  prepend-icon="comment" ></v-textarea>
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
            eventItem: { id: 0, partnerid: 0, contactid: 0, contactType: 0, eventtime: 0, description: ''},
            partnerid: 0,
            timeMenu: false,
            date: null
        }
    },
    computed:{

        timeTitle()
        {
            return this.$t('partners.event.eventtime');
        },
        
        title() {
            if (this.eventItem.id != 0) 
                return this.$t('partners.event.edit', { "id": this.eventItem.id }) 
            
            return this.$t('partners.event.add') 
        },

        inputNameRules()
        {
            return [
                v => (v && v.length >= 3) || this.$t('minLength', {'chars': 3} ),
                v => (v && v.length <= 32) || this.$t('maxLength', {'chars': 32} )
            ]
        },

        computedEventFormatted () {
            if (this.date)
                return new Date(this.date).toLocaleDateString(this.cultureInfo);
            
            return new Date().toLocaleDateString(this.cultureInfo);
        },

        contacts () {
            const contactinfo = this.$store.getters.CONTACTINFO;
            if (contactinfo && contactinfo.items)
            {
                return contactinfo.items
            };

            return []
        },

        contactTypes() {
            const contact = this.currentContact;

            if (contact)
            {
                return [
                    // { name: '', value: 0 },
                    { name: this.$t('partners.contact.email') + ': ' + contact.email, value: 1 },
                    { name: this.$t('partners.contact.phone') + ': ' + contact.phone, value: 2 },
                    { name: this.$t('partners.contact.skype') + ': ' + contact.skype, value: 3 },
                    { name: this.$t('partners.contact.telegram') + ': ' + contact.telegram, value: 4 },
                    { name: this.$t('partners.contact.whatsapp') + ': ' +  contact.whatsapp, value: 5 }
                ]
            }

            return []
        },

        currentContact () {
            const contactinfo = this.$store.getters.CONTACTINFO;
            if (contactinfo && contactinfo.items)
            {
                const contact = contactinfo.items.find(i => {
                    return i.id == this.eventItem.contactid
                });

                return contact
            };

            return null
        }
    }
    ,
    methods: {

        submit() {
            if (this.$refs.form.validate()) {   
                this.eventItem.eventtime =  Math.trunc(new Date(this.date).getTime() / 1000)
                this.show = false
                this.$emit('accept', this.eventItem)
            }
        },

        resetValidation() {
            this.$refs.form.resetValidation()
        },

        showForm(contact, partner_id) {
            if (contact) {
                this.eventItem = Object.assign({}, contact)
            } 
            else {
                this.eventItem = { id: 0, partnerid: 0, contactId: 0, contactType: 0, eventtime: Math.trunc(new Date().getTime() / 1000), description: ''}
            } 

            this.date = new Date(this.eventItem.eventtime*1000).toISOString().substr(0, 10)

            this.show = true
            this.$refs.form.resetValidation()
        },

        getDate(value)
        {
            if (value == 0) return '';

            return new Date(value*1000).toLocaleDateString(this.cultureInfo);
        },

    }
    
}
</script>