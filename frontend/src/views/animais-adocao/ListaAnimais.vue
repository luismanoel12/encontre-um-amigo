<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="lista-animais-page">

      <div class="lista-animais-page-header">
        <h1>Animais Cadastrados no sistema</h1>
        <v-divider></v-divider>
      </div>

      <v-row>
        <v-col cols="12" sm="9">
          <v-sheet min-height="70vh" color="transparent" rounded="lg">
            <v-row v-if="!isSearch">
              <v-col
                cols="12"
                xl="3"
                lg="4"
                sm="6"
                v-for="animal in animais"
                :key="animal.id"
              >
                <router-link
                  class="router-link"
                  :to="{ name: 'animaisById', params: { id: animal.id } }"
                >
                  <v-card class="mx-auto my-12 animal-card" max-width="374">
                    <v-badge
                      color="#f7893b"
                      icon="mdi-dog-side"
                      offset-x="78"
                      offset-y="20"
                      left
                      :content="animal.status"
                      overlap
                      tile
                    >
                      <div class="img-card-animal">
                        <img
                          v-if="animal.imagem"
                          :src="animal.imagem"
                          height="100%"
                          alt="Animais"
                        />
                        <img
                          v-else
                          src="@/assets/article.png"
                          height="100%"
                          alt="Animais"
                        />
                      </div>
                    </v-badge>

                    <v-card-title class="main-color-animais-list"> {{ animal.nome }}</v-card-title>

                    <v-card-text class="text-center">
                      <v-row>
                        <v-col cols="12" sm="12">
                          <span>{{ animal.cidade }} <br /></span>
                          <span>{{ animal.estado }} <br /></span>

                          <v-divider class="divider-animal-specs"></v-divider>
                          <v-row>
                            <v-col cols="4" sm="4">
                              <span
                                class="mdi mdi-cat mdi-24px"
                                v-if="animal.tipo == 'Gato'"
                              ></span>
                              <span
                                class="mdi mdi-dog-side mdi-24px"
                                v-else
                              ></span>
                            </v-col>
                            <v-col cols="4" sm="4">
                              <span
                                class="mdi mdi-alpha-p-circle mdi-24px"
                                v-if="animal.porte == 'Pequeno'"
                              ></span>
                              <span
                                class="mdi mdi-alpha-m-circle mdi-24px"
                                v-if="animal.porte == 'Médio'"
                              ></span>
                              <span
                                class="mdi mdi-alpha-g-circle mdi-24px"
                                v-if="animal.porte == 'Grande'"
                              ></span>
                            </v-col>
                            <v-col cols="4" sm="4">
                              <span
                                class="mdi mdi-gender-male mdi-24px"
                                v-if="animal.sexo == 'Macho'"
                              ></span>
                              <span
                                class="mdi mdi-gender-female mdi-24px"
                                v-else
                              ></span>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col
                cols="12"
                xl="3"
                lg="4"
                sm="6"
                v-for="animal in animaisSearch"
                :key="animal.id"
              >
                <router-link
                  class="router-link"
                  :to="{ name: 'animaisById', params: { id: animal.id } }"
                >
                  <v-card class="mx-auto my-12 animal-card" max-width="374">
                    <v-badge
                      color="#036564"
                      icon="mdi-dog-side"
                      offset-x="78"
                      offset-y="20"
                      left
                      :content="animal.status"
                      overlap
                      tile
                    >
                      <div class="img-card-animal">
                        <img
                          v-if="animal.imagem"
                          :src="animal.imagem"
                          height="100%"
                          alt="Animais"
                        />
                        <img
                          v-else
                          src="@/assets/article.png"
                          height="100%"
                          alt="Animais"
                        />
                      </div>
                    </v-badge>

                    <v-card-title  class="main-color-animais-list"> {{ animal.nome }}</v-card-title>

                    <v-card-text class="text-center">
                      <v-row>
                        <v-col cols="12" sm="12">
                          <span>{{ animal.cidade }} <br /></span>
                          <span>{{ animal.estado }} <br /></span>

                          <v-divider class="divider-animal-specs"></v-divider>
                          <v-row>
                            <v-col cols="4" sm="4">
                              <span
                                class="mdi mdi-cat mdi-24px"
                                v-if="animal.tipo == 'Gato'"
                              ></span>
                              <span
                                class="mdi mdi-dog-side mdi-24px"
                                v-else
                              ></span>
                            </v-col>
                            <v-col cols="4" sm="4">
                              <span
                                class="mdi mdi-alpha-p-circle mdi-24px"
                                v-if="animal.porte == 'Pequeno'"
                              ></span>
                              <span
                                class="mdi mdi-alpha-m-circle mdi-24px"
                                v-if="animal.porte == 'Médio'"
                              ></span>
                              <span
                                class="mdi mdi-alpha-g-circle mdi-24px"
                                v-if="animal.porte == 'Grande'"
                              ></span>
                            </v-col>
                            <v-col cols="4" sm="4">
                              <span
                                class="mdi mdi-gender-male mdi-24px"
                                v-if="animal.sexo == 'Macho'"
                              ></span>
                              <span
                                class="mdi mdi-gender-female mdi-24px"
                                v-else
                              ></span>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <div class="search">
              <h2 class="text-center mb-5 main-color-animais-list">PESQUISAR</h2>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-select
                    :items="estados"
                    prepend-inner-icon="mdi-google-maps"
                    v-model="search.estado"
                    label="Estado"
                    outlined
                    color="#f7893b"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Cidade"
                    prepend-inner-icon="mdi-city"
                    v-model="search.cidade"
                    outlined
                    color="#f7893b"
                  ></v-text-field>
                </v-col>
              </v-row>

              <div class="search-buttons">
                <v-btn depressed block @click="procurar" dark color="#f7893b">
                  Pesquisar
                  <v-icon dark right> mdi-magnify </v-icon>
                </v-btn>
                <v-btn depressed block @click="clear" class="mt-5" color="info">
                  Cancelar
                  <v-icon dark right> mdi-close </v-icon>
                </v-btn>
              </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination">
      <v-btn
        depressed
        color="#f7893b"
        elevation="24"
        dark
        v-if="loadMore && !isSearch"
        @click="getAnimais"
      >
        Carregar Mais

        <v-icon dark right> mdi-reload </v-icon>
      </v-btn>

      <v-btn
        depressed
         color="#f7893b"
        elevation="24"
        dark
        v-if="loadMoreSearch && isSearch"
        @click="procurar"
      >
        Carregar Mais

        <v-icon dark right> mdi-reload </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";
