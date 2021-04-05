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
            <div class="ong-page-content"></div>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="ong-right-card">
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
                      <h3>{{ publicacao.titulo }}</h3>
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
import Gravatar from "vue-gravatar";

export default {
  name: "OngById",
  components: { Gravatar },
  data: function () {
    return {
      ong: {},
      publicacoes: {},
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
  },
  mounted() {
    this.loadOng();
    this.loadPublicacoes();
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

.publicacao-divider{
  background-color: #212121;
  margin-bottom: 10px;
}

.ultimas-publicacoes{
  color: #ee6c4d;
  background-color: #293241;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
}

.ultimas-publicacoes:hover{
  background-color: #fff;
  border: 1px solid #293241;
}
</style>
