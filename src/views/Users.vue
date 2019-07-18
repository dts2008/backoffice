<template>
<div class="dashboard">
  <h1>Users</h1>


  <v-container class="my-5">


    <v-toolbar flat color="white">
      <v-toolbar-title>Users</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>        
      </template>
    </v-toolbar>

    <v-data-table :headers="headers" :items="desserts" :loading="loading">
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
      loading: false,
      dialog: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Contacts', value: 'contacts' },
        { text: 'Role', value: 'role' },
        { text: 'Last Activity', value: 'activity' },
        { text: 'Partners', value: 'partners' },
        { text: 'Actions', value: 'name', sortable: false }
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
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      users () {
        return this.$store.getters.USERS
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
      fillusers()
      {
        this.loading = true;
        
        console.log(this.$api);
        api.getusers().then((result) => {
              this.loading = false;
            }  
          ).catch((e) => {
            console.log('get users - logs catch');
          });
      },

      initialize () {

        this.desserts = [
          {
            name: 'Frozen Yogurt',
            contacts: 159,
            role: 6.0,
            activity: 24,
            partners: 4.0
          },
          {
            name: 'Ice cream sandwich',
            contacts: 237,
            role: 9.0,
            activity: 37,
            partners: 4.3
          },
          {
            name: 'Eclair',
            contacts: 262,
            role: 16.0,
            activity: 23,
            partners: 6.0
          },
          {
            name: 'Cupcake',
            contacts: 305,
            role: 3.7,
            activity: 67,
            partners: 4.3
          },
          {
            name: 'Gingerbread',
            contacts: 356,
            role: 16.0,
            activity: 49,
            partners: 3.9
          },
          {
            name: 'Jelly bean',
            contacts: 375,
            role: 0.0,
            activity: 94,
            partners: 0.0
          },
          {
            name: 'Lollipop',
            contacts: 392,
            role: 0.2,
            activity: 98,
            partners: 0
          },
          {
            name: 'Honeycomb',
            contacts: 408,
            role: 3.2,
            activity: 87,
            partners: 6.5
          },
          {
            name: 'Donut',
            contacts: 452,
            role: 25.0,
            activity: 51,
            partners: 4.9
          },
          {
            name: 'KitKat',
            contacts: 518,
            role: 26.0,
            activity: 65,
            partners: 7
          }
        ]
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