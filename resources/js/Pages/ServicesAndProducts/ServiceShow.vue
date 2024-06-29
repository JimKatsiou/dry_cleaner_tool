<template>
    <v-app>
      <NavBar />
      <SideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Service Details</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>{{ service.name }}</v-card-title>
                <v-card-text>
                  <p><strong>Description:</strong> {{ service.description }}</p>
                  <p><strong>Price:</strong> {{ service.price }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="goBack">Back</v-btn>
                  <v-btn color="primary" @click="editService">Edit</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import NavBar from './NavBar.vue';
  import SideBar from './SideBar.vue';
  
  export default {
    name: 'ShowService',
    components: {
      NavBar,
      SideBar,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const isSidebarOpen = ref(true);
      const service = ref({
        id: route.params.id,
        name: 'Dry Cleaning',
        description: 'Professional dry cleaning services.',
        price: '15.00'
      });
  
      const goBack = () => {
        router.push({ name: 'Services' });
      };
  
      const editService = () => {
        router.push({ name: 'EditService', params: { id: service.value.id } });
      };
  
      return {
        isSidebarOpen,
        service,
        goBack,
        editService,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  