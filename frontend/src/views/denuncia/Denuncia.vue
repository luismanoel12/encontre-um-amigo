<template>
  <div class="carousel-page">
    <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

    <v-container v-else>
      <div class="denuncias-modal">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Denúncia</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <h3 class="text-center">{{ denuncia.tipoDenuncia }}</h3>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <h3>Quem foi denúnciado: {{ denuncia.name }}</h3>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <span>Motivo</span>
                        <p class="descricao-denuncia">
                          {{ denuncia.descricao }}
                        </p>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <span>Status</span>
                        <h3>{{ denuncia.status }}</h3>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <div class="buttons">
                <v-btn
                  depressed
                  v-if="denuncia.status == 'Aberto' && mode != 'remove'"
                  @click="setStatus"
                  color="success"
                >
                  Finalizar Denúncia
                  <v-icon dark right> mdi-check-bold </v-icon>
                </v-btn>
                <v-btn
                  depressed
                  v-if="denuncia.status != 'Aberto' && mode != 'remove'"
                  @click="setStatus"
                  color="warning"
                >
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
            </v-card>
          </v-dialog>
        </v-row>
      </div>

      <v-data-table :items="denuncias" :headers="headers" class="elevation-10">
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
                    @click="loadDenuncia(item)"
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
                    @click="loadDenuncia(item, 'remove')"
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

export default {
  name: "Denuncia",
  data: function () {
    return {
      mode: "save",
      denuncia: {},
      denuncias: [],
      loading: true,
      dialog: false,
      headers: [
        {
          align: "start",
          sortable: false,
        },
        { text: "Código", value: "id" },
        { text: "Tipo da Denúncia", value: "tipoDenuncia" },
        { text: "Status", value: "status" },
        { text: "Usuário denúnciado", value: "name" },
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
        this.loading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.denuncia = {};
      this.loadDenuncias();
      this.dialog = false;
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
      this.dialog = true;
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
.denuncias-modal {
  margin-top: 60px;
}

.descricao-denuncia{
  border: 1px solid #212121;
  padding: 10px;
  border-radius: 5px;
  word-break: break-all;
}
</style>