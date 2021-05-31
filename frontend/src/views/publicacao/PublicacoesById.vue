<template>
  <div class="publicacao-page">
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="publicacao-left-card">
              <div class="publicacao-left-card-header">
                <h2 class="text-center">Compartilhar</h2>
              </div>
              <div class="publicacao-left-card-content"></div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg" elevation="10">
            <div class="publicacao-page-header">
              <v-avatar class="ma-2 pub-avatar-img" size="64" tile>
                <img :src="publicacao.userImage" alt="" v-if="publicacao.userImage">
                <Gravatar
                  :email="publicacao.email"
                  :alt="publicacao.name"
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
                <h5>{{ publicacao.dataPub }}</h5>
              </router-link>
            </div>

            <div class="publicacao-page-header-title">
              <h2>{{ publicacao.titulo }}</h2>

            </div>

            <v-divider></v-divider>
            <div class="publicacao-page-content">
              <div class="img-card-publicacao">
                <img
                  v-if="publicacao.imageUrl"
                  :src="publicacao.imageUrl"
                  height="100%"
                  alt="Animais"
                />
                <img
                  v-else
                  src="@/assets/publicacao.jpg"
                  height="100%"
                  alt="Article"
                />
              </div>
              <h4>Descrição:</h4>
              <div
                class="publicacao-content"
                v-html="publicacao.descricao"
              ></div>
            </div>
            <div class="disqus">
              <Disqus :pageConfig="pageConfig" />
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="animal-right-card">
              <h4 class="text-center">ÚLTIMOS ANIMAIS CADASTRADOS</h4>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "../../config/api";
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack.js";
import Gravatar from "vue-gravatar";

export default {
  name: "PublicacoesById",
  components: { Gravatar },
  data: function () {
    return {
      publicacao: {},
      pageConfig: {
        identifier: this.$route.params.id,
      },
    };
  },
  methods: {
    async loadPublicacao() {
      const url = `/publicacaoPublic/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.publicacao = res.data));
    },
  },
  mounted() {
    this.loadPublicacao();
    this.$root.$once("animal-by-id", () => {
      this.loadPublicacao();
    });
  },
  updated() {
    document
      .querySelectorAll(".publicacao-content pre.ql-syntax")
      .forEach((e) => {
        hljs.highlightBlock(e);
      });
  },
};
</script>

<style >
.publicacao-page {
  margin-top: 20px;
}

.img-card-publicacao > img {
  width: 100%;
  height: auto;
}

.publicacao-page-header {
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.publicacao-page-header-title {
  padding: 20px;
}

.publicacao-page-content,
.publicacao-right-card,
.publicacao-left-card {
  padding: 20px;
}

.publicacao-page-content > p {
  word-break: break-all;
}

.publicacao-left-card-header {
  padding-bottom: 10px;
}

.publicacao-left-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.publicacao-content {
  padding: 25px;
  margin-bottom: 30px;
  word-break: break-all;
}

.publicacao-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.publicacao-content img {
  max-width: 100%;
}

.publicacao-content :last-child {
  margin-bottom: 0px;
}

.disqus {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin: 50px auto;
}

.pub-avatar-img > img {
  border-radius: 50%;
  object-fit: cover;
}

.pub-router-link{
  text-decoration: none;
  color: #2a9d8f!important;
}

.pub-router-link:hover{
  color: #264653!important;
}
</style>