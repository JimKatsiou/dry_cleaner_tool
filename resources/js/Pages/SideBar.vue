<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    class="sidebar-container"
  >
    <!-- Sidebar content -->
    <v-list-item
      :prepend-avatar="avatarDataUrl"
      title="Χρήστος"
      nav
    >
      <template v-slot:append>
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>
    
    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon || 'mdi-menu'"
        :title="item.title"
        :value="item.route"
        :to="item.route"
      ></v-list-item>
    </v-list>

    <!-- Footer -->
    <div class="w-100" style="background-color: #f5f5f5;">
      <v-divider></v-divider>
      <v-list dense nav>
        <!-- List item for version -->
        <v-list-item @click="redirectToReleaseNotes">
          <v-list-item-title>Version {{ version }}</v-list-item-title>
          <v-list-item-subtitle>© 2024 Tech Code - D.K.</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar',
  props: {

  },
  data() {
    return {
      isOpen: true,
      avatarDataUrl: '', // Initialize avatarDataUrl
      drawer: true,
      rail: false,
      items: [
        { title: 'Πελάτες', route: '/customers', icon: 'mdi-account' },
        { title: 'Υπηρεσίες', route: '/services', icon: 'mdi-iron' },
        { title: 'Αποδεικτικά', route: '/documents', icon: 'mdi-file-document' },
        { title: 'Χρήστες', route: '/users', icon: 'mdi-account-group-outline' },
        { title: 'About', route: '/about', icon: 'mdi-information' },
      ],
      version: import.meta.env.VITE_APP_VERSION // Accessing the version variable
    };
  },

  watch: {
    isOpen(newVal) {
      this.drawer = newVal;
    },
    drawer(newVal) {
      this.$emit('update:isOpen', newVal);
    }
  },
  created() {
    this.fetchAvatarImage();
    console.log('Current version:', this.version); // Log to console
  },

  methods: {
    async fetchAvatarImage() {
      // Fetch avatar image logic
      // Example: Replace with your actual avatar fetching logic using axios
      try {
        const response = await axios.get('/api/user/avatar', {
          responseType: 'blob'
        });

        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          this.avatarDataUrl = reader.result;
        };
      } catch (error) {
        console.error('Error fetching avatar image:', error);
        // Handle the error appropriately
      }
    },
    redirectToReleaseNotes() {
      // Redirect logic to the release notes page
      window.location.href = '/release-notes';
    },
  },
};
</script>

<style scoped>
  .v-list-item {
    cursor: pointer;
  }

  .sidebar-container {
    display: flex;
    flex-direction: column;
    height: 100%; /* Ensure sidebar takes full height */
    position: relative; /* Ensure footer positioning works */
  }  
</style>
