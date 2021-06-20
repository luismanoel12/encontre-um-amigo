<template>
  <div class="carousel-page">
    <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

    <v-container v-else>
      <div class="users-search">
        <h1>Pesquisar Usuários</h1>
        <form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Nome"
                v-model="search.name"
                color="#f7893b"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn depressed @click="searchUsers" dark color="#f7893b">
            Pesquisar
            <v-icon dark right> mdi-account-search </v-icon>
          </v-btn>

          <v-btn depressed @click="cancelar" class="ml-2" color="primary">
            Cancelar
            <v-icon dark right> mdi-close </v-icon>
          </v-btn>
        </form>
      </div>
      <div class="users-modal">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ user.name }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          label="Nome"
                          v-model="user.name"
                          readonly
                          required
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <v-text-field
                          label="E-mail"
                          v-model="user.email"
                          readonly
                          required
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <v-text-field
                          label="Administrador"
                          v-model="user.admin"
                          readonly
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          label="ONG"
                          v-model="user.ong"
                          readonly
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <div class="buttons">
                <v-btn
                  depressed
                  v-if="user.admin"
                  @click="setAdmin"
                  color="error"
                  class="mr-2"
                >
                  Remover Admin
                  <v-icon dark right> mdi-account-remove </v-icon>
                </v-btn>
                <v-btn
                  depressed
                  v-if="!user.admin && mode != 'remove'"
                  @click="setAdmin"
                  class="mr-2"
                  color="success"
                >
                  Adicionar Admin
                  <v-icon dark right> mdi-account-lock </v-icon>
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

      <v-data-table :items="users" :headers="headers" class="elevation-10">
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
                    color="primary"
                    text
                    elevation="0"
                    small
                    @click="loadUser(item)"
                    dark
                  >
                    Visualizar
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
                    @click="loadUser(item, 'remove')"
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
  name: "Users",
  data: function () {
    return {
      mode: "save",
      user: {},
      users: [],
      search: {},
      dialog: false,
      loading: true,
      headers: [
        {
          align: "start",
          sortable: false,
        },
        { text: "Código", value: "id" },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Estado", value: "estado" },
        { text: "Admin", value: "admin" },
        { text: "Deletado em", value: "deletedAt" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadUsers() {
      const url = `/users`;
      api.get(url).then((res) => {
        this.users = res.data;
        this.loading = false;
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.dialog = false;
      this.loadUsers();
    },
    setAdmin() {
      const method = "put";
      const id = this.user.id;
      api[method](`/setAdmin/${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      api
        .delete(`/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.dialog = true;
      this.mode = mode;
      api.get(`/users/${user.id}`).then((res) => (this.user = res.data));
    },

    searchUsers() {
      api
        .post(`/searchUsers`, this.search)
        .then((res) => {
          this.users = res.data;
        })
        .catch(showError);
    },

    cancelar() {
      location.reload();
    },
  },
  watch: {
    page() {
      this.loadUsers();
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.users-modal {
  padding: 20px;
}

.users-search {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  margin: auto;
  text-align: center;
  color: #f7893b;
}
</style>