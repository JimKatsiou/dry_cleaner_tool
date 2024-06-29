
<template>
    <v-app>
      <NavBar />
      <SideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Document Details</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>{{ document.title }}</v-card-title>
                <v-card-text>
                  <p>{{ document.content }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="goBack">Back</v-btn>
                  <v-btn color="primary" @click="editDocument">Edit</v-btn>
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
    name: 'ShowDocument',
    components: {
      NavBar,
      SideBar,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const isSidebarOpen = ref(true);
      const document = ref({
        id: route.params.id,
        title: 'Document 1',
        content: 'Content of Document 1'
      });
  
      const goBack = () => {
        router.push({ name: 'Documents' });
      };
  
      const editDocument = () => {
        router.push({ name: 'EditDocument', params: { id: document.value.id } });
      };
  
      return {
        isSidebarOpen,
        document,
        goBack,
        editDocument,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  