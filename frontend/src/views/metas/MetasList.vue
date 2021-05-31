<template>
  <v-container>
    <div class="metas-page">
      <v-row>
        <v-col cols="12" sm="3" v-for="meta in metas" :key="meta.id">
          <router-link
            class="router-link"
            :to="{ name: 'metasById', params: { id: meta.id } }"
          >
            <v-card class="mx-auto my-12 meta-card" max-width="374">
              <div class="card-met-user">
                <v-avatar class="ma-2 pub-avatar-img" size="64" tile>
                  <img :src="meta.userImage" alt="" v-if="meta.userImage">
                  <Gravatar :email="meta.email" :alt="meta.userName" v-else />
                </v-avatar>
                <router-link
                  class="pub-router-link"
                  :to="{
                    name: 'ongById',
                    params: { id: meta.userId },
                  }"
                >
                  <h3>{{ meta.name }}</h3>
                  <h5 class="text-center">
                {{
                  new Date(meta.createdAt).toLocaleString("pt-br", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }}
              </h5>
                </router-link>
              </div>

              <div class="img-card">
                <img
                  v-if="meta.imageUrl"
                  :src="meta.imageUrl"
                  height="100%"
                  alt="Article"
                />
                <img
                  v-else
                  src="@/assets/article.png"
                  height="100%"
                  alt="Article"
                />
              </div>

              <v-card-title> {{ meta.titulo }}</v-card-title>

              <v-card-text class="text-center">
                <h3>
                  Valor esperado:
                  <strong>
                    {{
                      meta.valorEsperado.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}</strong
                  >
                </h3>
                <h3>
                  Valor Atual:
                  <strong>
                    {{
                      meta.valorAtual.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}</strong
                  >
                </h3>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <div class="progress-bar">
                <v-progress-linear
                  :value="valor"
                  rounded
                  background-color="green"
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
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination">
      <v-btn depressed class="bt-carregar-mais" elevation="24" dark v-if="loadMore" @click="getMetas">
        Carregar Mais
        <v-icon dark right> mdi-reload </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";
import Gravatar from "vue-gravatar";

export default {
  name: "MetasList",
  components: { Gravatar },
  data: function () {
    return {
      metas: [],
      metaUser: {},
      page: 1,
      valor: 0,
      loadMore: true,
    };
  },

  methods: {
    getMetas() {
      api(`/metasPublic?page=${this.page}`).then((res) => {
        this.metas = this.metas.concat(res.data.data);
        this.page++;

        if (res.data.data.length === 0) this.loadMore = false;
      });
    },
  },
  watch: {
    $route(to) {
      this.metas = [];
      this.page = 1;
      this.loadMore = true;

      this.getMetas();
      this.getMetaUser();
    },
  },
  mounted() {
    this.getMetas();
  },
};
</script>

<style>
.metas-page {
  margin-top: 20px;
  padding: 20px;
}

.meta-card {
  background-color: #fff;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}

.metas-header {
  text-align: center;
  padding: 20px;
}

.metas-content {
  padding: 20px;
  text-align: center;
}

.button-aciton {
  text-align: center;
}

.btn-verMais {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 50px;
}

.progress-bar {
  padding: 10px !important;
}

.v-card__title {
  text-align: center !important;
  display: block !important;
}

.img-card {
  height: 200px;
}

.img-card img {
  width: 100%;
  object-fit: cover;
}

.router-link {
  text-decoration: none;
}

.meta-card {
  transition: 0.5s;
}

.meta-card:hover {
  transform: scale(1.04);
  transition: 0.5s;
  border-radius: 8px;
}

.card-met-user {
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>