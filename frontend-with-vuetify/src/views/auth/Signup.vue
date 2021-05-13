<template>
  <div class="signup-page">
    <v-container>
      <div class="signup-card">
        <v-stepper v-model="e1">
          <h1 class="text-center">Registrar-se</h1>
          <v-stepper-header>
            <v-stepper-step editable :complete="e1 > 1" step="1">
              Identificação
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step editable :complete="e1 > 2" step="2">
              Seus dados
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="3"> Endereço </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" color="white lighten-1" height="200px">
                <v-form>
                  <label for="ong"
                    >Marque apenas se você for uma ONG, caso não seja clique em
                    continuar.
                  </label>
                  <v-checkbox
                    color="green"
                    v-model="isOng"
                    :label="'Sou uma ONG'"
                  ></v-checkbox>
                </v-form>
              </v-card>

              <v-btn color="primary" @click="e1 = 2">
                Continuar
                <v-icon class="ml-2" dark> mdi-arrow-right </v-icon>
              </v-btn>

              <v-btn to="/auth">
                Cancelar <v-icon class="ml-2" dark> mdi-close </v-icon></v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12" height="550px">
                <v-form>
                  <v-text-field
                    label="Nome"
                    prepend-inner-icon="mdi-account"
                    outlined
                    v-if="!isOng"
                    v-model="user.name"
                  ></v-text-field>
                  <v-text-field
                    label="Nome da Ong"
                    prepend-inner-icon="mdi-account"
                    outlined
                    v-else
                    v-model="user.name"
                  ></v-text-field>
                  <v-text-field
                    label="E-mail"
                    prepend-inner-icon="mdi-at"
                    outlined
                    v-model="user.email"
                    autocomplete="email"
                  ></v-text-field>
                  <v-text-field
                    label="CPF"
                    prepend-inner-icon="mdi-card-account-details"
                    v-mask="'###########'"
                    outlined
                    v-if="!isOng"
                    v-model="user.cpf"
                  ></v-text-field>
                  <v-text-field
                    label="CNPJ"
                    prepend-inner-icon="mdi-card-account-details"
                    v-mask="'##############'"
                    outlined
                    v-if="isOng"
                    v-model="user.cnpj"
                  ></v-text-field>
                  <v-text-field
                    label="Telefone"
                    prepend-inner-icon="mdi-phone"
                    type="tel"
                    v-mask="'(##) #####-####'"
                    outlined
                    v-model="user.telefone"
                  ></v-text-field>
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="user.password"
                    autocomplete="current-password"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Senha"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    outlined
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="user.confirmPassword"
                    autocomplete="current-password"
                    :rules="[rules.required]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confime sua Senha"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-form>
              </v-card>

              <v-btn color="primary" @click="e1 = 3">
                Continuar
                <v-icon class="ml-2" dark> mdi-arrow-right </v-icon>
              </v-btn>

              <v-btn text to="/auth">
                Cancelar
                <v-icon class="ml-2" dark> mdi-close </v-icon>
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" height="630px">
                <v-form>
                  <v-text-field
                    label="CEP"
                    prepend-inner-icon="mdi-numeric"
                    v-mask="'#####-###'"
                    outlined
                    v-model="user.cep"
                  ></v-text-field>

                  <v-text-field
                    label="Endereço"
                    prepend-inner-icon="mdi-map-marker"
                    outlined
                    v-model="user.endereco"
                  ></v-text-field>
                  <v-text-field
                    label="Número"
                    prepend-inner-icon="mdi-numeric"
                    type="number"
                    outlined
                    v-model="user.numero"
                  ></v-text-field>
                  <v-text-field
                    label="Complemento"
                    prepend-inner-icon="mdi-home"
                    outlined
                    v-model="user.complemento"
                  ></v-text-field>
                  <v-text-field
                    label="Bairro"
                    prepend-inner-icon="mdi-map-marker"
                    outlined
                    v-model="user.bairro"
                  ></v-text-field>
                  <v-select
                    :items="estados"
                    prepend-inner-icon="mdi-sign-real-estate"
                    v-model="user.estado"
                    label="Estado"
                    outlined
                  ></v-select>
                  <v-text-field
                    label="Cidade"
                    prepend-inner-icon="mdi-city"
                    outlined
                    v-model="user.cidade"
                  ></v-text-field>
                </v-form>
              </v-card>

              <v-btn color="success" @click="signup">
                Registrar-se
                <v-icon class="ml-2" dark> mdi-check </v-icon>
              </v-btn>

              <v-btn text  to="/auth">
                Cancelar
                <v-icon class="ml-2" dark> mdi-close </v-icon>
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </v-container>
  </div>
</template>

<script>
import { showError, userKey } from "@/global";
import api from "../../config/api";

export default {
  name: "Signup",
  data() {
    return {
      e1: 1,
      isOng: false,
      data: {},
      user: {},
      checkbox: false,
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
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
    signup() {
      api
        .post(`/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
          this.$router.push({ path: "/auth" });
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.signup-card {
  width: 600px;
  margin: 50px auto;
}

@media only screen and (max-width: 600px) {
  .signup-card {
    width: auto;
  }
}
</style>