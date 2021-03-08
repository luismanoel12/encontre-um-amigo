<template>
    <div class="metas-item">
        <router-link :to="{ name: 'metasById', params: { id: meta.id } }">
            <div class="metas-item-image d-none d-sm-block">
                <img v-if="menta.imageUrl"
                    :src="meta.imageUrl"
                    height="150" width="150" alt="Article">
                <img v-else
                    src="@/assets/article.png"
                    height="150" width="150" alt="Article">
            </div>
            <div class="metas-item-info">
                <h2>{{ meta.titulo }}</h2>
                <p>{{ meta.descricao }}</p>
                <span class="metas-item-author">
                    <strong>Autor: </strong>{{ meta.titulo }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'MetasItem',
    props: ['metas']
}
</script>

<style>
    .metas-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .metas-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .metas-item-info h2 {
        font-size: 1.7rem;
    }

    .metas-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .metas-item-image img {
        border-radius: 5px;
    }

    .metas-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .metas-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
