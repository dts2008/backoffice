<template>
<div class="partners">
  <v-container >
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t('pages.partners') }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      
      <FPartnerInfo ref="fpartnerinfo" @accept="accept"/>
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
        <td class="text-xs-right">{{ props.item.manager }}</td>
        <td class="text-xs-right">{{ new Date(props.item.added*1000).toLocaleString(cultureInfo) }}</td>
        
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

  </v-container>

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
      cultureInfo: 'en-US'
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
      getStatus(status)
      {
        if (status == 1) return this.$t('partners.statuses.inprocess'); 
        if (status == 2) return this.$t('partners.statuses.working');
        if (status == 3) return this.$t('partners.statuses.rejected');
        
        return this.$t('partners.statuses.new')
      },

      fillpartners()
      {
        this.loading = true;
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        api.get('partnerinfo', page, rowsPerPage, sortBy, descending).then((result) => {
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
        this.$refs.fpartnerinfo.showForm(item)
      },
      
      accept(item)
      {
          this.loading = true;

          api.update('partnerinfo', item).then((result) => {
              this.fillpartners()
            }  
          ).catch((e) => {
            this.loading = false;
          });
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
</style>