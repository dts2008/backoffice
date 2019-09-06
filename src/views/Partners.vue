<template>
<div class="partners">
  <!-- <transition name="fade" v-if="edit" :duration="1000"> -->
  <FPartnerInfo ref="fpartnerinfo" @accept="accept" @close="close" :item="partnerOrigin" v-if="edit"/>
  <!-- </transition> -->
  <div v-else>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t('pages.partners') }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      
      <!-- <FPartnerInfo ref="fpartnerinfo" @accept="accept"/> -->
      <v-btn color="primary" dark @click="fillpartners">
        {{ $t('refresh') }}
      </v-btn>

      <v-btn color="primary" dark class="success" @click="editItem ()">
        {{ $t('add') }}
      </v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="partners" :loading="loading" :total-items="totalitems" :pagination.sync="pagination" @update:pagination="fillpartners">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.website }}</td>
        <td class="text-xs-right">{{ getManager(props.item.manager) }}</td>
        <td class="text-xs-right">{{ getDateTime(props.item.added) }}</td>
        
        <td class="text-xs-right">
        <v-chip small :class="`partners status${props.item.status}`">{{ getStatus(props.item.status) }}</v-chip>
        </td>
        
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fillpartners">{{ $t('refresh') }}</v-btn>
      </template>
    </v-data-table>

  </div>

</div>
</template>

<script>
import api from '@/api/api'
import FPartnerInfo from "@/components/FPartnerInfo"

  export default {
    data: () => ({
      totalitems: 0,
      pagination: { rowsPerPage: 10},
      loading: false,
      cultureInfo: 'en-US',
      edit: false,
      partnerOrigin: null
    }),

    components: {
        FPartnerInfo
      },

    computed: {
      
      partners () {
        const partners = this.$store.getters.PARTNERINFO;
        if (partners && partners.items)
        {
            this.totalitems = partners.total_items

            return partners.items;
        }

        return []
      },

      headers() {
        return [
          { text: '#Id', align: 'left', value: 'id' },
          { text: this.$t('partners.name'), align: 'right', value: 'name' },
          { text: this.$t('partners.website'), align: 'right', value: 'website' },
          { text: this.$t('partners.manager'), align: 'right', value: 'manager' },
          { text: this.$t('partners.added'), align: 'right', value: 'added' },
          { text: this.$t('partners.status'), align: 'right', value: 'status' },
          { text: this.$t('actions'), align: 'center', value: 'name', sortable: false }
        ]
      }
    },

    created () {
      this.cultureInfo = window.navigator.userLanguage || window.navigator.language
    },

    methods: {
      getDateTime(value)
      {
        if (value == 0) return '';

        return new Date(value*1000).toLocaleString(this.cultureInfo);
      },

      getManager(manager){
         const partner = this.$store.getters.PARTNERINFO;
         if (partner && partner.dependence && partner.dependence.userinfo){
            
            let user = partner.dependence.userinfo.find(i => {
              return i.id == manager
            });

            if (user)
              return user.name
         }

          return ''
      },

      getStatus(status)
      {
        if (status == 1) return this.$t('partners.statuses.inprocess'); 
        if (status == 2) return this.$t('partners.statuses.working');
        if (status == 3) return this.$t('partners.statuses.rejected');
        if (status == 4) return this.$t('partners.statuses.postponed');
        
        return this.$t('partners.statuses.new')
      },

      fillpartners()
      {
        this.loading = true;
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        api.get('partnerinfo', page, rowsPerPage, sortBy, descending, null, 1).then((result) => {
              this.loading = false;
            }  
          ).catch((e) => {
            this.loading = false;
          });
      },

      deleteItem (item) {
        if (confirm(this.$t('partners.delete', { partnerName: item.name })))
        {
          this.loading = true;

          api.delete('partnerinfo', item).then((result) => {
              this.fillpartners()
            }  
          ).catch((e) => {
            this.loading = false;
          });
        }
      },

      editItem (item) {
        //console.log('edit')
        //console.log(item)
        this.partnerOrigin = item
        this.edit = true
        //console.log(this.$refs)
        //console.log(this.$refs.fpartnerinfo)
        //this.$refs.fpartnerinfo.showForm(item)
      },
      
      close () {
        this.edit = false
        //this.$refs.fpartnerinfo.showForm(item)
      },
      
      accept(item)
      {
        if (item.id != 0 && item.name == this.partnerOrigin.name &&
            item.website == this.partnerOrigin.website &&
            item.manager == this.partnerOrigin.manager &&
            item.added == this.partnerOrigin.added &&
            item.status == this.partnerOrigin.status &&
            item.description == this.partnerOrigin.description &&
            item.clientType == this.partnerOrigin.clientType &&
            item.currency == this.partnerOrigin.currency)
        {
          
        }
        else
        {
          this.loading = true;

          api.update('partnerinfo', item).then((result) => {
              this.fillpartners()
            }  
          ).catch((e) => {
            //this.loading = false;
          });
        }

        this.edit = false
      }
    }
  }
</script>

<style>
.partners.status0 {
  background: #3cd1c2;
}
.partners.status1 {
  background: orange;
}
.partners.status2 {
  background: rgb(0, 247, 0);
}
.partners.status3 {
  background: tomato;
}
.partners.status4 {
  background: grey;
}
</style>