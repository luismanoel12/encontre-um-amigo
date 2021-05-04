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
            <v-divider></v-divider>
            <div class="ong-page-actions">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="red"
                    class="btn-new-password"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left> mdi-alert </v-icon>
                    Denunciar
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Denunciar: {{ ong.name }} </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="tiposDenuncias"
                            prepend-inner-icon="mdi-sign-real-estate"
                            label="Tipo da Denúncia"
                            v-model="denuncia.tipoDenuncia"
                            :rules="[rules.required]"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            outlined
                            name="input-7-4"
                            label="Descrição da Denúncia"
                            v-model="denuncia.descricao"
                            :rules="[rules.required]"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>* indica campo necessário</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="red darken-1" text @click="denunciar">
                      Enviar Denúncia
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-sheet>

          <h1 class="text-center mt-10">ÚLTIMAS PUBLICAÇÕES</h1>
          <v-row class="ultimas-publicacoes">
            <v-col
              cols="12"
              sm="12"
              v-for="publicacao in publicacoes"
              :key="publicacao.id"
            >
              <div class="card-publicacao">
                <div class="card-publicacao-header">
                  <router-link
                    class="router-link"
                    :to="{
                      name: 'publicacoesById',
                      params: { id: publicacao.id },
                    }"
                  >
                    <h2 class="pub-titulo">{{ publicacao.titulo }}</h2>

                    <h5>{{ publicacao.createdAt }}</h5>
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
                  <p>Publicado por: {{ publicacao.userName }}</p>
                </div>
                <div class="card-publicacao-content">
                  <p>{{ publicacao.chamada }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268" elevation="10">
            <div class="ong-right-card">
              <h4 class="text-center">INSTAGRAM</h4>
              <v-divider class="publicacao-divider"></v-divider>
              <!-- Em andamento -->
              <!-- <vue-instagram
                token="a7acf785614a7dc474222ad8e68960db"
                username="robertdowneyjr"
                :count="5"
                mediaType="image"
              >
                <template slot="feeds" slot-scope="props">
                  <li class="fancy-list">{{ props.feed.link }}</li>
                </template>
                <template slot="error" slot-scope="props">
                  <div class="fancy-alert">{{ props.error.error_message }}</div>
                </template>
              </vue-instagram> -->
              <!-- Em andamento -->
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
import VueInstagram from "vue-instagram";

export default {
  name: "OngById",
  components: { Gravatar, VueInstagram },
  data: function () {
    return {
      ong: {},
      publicacoes: {},
      denuncia: {},
      dialog: false,
      rules: {
        required: (value) => !!value || "Requerido.",
      },
      tiposDenuncias: [
        { text: "Violência animal", value: "VA" },
        { text: "Venda de animais", value: "VDA" },
        { text: "Abusos", value: "AS" },
        { text: "Outros", value: "OS" },
      ],
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

    denunciar() {    
      this.denuncia.userId = this.ong.id;
      
      api.post(`/denuncia`, this.denuncia)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.denuncia = {};
          this.dialog = false;
        })
        .catch(showError);
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

.publicacao-divider {
  background-color: #212121;
  margin-bottom: 10px;
}

.ong-page-actions {
  text-align: center;
  margin-top: 10px;
}
</style>
