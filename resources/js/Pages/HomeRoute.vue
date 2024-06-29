<template>
  <v-app>
    <NavBar/>
    <SideBar/>
    <v-main>
      <v-container fluid>
        <div class="dashboard">
          <v-row>
            <v-col cols="12">
              <h1>Dashboard</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="n in 3" :key="n">
              <v-card>
                <v-card-title>Card {{ n }}</v-card-title>
                <v-card-text>
                  Content for card {{ n }}.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary">Action {{ n }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, defineComponent } from 'vue';
import axios from 'axios';
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';

export default defineComponent({
  name: 'HomeRoute',
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
    }
  },

  setup() {
    const response = ref(null);
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
      triggerEndpoint,
    };
  },
});
</script>

<style scoped>
.dashboard {
  margin-top: 60px; /* Adjust for sticky top navigation bar */
  transition: margin-left 0.3s ease, background-color 0.3s ease;
  padding: 20px;
  background-color: #f8f9fa; /* Slightly lighter background color */
}

.dashboard.sidebar-open {
  margin-left: 0px; /* Adjust according to sidebar width */
  background-color: #e9ecef; /* Slightly lighter background color */
}

.v-card {
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>