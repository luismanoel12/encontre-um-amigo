import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '@/views/home/Home'
import Auth from "@/views/auth/Auth"
import Carousel from "@/views/carousel/Carousel"
import Error404 from "@/components/template/Error404"
import Perfil from "@/views/perfil/Perfil"
import Metas from "@/views/metas/Metas"
import MetasList from "@/views/metas/MetasList"
import MetasById from "@/views/metas/MetasById"
import Ongs from "@/views/ongs/Ongs"
import OngById from "@/views/ongs/OngById"
import Animais from "@/views/animais-adocao/Animais"


import { userKey } from "@/global"

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},
{
    name: 'auth',
    path: '/auth',
    component: Auth,
    meta: { requiresOff: true }
},
{
    name: 'carousel',
    path: '/carousel',
    component: Carousel,
    meta: { requiresAdmin: true }
},
{
    name: 'perfil',
    path: '/perfil/:id',
    component: Perfil,
    meta: { requiresOff: false }
},
{
    name: 'metas',
    path: '/minhas-metas',
    component: Metas,
    meta: { requiresOff: false }
},
{
    name: 'metasList',
    path: '/metas',
    component: MetasList,
    meta: { requiresOff: false }
},
{
    name: 'metasById',
    path: '/metas/:id',
    component: MetasById,
    meta: { requiresOff: false }
},
{
    name: 'ongs',
    path: '/ongs',
    component: Ongs,
    meta: { requiresOff: false }
},
{
    name: 'ongById',
    path: '/ongs/:id',
    component: OngById,
    meta: { requiresOff: false }
},
{
    name: 'animais',
    path: '/animais/cadastrar',
    component: Animais,
    meta: { requiresOff: false }
},
{
    name: 'error404',
    path: '/*',
    component: Error404
}]


const router = new VueRouter({
    // mode: 'history',
    routes 
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }

    if(to.matched.some(record => record.meta.requiresOff)){
        const user = JSON.parse(json)
        !user ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
