<template>
  <v-app>
    <NavBar />
    <SideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1>Services</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="search" label="Search" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table :headers="headers" :items="filteredServices" class="elevation-1">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="showService(item)">mdi-eye</v-icon>
                <v-icon @click="editService(item)">mdi-pencil</v-icon>
                <v-icon @click="deleteService(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark @click="dialog = true">New Service</v-btn>
            </template>
            <v-card>
              <v-card-title>{{ editMode ? 'Edit Service' : 'New Service' }}</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="saveService">
                  <v-text-field v-model="form.name" label="Name"></v-text-field>
                  <v-textarea v-model="form.description" label="Description"></v-textarea>
                  <v-text-field v-model="form.price" label="Price"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveService">{{ editMode ? 'Update' : 'Save' }}</v-btn>
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
  name: 'Services',
  components: {
    NavBar,
    SideBar,
  },
  setup() {
    const isSidebarOpen = ref(true);
    const services = ref([]);
    const dialog = ref(false);
    const form = ref({
      name: '',
      description: '',
      price: ''
    });
    const search = ref('');
    const editMode = ref(false);

    const headers = [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false }
    ];

    // Fetch services from API
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        response.data = [
          { id: 1, name: 'Dry Cleaning', description: 'Professional dry cleaning services.', price: '15.00' },
          { id: 2, name: 'Laundry', description: 'Complete laundry services.', price: '10.00' },
          { id: 3, name: 'Alterations', description: 'Clothing alteration services.', price: '20.00' }
        ];
        services.value = response.data;
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    // Initial fetch of services
    fetchServices();

    // Computed property to filter services based on search input
    const filteredServices = computed(() => {
      return services.value.filter(service =>
        service.name.toLowerCase().includes(search.value.toLowerCase()) ||
        service.description.toLowerCase().includes(search.value.toLowerCase()) ||
        service.price.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    // Function to save or update service
    const saveService = async () => {
      try {
        if (!editMode.value) {
          // Create new service
          form.value.id = services.value.length + 1; // Dummy ID generation
          services.value.push({ ...form.value });
        } else {
          // Update existing service
          const index = services.value.findIndex(serv => serv.id === form.value.id);
          if (index !== -1) {
            services.value[index] = { ...form.value };
          }
        }
        closeDialog();
      } catch (error) {
        console.error('Error saving service:', error);
      }
    };

    // Function to delete service
    const deleteService = (service) => {
      services.value = services.value.filter(serv => serv.id !== service.id);
    };

    // Function to open edit dialog
    const editService = (service) => {
      form.value = { ...service };
      editMode.value = true;
      dialog.value = true;
    };

    // Function to open show service view
    const showService = (service) => {
      router.push({ name: 'ShowService', params: { id: service.id } });
    };

    // Function to close dialog
    const closeDialog = () => {
      form.value = { name: '', description: '', price: '' };
      editMode.value = false;
      dialog.value = false;
    };

    return {
      isSidebarOpen,
      services,
      dialog,
      form,
      search,
      headers,
      filteredServices,
      saveService,
      deleteService,
      editService,
      showService,
      closeDialog
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>