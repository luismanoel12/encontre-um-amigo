<template>
  <div class="doacoes-page">
    <v-container>
      <div class="cadastrar-doacoes-form">
        <div class="cadastrar-doacoes-titulo">
          <h1>Olá, {{ user.name }}.</h1>
          <h2>Aqui se encontram todos os meios em que você aceita doações!</h2>
        </div>

        <v-row class="mt-5 mb-2">
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <div class="novo-doacao">
                <v-btn color="#036564" dark v-bind="attrs" v-on="on">
                  Cadastrar Novo Meio de Doação

                  <v-icon dark right> mdi-hand-heart </v-icon>
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
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Diga por onde irá receber esse pagamento"
                        v-model="doacao.meio_pagamento"
                        placeholder="Ex: Banco do Brasil"
                        prepend-inner-icon="mdi-hand-heart"
                        required
                        outlined
                        maxlength="30"
                        counter="30"
                        hint="Máximo de 30 caracteres"
                        v-if="this.mode === 'save'"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        outlined
                        v-if="this.mode === 'save'"
                        name="input-7-4"
                        placeholder="Ex: Conta Corrente: 0000000-0, Agência: 4060, Banco: Banco do Brasil "
                        label="Descreva os dados para necessários para receber essa doação"
                        prepend-inner-icon="mdi-information-outline"
                        v-model="doacao.descricao"
                        maxlength="250"
                        counter="250"
                        hint="Máximo de 250 caracteres"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="(Opcional) Tem algum link para ajudar ou realizar o pagamento?"
                        v-model="doacao.link"
                        placeholder="Ex: https://picpay/usuario"
                        prepend-inner-icon="mdi-link-variant"
                        required
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
            v-for="doacao in doacoes"
            :key="doacao.id"
          >
            <div class="minhas-doacoes-card">
              <div class="minhas-doacoes-card-content">
                <h2>{{ doacao.meio_pagamento }}</h2>
                <p class="descricao-doacao-card">
                  {{ doacao.descricao }}
                </p>
                <div class="minhas-doacoes-card-link">
                  <v-btn
                    class="mx-2"
                    dark
                    text
                    v-if="doacao.link"
                    color="#036564"
                    @click="loadDoacao(doacao, 'remove')"
                  >
                    Acessar
                  </v-btn>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="minhas-doacoes-card-actions">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                  color="warning"
                  @click="loadDoacao(doacao)"
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
                  @click="loadDoacao(doacao, 'remove')"
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
  name: "Doacoes",
  computed: { ...mapState(["user"]) },
  data: function () {
    return {
      mode: "save",
      doacao: {},
      doacoes: [],
      dialog: false,
    };
  },
  methods: {
    loadDoacoes() {
      api(`/doacoes`).then((res) => {
        this.doacoes = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.doacao = {};
      this.loadDoacoes();
      this.dialog = false;
    },
    save() {
      const method = this.doacao.id ? "put" : "post";
      const id = this.doacao.id ? `/${this.doacao.id}` : "";
      api[method](`/doacoes${id}`, this.doacao)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.doacao.id;
      api
        .delete(`/doacoes/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadDoacao(doacao, mode = "save") {
      this.mode = mode;
      api.get(`/doacoes/${doacao.id}`).then((res) => (this.doacao = res.data));
      this.dialog = true;
    },
  },
  watch: {
    page() {
      this.loadDoacoes();
    },
  },
  mounted() {
    this.loadDoacoes();
  },
};
</script>

<style scoped>
.cadastrar-doacoes-form {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.novo-doacao {
  display: flex;
  justify-content: center;
  align-items: center;
}

.minhas-doacoes-card {
  background-color: #fff;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
    0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  border-left: 3px solid #036564;
  border-radius: 5px;
  padding: 10px;
}

.minhas-doacoes-card-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.minhas-doacoes-card-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.descricao-doacao-card{
  word-break: break-all;
}
</style>