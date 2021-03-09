<template>
  <v-container>
    <div class="metas-page">
      <v-row>
        <v-col cols="12" sm="4" v-for="meta in metas" :key="meta.id">
          <div class="metas-card">
            <div class="metas-header">
              <img
                v-if="meta.imageUrl"
                :src="meta.imageUrl"
                height="150"
                width="150"
                alt="Article"
              />
              <img
                v-else
                src="@/assets/article.png"
                height="150"
                width="150"
                alt="Article"
              />
              <h3>{{ meta.titulo }}</h3>
            </div>
            <div class="metas-content">
              <h3>Valor esperado: R$ {{ meta.valorEsperado }}</h3>
              <h3>Valor Atual: R$ {{ meta.valorAtual }}</h3>

              <v-progress-linear v-model="meta.valorAtual" height="25">
                <strong>{{ Math.ceil(meta.valorAtual * 100 / meta.valorEsperado) }}%</strong>
              </v-progress-linear>
            </div>

            <div class="button-aciton">
              <v-btn depressed color="primary" class="btn-verMais">
                Ver Mais <v-icon dark> mdi-arrow-right-bold </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
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
      api(`/metas`).then((res) => {
        this.metas = this.metas.concat(res.data);
      });
    },

    valorBarra(){
        this.valor = meta.valorAtual;
    }
  },

  mounted() {
    this.getMetas();
    this.valorBarra();
  },
};
</script>

<style>
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
</style>