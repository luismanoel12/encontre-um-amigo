<template>
  <v-container>
    <div class="metas-page">
      <v-row>
        <v-col cols="12" sm="3" v-for="meta in metas" :key="meta.id">

          <v-card class="mx-auto my-12" max-width="374" elevation="10">
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
                Valor esperado: <strong>R$ {{ meta.valorEsperado }}</strong>
              </h3>
              <h3>
                Valor Atual: <strong>R$ {{ meta.valorAtual }}</strong>
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

            <div class="button-aciton">
              <v-btn
                depressed
                color="primary"
                :to="{ path: 'metasById', params: { id: meta.id } }"
                 rounded
                class="btn-verMais"
              >
                Ver Mais
              </v-btn>
            </div>
          </v-card>
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
      page: 1,
      valor: 0,
      loadMore: true,
    };
  },

  methods: {
    getMetas() {
      api(`/metas?page=${this.page}`).then((res) => {
        this.metas = this.metas.concat(res.data.data);
        this.page++;

        if (res.data.length === 0) this.loadMore = false;
      });
    },
  },
  watch: {
    $route(to) {
      this.metas = [];
      this.page = 1;
      this.loadMore = true;

      this.getMetas();
    },
  },
  mounted() {
    this.getMetas();
  },
};
</script>

<style>
.metas-page{
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
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
  padding: 10px;
}

.v-card__title {
  text-align: center !important;
  display: block !important;
}

.img-card {
  height: 300px;
}

.img-card img {
  width: 100%;
  object-fit: cover;
}
</style>