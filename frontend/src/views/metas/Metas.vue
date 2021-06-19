<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="metas-page">
      <v-card color="#2a9d8f">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="display-3">Minhas Metas</h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="#287271" color="white" grow>
          <v-tab>
            Cadastrar Metas
            <span class="mdi mdi-bullseye-arrow ml-3 mdi-24px"></span>
          </v-tab>
          <v-divider vertical color="white"></v-divider>
          <v-tab>
            Cadastrar Objetivos
            <span class="mdi mdi-bullseye-arrow ml-3 mdi-24px"></span>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-row>
                <v-dialog v-model="dialog1" persistent max-width="1000px">
                  <template v-slot:activator="{ on, attrs }">
                    <div class="nova-meta">
                      <v-btn color="#036564" dark v-bind="attrs" v-on="on">
                        Cadastrar nova meta

                        <v-icon dark right> mdi-plus </v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span
                        class="headline excluir-animal"
                        v-if="this.mode === 'remove'"
                        >Excluir a Meta: <strong> {{ meta.titulo }} </strong>
                      </span>
                      <span class="headline salvar-animal" v-if="!meta.id"
                        >Cadastrar Metas</span
                      >
                      <span
                        class="headline atualizar-animal"
                        v-if="meta.id && this.mode != 'remove'"
                        >Atualizar a Meta: <strong> {{ meta.titulo }} </strong>
                      </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Título"
                              v-model="meta.titulo"
                              :readonly="mode === 'remove'"
                              prepend-inner-icon="mdi-format-title"
                              required
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
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
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Valor Atual"
                              v-model="meta.valorAtual"
                              type="number"
                              prefix="R$"
                              :readonly="mode === 'remove'"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="URL da imagem"
                              v-model="meta.imageUrl"
                              :readonly="mode === 'remove'"
                              prepend-inner-icon="mdi-image"
                              required
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <VueEditor
                              v-model="meta.descricao"
                              prepend-inner-icon="mdi-card-text-outline"
                              placeholder="Informe o que vai acontecer quando as metas forem atingidas."
                              :readonly="mode === 'remove'"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div class="buttons-metas">
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
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <v-data-table
                :items="metas"
                :headers="headers"
                class="elevation-0"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="#036564" dark v-bind="attrs" v-on="on">
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
                            @click="loadMeta(item)"
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
                            @click="loadMeta(item, 'remove')"
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
            </v-card>
          </v-tab-item>

          <!-- Objetivos -->

          <v-tab-item>
            <v-card flat>
              <v-row>
                <v-dialog v-model="dialog2" persistent max-width="800px">
                  <template v-slot:activator="{ on, attrs }">
                    <div class="novo-objetivo">
                      <v-btn color="#036564" dark v-bind="attrs" v-on="on">
                        Cadastrar novo objetivo

                        <v-icon dark right> mdi-plus </v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span
                        class="headline excluir-animal"
                        v-if="this.mode === 'remove'"
                        >Excluir o Objetivo:
                        <strong> {{ objetivo.titulo }} </strong>
                      </span>
                      <span class="headline salvar-animal" v-if="!objetivo.id"
                        >Cadastrar Objetivos</span
                      >
                      <span
                        class="headline atualizar-animal"
                        v-if="objetivo.id && this.mode != 'remove'"
                        >Atualizar o Objetivo:
                        <strong> {{ objetivo.titulo }} </strong>
                      </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="4">
                            <v-text-field
                              label="Título"
                              v-model="objetivo.titulo"
                              prepend-inner-icon="mdi-format-title"
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
                              prepend-inner-icon="mdi-bullseye-arrow"
                              label="Selecione a Meta"
                              outlined
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="12">
                            <v-textarea
                              outlined
                              v-model="objetivo.descricao"
                              :readonly="mode === 'remove'"
                              maxlength="250"
                              counter="250"
                              prepend-inner-icon="mdi-card-text-outline"
                              hint="Máximo de 250 caracteres"
                              name="input-7-4"
                              label="Descrição"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div class="buttons-metas">
                        <v-btn
                          depressed
                          v-if="mode === 'save'"
                          @click="saveObjetivos"
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
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <v-data-table
                :items="objetivos"
                :headers="headers2"
                class="elevation-0"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-menu offset-x offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="#036564" dark v-bind="attrs" v-on="on">
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
                            @click="loadObjetivo(item)"
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
                            @click="loadObjetivo(item, 'remove')"
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
      dialog1: false,
      dialog2: false,
      loading: true,
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
        this.loading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.meta = {};
      this.loadMetas();
      this.dialog1 = false;
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
      this.dialog1 = true;
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
      this.dialog2 = false;
    },

    loadObjetivo(objetivo, mode = "save") {
      this.mode = mode;
      api
        .get(`/objetivos/${objetivo.id}`)
        .then((res) => (this.objetivo = res.data));
      this.dialog2 = true;
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

.nova-meta {
  padding: 20px;
}

.novo-objetivo {
  padding: 20px;
}
</style>