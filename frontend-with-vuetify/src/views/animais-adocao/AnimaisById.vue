<template>
  <div class="animal-page">
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="animal-left-card">
              <div class="animal-left-card-header">
                <h2 class="text-center">Foto</h2>
              </div>
              <div class="animal-left-card-content">
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
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg" elevation="10">
            <div class="animal-page-header">
              <h1>{{ animal.nome }}</h1>
            </div>
            <v-divider></v-divider>
            <div class="animal-page-content">
              <h4>Descrição:</h4>
              <p>
                {{ animal.descricao }}
              </p>

              <h2>Cidade: {{ animal.cidade }} - {{ animal.estado }}</h2>
              <h2>{{ animal.tipo }}</h2>
              <h2>{{ animal.sexo }}</h2>
              <h2>{{ animal.porte }}</h2>
            </div>

            <div class="share-button">
              <div class="overflow-hidden">
                <div class="text-center mb-8">
                  <v-btn color="deep-purple" outlined @click="active = !active">
                    compartilhar
                  </v-btn>
                </div>

                <v-bottom-navigation
                  v-model="value"
                  :input-value="active"
                  color="indigo"
                >
                  <v-btn>
                    <v-icon x-large color="#3B5998">mdi-facebook</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon x-large color="#8134AF">mdi-instagram</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon x-large color="#08a0e9">mdi-twitter</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon x-large color="#25D366">mdi-whatsapp</v-icon>
                  </v-btn>
                </v-bottom-navigation>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="animal-right-card">
              <h4 class="text-center">ÚLTIMAS PUBLICAÇÕES</h4>
              <v-divider class="publicacao-divider"></v-divider>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  v-for="publicacao in publicacoes"
                  :key="publicacao.id"
                >
                  <router-link
                    class="router-link"
                    :to="{
                      name: 'publicacoesById',
                      params: { id: publicacao.id },
                    }"
                  >
                    <div class="ultimas-publicacoes">
                      <span>{{ publicacao.titulo }}</span>
                    </div>
                  </router-link>
                </v-col>
              </v-row>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "../../config/api";

export default {
  name: "AnimaisById",
  data: function () {
    return {
      animal: {},
      publicacoes: [],
      value: 1,
      active: true,
      fbUrl: null,
      wpUrl: '',
      ttUrl: '',
      igUrl: '',
    };
  },
  methods: {
    loadAnimal() {
      const url = `/animaisPublic/${this.$route.params.id}`;
      api.get(url).then((res) => (this.animal = res.data));
    },

    loadPublicacoes() {
      const url = `/ultimasPublicacoes/${this.animal.userId}`;
      api.get(url).then((res) => (this.publicacoes = res.data));
    },

    loadSharingUrls(){
      const atualUrl = document.location.href;

      this.fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${atualUrl}`
      
    }
  },
  mounted() {
    this.loadSharingUrls();
    this.loadAnimal();
    this.loadPublicacoes();
  },
};
</script>

<style scoped>
.animal-page {
  margin-top: 20px;
}

.animal-page-header {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar-img > img {
  border-radius: 50%;
}

.animal-page-content,
.animal-right-card,
.animal-left-card {
  padding: 20px;
}

.animal-page-content > p {
  word-break: break-all;
}

.animal-left-card-header {
  padding-bottom: 10px;
}

.ultimas-publicacoes {
  background-color: #212121;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  word-break: break-all;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  transition: ease 0.5s;
}

.ultimas-publicacoes:hover {
  background-color: #232f34;
  transform: scale(1.03);
}

.publicacao-divider {
  margin-bottom: 10px;
  background-color: #212121;
}

.share-button {
  margin-top: 50px;
}
</style>