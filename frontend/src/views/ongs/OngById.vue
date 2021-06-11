<template>
  <div class="ong-page">
    <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="ong-left-card">
              <div class="ong-left-card-header">
                <h2 class="text-center">Informações</h2>
              </div>
              <div class="ong-left-card-content">
                <h4>
                <span class="mdi mdi-email mdi-18px icon-info"></span>
                 E-mail: <strong>{{ ong.email }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-card-account-details mdi-18px icon-info"></span>
                  CNPJ: <strong>{{ ong.cnpj }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-phone mdi-18px icon-info"></span>
                  Telefone: <strong>{{ ong.telefone }}</strong>
                </h4>
                <v-divider></v-divider>
                <h2 class="text-center mt-2 mb-2">Endereço</h2>
                <h4>
                  <span class="mdi mdi-map-marker mdi-18px icon-info"></span>
                  Endereço: <strong>{{ ong.endereco }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-numeric mdi-18px icon-info"></span>
                  Número: <strong>{{ ong.numero }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-routes mdi-18px icon-info"></span>
                  Bairro: <strong>{{ ong.bairro }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-routes mdi-18px icon-info"></span>
                  Complemento: <strong>{{ ong.complemento }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-sign-real-estate mdi-18px icon-info"></span>
                  Estado: <strong>{{ ong.estado }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-city mdi-18px icon-info"></span>
                  Cidade: <strong>{{ ong.cidade }}</strong>
                </h4>
                <h4>
                  <span class="mdi mdi-numeric mdi-18px icon-info"></span>
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
                <img :src="ong.userImage" alt="" v-if="ong.userImage" />
                <Gravatar :email="ong.email" :alt="ong.name" v-else />
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

          <v-card class="mt-3">
            <v-tabs
              v-model="tab"
              background-color="#036564"
              centered
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                Publicações
                <v-icon>mdi-newspaper</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Animais Para Adoção
                <v-icon>mdi-paw</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <v-card flat>
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
                            <v-avatar
                              class="ma-2 pub-avatar-img"
                              size="64"
                              tile
                            >
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
                              <h2 class="pub-titulo">
                                {{ publicacao.titulo }}
                              </h2>

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
                </v-card>
              </v-tab-item>

              <v-tab-item value="tab-2">
                <v-card flat>
                  <v-row>
                    <v-col
                      cols="6"
                      xl="3"
                      lg="4"
                      md="6"
                      sm="6"
                      v-for="animal in animais"
                      :key="animal.id"
                    >
                      <router-link
                        class="router-link"
                        :to="{ name: 'animaisById', params: { id: animal.id } }"
                      >
                        <div class="animal-ong-card">
                          <div class="aoc-header">
                            <img
                              v-if="animal.imagem"
                              :src="animal.imagem"
                              alt="Animais"
                            />
                            <img
                              v-else
                              src="@/assets/article.png"
                              alt="Animais"
                            />
                          </div>
                          <div class="aoc-content">
                            <span>{{ animal.nome }}</span>
                          </div>
                        </div>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="ong-right-card">
              <h4 class="text-center">ACEITO DOAÇÕES ATRAVÉS DE:</h4>
              <v-divider class="publicacao-divider"></v-divider>
              <v-row>
                <v-col cols="12" v-for="doacao in doacoes" :key="doacao.id">
                  <div class="ong-doacoes-card">
                    <h3>{{ doacao.meio_pagamento }}</h3>
                    <p class="descricao-doacao-card">
                      {{ doacao.descricao }}
                    </p>
                    <v-btn
                      class="mx-2"
                      dark
                      text
                      v-if="doacao.link"
                      color="#036564"
                      :href="doacao.link"
                      target="_blank"
                    >
                      Acessar

                      <v-icon class="ml-2">mdi-open-in-new</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-sheet>

          <v-sheet rounded="lg" class="mt-3" min-height="268" elevation="10">
            <div class="ong-right-card-tag">
              <h4 class="text-center">MEUS SERVIÇOS:</h4>
              <v-divider class="publicacao-divider"></v-divider>
              <div class="ong-tags-card" v-for="tag in tags" :key="tag.id">
                <v-chip class="ma-1" color="#036666" outlined small>
                  {{ tag.nome_tag }}

                  <v-icon right x-small> mdi-paw </v-icon>
                </v-chip>
              </div>
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
      tab: null,
      publicacoes: {},
      animais: {},
      doacoes: {},
      tags: {},
      bio: {},
      loading: true,
    };
  },
  methods: {
    async loadOng() {
      const url = `/ongs/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.ong = res.data));
      this.loading = false;
    },

    loadPublicacoes() {
      const url = `/ultimasPublicacoes/${this.$route.params.id}`;
      api.get(url).then((res) => (this.publicacoes = res.data));
      this.loading = false;
    },

    loadBio() {
      const url = `/bioById/${this.$route.params.id}`;
      api.get(url).then((res) => (this.bio = res.data));
      this.loading = false;
    },

    loadAnimals() {
      const url = `/allByUser/${this.$route.params.id}`;
      api.get(url).then((res) => (this.animais = res.data));
      this.loading = false;
    },

    loadDoacoes() {
      const url = `/doacoesByUser/${this.$route.params.id}`;
      api.get(url).then((res) => (this.doacoes = res.data));
      this.loading = false;
    },

    loadTags() {
      const url = `/getOngTags/${this.$route.params.id}`;
      api.get(url).then((res) => (this.tags = res.data));
      this.loading = false;
    },
  },
  mounted() {
    this.loadOng();
    this.loadPublicacoes();
    this.loadBio();
    this.loadAnimals();
    this.loadDoacoes();
    this.loadTags();
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
  object-fit: cover;
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

.animal-ong-card {
  width: 130px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border-radius: 3px;
}

.aoc-header > img {
  max-width: 130px;
}

.aoc-content {
  text-align: center;
  color: #222222;
}

.ong-doacoes-card {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
    0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  border-left: 3px solid #036564;
  border-radius: 5px;
  padding: 10px;
  transition: ease-out 0.3s;
}

.ong-doacoes-card:hover {
  transform: scale(1.02);
  transition: ease-out 0.3s;
}

.ong-right-card-tag {
  padding: 5px;
}

.ong-tags-card {
  display: inline-table;
}

.descricao-doacao-card{
  word-break: break-all;
}

.icon-info{
  color: #036564;
}
</style>
