import Vue from "vue";
import VueRouter from "vue-router";
import About from "./components/about/about.vue";
import Contact from "./components/about/contact.vue";
import Home from "./components/home/home.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Home },
    { path: "/contact", component: Contact },
    { path: "/about", component: About },
];

const router = new VueRouter({ 
    mode: "history", 
    routes: routes 
});

export default router;