import { showError } from "@/global";

export default {
  name: "ListaAnimais",
  data: function () {
    return {
      animais: [],
      animaisSearch: [],
      search: {},
      page: 1,
      pageSearch: 1,
      isSearch: false,
      loadMore: true,
      loadMoreSearch: true,
      loading: true,
      estados: [
        { text: "Acre", value: "AC" },
        { text: "Alagoas", value: "AL" },
        { text: "Amapá", value: "AP" },
        { text: "Amazonas", value: "AM" },
        { text: "Bahia", value: "BA" },
        { text: "Ceará", value: "CE" },
        { text: "Distrito Federal", value: "DF" },
        { text: "Espírito Santo", value: "ES" },
        { text: "Goiás", value: "GO" },
        { text: "Maranhão", value: "MA" },
        { text: "Mato Grosso", value: "MT" },
        { text: "Mato Grosso do Sul", value: "MS" },
        { text: "Minas Gerais", value: "MG" },
        { text: "Pará", value: "PA" },
        { text: "Paraíba", value: "PB" },
        { text: "Paraná", value: "PR" },
        { text: "Pernambuco", value: "PE" },
        { text: "Piauí", value: "PI" },
        { text: "Rio de Janeiro", value: "RJ" },
        { text: "Rio Grande do Norte", value: "RN" },
        { text: "Rio Grande do Sul", value: "RS" },
        { text: "Rondônia", value: "RO" },
        { text: "Roraima", value: "RR" },
        { text: "Santa Catarina", value: "SC" },
        { text: "São Paulo", value: "SP" },
        { text: "Sergipe", value: "SE" },
        { text: "Tocantins", value: "TO" },
      ],
    };
  },

  methods: {
    getAnimais() {
      this.isSearch = false;
      api(`/animaisPublic?page=${this.page}`).then((res) => {
        this.animais = this.animais.concat(res.data.data);
        this.page++;
        this.loading = false;

        if (res.data.data.length === 0) this.loadMore = false;
      });
    },

    procurar() {
      this.isSearch = true;
      api
        .post(`/animaisSearch?page=${this.pageSearch}`, this.search)
        .then((res) => {
          this.animaisSearch = this.animaisSearch.concat(res.data.data);
          this.pageSearch++;
          this.loading = false;

          if (res.data.data.length === 0) this.loadMoreSearch = false;
        })
        .catch(showError);
    },

    clear() {
      this.search = {};
      location.reload();
    },
  },
  watch: {
    $route(to) {
      this.animais = [];
      this.page = 1;
      this.loadMore = true;
      (this.animaisSearch = []),
        (this.loadMoreSearch = true),
        this.getAnimais();
      this.procurar();
    },
  },
  mounted() {
    this.getAnimais();
  },
};
</script>

<style scoped>
.lista-animais-page {
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

.animal-card {
  background-color: #fff;
  width: 200px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
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

.v-card__title {
  text-align: center !important;
  display: block !important;
}

.img-card-animal {
  height: 150px;
}

.img-card-animal img {
  max-width: 100%;
  min-width: 200px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  object-fit: cover;
}

.router-link {
  text-decoration: none;
}

.animal-card {
  transition: 0.5s;
}

.animal-card:hover {
  transform: scale(1.04);
  transition: 0.5s;
  border-radius: 8px;
}

.span-animal-card {
  background-color: #212121;
  width: 100%;
  padding: 5px;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 5px;
}

.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
    0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}

.animal-badge {
  border: 1px solid #212121;
  border-radius: 5px;
}

.divider-animal-specs {
  margin-bottom: 10px;
}

.main-color-animais-list{
  color: #f7893b;
}

.lista-animais-page-header > h1{
  color: #f7893b;
  font-weight: 900;
  text-transform: uppercase;
}

@media only screen and (max-width: 600px) {
  .animal-card {
    width: 90%;
  }

  .img-card-animal > img {
    width: 100%;
  }
}
</style>