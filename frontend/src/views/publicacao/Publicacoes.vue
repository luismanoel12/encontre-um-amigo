<template>
  <div class="animais-page">
    <v-container>
      <v-form class="form elevation-10">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Título"
              v-model="publicacao.titulo"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="URL da imagem"
              v-model="publicacao.imageUrl"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <v-textarea
              outlined
              name="input-7-4"
              v-model="publicacao.chamada"
              :readonly="mode === 'remove'"
              label="Chamada"
              maxlength="500"
              counter="500"
              hint="Máximo de 500 caracteres"
              required
              placeholder="Digite a chamada para sua publicação."
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <VueEditor
              v-model="publicacao.descricao"
              placeholder="Informe o conteúdo da publicação"
              :readonly="mode === 'remove'"
            />
          </v-col>
        </v-row>

        <div class="buttons">
          <v-btn depressed v-if="mode === 'save'" @click="save" color="success">
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
          <v-btn depressed @click="reset" class="btn-cancel" color="primary">
            Cancelar
            <v-icon dark right> mdi-close-thick </v-icon>
          </v-btn>
        </div>
      </v-form>

      <v-data-table
        :items="publicacoes"
        :headers="headers"
        class="elevation-10"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="bt-actions"
            color="primary"
            fab
            elevation="0"
            small
            @click="loadPublicacao(item)"
            dark
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            class="bt-actions"
            color="error"
            fab
            elevation="0"
            small
            @click="loadPublicacao(item, 'remove')"
            dark
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";
import { VueEditor } from "vue2-editor";

export default {
  name: "Publicacoes",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      publicacao: {},
      publicacoes: [],

      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Código", value: "id" },
        { text: "Título", value: "titulo" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadPublicacoes() {
      const url = `/publicacaoUsuario`;
      api.get(url).then((res) => {
        this.publicacoes = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.publicacao = {};
      this.loadPublicacoes();
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
</style>