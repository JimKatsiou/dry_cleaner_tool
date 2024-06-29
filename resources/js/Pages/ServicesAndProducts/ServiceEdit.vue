<template>
    <v-app>
      <NavBar />
      <SideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Edit Service</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Edit Service</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="saveService">
                    <v-text-field v-model="form.name" label="Name"></v-text-field>
                    <v-textarea v-model="form.description" label="Description"></v-textarea>
                    <v-text-field v-model="form.price" label="Price"></v-text-field>
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
    name: 'EditService',
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
        name: 'Dry Cleaning',
        description: 'Professional dry cleaning services.',
        price: '15.00'
      });
  
      const saveService = () => {
        console.log('Service saved', form.value);
        router.push({ name: 'Services' });
      };
  
      const goBack = () => {
        router.push({ name: 'Services' });
      };
  
      return {
        isSidebarOpen,
        form,
        saveService,
        goBack,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>  