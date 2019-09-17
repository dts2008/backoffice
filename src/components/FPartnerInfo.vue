<template>
<div>
<!-- <v-dialog v-model="show" max-width="600px" > -->
        <!-- <v-card v-model="show" > -->
        <!-- <v-card-text > -->
        <FContactInfo ref="fcontactinfo" @accept="acceptContact"/>
        <FPartnerFileInfo ref="fpartnerfileinfo" @accept="acceptFile"/>
        <FEventInfo ref="feventinfo" @accept="acceptEvent"/>
        

        <v-toolbar dark dense color="blue-grey darken-1">
            <v-btn icon dark @click="close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <span></span>
              <v-btn dark flat text @click="submit">{{ this.$t('accept') }}</v-btn>
            </v-toolbar-items>
          </v-toolbar>

<v-tabs flat v-model="currentPage" >
      <v-tab>{{ $t('partners.commonInfo') }}</v-tab>
		  <v-tab :disabled="partnerItem == null || partnerItem.id == 0">{{ $t('partners.contacts') }}</v-tab>
		  <v-tab :disabled="partnerItem == null || partnerItem.id == 0">{{ $t('partners.files') }}</v-tab>
          <v-tab :disabled="partnerItem == null || partnerItem.id == 0">{{ $t('partners.events') }}</v-tab>
		
	<v-tab-item>
<v-form class="px-5 mt-5" ref="form" autocomplete="off">
                    <!-- <span>&nbsp;</span> -->
                    <!-- <v-container> -->
                    <!-- <v-container> -->
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label="this.$t('partners.name')" v-model="partnerItem.name" prepend-icon="business" :rules="inputNameRules" ></v-text-field>
                            </v-flex>
                            <v-flex  xs12 sm6 md4>
                            <v-text-field :label="this.$t('partners.website')" v-model="partnerItem.website" prepend-icon="web" ></v-text-field>
                            </v-flex>
                            <v-flex  xs12 sm6 md4>
                            <v-select :label="this.$t('partners.status')" v-model="partnerItem.status" :items="status" prepend-icon="history" item-text="name" item-value="value"></v-select>
                            </v-flex>
                        </v-layout>
                    <!-- </v-container> -->

                    <!-- <v-container> -->
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4>
                                <v-select :label="this.$t('partners.clientType')" v-model="partnerItem.clientType" :items="clientTypes" prepend-icon="face" item-text="name" item-value="value"></v-select>
                            </v-flex>
                            <v-flex  xs12 sm6 md4>
                                <v-select :label="this.$t('partners.currency')" v-model="partnerItem.currency" :items="currencies" prepend-icon="attach_money" item-text="name" item-value="value"></v-select>
                            </v-flex>

                            <v-flex  xs12 sm6 md4>
                                <v-menu  ref="menu" v-model="nextContactMenu" :close-on-content-click="false" :nudge-right="40" lazytransition="scale-transition" offset-y full-width min-width="290px" >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field :disabled="partnerItem.status == 2 || partnerItem.status == 3" :value="computedEventFormatted" :label="nextContactTitle" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                <v-date-picker v-model="nextContactDate" @input="nextContactMenu = false"></v-date-picker>
                            </v-menu>
                            </v-flex>
                        </v-layout>
                    <!-- </v-container> -->

                    

                    <v-textarea :label="this.$t('partners.description')" v-model="partnerItem.description"  prepend-icon="edit" ></v-textarea>

                    <!-- </v-container>

                    <div v-if="partnerItem.id != 0">
                    

                    
                    </div> -->
                </v-form>
    </v-tab-item>

	<v-tab-item>
