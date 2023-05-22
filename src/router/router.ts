import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Numeri from '../views/Numeri.vue'
import Numero from '../views/Numero.vue'
import Articoli from '../views/Articoli.vue'
import Articolo from '../views/Articolo.vue'
import Install from '../views/Install.vue'

const routes = [
    {
        //main route
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        //view of all the Archivio Numeri
        path: '/numeri',
        name: 'Numeri',
        component: Numeri,
    },
    {
        //view of the single Numero
        path: '/numero',
        name: 'Numero',
        component: Numero,
    },
    {
        //view of all the articles or the filtered ones
        path: '/articoli',
        name: 'Articoli',
        component: Articoli,
    },
    {
        //view of the single article
        path: '/articolo',
        component: Articolo,
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q })
    },
    {
        path: '/searchNumero',
        component: Numero,
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q })
    },
    {
        //view for the installation
        path: '/install',
        name: 'Install',
        component: Install,
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