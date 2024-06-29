<template>
  <v-app-bar :elevation="2">
    <v-btn icon="mdi-washing-machine" href="/"></v-btn>
    <v-app-bar-title>Christos's Dry Cleanner</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-cog-outline"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
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