<template>
    <v-app>
      <NavBar/>
      <SideBar :isOpen="isSidebarOpen"/>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Customer Details</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>{{ customer.name }}</v-card-title>
                <v-card-text>
                  <p><strong>Email:</strong> {{ customer.email }}</p>
                  <p><strong>Phone:</strong> {{ customer.phone }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="goBack">Back</v-btn>
                  <v-btn color="primary" @click="editCustomer">Edit</v-btn>
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
  import NavBar from '../NavBar.vue';
  import SideBar from '../SideBar.vue';
  
  export default {
    name: 'CustomerShow',
    components: {
      NavBar,
      SideBar,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const isSidebarOpen = ref(true);
      const customer = ref({
        id: route.params.id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      });
  
      const goBack = () => {
        router.push({ name: 'Customers' });
      };
  
      const editCustomer = () => {
        router.push({ name: 'EditCustomer', params: { id: customer.value.id } });
      };
  
      return {
        isSidebarOpen,
        customer,
        goBack,
        editCustomer,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>  