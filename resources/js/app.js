import { createApp } from "vue";
import router from "./routers/routers";
import { BContainer, BRow, BCol, BButton } from 'bootstrap-vue-next';
import { BNavbar, BNavbarBrand, BNavbarToggle, BNavbarNav, BNavItem, BCollapse } from 'bootstrap-vue-next';

import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'; // MDI icons
import 'vuetify/styles'; // Vuetify styles

import { loadFonts } from './plugins/webfontloader';

import App from "./App.vue";

import "./bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import '@fortawesome/fontawesome-free/css/all.css';

loadFonts();

const app = createApp(App);

// Register individual components // Register BootstrapVue components
app.component('BContainer', BContainer);
app.component('BRow', BRow);
app.component('BCol', BCol);
app.component('BButton', BButton);
app.component('BNavbar', BNavbar);
app.component('BNavbarBrand', BNavbarBrand);
app.component('BNavbarNav', BNavbarNav);
app.component('BNavItem', BNavItem);
app.component('BCollapse', BCollapse);
app.component('BNavbarToggle', BNavbarToggle);

app.use(vuetify);
app.use(router);
app.mount('#app');