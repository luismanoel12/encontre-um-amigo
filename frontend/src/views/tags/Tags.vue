<template>
  <div class="tags-page">
    <v-container>
      <div class="cadastrar-tags-form">
        <div class="cadastrar-tags-titulo">
          <h1>Olá, {{ user.name }}.</h1>
          <h2>Aqui se encontram todos os seus serviços cadastrados!</h2>
          <small
            >Cadastre serviços no qual sua ONG faz, para que os usuários possam
            entrar em contato caso necessite de algum!</small
          >
        </div>

        <v-row class="mt-5 mb-2">
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <div class="novo-tag">
                <v-btn color="#036564" dark v-bind="attrs" v-on="on">
                  Novo Serviço

                  <v-icon dark right> mdi-paw </v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline excluir-tag" v-if="this.mode === 'remove'"
                  >Excluir o serviço:
                  <strong> {{ tag.nome_tag }} </strong>
                </span>
                <span class="headline salvar-tag" v-if="!tag.id"
                  >Cadastrar Novo Serviço</span
                >
                <span
                  class="headline atualizar-tag"
                  v-if="tag.id && this.mode != 'remove'"
                  >Atualizar o serviço:
                  <strong> {{ tag.nome_tag }} </strong>
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <h1
                    v-if="this.mode === 'remove'"
                    class="text-center excluir-tag"
                  >
                    Tem certeza que deseja excluir a TAG:
                    {{ tag.nome_tag }}
                  </h1>
                  <h2
                    v-if="this.mode === 'remove'"
                    class="text-center excluir-tag"
                  >
                    Essa ação não poderá ser desfeita!
                  </h2>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Diga o nome do serviço"
                        v-model="tag.nome_tag"
                        placeholder="Ex: Recolhimento de animais"
                        prepend-inner-icon="mdi-paw"
                        required
                        maxlength="30"
                        counter="30"
                        hint="Máximo de 30 caracteres"
                        outlined
                        v-if="this.mode === 'save'"
                      ></v-text-field>
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
      </div>

      <v-container>
        <v-row>
          <v-col
            cols="12"
            xl="2"
            lg="3"
            sm="4"
            v-for="tag in tags"
            :key="tag.id"
          >
            <div class="minhas-tags-card">
              <div class="minhas-tags-card-content">
                <h2>{{ tag.nome_tag }}</h2>
                <div class="minhas-tags-card-link">
                  <v-btn
                    class="mx-2"
                    dark
                    text
                    v-if="tag.link"
                    color="#036564"
                    @click="loadTag(tag, 'remove')"
                  >
                    Acessar
                  </v-btn>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="minhas-tags-card-actions">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                  color="warning"
                  @click="loadTag(tag)"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>

                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                  color="error"
                  @click="loadTag(tag, 'remove')"
                >
                  <v-icon dark> mdi-delete-forever </v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";
import { mapState } from "vuex";

export default {
  name: "Tags",
  computed: { ...mapState(["user"]) },
  data: function () {
    return {
      mode: "save",
      tags: [],
      tag: {},
      dialog: false,
    };
  },
  methods: {
    loadTags() {
      api(`/tags`).then((res) => {
        this.tags = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.tag = {};
      this.loadTags();
      this.dialog = false;
    },
    save() {
      const method = this.tag.id ? "put" : "post";
      const id = this.tag.id ? `/${this.tag.id}` : "";
      api[method](`/tags${id}`, this.tag)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.tag.id;
      api
        .delete(`/tags/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTag(tag, mode = "save") {
      this.mode = mode;
      api.get(`/tags/${tag.id}`).then((res) => (this.tag = res.data));
      this.dialog = true;
    },
  },
  watch: {
    page() {
      this.loadTags();
    },
  },
  mounted() {
    this.loadTags();
  },
};
</script>

<style scoped>
.cadastrar-tags-form {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.novo-tag {
  display: flex;
  justify-content: center;
  align-items: center;
}

.minhas-tags-card {
  background-color: #fff;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
    0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  border-left: 3px solid #036564;
  border-radius: 5px;
  padding: 10px;
}

.minhas-tags-card-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.minhas-tags-card-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>