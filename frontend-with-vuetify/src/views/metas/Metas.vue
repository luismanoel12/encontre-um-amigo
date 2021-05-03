<template>
  <v-container>
    <div class="metas-page">
      <v-card color="#e9ecef">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">Metas</h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="#e9ecef" grow>
          <v-tab> Cadastrar Metas </v-tab>

          <v-tab> Cadastrar Objetivos </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-form class="form elevation-10">
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      label="Título"
                      v-model="meta.titulo"
                      :readonly="mode === 'remove'"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      label="Valor Esperado"
                      v-model="meta.valorEsperado"
                      :readonly="mode === 'remove'"
                      required
                      type="number"
                      prefix="R$"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      label="Valor Atual"
                      v-model="meta.valorAtual"
                      type="number"
                      prefix="R$"
                      :readonly="mode === 'remove'"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      label="URL da imagem"
                      v-model="meta.imageUrl"
                      :readonly="mode === 'remove'"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12">
                    <VueEditor
                      v-model="meta.descricao"
                      placeholder="Informe o que vai acontecer quando as metas forem atingidas."
                      :readonly="mode === 'remove'"
                    />
                  </v-col>
                </v-row>

                <div class="buttons-metas">
                  <v-btn
                    depressed
                    v-if="mode === 'save'"
                    @click="save"
                    color="success"
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
              </v-form>

              <v-data-table
                :items="metas"
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
                    @click="loadMeta(item)"
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
                    @click="loadMeta(item, 'remove')"
                    dark
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Objetivos -->

          <v-tab-item>
            <v-card color="basil" flat>
              <v-form class="form elevation-10">
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      label="Título"
                      v-model="objetivo.titulo"
                      :readonly="mode === 'remove'"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      label="Valor"
                      v-model="objetivo.valor"
                      :readonly="mode === 'remove'"
                      required
                      type="number"
                      prefix="R$"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      :items="metasSelect"
                      v-model="objetivo.metasId"
                      label="Selecione a Meta"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12">
                    <v-textarea
                      outlined
                      v-model="objetivo.descricao"
                      :readonly="mode === 'remove'"
                      maxlength="250"
                      counter="250"
                      hint="Máximo de 250 caracteres"
                      name="input-7-4"
                      label="Descrição"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <div class="buttons-metas">
                  <v-btn
                    depressed
                    v-if="mode === 'save'"
                    @click="saveObjetivos"
                    color="success"
                  >
                    Salvar
                    <v-icon dark right> mdi-content-save </v-icon>
                  </v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn
                    depressed
                    v-if="mode === 'remove'"
                    @click="removeObjetivos"
                    color="error"
                  >
                    Excluir
                    <v-icon dark right> mdi-delete </v-icon>
                  </v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn
                    depressed
                    @click="resetObjetivos"
                    class="btn-cancel"
                    color="primary"
                  >
                    Cancelar
                    <v-icon dark right> mdi-close-thick </v-icon>
                  </v-btn>
                </div>
              </v-form>

              <v-data-table
                :items="objetivos"
                :headers="headers2"
                class="elevation-10"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    class="bt-actions"
                    color="primary"
                    fab
                    elevation="0"
                    small
                    @click="loadObjetivo(item)"
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
                    @click="loadObjetivo(item, 'remove')"
                    dark
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";

export default {
  name: "Metas",
  components: { VueEditor },
  computed: mapState(["user"]),
  data: function () {
    return {
      mode: "save",
      meta: {},
      objetivo: {},
      tab: null,
      metas: [],
      metasSelect: [],
      objetivos: [],
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Código", value: "id" },
        { text: "Título", value: "titulo" },
        { text: "Valor Esperado", value: "valorEsperado" },
        { text: "Valor Atual", value: "valorAtual" },
        { text: "Ações", value: "actions" },
      ],
      headers2: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Código", value: "id" },
        { text: "Título", value: "titulo" },
        { text: "Valor", value: "valor" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadMetas() {
      const url = `/metasUsuario`;
      api.get(url).then((res) => {
        this.metas = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.meta = {};
      this.loadMetas();
    },
    save() {
      const method = this.meta.id ? "put" : "post";
      const id = this.meta.id ? `/${this.meta.id}` : "";
      api[method](`/metas${id}`, this.meta)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadMetasList();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.meta.id;
      api
        .delete(`/metas/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadMeta(meta, mode = "save") {
      this.mode = mode;
      api.get(`/metas/${meta.id}`).then((res) => (this.meta = res.data));
    },

    // ################ objetivos ################

    async loadObjetivos() {
      const url = `/objetivosUsuario/${this.user.id}`;
      await api.get(url).then((res) => {
        this.objetivos = res.data;
      });
    },

    saveObjetivos() {
      const method = this.objetivo.id ? "put" : "post";
      const id = this.objetivo.id ? `/${this.objetivo.id}` : "";
      api[method](`/objetivos${id}`, this.objetivo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.resetObjetivos();
        })
        .catch(showError);
    },

    removeObjetivos() {
      const id = this.objetivo.id;
      api
        .delete(`/objetivos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.resetObjetivos();
        })
        .catch(showError);
    },

    resetObjetivos() {
      this.mode = "save";
      this.objetivo = {};
      this.loadObjetivos();
    },

    loadObjetivo(objetivo, mode = "save") {
      this.mode = mode;
      api
        .get(`/objetivos/${objetivo.id}`)
        .then((res) => (this.objetivo = res.data));
    },

    loadMetasList() {
      const url = `/metasUsuario`;
      api.get(url).then((res) => {
        this.metasSelect = res.data.map((metaSelect) => {
          return { value: metaSelect.id, text: `${metaSelect.titulo}` };
        });
      });
    },
  },
  watch: {
    page() {
      this.loadMetas();
    },
  },
  mounted() {
    this.loadMetasList();
    this.loadMetas();
    this.loadObjetivos();
  },
};
</script>

<style>
.form {
  margin-top: 50px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.bt-actions {
  margin-left: 5px;
}

.bt-actions:hover {
  transform: scale(1.1);
}

.btn-cancel {
  margin-left: 10px;
}

.buttons-metas {
  margin-top: 20px;
}

.atencao {
  text-align: center;
  color: #ff1d23;
  margin-bottom: 20px;
}

.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}

.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  padding: 20px;
}
</style>