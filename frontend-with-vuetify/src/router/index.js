import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '@/components/home/Home'
import Auth from "@/components/auth/Auth"
import Carousel from "@/components/carousel/Carousel"
import Error404 from "@/components/template/Error404"
import Perfil from "@/components/perfil/Perfil"


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
    path: '/perfil',
    component: Perfil,
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
