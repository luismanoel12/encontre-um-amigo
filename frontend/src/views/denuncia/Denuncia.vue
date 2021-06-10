<template>
  <div class="carousel-page">
    <v-container>
      <v-form class="form elevation-10">
        <h2 class="atencao">Denúncias</h2>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Tipo da Denúncia"
              v-model="denuncia.tipoDenuncia"
              readonly
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Status"
              v-model="denuncia.status"
              readonly
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Id do Usuário"
              v-model="denuncia.userId"
              readonly
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
              v-model="denuncia.descricao"
              readonly
              label="Descrição da Denúncia"
            ></v-textarea>
          </v-col>
        </v-row>

        <div class="buttons">
          <v-btn
            depressed
            v-if="denuncia.status == 'Aberto'"
            @click="setStatus"
            color="success"
          >
            Finalizar Denúncia
            <v-icon dark right> mdi-check-bold </v-icon>
          </v-btn>
          <v-btn depressed v-else @click="setStatus" color="warning">
            Reabrir Denúncia
            <v-icon dark right> mdi-folder-open-outline </v-icon>
          </v-btn>

          <v-divider vertical></v-divider>
          <v-btn
            depressed
            v-if="mode === 'remove'"
            @click="remove"
            color="error"
          >
            Excluir
            <v-icon dark right> mdi-delete </v-icon>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn depressed @click="reset" class="btn-cancel" color="primary">
            Cancelar
            <v-icon dark right> mdi-close-thick </v-icon>
          </v-btn>
        </div>
      </v-form>

      <v-data-table :items="denuncias" :headers="headers" class="elevation-10">
        <template v-slot:[`item.actions`]="{ item }">
          
          <v-btn
            class="bt-actions"
            color="green"
            fab
            elevation="0"
            small
            @click="loadDenuncia(item)"
            dark
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>

          <v-btn
            class="bt-actions"
            color="error"
            fab
            elevation="0"
            small
            @click="loadDenuncia(item, 'remove')"
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

export default {
  name: "Denuncia",
  data: function () {
    return {
      mode: "save",
      denuncia: {},
      denuncias: [],
      headers: [
        {
          align: "start",
          sortable: false,
        },
        { text: "Código", value: "id" },
        { text: "Tipo da Denúncia", value: "tipoDenuncia" },
        { text: "Status", value: "status" },
        { text: "Id do Usuário", value: "userId" },
        { text: "Data", value: "createdAt" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadDenuncias() {
      const url = `/denuncia`;
      api.get(url).then((res) => {
        this.denuncias = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.denuncia = {};
      this.loadDenuncias();
    },
    setStatus() {
      const method = "put";
      const id = this.denuncia.id;

      if (this.denuncia.status == "Aberto") {
        this.denuncia.status = "Finalizado";
      } else {
        this.denuncia.status = "Aberto";
      }

      api[method](`/denuncia/${id}`, this.denuncia)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.denuncia.id;
      api
        .delete(`/denuncia/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadDenuncia(denuncia, mode = "save") {
      this.mode = mode;
      api
        .get(`/denuncia/${denuncia.id}`)
        .then((res) => (this.denuncia = res.data));
    },

  },
  watch: {
    page() {
      this.loadDenuncias();
    },
  },
  mounted() {
    this.loadDenuncias();
  },
};
</script>

<style>
</style>