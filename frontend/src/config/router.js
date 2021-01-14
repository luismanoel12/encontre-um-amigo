import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Perfil from '@/components/perfil/Perfil'
import Auth from "@/components/auth/Auth"


import { userKey } from "@/global"

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},
{
    name: 'perfil',
    path: '/perfil',
    component: Perfil
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
}]


const router = new VueRouter({
    mode: 'history',
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

export default router
