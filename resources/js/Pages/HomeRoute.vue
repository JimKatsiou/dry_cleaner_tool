<template>
  <div>
    <NavBar />
    <SideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="content" :class="{ 'sidebar-open': isSidebarOpen }">
      <router-view></router-view>
      <h1>HOME</h1>
      <router-link to="/test">Take me to Test page</router-link>
      <button @click.prevent="triggerEndpoint">Trigger Endpoint</button>
      <p v-if="response">{{ response.data }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, defineComponent } from 'vue';
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';

export default defineComponent({
  name: 'HomeRoute',
  components: {
    NavBar,
    SideBar,
  },
  setup() {
    const response = ref(null);
    const isSidebarOpen = ref(true); // Open by default

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const triggerEndpoint = async () => {
      try {
        const res = await axios.get('/api/test-me');
        response.value = res;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      response,
      isSidebarOpen,
      toggleSidebar,
      triggerEndpoint,
    };
  },
});
</script>

<style scoped>
.content {
  margin-top: 60px; /* Adjust for sticky top navigation bar */
  transition: margin-left 0.3s ease, background-color 0.3s ease;
  padding: 20px;
  background-color: #f8f9fa; /* Slightly lighter background color */
}

.content.sidebar-open {
  margin-left: 150px; /* Adjust according to sidebar width */
  background-color: #e9ecef; /* Slightly lighter background color */
}
</style>