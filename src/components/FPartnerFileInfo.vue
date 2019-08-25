<template>
      <v-dialog v-model="show" max-width="600px" persistent>
        <v-card>
            <v-card-title>
                <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-text >
                <v-form class="px-3" ref="form" autocomplete="off">
                    <v-text-field :label="this.$t('partners.file.description')" v-model="fileItem.description" prepend-icon="person"></v-text-field>
                    
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs9>
                                <v-text-field :label="this.$t('partners.file.fileName')" type="text" v-model="fileName" readonly></v-text-field>
                            </v-flex>
                            <v-flex  xs3>
                                <button type="button" class="success v-btn theme--dark primary">
                                    <div class="v-btn__content">
                                        <upload-button class="theme--light" title="Browse" :selectedCallback="fileSelectedFunc" prepend-icon="cloud_download"></upload-button>
                                    </div>
                                </button>
                            </v-flex>
                        </v-layout>
                    </v-container>

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
import api from '@/api/api'
import UploadButton from '@/components/UploadButton.vue'

export default {
    data(){
        return {
            content: '',
            show: false,
            loading: false,
            fileItem: { id: 0, description: '', added: 0 },
            uploadFile: null,
            disableUpload: true,
            fileName: ''
        }
    },

    components: {
        UploadButton
      },

    computed:{
        
        title() {
            if (this.fileItem.id != 0) 
                return this.$t('partners.file.edit', { "id": this.fileItem.id }) 
            
            return this.$t('partners.file.add') 
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
                this.$emit('accept', this.fileItem, this.uploadFile)
            }
        },

        resetValidation() {
            this.$refs.form.resetValidation()
        },

        showForm(file) {
            if (file) {
                this.fileItem = Object.assign({}, file)
                this.fileName = file.name
            } 
            else {
                this.fileItem = { id: 0, description: '', added: 0}
                this.fileName = ''
            }

            this.show = true
            this.$refs.form.resetValidation()
        },

        fileSelectedFunc(file)
        {
            this.uploadFile = file

            if (file)
            {
                this.fileName = file.name
                this.disableUpload = false;
            }
            else
            {
                this.disableUpload = true;
            }
        }
    }
}
</script>