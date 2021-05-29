import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '@/views/home/Home'
import Auth from "@/views/auth/Auth"
import Signup from "@/views/auth/Signup"
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
import Users from "@/views/users/Users"
import Dashboard from "@/views/dashboard/Dashboard"
import Denuncia from "@/views/denuncia/Denuncia"


import { userKey } from "@/global"

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/home',
    component: Home
},
{
    name: 'auth',
    path: '/auth',
    component: Auth,
},
{
    name: 'signup',
    path: '/signup',
    component: Signup,
},
{
    name: 'users',
    path: '/users',
    component: Users,
    meta: { requiresAdmin: true }
},
{
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAdmin: true }
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
    meta: { allowGuest: true }
},
{
    name: 'metasById',
    path: '/metas/:id',
    component: MetasById,
    meta: { allowGuest: true }
},
{
    name: 'ongs',
    path: '/ongs',
    component: Ongs,
    meta: { allowGuest: true }
},
{
    name: 'ongById',
    path: '/ongs/:id',
    component: OngById,
    meta: { allowGuest: true }
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
    meta: { allowGuest: true }
},
{
    name: 'animaisById',
    path: '/animais/:id',
    component: AnimaisById,
    meta: { allowGuest: true }
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
    meta: { allowGuest: true }
},
{
    name: 'publicacoesById',
    path: '/publicacao/:id',
    component: PublicacoesById,
    meta: { allowGuest: true }
},
{
    name: 'denuncia',
    path: '/denuncia',
    component: Denuncia,
    meta: { requiresAdmin: true }
},
{
    name: 'home',
    path: '/',
    component: Home,
    meta: { allowGuest: true }
},
{
    name: 'error404',
    path: '/*',
    component: Error404
}]


const router = new VueRouter({
    mode: 'history',
    routes 
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/home' })
    } else {
        next()
    }

    if(to.matched.some(record => record.meta.requiresAuthorization)){
        const user = JSON.parse(json)
        user && user.admin || user.ong ? next() : next({ path: '/home' })
    } else {
        next()
    }

    if(to.matched.some(record => record.meta.requiresOff)){
        const user = JSON.parse(json)
        !user ? next() : next({ path: '/home' })
    } else {
        next()
    }

    if(to.matched.some(record => record.meta.allowGuest)){
        const user = JSON.parse(json)
        user || !user ? next() : next({ path: '/home' })
    } else {
        next()
    }

    
})

export default router
