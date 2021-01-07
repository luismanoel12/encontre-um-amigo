<template>
    <footer class="footer">
        <span>Copyright <strong>Encontre um Amigo</strong> © 2020-2020</span>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
    }
</style>
