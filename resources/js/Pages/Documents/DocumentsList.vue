<template>
    <v-app>
      <NavBar />
      <SideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>Documents</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark @click="dialog = true">New Document</v-btn>
              </template>
              <v-card>
                <v-card-title>{{ editMode ? 'Edit Document' : 'New Document' }}</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="saveDocument">
                    <v-text-field v-model="form.title" label="Title"></v-text-field>
                    <v-textarea v-model="form.content" label="Content"></v-textarea>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-icon small @click="showDocument(item)">mdi-eye</v-icon>
                  <v-icon small @click="printDocument(item)">mdi-printer</v-icon>
                  <v-btn color="blue darken-1" text @click="printDocument">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="saveDocument">{{ editMode ? 'Update' : 'Save' }}</v-btn>
                  <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="saveDocument">{{ editMode ? 'Update' : 'Save' }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="search" label="Search" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-data-table :headers="headers" :items="filteredDocuments" class="elevation-1">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon @click="editDocument(item)">mdi-pencil</v-icon>
                  <v-icon @click="deleteDocument(item)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-col>
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
  name: 'Documents',
  components: {
    NavBar,
    SideBar,
  },
  setup() {
    const isSidebarOpen = ref(true);
    const documents = ref([]);
    const dialog = ref(false);
    const form = ref({
      title: '',
      content: ''
    });
    const search = ref('');
    const editMode = ref(false);

    const headers = [
      { text: 'Title', value: 'title' },
      { text: 'Content', value: 'content' },
      { text: 'Actions', value: 'actions', sortable: false }
    ];

    // Fetch documents from API
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents');
        response.data = [
          { id: 1, title: 'Document 1', content: 'Content of Document 1' },
          { id: 2, title: 'Document 2', content: 'Content of Document 2' },
          { id: 3, title: 'Document 3', content: 'Content of Document 3' }
        ];
        documents.value = response.data;
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    // Initial fetch of documents
    fetchDocuments();

    // Computed property to filter documents based on search input
    const filteredDocuments = computed(() => {
      return documents.value.filter(document =>
        document.title.toLowerCase().includes(search.value.toLowerCase()) ||
        document.content.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    // Function to save or update document
    const saveDocument = async () => {
      try {
        if (!editMode.value) {
          // Create new document
          form.value.id = documents.value.length + 1; // Dummy ID generation
          documents.value.push({ ...form.value });
        } else {
          // Update existing document
          const index = documents.value.findIndex(doc => doc.id === form.value.id);
          if (index !== -1) {
            documents.value[index] = { ...form.value };
          }
        }
        closeDialog();
      } catch (error) {
        console.error('Error saving document:', error);
      }
    };

    // Function to delete document
    const deleteDocument = (document) => {
      documents.value = documents.value.filter(doc => doc.id !== document.id);
    };

    // Function to open edit dialog
    const editDocument = (document) => {
      form.value = { ...document };
      editMode.value = true;
      dialog.value = true;
    };

    // Function to open show document view
    const showDocument = (document) => {
      router.push({ name: 'ShowDocument', params: { id: document.id } });
    };

    // Function to print document
    const printDocument = (document) => {
      console.log('Printing document', document);
      // Implement print logic here
    };

    // Function to close dialog
    const closeDialog = () => {
      form.value = { title: '', content: '' };
      editMode.value = false;
      dialog.value = false;
    };

    return {
      isSidebarOpen,
      documents,
      dialog,
      form,
      search,
      headers,
      filteredDocuments,
      saveDocument,
      deleteDocument,
      editDocument,
      showDocument,
      printDocument,
      closeDialog
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>