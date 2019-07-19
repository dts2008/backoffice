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
        <td>{{ props.item.name }}</td>
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
        <v-btn color="primary" @click="initialize">Reset</v-btn>
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
      pagination: {},
      loading: false,
      dialog: false,
      expand: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
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
        const users = this.$store.getters.USERS;
        if (users && users.items)
        {
            this.totalitems = users.total_items

            console.log(this.pagination.sortBy)
            
            // if (this.pagination.sortBy) {
                
            //     const sortedUser =  users.items.sort((a, b) => {
            //         const sortA = a[this.pagination.sortB]
            //         const sortB = b[this.pagination.sortB]
              
            //         if (this.pagination.descending) {
            //             if (sortA < sortB) return 1
            //             if (sortA > sortB) return -1
            //             return 0
            //         }
                    
            //         if (sortA < sortB) return -1
            //         if (sortA > sortB) return 1
                    
            //         return 0
            //     })

            //     console.log(sortedUser)
            //     return sortedUser;
            // }

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
      //this.initialize()
      this.fillusers()
    },

    methods: {
      updatepagination()
      {
          //console.log(this.pagination.sortBy);
          //this.fillusers()
      },
      fillusers()
      {
        this.loading = true;
        
        const { sortBy, descending, page, rowsPerPage } = this.pagination
        //const { page, rowsPerPage } = this.pagination
        
        api.getusers(page, rowsPerPage).then((result) => {
              this.loading = false;
              console.log('get users - success');
            }  
          ).catch((e) => {
            console.log('get users - logs catch');
          });
      },

      initialize () {
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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