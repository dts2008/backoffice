<template>
  <v-dialog max-width="600px" >
        <v-btn flat slot="activator" class="success">Add new project</v-btn>
        <v-card>
            <v-card-title>
                <h2>{{ this.$t('editUserDialog') }}</h2>
            </v-card-title>
            <v-card-text >
                <v-form class="px-3" ref="form">
                    <v-text-field label="Name" v-model="title" prepend-icon="folder" :rules="inputRules">
                    </v-text-field>
                    <v-textarea label="Information" v-model="content"  prepend-icon="edit" :rules="inputRules">
                    </v-textarea>

                    <v-menu>
                        <v-text-field :value="due" slot="activator" label="Due day" prepend-icon="date_range"></v-text-field>
                        <v-date-picker v-model="due" offset-y>
                        </v-date-picker>
                    </v-menu>
                    <v-spacer></v-spacer>

                    <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Project</v-btn>
                </v-form>    
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script>

export default {
    data(){
        return {
            title: '',
            content: '',
            isShowDialog: null,
            loading: false,
            due: null,
            inputRules: [
                v => v.length >= 3 || 'Minimum lenght is 3 characters',
                v => v.length <= 10 || 'Maximum lenght is 10 characters'
            ],
        }
    },
    computed:{
        _show()
        {
            return this.isShowDialog === null ? this.showDialog : this.isShowDialog
        }
    }
    ,
    props:{
        showDialog: Boolean
    }
    ,
    methods: {
        submit()
        {
            if (this.$refs.form.validate())
            {   
                this.isShowDialog = false;
                //showDialog = false
            }
        }
    }
}
</script>