<v-toolbar flat color="white">
                    <!-- <v-toolbar-title>{{ $t('partners.contacts') }}</v-toolbar-title> -->
                    <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark @click="fillcontacts">{{ $t('refresh') }}</v-btn>
                    <v-btn color="primary" dark class="success" @click="editContact ()">{{ $t('add') }}</v-btn>
                    </v-toolbar>

                    <v-data-table :headers="contactHeaders" :items="contacts" :loading="contactLoading" :total-items="contactTotal" :pagination.sync="contactPagination" @update:pagination="fillcontacts">
                        <template v-slot:items="props">
                            <td>{{ props.item.id }}</td>
                            <td class="text-xs-right">{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.email }}</td>
                            <td class="text-xs-right">{{ props.item.phone }}</td>
                            <td class="text-xs-right">{{ props.item.skype }}</td>
                            <td class="text-xs-right">{{ props.item.telegram }}</td>
                            <td class="text-xs-right">{{ props.item.whatsapp }}</td>
                            
                            <td class="justify-center layout px-0">
                            <v-icon small class="mr-2" @click="editContact(props.item)">
                                edit
                            </v-icon>
                            <v-icon small @click="deleteContact(props.item)">
                                delete
                            </v-icon>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="fillcontacts">{{ $t('refresh') }}</v-btn>
                        </template>
                    </v-data-table>
    </v-tab-item>
	
    <v-tab-item>
        <!-- Files -->
                    <v-toolbar flat color="white">
                    <!-- <v-toolbar-title>{{ $t('partners.files') }}</v-toolbar-title> -->
                    <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark @click="fillFiles">{{ $t('refresh') }}</v-btn>
                    <v-btn color="primary" dark class="success" @click="editFiles ()">{{ $t('add') }}</v-btn>
                    </v-toolbar>

                    <v-data-table :headers="fileHeaders" :items="files" :loading="fileLoading" :total-items="fileTotal" :pagination.sync="filePagination" @update:pagination="fillFiles">
                        <template v-slot:items="props">
                            <td>{{ props.item.id }}</td>
                            <td class="text-xs-right">{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.description }}</td>
                            <td class="text-xs-right">{{ props.item.size }}</td>
                            <td class="text-xs-right">{{ getDateTime(props.item.added) }}</td>

                            
                            
                            <td class="justify-center layout px-0">
                            <v-icon small class="mr-2" @click="downloadFiles(props.item)">
                                cloud_download
                            </v-icon>
                            <v-icon small class="mr-2" @click="editFiles(props.item)">
                                edit
                            </v-icon>
                            <v-icon small @click="deleteFile(props.item)">
                                delete
                            </v-icon>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="fillFiles">{{ $t('refresh') }}</v-btn>
                        </template>
                    </v-data-table>
    </v-tab-item>
    
    <v-tab-item>
        <v-toolbar flat color="white">
                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark @click="fillEvents">{{ $t('refresh') }}</v-btn>
                    <v-btn color="primary" dark class="success" @click="editEvent ()">{{ $t('add') }}</v-btn>
                    </v-toolbar>

                    <v-data-table :headers="eventHeaders" :items="events" :loading="eventLoading" :total-items="eventTotal" :pagination.sync="eventPagination" @update:pagination="fillEvents">
                        <template v-slot:items="props">
                            <td>{{ props.item.id }}</td>
                            <td class="text-xs-right">{{ getContact(props.item.contactid) }}</td>
                            <td class="text-xs-left">{{ contactType(props.item) }}</td>
                            <td class="text-xs-right">{{ getDate(props.item.eventtime) }}</td>
                            <td class="text-xs-right">{{ props.item.description.substring(0, 64) }}</td>
                            
                            <td class="justify-center layout px-0">
                            <v-icon small class="mr-2" @click="editEvent(props.item)">
                                edit
                            </v-icon>
                            <v-icon small @click="deleteEvent(props.item)">
                                delete
                            </v-icon>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="fillEvents">{{ $t('refresh') }}</v-btn>
                        </template>
                    </v-data-table>
    </v-tab-item>
	  </v-tabs>

                    
            <!-- </v-card-text> -->
        <!-- </v-card> -->
    <!-- </v-dialog> -->
</div>
</template>

<script>
import api from '@/api/api'
import FContactInfo from '@/components/FContactInfo.vue'
import FPartnerFileInfo from '@/components/FPartnerFileInfo.vue'
import UploadButton from '@/components/UploadButton.vue'
import FEventInfo from '@/components/FEventInfo.vue'


