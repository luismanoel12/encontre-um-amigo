<template>
  <div class="animal-page">
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="animal-left-card">
              <div class="animal-left-card-header">
                <h2 class="text-center">Responsável</h2>
              </div>
              <div class="animal-left-card-content">
                <div class="animalById-responsavel">
                  <v-avatar class="ma-2 pub-avatar-img" size="64" tile>
                    <img :src="animal.userImage" alt="" v-if="animal.userImage">
                    <Gravatar :email="animal.email" :alt="animal.name" v-else />
                  </v-avatar>
                  <div class="animal-info">
                    <span class="mdi mdi-account mr-2 mdi-24px"></span>
                    <router-link
                      class="pub-router-link"
                      :to="{
                        name: 'ongById',
                        params: { id: animal.userId },
                      }"
                    >
                      <h2>{{ animal.name }}</h2>
                    </router-link>
                  </div>

                  <div class="animal-info">
                    <span class="mdi mdi-clock mdi-16px mr-2"></span>
                    <span
                      >Publicado em:
                      {{
                        new Date(animal.createdAt).toLocaleDateString("pt-br")
                      }}
                    </span>
                  </div>
                  <div class="contato-responsavel">
                    <div class="contato-responsavel-header">
                      <h3 class="text-center"
                        >Tem alguma notícia sobre esse animal desaparecido? não perca tempo e entre em contato com a ONG responsável:</h3>
                    </div>
                    <div class="contato-responsavel-content">
                      <h4>
                        <span class="mdi mdi-email"></span>
                        E-mail: <strong>{{ animal.email }}</strong>
                      </h4>
                      <h4>
                        <span class="mdi mdi-phone-in-talk"></span>
                        Telefone: <strong>{{ animal.telefone }}</strong>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg" elevation="10">
              <div class="animal-page-header-desaparecido">
                  <h1>DESAPARECIDO</h1>
              </div>
            <div class="animal-page-header">
              <h1>{{ animal.nome }}</h1>
            </div>
            <div class="animal-page-content">
              <div class="img-card-animalById">
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
              <h4>Descrição:</h4>
              <p>
                {{ animal.descricao }}
              </p>

              <v-divider></v-divider>

              <div class="informacoes">
                <label>Informações</label>
                <v-row class="mt-4">
                  <v-col cols="12" sm="4">
                    <h3 id="tipo">Tipo : {{ animal.tipo }}</h3>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3>Sexo: {{ animal.sexo }}</h3>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3>Porte: {{ animal.porte }}</h3>
                  </v-col>
                </v-row>

                <h3 class="mt-12">
                  Localização: {{ animal.cidade }} - {{ animal.estado }}
                </h3>
              </div>
            </div>

            <div class="share-button">
              <h4 class="text-center">Compartilhe</h4>
              <v-divider></v-divider>
              <div class="overflow-hidden">
                <v-bottom-navigation color="indigo" class="share">
                  <v-btn :href="this.fbUrl" target="_blank">
                    <v-icon x-large color="#3B5998">mdi-facebook</v-icon>
                  </v-btn>

                  <!-- <v-btn>
                    <v-icon x-large color="#8134AF">mdi-instagram</v-icon>
                  </v-btn> -->

                  <v-btn :href="this.twUrl" target="_blank">
                    <v-icon x-large color="#08a0e9">mdi-twitter</v-icon>
                  </v-btn>

                  <v-btn
                    :href="this.wpUrl"
                    data-action="share/whatsapp/share"
                    target="_blank"
                  >
                    <v-icon x-large color="#25D366">mdi-whatsapp</v-icon>
                  </v-btn>
                </v-bottom-navigation>
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

export default {
  name: "AnimaisDesaparecidosById",
  components: { Gravatar },
  data: function () {
    return {
      animal: {},
      value: 1,
      active: true,
      atualUrl: null,
      fbUrl: null,
      twUrl: null,
      wpUrl: null,
    };
  },
  methods: {
    loadAnimal() {
      const url = `/animaisDesaparecidos/${this.$route.params.id}`;
      api.get(url).then((res) => (this.animal = res.data));
    },

    loadSharingUrls() {
      this.atualUrl = document.location.href;

      this.fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${this.atualUrl}`;
      this.twUrl = `https://twitter.com/intent/tweet?text=${this.atualUrl}`;
      this.wpUrl = `https://api.whatsapp.com/send?text=${this.atualUrl}`;
    },
  },
  mounted() {
    this.loadSharingUrls();
    this.loadAnimal();
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
.animal-info {
  display: flex;
  flex-direction: row;
  color: #2a9d8f;
}

.img-card-animalById > img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
}

.informacoes {
  margin-top: 20px;
  text-align: center;
}

.share {
  border-radius: 3px;
}

.animalById-responsavel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contato-responsavel {
  margin-top: 40px;
}

.contato-responsavel-content {
  color: #ff5252;
  text-align: center;
}

.contato-responsavel-header, .animal-page-header{
    color: #ff5252;
}

.animal-page-header-desaparecido{
    background-color: #ff5252;
    color: #fff;
    text-align: center;
}

</style>