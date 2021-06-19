<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="ongs-page">
      <h1 class="ongs-page-title">ONG'S CADASTRADAS NO SISTEMAS</h1>
      <v-divider class="mb-5"></v-divider>

      <v-row>
        <v-col cols="12" sm="9">
          <v-sheet min-height="70vh" color="transparent" rounded="lg">
            <v-row v-if="!isSearch">
              <v-col cols="12" sm="4" v-for="ong in ongs" :key="ong.id">
                <router-link
                  class="router-link"
                  :to="{ name: 'ongById', params: { id: ong.id } }"
                >
                  <v-card class="ong-card" color="#fff" dark>
                    <div class="d-flex flex-no-wrap">
                      <v-avatar class="ma-2 avatar-img-ongs" size="100" tile>
                        <img :src="ong.userImage" alt="" v-if="ong.userImage" />
                        <Gravatar :email="ong.email" :alt="ong.name" v-else />
                      </v-avatar>
                      <v-divider class="divider-avatar" vertical></v-divider>
                      <div>
                        <v-card-title class="headline text-center">
                          {{ ong.name }}
                        </v-card-title>

                        <div class="card-ongs-content">
                          <span
                            ><strong
                              >{{ ong.cidade }} - {{ ong.estado }}
                            </strong>
                          </span>
                          <small
                            ><strong
                              >Membro desde: {{  new Date( ong.createdAt).toLocaleDateString("pt-br") }}
                            </strong>
                          </small>
                        </div>

                        <v-card-actions> </v-card-actions>
                      </div>
                    </div>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col cols="12" sm="4" v-for="ong in ongsSearch" :key="ong.id">
                <router-link
                  class="router-link"
                  :to="{ name: 'ongById', params: { id: ong.id } }"
                >
                  <v-card class="ong-card" color="#fff" dark>
                    <div class="d-flex flex-no-wrap">
                      <v-avatar class="ma-2 avatar-img-ongs" size="100" tile>
                        <img :src="ong.userImage" alt="" v-if="ong.userImage" />
                        <Gravatar :email="ong.email" :alt="ong.name" v-else />
                      </v-avatar>
                      <v-divider class="divider-avatar" vertical></v-divider>
                      <div>
                        <v-card-title class="headline text-center">
                          {{ ong.name }}
                        </v-card-title>

                        <div class="card-ongs-content">
                          <span
                            ><strong
                              >{{ ong.cidade }} - {{ ong.estado }}
                            </strong>
                          </span>
                        </div>

                        <v-card-actions> </v-card-actions>
                      </div>
                    </div>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <div class="search">
              <h2 class="text-center mb-5">PESQUISAR</h2>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Nome da Ong"
                    prepend-inner-icon="mdi-account-group"
                    v-model="search.name"
                    outlined
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
        class="bt-carregar-mais"
        elevation="24"
        dark
        v-if="loadMore && !isSearch"
        @click="getOngs"
      >
        Carregar Mais

        <v-icon dark right> mdi-reload </v-icon>
      </v-btn>

      <v-btn
        depressed
        class="bt-carregar-mais"
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
import Gravatar from "vue-gravatar";

export default {
  name: "Ongs",
  components: { Gravatar },
  data: function () {
    return {
      ongs: [],
      ongsSearch: [],
      search: {},
      page: 1,
      loadMore: true,
      loading: true,
      pageSearch: 1,
      isSearch: false,
      loadMoreSearch: true,
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
    getOngs() {
      api(`/ongs?page=${this.page}`).then((res) => {
        this.ongs = this.ongs.concat(res.data.data);
        this.page++;
        this.loading = false;

        if (res.data.data.length === 0) this.loadMore = false;
      });
    },

    procurar() {
      this.isSearch = true;
      api
        .post(`/ongsSearch?page=${this.pageSearch}`, this.search)
        .then((res) => {
          this.ongsSearch = this.ongsSearch.concat(res.data.data);
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
      this.ongs = [];
      this.page = 1;
      this.loadMore = true;

      this.getOngs();
    },
  },
  mounted() {
    this.getOngs();
  },
};
</script>

<style scoped>
.ongs-page {
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

.ong-img {
  display: flex;
  justify-content: center;
  justify-items: center;
  padding-top: 20px;
}

.ong-img > img {
  max-height: 64px;
  border-radius: 50%;
}

.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  padding: 0px !important;
}

.divider-avatar {
  background-color: #52b69a;
}


.card-ongs-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.ong-card {
  transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  color: #52b69a;
  border-left: 0.25rem solid #52b69a !important;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}

.ong-card:hover {
  transform: scale(1.03);
  color: #f7893b;
   border-left: 0.25rem solid #f7893b !important;
}

.divider-avatar:hover {
  background-color: #f7893b!important;
}

.avatar-img-ongs > img {
  object-fit: cover;
}

.search {
  padding: 20px;
}

.ongs-page-title{
  /* text-align: center; */
  color: #f7893b;
  font-weight: 400;
}
</style>
