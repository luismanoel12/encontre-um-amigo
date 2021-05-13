<template>
  <v-container>
    <div class="publicacao-page">
      <v-row>
        <v-col cols="12" sm="8">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              v-for="publicacao in publicacoes"
              :key="publicacao.id"
            >
              <div class="card-publicacao">
                <div class="card-publicacao-header">
                  <router-link
                    class="router-link"
                    :to="{
                      name: 'publicacoesById',
                      params: { id: publicacao.id },
                    }"
                  >
                    <h2 class="pub-titulo">{{ publicacao.titulo }}</h2>

                    <h5>Publicado em {{ publicacao.dataPub }}</h5>
                    <div class="img-publicacao" style="height: 200px">
                      <img
                        v-if="publicacao.imageUrl"
                        :src="publicacao.imageUrl"
                        height="100%"
                        alt="Publicação"
                      />
                      <img
                        v-else
                        src="@/assets/publicacao.jpg"
                        height="100%"
                        alt="Article"
                      />
                    </div>
                  </router-link>
                  <p>Publicado por: {{ publicacao.userName }}</p>
                </div>
                <v-divider></v-divider>
                <div class="card-publicacao-content">
                  <p>{{ publicacao.chamada }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="4">
          <v-sheet rounded="lg" min-height="268" elevation="5">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination">
      <v-btn depressed color="primary" v-if="loadMore" @click="getPublicacoes">
        Carregar Mais
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";

export default {
  name: "ListaPublicacoes",
  data: function () {
    return {
      publicacoes: [],
      page: 1,
      loadMore: true,
    };
  },

  methods: {
    getPublicacoes() {
      api(`/publicacaoPublic?page=${this.page}`).then((res) => {
        this.publicacoes = this.publicacoes.concat(res.data.data);
        this.page++;

        if (res.data.data.length === 0) this.loadMore = false;
      });
    },
  },
  watch: {
    $route(to) {
      this.publicacoes = [];
      this.page = 1;
      this.loadMore = true;

      this.getPublicacoes();
    },
  },
  mounted() {
    this.getPublicacoes();
  },
};
</script>

<style>
.publicacao-page {
  padding: 20px;
  display: flex;
}

.img-publicacao {
  background-color: #aaa;
  width: 100%;
}

.img-publicacao > img {
  width: 100%;
  object-fit: cover;
}

.card-publicacao {
  background-color: white;
  width: 800px;
  padding: 20px;
  margin-top: 20px;
  margin: auto;
  border-radius: 5px;
  border-left: 5px solid #57cc99;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.card-publicacao-content {
  word-break: break-all;
}

.pub-titulo {
  color: #212121;
}

.pub-titulo:hover {
  color: #0899ba;
}

.router-link {
  text-decoration: none !important;
}

@media only screen and (max-width: 600px) {
  .card-publicacao {
    width: auto;
  }

  .img-publicacao > img {
    width: 100%;
    object-fit: cover;
  }
}
</style>