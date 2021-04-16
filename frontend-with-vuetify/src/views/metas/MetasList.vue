<template>
  <v-container>
    <div class="metas-page">
      <v-row>
        <v-col cols="12" sm="3" v-for="meta in metas" :key="meta.id">
          <router-link
            class="router-link"
            :to="{ name: 'metasById', params: { id: meta.id } }"
          >
            <v-card
              class="mx-auto my-12 meta-card"
              max-width="374"
              elevation="10"
            >
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

                <span>Criado por: {{ metaUser.name }} </span>
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
      <v-btn depressed color="primary" v-if="loadMore" @click="getMetas">
        Carregar Mais
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";

export default {
  name: "MetasList",
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

    async getMetaUser() {
      const url = `/user-name/${this.meta.userId}`;
      await api.get(url).then((res) => (this.metaUser = res.data));
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
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

.metas-card {
  background-color: #fff;
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
  padding: 10px!important;
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
</style>