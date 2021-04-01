import api from "../config/api";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if(user) {
                api.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else {
                delete api.defaults.headers.common['Authorization']
            }
        }
    }
})