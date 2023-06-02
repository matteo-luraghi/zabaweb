import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        //main route
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
    {
        //view of all the Archivio Numeri
        path: '/numeri',
        name: 'Numeri',
        component: () => import(/* webpackChunkName: "numeri" */ "../views/Numeri.vue"),
    },
    {
        //view of all the articles or the filtered ones
        path: '/articoli',
        name: 'Articoli',
        component: () => import(/* webpackChunkName: "articoli" */ "../views/Articoli.vue"),
    },
    {
        //view of all the saved articles and numbers
        path: '/preferiti',
        name: 'Preferiti',
        component: () => import(/* webpackChunkName: "preferiti" */ "../views/Preferiti.vue"),
    },
    {
        //view of zabarte
        path: '/zabarte',
        name: 'Zabarte',
        component: () => import(/* webpackChunkName: "zabarte" */ "../views/ZabArte.vue"),
    },
    {
        path: '/zabarte/view',
        component: () => import(/* webpackChunkName: "zabarteview" */ "../views/ZabArteView.vue"),
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q })
    },
    {
        //view of the single article
        path: '/articolo',
        component: () => import(/* webpackChunkName: "articolo" */ "../views/Articolo.vue"),
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q })
    },
    {
        path: '/numero',
        component: () => import(/* webpackChunkName: "numero" */ "../views/Numero.vue"),
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q }),
    },
    {
        //view for the installation
        path: '/install',
        name: 'Install',
        component: () => import(/* webpackChunkName: "install" */ "../views/Install.vue"),
    }
];

//setup of the router 
//the scrollbar method makes it so that everytime the user is redirected the page starts from the top
const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior() {
        return {top: 0}
    }
});

export default router