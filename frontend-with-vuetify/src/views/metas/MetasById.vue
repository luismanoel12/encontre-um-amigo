<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-sheet min-height="70vh" rounded="lg">
            <div class="view-page">
              <div class="metas-view">
                <div class="view-header">
                  <img
                    v-if="meta.imageUrl"
                    :src="meta.imageUrl"
                    height="400"
                    alt="Article"
                  />
                  <img
                    v-else
                    src="@/assets/article.png"
                    height="800"
                    alt="Article"
                  />
                  <h1>{{ meta.titulo }}</h1>
                </div>
                <v-divider></v-divider>

                <div class="view-content">
                  <div class="meta-content" v-html="meta.descricao"></div>
                </div>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="4">
          <v-sheet rounded="lg" min-height="268" class="side-content">
            <div class="text-center">
              <h1 class="side-content-h1">R$ {{ meta.valorAtual }}</h1>
              <span> Valor Esperado R$ {{ meta.valorEsperado }} </span>
            </div>

            <div class="pb">
              <v-progress-linear
                rounded
                background-color="green"
                color="green"
                height="24"
              >
                <strong
                  >{{
                    Math.ceil((meta.valorAtual * 100) / meta.valorEsperado)
                  }}%</strong
                >
              </v-progress-linear>
            </div>

            <p v-for="objetivo in objetivos" :key="objetivo.id">
              <v-card color="#4DA545" dark v-if=" objetivo.valor >= meta.valorAtual">
                <v-card-title class="headline">
                  {{ objetivo.titulo }}
                </v-card-title>

                <v-card-subtitle>
                  <h1 class="text-center valores">R$ {{ objetivo.valor }}</h1>
                </v-card-subtitle>

                <v-card-text class="text-center">
                  {{ objetivo.descricao }}
                </v-card-text>
              </v-card>

              <v-card color="#C5C6C7" dark v-else>
                <v-card-title class="headline">
                  {{ objetivo.titulo }}
                </v-card-title>

                <v-card-subtitle>
                  <h1 class="text-center valores">R$ {{ objetivo.valor }}</h1>
                </v-card-subtitle>

                <v-card-text class="text-center">
                  {{ objetivo.descricao }}
                </v-card-text>
              </v-card>
            </p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import api from "../../config/api";
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack.js";

export default {
  name: "MetasById",
  data: function () {
    return {
      meta: {},
      objetivos: [],
    };
  },
  methods: {
    async loadMeta() {
      const url = `/metas/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.meta = res.data));
    },

    async loadObjetivos() {
      const url = `/objetivos/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.objetivos = res.data));
    },
  },
  mounted() {
    this.loadMeta();
    this.$root.$once("metas-by-id", () => {
      this.loadMeta();
    });

    this.loadObjetivos();
    this.$root.$once("metas-objetivos", () => {
    this.loadMeta();
    });
  },
  updated() {
    document.querySelectorAll(".meta-content pre.ql-syntax").forEach((e) => {
      hljs.highlightBlock(e);
    });
  },
};
</script>

<style>
.view-page {
}

.view-header {
  text-align: center;
}

.view-header img {
  border-radius: 4px;
  width: 100%;
  object-fit: cover;
}

.view-content {
  padding-top: 20px;
  padding: 30px;
}

.valores {
  margin-top: 30px;
}

.meta-content {
  padding: 25px;
  margin-bottom: 30px;
}

.meta-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.meta-content img {
  max-width: 100%;
}

.meta-content :last-child {
  margin-bottom: 0px;
}

.pb {
  margin-top: 20px;
  margin-bottom: 20px;
}

.side-content {
  padding: 20px;
}

.side-content-h1 {
  font-size: 35pt;
}

@media only screen and (max-width: 600px) {
  .view-header img {
    width: 100%;
    object-fit: conver;
  }
}
</style>