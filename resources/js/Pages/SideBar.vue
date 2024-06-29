<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
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

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon || 'mdi-menu'"
        :title="item.title"
        :value="item.route"
        :to="item.route"
      ></v-list-item>
    </v-list>
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
  },

  methods: {
    async fetchAvatarImage() {
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
  },
};
</script>

<style scoped>
  .v-list-item {
    cursor: pointer;
  }
</style>
