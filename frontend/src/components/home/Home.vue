<template>
    <div class="home">
        <div class="contaier">
            <h1>Bem-vindo  </h1>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
// import axios from 'axios'
// import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle },
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
