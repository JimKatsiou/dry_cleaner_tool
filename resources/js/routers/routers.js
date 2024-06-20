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
    {
        path: "/about",
        component: () => import("../Pages/About.vue"), // Adjust the component path as needed
    },
    {
        path: "/contact",
        component: () => import("../Pages/Contact.vue"), // Adjust the component path as needed
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
