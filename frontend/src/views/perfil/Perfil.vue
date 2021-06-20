<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="perfil-main">
      <div class="perfil-header">
        <v-avatar class="ma-2 pub-avatar-img" size="128" tile>
          <img :src="user.userImage" alt="" v-if="user.userImage" />
          <Gravatar :email="user.email" alt="User" v-else />
        </v-avatar>
        <h1>
          {{ userData.name }}
          <v-badge
            v-if="user.admin"
            color="blue"
            icon="mdi-check-bold"
            class="ml-2"
          ></v-badge>
        </h1>
      </div>
      <div class="perfil-content">
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Nome"
              v-model="userData.name"
              color="#f7893b"
              prepend-inner-icon="mdi-account"
              class="input-orange"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="E-mail"
              v-model="userData.email"
              prepend-inner-icon="mdi-email"
              disabled
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              v-if="userData.ong"
              v-model="userData.cnpj"
              label="CNPJ"
              v-mask="'##.###.###/####-##'"
              prepend-inner-icon="mdi-card-account-details-outline"
              outlined
              color="#f7893b"
            ></v-text-field>
            <v-text-field
              v-else
              label="CPF"
              v-model="userData.cpf"
              v-mask="'###.###.###-##'"
              masked="false"
              prepend-inner-icon="mdi-card-account-details-outline"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Telefone"
              v-model="userData.telefone"
              prepend-inner-icon="mdi-phone"
              v-mask="'(##) #####-####'"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Imagem de perfil"
              v-model="userData.userImage"
              prepend-inner-icon="mdi-image"
              type="imagem"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              label="Senha"
              v-model="userData.password"
              prepend-inner-icon="mdi-form-textbox-password"
              type="password"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              label="Confime sua Senha"
              v-model="userData.confirmPassword"
              prepend-inner-icon="mdi-form-textbox-password"
              type="password"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="divider-endereco"></v-divider>

        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Endereço"
              v-model="userData.endereco"
              prepend-inner-icon="mdi-map-marker-outline"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Bairro"
              v-model="userData.bairro"
              prepend-inner-icon="mdi-home-map-marker"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Número"
              v-model="userData.numero"
              prepend-inner-icon="mdi-counter"
              type="number"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="Complemento"
              v-model="userData.complemento"
              prepend-inner-icon="mdi-map-marker-outline"
              outlined
              color="#f7893b"
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
              color="#f7893b"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
              label="Cidade"
              v-model="userData.cidade"
              prepend-inner-icon="mdi-city"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
              label="CEP"
              v-model="userData.cep"
              prepend-inner-icon="mdi-map-marker-outline"
              v-mask="'#####-###'"
              outlined
              color="#f7893b"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="#f7893b" dark @click="update">
          <v-icon left> mdi-account-edit </v-icon>
          Atualizar
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#f7893b"
              class="btn-new-password"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-form-textbox-password </v-icon>
              Atualizar senha
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Alterar Senha</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Senha Atual*"
                      v-model="userPassword.password"
                      counter
                      @click:append="show1 = !show1"
                      color="#f7893b"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Nova Senha*"
                      v-model="userPassword.newPassword"
                      counter
                      @click:append="show2 = !show2"
                      color="#f7893b"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show3 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirmar Nova Senha*"
                      v-model="userPassword.confirmPassword"
                      counter
                      @click:append="show3 = !show3"
                      color="#f7893b"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>* indica campo necessário</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="green darken-1" text @click="newUserPassword">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="ongBio" v-if="user.ong">
      <div class="ongBio-header">
        <h1 class="text-center">Minha BIO</h1>
      </div>
      <v-divider></v-divider>
      <div class="ongBio-content">
        <v-row>
          <v-col cols="12" sm="12">
            <VueEditor v-model="bio.descricao" placeholder="Nos conte sua história" />
          </v-col>
        </v-row>

        <div class="ongBio-actions">
          <v-btn color="#f7893b" dark @click="bioSave">
            <v-icon left> mdi-account-edit </v-icon>
            Salvar
          </v-btn>
        </div>
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
import { VueEditor } from "vue2-editor";

export default {
  name: "Perfil",
  components: { Gravatar, VueEditor },
  computed: mapState(["user"]),

  data: function () {
    return {
      userData: {},
      userPassword: {},
      bio: {},
      loading: true,
      dialog: false,
      show1: false,
      show2: false,
      show3: false,
      rules: {
        required: (value) => !!value || "Requerido.",
      },
      estados: [
        { text: "Acre", value: "AC" },
        { text: "Alagoas", value: "AL" },
        { text: "Amapá", value: "AP" },
        { text: "Amazonas", value: "AM" },
        { text: "Bahia", value: "BA" },
        { text: "Ceará", value: "CE" },
        { text: "Distrito Federal", value: "DF" },
        { text: "Espírito Santo", value: "ES" },
        { text: "Goiás", value: "GO" },
        { text: "Maranhão", value: "MA" },
        { text: "Mato Grosso", value: "MT" },
        { text: "Mato Grosso do Sul", value: "MS" },
        { text: "Minas Gerais", value: "MG" },
        { text: "Pará", value: "PA" },
        { text: "Paraíba", value: "PB" },
        { text: "Paraná", value: "PR" },
        { text: "Pernambuco", value: "PE" },
        { text: "Piauí", value: "PI" },
        { text: "Rio de Janeiro", value: "RJ" },
        { text: "Rio Grande do Norte", value: "RN" },
        { text: "Rio Grande do Sul", value: "RS" },
        { text: "Rondônia", value: "RO" },
        { text: "Roraima", value: "RR" },
        { text: "Santa Catarina", value: "SC" },
        { text: "São Paulo", value: "SP" },
        { text: "Sergipe", value: "SE" },
        { text: "Tocantins", value: "TO" },
      ],
    };
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
    async update() {
      await api
        .put(`/users/${this.user.id}`, this.userData)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
    async newUserPassword() {
     await api
        .put(`/newPassword`, this.userPassword)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.userPassword = {};
          this.dialog = false;
        })
        .catch(showError);
    },

    // bio

    async loadBio() {
      const url = `/ongBio`;
      await api
        .get(url)
        .then((res) => {
          this.bio = res.data;
          this.loading = false;
        })
        .catch((erro) => {});
    },

    bioSave() {
      if (this.bio == null) {
        api
          .post(`/ongBio`, this.bio)
          .then(() => {
            this.$toasted.global.defaultSuccess();
          })
          .catch(showError);
      } else {
        api
          .put(`/ongBio`, this.bio)
          .then(() => {
            this.$toasted.global.defaultSuccess();
          })
          .catch(showError);
      }
    },
  },

  mounted() {
    this.loadUsers();
    this.loadBio();
    this.$root.$once("user-updated", () => {
      this.loadUsers();
      this.loadBio();
    });
  },
};
</script>


<style>
.perfil-main {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
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

.btn-new-password {
  margin-left: 20px;
}

.ongBio {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.ongBio-actions {
  margin-top: 20px;
}



</style>