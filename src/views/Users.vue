<template>
<div class="dashboard">
  <h1>Users</h1>


  <v-container class="my-5">


    <v-toolbar flat color="white">
      <v-toolbar-title>Users</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      
      <v-btn color="primary" dark @click="fillusers">
        Refresh
      </v-btn>
      
      <v-btn color="primary" dark>
        New user
      </v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="users" :loading="loading" :total-items="totalitems" :pagination.sync="pagination" @update:pagination="updatepagination">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.contacts }}</td>
        <td class="text-xs-right">{{ props.item.role }}</td>
        <td class="text-xs-right">{{ props.item.activity }}</td>
        <td class="text-xs-right">{{ props.item.partners }}</td>
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
        <v-btn color="primary" @click="fillusers">Reset</v-btn>
      </template>
    </v-data-table>

  </v-container>

</div>
</template>

<script>
import api from '@/api/api'

  export default {
    data: () => ({
      totalitems: 0,
      pagination: { rowsPerPage: 10},
      loading: false,
      dialog: false,
      expand: false,
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Name', align: 'right', value: 'name' },
        { text: 'Contacts', align: 'right', value: 'contacts' },
        { text: 'Role', align: 'right', value: 'role' },
        { text: 'Last Activity', align: 'right', value: 'activity' },
        { text: 'Partners', align: 'right', value: 'partners' },
        { text: 'Actions', align: 'right', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

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
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.fillusers()
    },

    methods: {
      updatepagination()
      {
        this.fillusers()
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
        if (confirm(this.$t('deleteUser', { userName: item.name })))
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
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },


      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.overdue {
  background: tomato;
}

</style>