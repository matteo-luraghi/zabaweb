import { createRouter, createWebHistory } from 'vue-router';
import Loading from '../views/Loading.vue'
import Preferiti from '../views/Preferiti.vue'
import Numeri from '../views/Numeri.vue'
import Numero from '../views/Numero.vue'
import Articoli from '../views/Articoli.vue'
import Articolo from '../views/Articolo.vue'
import Install from '../views/Install.vue'
import Zabarte from '../views/ZabArte.vue'
import ZabarteView from '../views/ZabArteView.vue'

const routes = [
    {
        //main route
        path: '/',
        name: 'Loading',
        component: Loading,
    },
    {
        //view of all the Archivio Numeri
        path: '/numeri',
        name: 'Numeri',
        component: Numeri,
    },
    {
        //view of all the articles or the filtered ones
        path: '/articoli',
        name: 'Articoli',
        component: Articoli,
    },
    {
        //view of all the saved articles and numbers
        path: '/preferiti',
        name: 'Preferiti',
        component: Preferiti,
    },
    {
        //view of zabarte
        path: '/zabarte',
        name: 'Zabarte',
        component: Zabarte,
    },
    {
        path: '/zabarte/view',
        component: ZabarteView,
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q })
    },
    {
        //view of the single article
        path: '/articolo',
        component: Articolo,
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q })
    },
    {
        path: '/numero',
        component: Numero,
        props: (route: { query: { q: any; }; }) => ({ query: route.query.q }),
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