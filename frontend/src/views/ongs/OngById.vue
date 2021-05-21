<template>
  <div class="ong-page">
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="ong-left-card">
              <div class="ong-left-card-header">
                <h2 class="text-center">Informações</h2>
              </div>
              <div class="ong-left-card-content">
                <h4>
                  E-mail: <strong>{{ ong.email }}</strong>
                </h4>
                <h4>
                  CNPJ: <strong>{{ ong.cnpj }}</strong>
                </h4>
                <h4>
                  Telefone: <strong>{{ ong.telefone }}</strong>
                </h4>
                <v-divider></v-divider>
                <h2 class="text-center mt-2 mb-2">Endereço</h2>
                <h4>
                  Endereço: <strong>{{ ong.endereco }}</strong>
                </h4>
                <h4>
                  Número: <strong>{{ ong.numero }}</strong>
                </h4>
                <h4>
                  Bairro: <strong>{{ ong.bairro }}</strong>
                </h4>
                <h4>
                  Complemento: <strong>{{ ong.complemento }}</strong>
                </h4>
                <h4>
                  Estado: <strong>{{ ong.estado }}</strong>
                </h4>
                <h4>
                  Cidade: <strong>{{ ong.cidade }}</strong>
                </h4>
                <h4>
                  CEP: <strong>{{ ong.cep }}</strong>
                </h4>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg" elevation="10">
            <div class="ong-page-header">
              <v-avatar class="ma-2 avatar-img" size="124" tile>
                <Gravatar :email="ong.email" :alt="ong.name" />
              </v-avatar>
              <h1>{{ ong.name }}</h1>
            </div>
            <v-divider></v-divider>
            <div class="ong-page-content">
              <h1 class="text-center">BIO</h1>
              <div class="publicacao-content" v-html="bio.descricao"></div>
            </div>
            <v-divider></v-divider>
            <div class="ong-page-actions">
              <BtnDenunciar :name="ong.name" :id="ong.id"></BtnDenunciar>
            </div>
          </v-sheet>

          <h1 class="text-center mt-10">ÚLTIMAS PUBLICAÇÕES</h1>
          <v-container>
            <v-row class="ultimas-publicacoes">
              <v-col
                cols="12"
                sm="12"
                v-for="publicacao in publicacoes"
                :key="publicacao.id"
              >
                <div class="card-publicacao-ong">
                  <div class="card-publicacao-user">
                    <v-avatar class="ma-2 pub-avatar-img" size="64" tile>
                      <Gravatar
                        :email="publicacao.email"
                        :alt="publicacao.name"
                      />
                    </v-avatar>
                    <h3>{{ publicacao.name }}</h3>
                  </div>

                  <div class="card-publicacao-ong-header">
                    <router-link
                      class="router-link"
                      :to="{
                        name: 'publicacoesById',
                        params: { id: publicacao.id },
                      }"
                    >
                      <h2 class="pub-titulo">{{ publicacao.titulo }}</h2>

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
                    <p>Publicado em: {{ publicacao.dataPub }}</p>
                  </div>
                  <div class="card-publicacao-content">
                    <p>{{ publicacao.chamada }}</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="ong-right-card">
              <h4 class="text-center">INSTAGRAM</h4>
              <v-divider class="publicacao-divider"></v-divider>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "../../config/api";
import Gravatar from "vue-gravatar";
import BtnDenunciar from "../../components/template/BtnDenunciar";

export default {
  name: "OngById",
  components: { Gravatar, BtnDenunciar },
  data: function () {
    return {
      ong: {},
      publicacoes: {},
      bio: {},
    };
  },
  methods: {
    async loadOng() {
      const url = `/ongs/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.ong = res.data));
    },

    loadPublicacoes() {
      const url = `/ultimasPublicacoes/${this.$route.params.id}`;
      api.get(url).then((res) => (this.publicacoes = res.data));
    },

    loadBio() {
      const url = `/bioById/${this.$route.params.id}`;
      api.get(url).then((res) => (this.bio = res.data));
    },
  },
  mounted() {
    this.loadOng();
    this.loadPublicacoes();
    this.loadBio();
    this.$root.$once("ong-by-id", () => {
      this.loadOng();
    });
  },
};
</script>

<style scoped>
.ong-page {
  margin-top: 20px;
}

.ong-page-header {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar-img > img {
  border-radius: 50%;
}

.ong-page-content,
.ong-right-card,
.ong-left-card {
  padding: 20px;
}

.ong-left-card-header {
  padding-bottom: 10px;
}

.publicacao-divider {
  background-color: #212121;
  margin-bottom: 10px;
}

.ong-page-actions {
  text-align: center;
  margin-top: 10px;
  padding-bottom: 20px;
}

.card-publicacao-ong {
  background-color: white;
  width: auto;
  padding: 20px;
  margin: 20px auto;
  border-radius: 5px;
  border-left: 5px solid #57cc99;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}
</style>
