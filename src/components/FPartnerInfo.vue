<template>
<v-dialog v-model="show" max-width="600px" >
        <v-card>
            <v-card-title>
                <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-text >
                <v-form class="px-3" ref="form" autocomplete="off">
                    <v-text-field :label="this.$t('partners.name')" v-model="partnerItem.name" prepend-icon="folder" ></v-text-field>
                    <v-text-field :label="this.$t('partners.website')" v-model="partnerItem.website" prepend-icon="folder" ></v-text-field>
                    <v-select :label="this.$t('partners.status')" v-model="partnerItem.status" :items="status" item-text="name" item-value="value"></v-select>
                    <v-textarea :label="this.$t('partners.description')" v-model="partnerItem.description"  prepend-icon="edit" >
                    </v-textarea>
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
            partnerItem: { id: 0, name: '', website: '', manager: 0, added: 0, status: 1, description: '' }
        }
    },
    computed:{
        
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
                { name: this.$t('partners.statuses.rejected'), value: 3 }
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
                this.show = false
                this.$emit('accept', this.partnerItem)
            }
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        showForm(partner) {
            if (partner) {
                this.partnerItem = Object.assign({}, partner)
            } 
            else {
                this.partnerItem = { id: 0, name: '', website: '', manager: 0, added: 0, status: 1, description: '' }
            }

            this.show = true
            this.$refs.form.resetValidation()
        }
    }
}
</script>