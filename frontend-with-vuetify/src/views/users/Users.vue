<template>
  <div class="carousel-page">
    <v-container>
      <v-form class="form elevation-10">
        <h2 class="atencao">Usuários</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Nome"
              v-model="user.name"
              readonly
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="E-mail"
              v-model="user.email"
              readonly
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Administrador"
              v-model="user.admin"
              readonly
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="ONG"
              v-model="user.ong"
              readonly
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="buttons">
          <v-btn
            depressed
            v-if="user.admin"
            @click="setAdmin"
            color="error"
          >
            Remover Admin
            <v-icon dark right> mdi-account-remove </v-icon>
          </v-btn>
          <v-btn
            depressed
            v-else
            @click="setAdmin"
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
          <v-btn depressed @click="reset" class="btn-cancel" color="primary">
            Cancelar
            <v-icon dark right> mdi-close-thick </v-icon>
          </v-btn>
        </div>
      </v-form>

      <v-data-table :items="users" :headers="headers" class="elevation-10">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="bt-actions"
            color="green"
            fab
            elevation="0"
            small
            @click="loadUser(item)"
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
            @click="loadUser(item, 'remove')"
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
  name: "Users",
  data: function () {
    return {
      mode: "save",
      user: {},
      users: [],
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
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
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
      this.mode = mode;
      api.get(`/users/${user.id}`).then((res) => (this.user = res.data));
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
</style>