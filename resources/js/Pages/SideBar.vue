<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <ul>
      <li><router-link to="/">Home</router-link></li>

      <li><router-link to="/">Πελάτες</router-link></li>

      <li><router-link to="/">Υπηρεσίες</router-link></li>

      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
    <button class="sidebar-toggle-button" @click="$emit('toggle-sidebar')">
      <i :class="isOpen ? 'fas fa-arrow-left' : 'fas fa-arrow-right'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 150px;
  background-color: #f0f2f5; /* Lighter color */
  color: #000000;
  padding: 10px;
  position: fixed;
  height: 100%;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  border-right: 1px solid #dcdcdc; /* Add border on the right side */
  z-index: 1000; /* Ensure the sidebar is above other elements */
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar-toggle-button {
  position: absolute;
  top: 10px;
  right: -30px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #495057;
  padding: 5px;
  transition: color 0.3s ease;
}

.sidebar-toggle-button:hover {
  color: #000;
}

.sidebar-toggle-button i {
  transition: transform 0.3s ease;
}
</style>
