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
import ListaAnimais from "@/views/animais-adocao/ListaAnimais"
import AnimaisById from "@/views/animais-adocao/AnimaisById"
import Publicacoes from "@/views/publicacao/Publicacoes"
import ListaPublicacoes from "@/views/publicacao/ListaPublicacoes"
import PublicacoesById from "@/views/publicacao/PublicacoesById"


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
    meta: { requiresAuthorization: true }
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
    meta: { requiresAuthorization: true }
},
{
    name: 'listaAnimais',
    path: '/animais/adocao',
    component: ListaAnimais,
    meta: { requiresOff: false }
},
{
    name: 'animaisById',
    path: '/animais/:id',
    component: AnimaisById,
    meta: { requiresOff: false }
},
{
    name: 'publicacoes',
    path: '/publicacao/cadastrar',
    component: Publicacoes,
    meta: { requiresAuthorization: true }
},
{
    name: 'listaPublicacoes',
    path: '/publicacoes',
    component: ListaPublicacoes,
    meta: { requiresAuthorization: false }
},
{
    name: 'publicacoesById',
    path: '/publicacao/:id',
    component: PublicacoesById,
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
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAuthorization)){
        const user = JSON.parse(json)
        user && user.admin || user.ong ? next() : next({ path: '/' })
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresOff)){
        const user = JSON.parse(json)
        !user ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
