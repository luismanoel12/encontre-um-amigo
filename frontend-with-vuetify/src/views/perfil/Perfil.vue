<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="perfil-main elevation-15">
      <div class="perfil-header">
        <div class="gravatar-img">
          <Gravatar :email="user.email" alt="User" />
          <v-badge
            v-if="user.admin"
            color="blue"
            icon="mdi-check-bold"
            bottom
            overlap
          ></v-badge>
        </div>
        <h1>{{ userData.name }}</h1>
      </div>
      <div class="perfil-content">
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Nome"
              v-model="userData.name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="E-mail"
              v-model="userData.email"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              v-if="userData.ong"
              v-model="userData.cnpj"
              label="CNPJ"
              v-mask="'##.###.###/####-##'"
              outlined
            ></v-text-field>
            <v-text-field
              v-else
              label="CPF"
              v-model="userData.cpf"
              v-mask="'###.###.###-##'"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Telefone"
              v-model="userData.telefone"
              v-mask="'(##) #####-####'"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              label="Senha"
              v-model="userData.password"
              type="password"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              label="Confime sua Senha"
              v-model="userData.confirmPassword"
              type="password"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="divider-endereco"></v-divider>

        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Endereço"
              v-model="userData.endereco"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Bairro"
              v-model="userData.bairro"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Número"
              v-model="userData.numero"
              type="number"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Complemento"
              v-model="userData.complemento"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" sm="12">
            <v-select
              :items="estados"
              prepend-inner-icon="mdi-sign-real-estate"
              v-model="userData.estado"
              label="Estado"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
              label="Cidade"
              v-model="userData.cidade"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
              label="CEP"
              v-model="userData.cep"
              v-mask="'#####-###'"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn tile color="success" @click="update">
          <v-icon left> mdi-account-edit </v-icon>
          Atualizar
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";
import { showError } from "@/global";
import api from "../../config/api";

export default {
  name: "Perfil",
  components: { Gravatar },
  computed: mapState(["user"]),

  data: function () {
    return {
      userData: {},
      loading: true,
      estados: [
        { text: "Acre", value: "AC"},
        { text: "Alagoas", value: "AL"},
        { text: "Amapá", value: "AP"},
        { text: "Amazonas", value: "AM"},
        { text: "Bahia", value: "BA"},
        { text: "Ceará", value: "CE"},
        { text: "Distrito Federal", value: "DF"},
        { text: "Espírito Santo", value: "ES"},
        { text: "Goiás", value: "GO"},
        { text: "Maranhão", value: "MA"},
        { text: "Mato Grosso", value: "MT"},
        { text: "Mato Grosso do Sul", value: "MS"},
        { text: "Minas Gerais", value: "MG"},
        { text: "Pará", value: "PA"},
        { text: "Paraíba", value: "PB"},
        { text: "Paraná", value: "PR"},
        { text: "Pernambuco", value: "PE"},
        { text: "Piauí", value: "PI"},
        { text: "Rio de Janeiro", value: "RJ"},
        { text: "Rio Grande do Norte", value: "RN"},
        { text: "Rio Grande do Sul", value: "RS"},
        { text: "Rondônia", value: "RO"},
        { text: "Roraima", value: "RR"},
        { text: "Santa Catarina", value: "SC"},
        { text: "São Paulo", value: "SP"},
        { text: "Sergipe", value: "SE"},
        { text: "Tocantins", value: "TO"}
      ],
    };
  },

  mounted() {
    this.loadUsers();
    this.$root.$once("user-updated", () => {
      this.loadUsers();
    });
  },
  methods: {
    async loadUsers() {
      const url = `/users/${this.user.id}`;
      await api
        .get(url)
        .then((res) => {
          this.userData = res.data;
          this.loading = false;
        })
        .catch((erro) => {});
    },
    update() {
      api
        .put(`/users/${this.user.id}`, this.userData)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
  },
};
</script>


<style>
.perfil-main {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
}

.perfil-header {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.gravatar-img img {
  border-radius: 50%;
}

.divider-endereco {
  margin-bottom: 30px;
}
</style>