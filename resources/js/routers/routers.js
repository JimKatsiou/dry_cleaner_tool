import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../Pages/HomeRoute.vue"),
    },
    {
        path: "/test",
        component: () => import("../Pages/TestRoute.vue"),
    },

    // CUSTOMERS - START
    {
        path: "/customers",
        component: () => import("../Pages/Customers/CustomersList.vue"),
    },
    {
        path: "/customers/:id",
        component: () => import("../Pages/Customers/CustomerShow.vue"),
    },
    {
        path: "/customers/:id/edit",
        component: () => import("../Pages/Customers/CustomerEdit.vue"),
    },

    // CUSTOMERS - END

    // SERVICES - START
    {
        path: "/services",
        component: () => import("../Pages/ServicesAndProducts/ServicesList.vue"),
    },
    {
        path: "/services/:id",
        component: () => import("../Pages/ServicesAndProducts/ServiceShow.vue"),
    },
    {
        path: "/services/:id/edit",
        component: () => import("../Pages/ServicesAndProducts/ServiceEdit.vue"),
    },
    // SERVICES - END

    // DOCUMENTS - START
    {
        path: "/documents",
        component: () => import("../Pages/Documents/DocumentsList.vue"),
    },
    {
        path: "/documents/:id",
        component: () => import("../Pages/Documents/DocumentShow.vue"),
    },
    {
        path: "//documents/:id/edit",
        component: () => import("../Pages/Documents/DocumentEdit.vue"),
    },
    // DOCUMENTS - END

    // USERS - START
    {
        path: "/users",
        component: () => import("../Pages/Users/UsersList.vue"),
    },
    // USERS - END
    
    // REST - START
    {
        path: "/about",
        component: () => import("../Pages/About.vue"),
    },
    {
        path: "/contact",
        component: () => import("../Pages/Contact.vue"),
    },
    // REST - END
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
