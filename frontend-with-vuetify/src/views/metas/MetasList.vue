<template>
    <div class="metas-list">
        <ul>
            <li v-for="meta in metas" :key="meta.id">
                <MetasItem :meta="meta" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getMetas">Carregar Mais Doações com Metas</button>
        </div>
    </div>
</template>

<script>
import api from "../../config/api";
import MetasItem from './components/MetasItem'

export default {
    name: 'MetasList',
    components: {  MetasItem },
    data: function() {
        return {
            metas: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getMetas() {
            const url = `/metas?page=${this.page}`
            api(url).then(res => {
                this.metas = this.metas.concat(res.data)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.metas = []
            this.page = 1
            this.loadMore = true

            this.getMetas()
        }
    },
    mounted() {
        this.getMetas()
    }
}
</script>

<style>
    .metas-list ul {
        list-style-type: none;
        padding: 0px;
    }

    .metas-list .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
