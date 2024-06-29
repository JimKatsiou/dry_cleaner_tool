<template>
    <v-app>
      <NavBar />
      <SideBar :isOpen="isSidebarOpen"/>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Edit Document</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Edit Document</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="saveDocument">
                    <v-text-field v-model="form.title" label="Title"></v-text-field>
                    <v-textarea v-model="form.content" label="Content"></v-textarea>
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
    name: 'EditDocument',
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
        title: 'Document 1',
        content: 'Content of Document 1'
      });
  
      const saveDocument = () => {
        console.log('Document saved', form.value);
        router.push({ name: 'Documents' });
      };
  
      const goBack = () => {
        router.push({ name: 'Documents' });
      };
  
      return {
        isSidebarOpen,
        form,
        saveDocument,
        goBack,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>  