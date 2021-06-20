<template>
  <div class="animais-page">
    <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

    <v-container v-else>
      <div class="cadastrar-animais-titulo">
        <h1>Olá, {{ user.name }}.</h1>
        <h2>Aqui se encontram todas as suas publicações!</h2>
      </div>

      <v-row>
        <v-dialog v-model="dialog" max-width="100vh">
          <template v-slot:activator="{ on, attrs }">
            <div class="nova-publicacao-header">
              <v-btn color="#f7893b" dark v-bind="attrs" v-on="on">
                Nova publicação

                <v-icon dark right> mdi-newspaper-plus </v-icon>
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span
                class="headline excluir-animal"
                v-if="this.mode === 'remove'"
                >Excluir a Publicação:
                <strong> {{ publicacao.titulo }} </strong>
              </span>
              <span class="headline salvar-animal" v-if="!publicacao.id"
                >Cadastrar Publicações</span
              >
              <span
                class="headline atualizar-animal"
                v-if="publicacao.id && this.mode != 'remove'"
                >Atualizar a Publicação:
                <strong> {{ publicacao.titulo }} </strong>
              </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Título"
                      v-model="publicacao.titulo"
                      v-if="mode != 'remove'"
                      prepend-inner-icon="mdi-text"
                      color="#f7893b"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="URL da imagem"
                      v-model="publicacao.imageUrl"
                      v-if="mode != 'remove'"
                      color="#f7893b"
                      prepend-inner-icon="mdi-image"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      v-model="publicacao.chamada"
                      v-if="mode != 'remove'"
                      prepend-inner-icon="mdi-cursor-text"
                      label="Chamada"
                      maxlength="500"
                      counter="500"
                      hint="Máximo de 500 caracteres"
                      color="#f7893b"
                      required
                      placeholder="Digite a chamada para sua publicação."
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <VueEditor
                      v-model="publicacao.descricao"
                      placeholder="Informe o conteúdo da publicação"
                      v-if="mode != 'remove'"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="buttons">
                <v-btn
                  depressed
                  v-if="mode === 'save'"
                  @click="save"
                  color="#036564"
                  dark
                >
                  Salvar
                  <v-icon dark right> mdi-content-save </v-icon>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                  depressed
                  v-if="mode === 'remove'"
                  @click="remove"
                  color="error"
                  >Excluir
                  <v-icon dark right> mdi-delete </v-icon>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                  depressed
                  @click="reset"
                  class="btn-cancel"
                  color="primary"
                >
                  Cancelar
                  <v-icon dark right> mdi-close-thick </v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-data-table
        :items="publicacoes"
        :headers="headers"
        class="elevation-10"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="#f7893b" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn
                    class="bt-actions"
                    color="warning"
                    text
                    elevation="0"
                    small
                    @click="loadPublicacao(item)"
                    dark
                  >
                    Editar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <v-btn
                    class="bt-actions"
                    color="error"
                    text
                    elevation="0"
                    small
                    @click="loadPublicacao(item, 'remove')"
                    dark
                  >
                    Deletar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";

export default {
  name: "Publicacoes",
  components: { VueEditor },
  computed: { ...mapState(["user"]) },
  data: function () {
    return {
      mode: "save",
      publicacao: {},
      publicacoes: [],
      dialog: false,
      loading: true,

      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Título", value: "titulo" },
        { text: "Publicado em", value: "createdAt  " },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadPublicacoes() {
      const url = `/publicacaoUsuario`;
      api.get(url).then((res) => {
        this.publicacoes = res.data;
        this.loading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.publicacao = {};
      this.loadPublicacoes();
      this.dialog = false;
    },
    save() {
      const method = this.publicacao.id ? "put" : "post";
      const id = this.publicacao.id ? `/${this.publicacao.id}` : "";
      api[method](`/publicacao${id}`, this.publicacao)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.publicacao.id;
      api
        .delete(`/publicacao/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadPublicacao(publicacao, mode = "save") {
      this.mode = mode;
      api
        .get(`/publicacao/${publicacao.id}`)
        .then((res) => (this.publicacao = res.data));
      this.dialog = true;
    },
  },
  watch: {
    page() {
      this.loadPublicacoes();
    },
  },
  mounted() {
    this.loadPublicacoes();
  },
};
</script>

<style scoped>
.form {
  margin-top: 50px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.buttons {
  margin-top: 20px;
}

.nova-publicacao-header {
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 15px;
}
</style>