<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="top-nav">
    <b-navbar-brand href="/">
      <i class="fas fa-home"></i>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/about">About</b-nav-item>
        <b-nav-item href="/contact">Contact</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #dcdcdc;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.top-nav .fa-home {
  font-size: 24px; /* Adjust icon size */
}
</style>