export default {
    data(){
        return {
            cultureInfo: 'en-US',
            content: '',
            show: false,
            loading: false,
            partnerItem: null,
            // partnerItem: { id: 0, name: '', website: '', manager: 0, added: 0, status: 1, description: '' },

            contactTotal: 0,
            contactPagination: { rowsPerPage: 10},
            contactLoading: false,
            contactOrigin: {},

            fileTotal: 0,
            filePagination: { rowsPerPage: 10},
            fileLoading: false,
            fileOrigin: {},

            eventTotal: 0,
            eventPagination: { rowsPerPage: 10},
            eventLoading: false,
            eventOrigin: {},
            currentPage: 0,

            nextContactMenu: false,
            nextContactDate: null
        }
    },

    components: {
        FContactInfo,
        FPartnerFileInfo,
        UploadButton,
        FEventInfo
      },

    props: {
        item : Object
    },

    created() {

        //console.log('created: ' + this.show)

        if (this.item) {
                this.partnerItem = Object.assign({}, this.item)//this.item;//Object.assign({}, partner)
            } 
            else {
                this.partnerItem = { id: 0, name: '', website: '', manager: 0, added: 0, status: 0, description: '', nextContact: 0 }
            }
        
        this.nextContactDate = new Date(this.partnerItem.nextContact*1000).toISOString().substr(0, 10)
    },
    
    computed:{
        nextContactTitle()
        {
            return this.$t('partners.nextContact');
        },

        computedEventFormatted () {
            if (this.nextContactDate)
                return new Date(this.nextContactDate).toLocaleDateString(this.cultureInfo);
            
            return new Date().toLocaleDateString(this.cultureInfo);
        },

        contactHeaders() {
        return [
          { text: '#Id', align: 'left', value: 'id' },
          { text: this.$t('partners.contact.name'), align: 'right', value: 'name' },
          { text: this.$t('partners.contact.email'), align: 'right', value: 'email' },
          { text: this.$t('partners.contact.phone'), align: 'right', value: 'phone' },
          { text: this.$t('partners.contact.skype'), align: 'right', value: 'skype' },
          { text: this.$t('partners.contact.telegram'), align: 'right', value: 'telegram' },
          { text: this.$t('partners.contact.whatsapp'), align: 'right', value: 'whatsapp' },
          { text: this.$t('actions'), align: 'center', value: 'name', sortable: false }
        ]
      },

        contacts () {
            const contactinfo = this.$store.getters.CONTACTINFO;
            if (contactinfo && contactinfo.items)
            {
                this.totalitems = contactinfo.total_items

                return contactinfo.items;
            }

            return []
        },

        events () {
            const eventinfo = this.$store.getters.EVENTINFO;
            if (eventinfo && eventinfo.items)
            {
                this.totalitems = eventinfo.total_items

                return eventinfo.items;
            }

            return []
        },

        eventHeaders() {
            return [
                { text: '#Id', align: 'left', value: 'id' },
                { text: this.$t('partners.event.contact'), align: 'right', value: 'contactid' },
                { text: this.$t('partners.event.contactType'), align: 'right', value: 'contactType' },
                { text: this.$t('partners.event.eventtime'), align: 'right', value: 'eventtime' },
                { text: this.$t('partners.event.description'), align: 'right', value: 'description' },
                { text: this.$t('actions'), align: 'center', value: 'name', sortable: false }
            ]
        },

        fileHeaders() {
            return [
                { text: '#Id', align: 'left', value: 'id' },
                { text: this.$t('partners.file.name'), align: 'right', value: 'name' },
                { text: this.$t('partners.file.description'), align: 'right', value: 'description' },
                { text: this.$t('partners.file.size'), align: 'right', value: 'size' },
                { text: this.$t('partners.file.added'), align: 'right', value: 'added' },
                { text: this.$t('actions'), align: 'center', value: 'name', sortable: false }
            ]
        },

        files () {
            const filesinfo = this.$store.getters.PARTNERFILEINFO;
            if (filesinfo && filesinfo.items)
            {
                this.totalitems = filesinfo.total_items

                return filesinfo.items;
            }

            return []
        },

        title() {
            if (this.partnerItem.id != 0) 
                return this.$t('partners.edit', { "id": this.partnerItem.id }) 
            
            return this.$t('partners.add') 
        },

        status()
        {
            return [
                { name: this.$t('partners.statuses.new'), value: 0 },
                { name: this.$t('partners.statuses.inprocess'), value: 1 },
                { name: this.$t('partners.statuses.working'), value: 2 },
                { name: this.$t('partners.statuses.rejected'), value: 3 },
                { name: this.$t('partners.statuses.postponed'), value: 4 }
            ]
        },

        clientTypes()
        {
            return [
                { name: this.$t('partners.clientTypes.platform'), value: 0 },
                { name: this.$t('partners.clientTypes.agent'), value: 1 },
                { name: this.$t('partners.clientTypes.operator'), value: 2 },
            ]
        },

        currencies()
        {
            return [
                { name: this.$t('partners.currencies.all'), value: 0 },
                { name: this.$t('partners.currencies.fiat'), value: 1 },
                { name: this.$t('partners.currencies.crypto'), value: 2 },
            ]
        },

        inputNameRules()
        {
            return [
                v => (v && v.length >= 3) || this.$t('minLength', {'chars': 3} ),
                v => (v && v.length <= 32) || this.$t('maxLength', {'chars': 256} )
            ]
        }
    }
    ,
    methods: {
        getContactById (contactid) {
            const contactinfo = this.$store.getters.CONTACTINFO;
            if (contactinfo && contactinfo.items)
            {
                const contact = contactinfo.items.find(i => {
                    return i.id == contactid
                });

                return contact
            };

            return null
        },

        contactType(value) {

            let contact = this.getContactById(value.contactid)

            if (contact == null) return ''

            if (value.contactType == 1) return this.$t('partners.contact.email') + ': ' + contact.email;
            if (value.contactType == 2) return this.$t('partners.contact.phone') + ': ' + contact.phone;
            if (value.contactType == 3) return this.$t('partners.contact.skype') + ': ' + contact.skype;
            if (value.contactType == 4) return this.$t('partners.contact.telegram') + ': ' + contact.telegram;
            if (value.contactType == 5) return this.$t('partners.contact.whatsapp') + ': ' +  contact.whatsapp;

            return ''
        },

        getContact(value)
        {
            if (value == null || value == 0) return '';

            const contacts = this.$store.getters.CONTACTINFO;
            if (contacts && contacts.items){
                
                let contact = contacts.items.find(i => {
                return i.id == value
                });

                if (contact)
                    return contact.name
            }

            return '';
        },

        getDateTime(value)
        {
            if (value == 0) return '';

            return new Date(value*1000).toLocaleString(this.cultureInfo);
        },

        getDate(value)
        {
            if (value == 0) return '';

            return new Date(value*1000).toLocaleDateString(this.cultureInfo);
        },

        submit() {
            if (this.$refs.form.validate()) {   
                //this.show = false
                this.partnerItem.nextContact =  Math.trunc(new Date(this.nextContactDate).getTime() / 1000)
                this.$emit('accept', this.partnerItem)
            }
            else this.currentPage = 0
        },
        
        close() {
            this.$emit('close')
        },
        
        resetValidation() {
            this.$refs.form.resetValidation()
        },

        showForm(partner) {
            this.currentPage = 0
            if (partner) {
                this.partnerItem = Object.assign({}, partner)
            } 
            else {
                this.partnerItem = { id: 0, name: '', website: '', manager: 0, added: 0, status: 0, description: '', clientType: 0, currency: 0 }
            }

            //this.show = true
            this.$refs.form.resetValidation()
        },

        fillcontacts()
        {
            this.loading = true;
            const { sortBy, descending, page, rowsPerPage } = this.contactPagination

            api.get('contactinfo', page, rowsPerPage, sortBy, descending, [{"name":"partnerid","value":this.partnerItem.id,"type":0}]).then((result) => {
                this.loading = false;
                }  
            ).catch((e) => {
                this.loading = false;
            });
        },

        editContact (item) {
            this.contactOrigin = item
            this.$refs.fcontactinfo.showForm(item, this.partnerItem.id)
        },
      
        acceptContact(item)
        {
            if (item.id != 0 && this.contactOrigin.name == item.name &&
                this.contactOrigin.email == item.email &&
                this.contactOrigin.phone == item.phone &&
                this.contactOrigin.skype == item.skype &&
                this.contactOrigin.telegram == item.telegram &&
                this.contactOrigin.whatsapp == item.whatsapp &&
                this.contactOrigin.comment == item.comment)
            {
                return;
            }

            this.loading = true;

            api.update('contactinfo', item).then((result) => {
                this.fillcontacts()
                }  
            ).catch((e) => {
                this.loading = false;
            });
        },

        deleteContact(item)
        {
            if (confirm(this.$t('partners.contact.delete', { name: item.name })))
            {
                this.loading = true;

                api.delete('contactinfo', item).then((result) => {
                    this.fillcontacts()
                    }  
                ).catch((e) => {
                    this.loading = false;
                });
            }
        },

        fillFiles()
        {
            this.loading = true;
            const { sortBy, descending, page, rowsPerPage } = this.filePagination

            api.get('partnerfileinfo', page, rowsPerPage, sortBy, descending, [{"name":"partnerid","value":this.partnerItem.id,"type":0}]).then((result) => {
                this.loading = false;
                }  
            ).catch((e) => {
                this.loading = false;
            });
        },

        editFiles (item) {
            this.fileOrigin = item
            this.$refs.fpartnerfileinfo.showForm(item)
        },
      
        acceptFile(item, file)
        {
            item.partnerid = this.partnerItem.id;
            
            if (item.id != 0 && file == null)
            {
                if (item.description == this.fileOrigin.description)
                    return;

                this.loading = true;

                api.update('partnerfileinfo', item).then((result) => {
                    this.fillFiles()
                    this.loading = false;
                    }  
                ).catch((e) => {
                    this.loading = false;
                });
            }
            else
            {
                this.uploadFile(item, file)
            }
        },

        deleteFile(item)
        {
            if (confirm(this.$t('partners.file.delete', { name: item.name })))
            {
                this.loading = true;

                api.delete('partnerfileinfo', item).then((result) => {
                    this.fillcontacts()
                    }  
                ).catch((e) => {
                    this.loading = false;
                });
            }
        },

        uploadFile(item, upladFile)
        {
            this.loading = true;

            api.upload(upladFile, 'partnerfileinfo', item).then((result) => {
                this.loading = false;
                this.fillFiles()
                }  
            ).catch((e) => {
                this.loading = false;
            });
        },

        downloadFiles(item)
        {
            api.download('partnerfileinfo', item.id, item.name)
        },

        // events
        fillEvents()
        {
            this.loading = true;
            const { sortBy, descending, page, rowsPerPage } = this.eventPagination

            api.get('eventinfo', page, rowsPerPage, sortBy, descending, [{"name":"partnerid","value":this.partnerItem.id,"type":0}]).then((result) => {
                this.loading = false;
                }  
            ).catch((e) => {
                this.loading = false;
            });
        },

        editEvent(item) {
            this.eventOrigin = item
            this.$refs.feventinfo.showForm(item)
        },
      
        acceptEvent(item, file)
        {
            item.partnerid = this.partnerItem.id;
            
            if (item.id != 0 && this.eventOrigin.contactId == item.contactId &&
                this.eventOrigin.contactType == item.contactType &&
                this.eventOrigin.eventtime == item.eventtime &&
                this.eventOrigin.description == item.description)
            {
                return;
            }

            this.loading = true;

            api.update('eventinfo', item).then((result) => {
                this.fillEvents()
                this.loading = false;
                }  
            ).catch((e) => {
                console.log(e);
                this.loading = false;
            });
        },

        deleteEvent(item)
        {
            if (confirm(this.$t('partners.file.delete', { name: item.name })))
            {
                this.loading = true;

                api.delete('eventinfo', item).then((result) => {
                    this.fillEvents()
                    }  
                ).catch((e) => {
                    this.loading = false;
                });
            }
        },
    }
}
</script>