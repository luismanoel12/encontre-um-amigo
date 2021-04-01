<template>
  <v-container>
    <div class="lista-animais-page">
      <v-row>
        <v-col cols="12" sm="3" v-for="animal in animais" :key="animal.id">
          <router-link
            class="router-link"
            :to="{ name: 'animaisById', params: { id: animal.id } }"
          >
            <v-card
              class="mx-auto my-12 animal-card"
              max-width="374"
              elevation="10"
            >
              <div class="img-card">
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
                  alt="Article"
                />
              </div>

              <v-card-title> {{ animal.nome }}</v-card-title>

              <v-card-text class="text-center">
                <v-row>
                  <v-col cols="12" sm="12">
                    <h4>{{ animal.cidade }} - {{ animal.estado }}</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    Sexo:
                    <div class="span-animal-card">
                      <span>
                        {{ animal.sexo }}
                      </span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    Porte:
                    <div class="span-animal-card">
                      <span>{{ animal.porte }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination">
      <v-btn depressed color="primary" v-if="loadMore" @click="getAnimais">
        Carregar Mais
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";

export default {
  name: "ListaAnimais",
  data: function () {
    return {
      animais: [],
      page: 1,
      loadMore: true,
    };
  },

  methods: {
    getAnimais() {
      api(`/animais?page=${this.page}`).then((res) => {
        this.animais = this.animais.concat(res.data.data);
        this.page++;

        if (res.data.data.length === 0) this.loadMore = false;
      });
    },
  },
  watch: {
    $route(to) {
      this.animais = [];
      this.page = 1;
      this.loadMore = true;

      this.getAnimais();
    },
  },
  mounted() {
    this.getAnimais();
  },
};
</script>

<style scoped>
.lista-animais-page {
  /* background-color: #fff; */
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

.animal-card {
  background-color: #fff;
  width: 80%;
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

.img-card {
  height: 200px;
}

.img-card img {
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
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

@media only screen and (max-width: 600px) {
  .animal-card {
    width: 90%;
  }
}
</style>