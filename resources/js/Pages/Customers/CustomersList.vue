<template>
  <v-app>
    <NavBar/>
    <SideBar/>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1>Πελάτες</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="search" label="Search" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table :headers="headers" :items="filteredCustomers" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Λίστα</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn class="mb-2" color="primary" dark v-bind="props">
                        + Προσθήκη
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" md="4" sm="6">
                              <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                              <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                              <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                              <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                              <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark @click="dialog = true">New Customer</v-btn>
            </template>
            <v-card>
              <v-card-title>{{ editMode ? 'Edit Customer' : 'New Customer' }}</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="saveCustomer">
                  <v-text-field v-model="form.name" label="Name"></v-text-field>
                  <v-text-field v-model="form.email" label="Email"></v-text-field>
                  <v-text-field v-model="form.phone" label="Phone"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveCustomer">{{ editMode ? 'Update' : 'Save' }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import NavBar from '../NavBar.vue';
import SideBar from '../SideBar.vue';
import router from '../../routers/routers';

export default {
  name: 'CustomersList',
  components: {
    NavBar,
    SideBar,
  },

  data() {
    return {
      customers: [],
      dialog: false,
      dialogDelete: false,
      search: '',
      editMode: false,
      form: {
        name: '',
        email: '',
        phone: ''
      },
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
    };
  },

  mounted() {
    this.fetchCustomers();
  },

  computed: {
    filteredCustomers() {
      return this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.search.toLowerCase()) ||
        customer.phone.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },
  
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('/api/customers');
        response.data = [
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', created_at: 3 },
          { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210', created_at: 1 }
        ];
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },

    saveCustomer() {
      try {
        if (!this.editMode) {
          // Create new customer
          this.form.id = this.customers.length + 1; // Dummy ID generation
          this.customers.push({ ...this.form });
        } else {
          // Update existing customer
          const index = this.customers.findIndex(cus => cus.id === this.form.id);
          if (index !== -1) {
            this.customers[index] = { ...this.form };
          }
        }
        this.closeDialog();
      } catch (error) {
        console.error('Error saving customer:', error);
      }
    },

    customerDelete(customer) {
      this.customers = this.customers.filter(cus => cus.id !== customer.id);
    },

    customerEdit(customer) {
      this.form = { ...customer };
      this.editMode = true;
      this.dialog = true;
    },

    customerShow(customer) {
      router.push({ name: 'CustomerShow', params: { id: customer.id } });
    },

    closeDialog() {
      this.dialog = false;
      this.form = { name: '', email: '', phone: '' };
      this.editMode = false;
    },

    initialize() {
      this.form = { name: '', email: '', phone: '' };
      this.editMode = false;
    },

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.customers.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      } else {
        this.customers.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>