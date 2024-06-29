<template>
    <v-app>
      <NavBar/>
      <SideBar :isOpen="isSidebarOpen"/>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Edit Customer</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Edit Customer</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="saveCustomer">
                    <v-text-field v-model="form.name" label="Name"></v-text-field>
                    <v-text-field v-model="form.email" label="Email"></v-text-field>
                    <v-text-field v-model="form.phone" label="Phone"></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="goBack">Cancel</v-btn>
                      <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
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
    name: 'EditCustomer',
    components: {
      NavBar,
      SideBar,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const isSidebarOpen = ref(true);
      const form = ref({
        id: route.params.id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      });
  
      const saveCustomer = () => {
        console.log('Customer saved', form.value);
        router.push({ name: 'Customers' });
      };
  
      const goBack = () => {
        router.push({ name: 'Customers' });
      };
  
      return {
        isSidebarOpen,
        form,
        saveCustomer,
        goBack,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>  