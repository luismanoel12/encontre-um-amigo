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
                <div class="card-publicacao-user">
                  <v-avatar class="ma-2 pub-avatar-img" size="64" tile>
                    <img :src="publicacao.userImage" alt="" v-if="publicacao.userImage">
                    <Gravatar
                      :email="publicacao.email"
                      :alt="publicacao.userName"
                      v-else
                    />
                  </v-avatar>
                  <router-link
                    class="pub-router-link"
                    :to="{
                      name: 'ongById',
                      params: { id: publicacao.userId },
                    }"
                  >
                    <h3>{{ publicacao.name }}</h3>
                    <h5>{{ publicacao.dataPub }} <span class="mdi mdi-earth"></span></h5>
                  </router-link>
                </div>
                <div class="card-publicacao-header">
                  <router-link
                    class="router-link"
                    :to="{
                      name: 'publicacoesById',
                      params: { id: publicacao.id },
                    }"
                  >
                    <h2 class="pub-titulo">{{ publicacao.titulo }}</h2>

                    <div class="img-publicacao" style="height: 400px">
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
                </div>
                <v-divider></v-divider>
                <div class="card-publicacao-content">
                  <p><strong>Chamada:</strong></p>
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
      <v-btn depressed class="bt-carregar-mais" elevation="24" dark v-if="loadMore" @click="getPublicacoes">
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
  name: "ListaPublicacoes",
  components: { Gravatar },
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
  margin-bottom: 10px;
}

.pub-titulo:hover {
  color: #023e8a;
}

.router-link {
  text-decoration: none !important;
}

.card-publicacao-user {
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .card-publicacao {
    width: auto;
  }

  .img-publicacao {
    height: auto !important;
  }

  .img-publicacao > img {
    width: 100%;
    object-fit: cover;
  }
}
</style>