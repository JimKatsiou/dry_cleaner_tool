<template>
  <v-app-bar :elevation="2">
    <v-btn icon="mdi-washing-machine" href="/"></v-btn>
    <v-app-bar-title>Christos's Dry Cleaner</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-calendar-month"></v-btn>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-cog-outline"></v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            v-bind="props"
          >
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeUser">
            <v-list-item-title>Change User</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',

  methods: {
    changeUser() {
      // Logic for changing user
      console.log('Change User clicked');
    },
    logout() {
      // Logic for logout
      console.log('Logout clicked');
    }
  }
};
</script>

<style scoped>
.top-nav {
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #dcdcdc;
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
