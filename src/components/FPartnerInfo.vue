<template>
<div>
<!-- <v-dialog v-model="show" max-width="600px" > -->
        <!-- <v-card v-model="show" > -->
        <!-- <v-card-text > -->
        <FContactInfo ref="fcontactinfo" @accept="acceptContact"/>
        <FPartnerFileInfo ref="fpartnerfileinfo" @accept="acceptFile"/>
        

        <v-toolbar dark color="primary">
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

                <v-form class="px-3" ref="form" autocomplete="off">
                    <!-- <span>&nbsp;</span> -->
                    <v-container>
                    <!-- <v-container> -->
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label="this.$t('partners.name')" v-model="partnerItem.name" prepend-icon="business" ></v-text-field>
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
                        </v-layout>
                    <!-- </v-container> -->

                    <v-textarea :label="this.$t('partners.description')" v-model="partnerItem.description"  prepend-icon="edit" ></v-textarea>

                    </v-container>

                    <div v-if="partnerItem.id != 0">
                    <v-toolbar flat color="white">
                    <v-toolbar-title>{{ $t('partners.contacts') }}</v-toolbar-title>
                    <v-divider class="mx-2" inset vertical></v-divider>
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

                    <!-- Files -->
                    <v-toolbar flat color="white">
                    <v-toolbar-title>{{ $t('partners.files') }}</v-toolbar-title>
                    <v-divider class="mx-2" inset vertical></v-divider>
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
                            <td class="text-xs-right">{{ new Date(props.item.added*1000).toLocaleString(cultureInfo) }}</td>

                            
                            
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
                    </div>
                </v-form>    
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
            fileOrigin: {}

        }
    },

    components: {
        FContactInfo,
        FPartnerFileInfo,
        UploadButton
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
                this.partnerItem = { id: 0, name: '', website: '', manager: 0, added: 0, status: 1, description: '' }
            }
    },
    
    computed:{
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
        submit() {
            if (this.$refs.form.validate()) {   
                //this.show = false
                this.$emit('accept', this.partnerItem)
            }
        },
        
        close() {
            this.$emit('close')
        },
        
        resetValidation() {
            this.$refs.form.resetValidation()
        },

        showForm(partner) {
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
            item.partnerId = this.partnerItem.id;
            
            if (item.id != 0 && file == null)
            {
                if (item.description == this.fileOrigin.description)
                    return;

                this.loading = true;

                api.update('partnerfileinfo', item).then((result) => {
                    this.fillFiles()
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
        }

    }
}
</script>