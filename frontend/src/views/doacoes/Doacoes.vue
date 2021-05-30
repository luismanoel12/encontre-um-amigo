<template>
  <div class="doacoes-page">
    <v-container>
      <div class="cadastrar-doacoes-form">
        <div class="cadastrar-doacoes-titulo">
          <h1>Olá, {{ user.name }}.</h1>
          <h2>Aqui se encontram todos os seus pets cadastrados!</h2>
        </div>

        <v-row class="mt-5 mb-2">
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <div class="novo-doacao">
                <v-btn color="#036564" dark v-bind="attrs" v-on="on">
                  Cadastrar Novo Meio de Doação

                  <v-icon dark right> mdi-paw </v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span
                  class="headline excluir-doacao"
                  v-if="this.mode === 'remove'"
                  >Excluir a Doação:
                  <strong> {{ doacao.meio_pagamento }} </strong>
                </span>
                <span class="headline salvar-doacao" v-if="!doacao.id"
                  >Cadastrar Novo Meio de Doação</span
                >
                <span
                  class="headline atualizar-doacao"
                  v-if="doacao.id && this.mode != 'remove'"
                  >Atualizar o Meio de Doação:
                  <strong> {{ doacao.meio_pagamento }} </strong>
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <h1
                    v-if="this.mode === 'remove'"
                    class="text-center excluir-doacao"
                  >
                    Tem certeza que deseja excluir o doacao:
                    {{ doacao.meio_pagamento }}
                  </h1>
                  <h2
                    v-if="this.mode === 'remove'"
                    class="text-center excluir-doacao"
                  >
                    Essa ação não poderá ser desfeita!
                  </h2>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Nome"
                        v-model="doacao.meio_pagamento"
                        prepend-inner-icon="mdi-paw"
                        required
                        outlined
                        maxlength="20"
                        counter="20"
                        hint="Máximo de 20 caracteres"
                        v-if="this.mode === 'save'"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="tipo"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-paw"
                        v-model="doacao.tipo"
                        label="Tipo"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="sexo"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-gender-male-female"
                        v-model="animdoacaoal.sexo"
                        label="Sexo"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <small v-if="this.mode === 'save'"
                  >*indicates required field</small
                >
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

      <v-row>
        <v-col
          cols="12"
          xl="2"
          lg="3"
          sm="4"
          v-for="doacao in doacoes"
          :key="doacao.id"
        >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";
import { mapState } from "vuex";

export default {
  name: "Doacoes",
  computed: { ...mapState(["user"]) },
  data: function () {
    return {
      mode: "save",
      doacao: {},
      doacoes: [],
      checkbox: false,
      dialog: false,
    };
  },
  methods: {
    loadAnimais() {
      api(`/animaisUsuario`).then((res) => {
        this.animais = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.animal = {};
      this.loadAnimais();
      this.dialog = false;
    },
    save() {
      const method = this.animal.id ? "put" : "post";
      const id = this.animal.id ? `/${this.animal.id}` : "";
      api[method](`/animais${id}`, this.animal)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.animal.id;
      api
        .delete(`/animais/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadAnimal(animal, mode = "save") {
      this.mode = mode;
      api.get(`/animais/${animal.id}`).then((res) => (this.animal = res.data));
      this.dialog = true;
    },
  },
  watch: {
    $route(to) {
      this.animais = [];
      this.page = 1;
      this.loadMore = true;

      this.loadAnimais();
    },

    page() {
      this.loadAnimais();
    },
    mounted() {
      this.loadAnimais();
    },
  },
};
</script>

<style>
</style>