<template>
  <v-main class="grey lighten-3" style="padding: 0px">
        <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

    <v-container v-else>
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
                    height="400"
                    alt="Article"
                  />
                  <h1 class="meta-title">{{ meta.titulo }}</h1>
                </div>

                <div class="view-content">
                  <span> <strong>Descrição:</strong> </span>
                  <div class="meta-content mt-5" v-html="meta.descricao"></div>
                </div>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="4">
          <v-sheet rounded="lg" min-height="268" class="side-content">
            <div class="card-metas-user">
              <v-avatar class="ma-2 pub-avatar-img" size="64" tile>
                <img :src="meta.userImage" alt="" v-if="meta.userImage" />
                <Gravatar :email="meta.email" :alt="meta.name" v-else />
              </v-avatar>
              <router-link
                class="metas-router-link"
                :to="{
                  name: 'ongById',
                  params: { id: meta.userId },
                }"
              >
                <h2>{{ meta.name }}</h2>
              </router-link>
            </div>

            <div class="card-metas-byId-content">
              <div class="text-center">
                <h1 class="side-content-h1">
                  {{
                    new Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(meta.valorAtual)
                  }}
                </h1>
                <span>
                  Valor Esperado
                  {{
                    new Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(meta.valorEsperado)
                  }}
                </span>
              </div>

              <div class="pb">
                <v-progress-linear
                  :value="
                    Math.ceil((meta.valorAtual * 100) / meta.valorEsperado)
                  "
                  rounded
                  background-color="green"
                  background-opacity="0.3"
                  color="green"
                  height="25"
                >
                  <strong
                    >{{
                      Math.ceil((meta.valorAtual * 100) / meta.valorEsperado)
                    }}%</strong
                  >
                </v-progress-linear>
              </div>
              <v-divider style="padding-bottom: 10px"></v-divider>
              <p v-for="objetivo in objetivos" :key="objetivo.id">
                <v-card
                  color="#4DA545"
                  dark
                  v-if="Math.ceil(objetivo.valor <= meta.valorAtual)"
                >
                  <v-card-title class="headline">
                    {{ objetivo.titulo }}
                  </v-card-title>

                  <v-card-subtitle>
                    <h1 class="text-center valores">
                      R$
                      {{
                        objetivo.valor.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}
                    </h1>
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
                    <h1 class="text-center valores">
                      {{
                        objetivo.valor.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}
                    </h1>
                  </v-card-subtitle>

                  <v-card-text class="text-center">
                    {{ objetivo.descricao }}
                  </v-card-text>
                </v-card>
              </p>
            </div>
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
import Gravatar from "vue-gravatar";

export default {
  name: "MetasById",
  components: { Gravatar },
  data: function () {
    return {
      meta: {},
      objetivos: [],
       loading: true,
    };
  },
  methods: {
    async loadMeta() {
      const url = `/metasPublic/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.meta = res.data));
       this.loading = false;
    },

    async loadObjetivos() {
      const url = `/objetivosMetaPublic/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.objetivos = res.data));
       this.loading = false;
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
  margin-bottom: 30px;
  word-break: break-all;
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

.card-metas-byId-content {
  padding: 20px;
}

.side-content-h1 {
  font-size: 35pt;
}

.meta-title {
  padding-top: 30px;
  color: #1e1e1e;
}

.card-metas-user {
  background-color: #1c8073;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .view-header img {
    width: 100%;
    object-fit: conver;
  }
}
</style>