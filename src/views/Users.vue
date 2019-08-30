<template>
<div class="users">
  <!-- <v-container > -->
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t('pages.users') }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      
      <FUserInfo ref="fuserinfo" @accept="accept"/>
      <v-btn color="primary" dark @click="fillusers">
        {{ $t('refresh') }}
      </v-btn>

      <v-btn color="primary" dark class="success" @click="editItem ()">
        {{ $t('add') }}
      </v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="users" :loading="loading" :total-items="totalitems" :pagination.sync="pagination" @update:pagination="fillusers">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.login }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ getRole(props.item.role) }}</td>
        <td class="text-xs-right">{{ getActivity(props.item.activity) }}</td>
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
        <v-btn color="primary" @click="fillusers">{{ $t('refresh') }}</v-btn>
      </template>
    </v-data-table>

  <!-- </v-container> -->

</div>
</template>

<script>
import api from '@/api/api'
import FUserInfo from "@/components/FUserInfo"

  export default {
    data: () => ({
      totalitems: 0,
      pagination: { rowsPerPage: 10},
      loading: false,
      cultureInfo: 'en-US',
      userOrigin: null
}),

    components: {
        FUserInfo
    },

    computed: {

      users () {
        const users = this.$store.getters.USERINFO;
        if (users && users.items)
        {
            this.totalitems = users.total_items

            return users.items;
        }

        return []
      },

      headers() {
        return [
          { text: '#Id', align: 'left', value: 'id' },
          { text: this.$t('login'), align: 'right', value: 'login' },
          { text: this.$t('name'), align: 'right', value: 'name' },
          { text: this.$t('role'), align: 'right', value: 'role' },
          { text: this.$t('lastActivity'), align: 'right', value: 'activity' },
          { text: this.$t('actions'), align: 'center', value: 'name', sortable: false }
        ]
      }
    },

    created () {
      this.cultureInfo = window.navigator.userLanguage || window.navigator.language
    },

    methods: {
      getActivity(activity)
      {
        if (activity == 0) return '';

        return new Date(activity*1000).toLocaleString(this.cultureInfo);
      },

      getRole(role)
      {
        if (role == 1) return this.$t('users.roles.admin')
        if (role == 2) return this.$t('users.roles.manager')
        return this.$t('users.roles.user')
      },

      fillusers()
      {
        this.loading = true;
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        api.get('userinfo', page, rowsPerPage, sortBy, descending).then((result) => {
              this.loading = false;
            }  
          ).catch((e) => {
            this.loading = false;
          });
      },

      deleteItem (item) {
        if (confirm(this.$t('users.delete', { userName: item.name })))
        {
          this.loading = true;

          api.delete('userinfo', item).then((result) => {
              this.fillusers()
            }  
          ).catch((e) => {
            this.loading = false;
          });
        }
      },

      editItem (item) {
        this.userOrigin = item
        this.$refs.fuserinfo.showForm(item)
      },
      
      accept(item)
      {
        if (item.id != 0 && 
          this.userOrigin.name == item.name &&
          this.userOrigin.login == item.login &&
          (this.userOrigin.password == item.password || item.password == null) &&
          this.userOrigin.email == item.email &&
          this.userOrigin.contacts == item.contacts &&
          this.userOrigin.role == item.role)
        {
          return
        }

        this.loading = true;

        api.update('userinfo', item).then((result) => {
            this.fillusers()
          }  
        ).catch((e) => {
          this.loading = false;
        });
      }
    }
  }
</script>