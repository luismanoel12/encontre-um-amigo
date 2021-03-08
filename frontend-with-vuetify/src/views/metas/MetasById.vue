
<template>
  <div class="metas-by-id">
    <h1>{{ meta.titulo }}</h1>
    <div class="metas-content" v-html="meta.descricao"></div>
  </div>
</template>

<script>
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack.js";
import api from "../../config/api";

export default {
  name: "MetasById",
  data: function () {
    return {
      meta: {},
    };
  },
  mounted() {
    const url = `/metas/${this.$route.params.id}`;
    api.get(url).then((res) => {
      this.meta = res.data;
    });
  },
  updated() {
    document.querySelectorAll(".metas-content pre.ql-syntax").forEach((e) => {
      hljs.highlightBlock(e);
    });
  },
};
</script>

<style>
.metas-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.metas-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.metas-content img {
  max-width: 100%;
}

.metas-content :last-child {
  margin-bottom: 0px;
}
</style>
