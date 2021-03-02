<template>
<div class="auth">
    <div class="auth-header">
        <img src="@/assets/logo.png" width="200" alt="Logo" />
        <hr />
        <h2>{{ showSignup ? "Cadastro" : "Login" }}</h2>
    </div>
    <div class="auth-content">
    <v-form>
      <v-text-field label="Nome" prepend-inner-icon="mdi-account" outlined v-if="showSignup" v-model="user.name"></v-text-field>
      <v-text-field label="E-mail"  prepend-inner-icon="mdi-at" outlined v-model="user.email" autocomplete="email"></v-text-field>

      <v-checkbox color="green" v-model="checkbox" v-if="showSignup" :input-value="user.ong" :label="'Sou uma ONG'"></v-checkbox>
      <v-text-field label="CPF" prepend-inner-icon="mdi-card-account-details" v-mask="'###.###.###-##'" outlined v-if="showSignup" v-model="user.cpf"></v-text-field>
      <v-text-field label="CNPJ" prepend-inner-icon="mdi-card-account-details"  v-mask="'##.###.###/####-##'" outlined v-if="showSignup" v-model="user.cnpj"></v-text-field>

      <v-text-field label="Telefone" prepend-inner-icon="mdi-phone" type="tel" v-mask="'(##) #####-####'" outlined v-if="showSignup" v-model="user.telefone"></v-text-field>    
      <v-text-field label="Senha" prepend-inner-icon="mdi-lock" type="password" outlined v-model="user.password" autocomplete="current-password"></v-text-field>
      <v-text-field label="Confime sua Senha" prepend-inner-icon="mdi-lock" type="password" outlined v-if="showSignup" v-model="user.confirmPassword"></v-text-field>
      <v-divider color="black" class="hr-signup" v-if="showSignup"></v-divider>

      <v-text-field label="Endereço" prepend-inner-icon="mdi-map-marker" outlined v-if="showSignup" v-model="user.endereco"></v-text-field>
      <v-text-field label="Número" prepend-inner-icon="mdi-numeric" type="number" outlined v-if="showSignup" v-model="user.numero"></v-text-field>
      <v-text-field label="Complemento" prepend-inner-icon="mdi-home" outlined v-if="showSignup" v-model="user.complemento"></v-text-field>
      <v-text-field label="Bairro" prepend-inner-icon="mdi-map-marker" outlined v-if="showSignup" v-model="user.bairro"></v-text-field>
      <v-text-field label="Estado" prepend-inner-icon="mdi-sign-real-estate" outlined v-if="showSignup" v-model="user.estado"></v-text-field>
      <v-text-field label="Cidade" prepend-inner-icon="mdi-city" outlined v-if="showSignup" v-model="user.cidade"></v-text-field>
      <v-text-field label="CEP" prepend-inner-icon="mdi-numeric"  v-mask="'#####-###'" outlined v-if="showSignup" v-model="user.cep"></v-text-field>
    </v-form>

    <v-btn tile color="success" v-if="showSignup" @click="signup">
        <v-icon left> mdi-login-variant </v-icon>
          Registrar
    </v-btn>

    <v-btn tile color="success" v-else @click="signin">
          <v-icon left> mdi-login </v-icon>
          Entrar
    </v-btn>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>

    </div>
</div>

</template>

<script>
import { showError, userKey } from "@/global";
import api from "../../config/api";

export default {
  name: "Auth",
  data: function () {
    return {
      showSignup: false,
      showCnpj: false,
      user: {},
      estados: [
        { value: null, text: "Selecione um estado" },
        { value: "AC", text: "Acre" },
        { value: "AL", text: "Alagoas" },
        { value: "AP", text: "Amapá" },
        { value: "AM", text: "Amazonas" },
        { value: "BA", text: "Bahia" },
        { value: "CE", text: "Ceará" },
        { value: "DF", text: "Distrito Federal" },
        { value: "ES", text: "Espírito Santo" },
        { value: "GO", text: "Goiás" },
        { value: "MA", text: "Maranhão" },
        { value: "MT", text: "Mato Grosso" },
        { value: "MS", text: "Mato Grosso do Sul" },
        { value: "MG", text: "Minas Gerais" },
        { value: "PA", text: "Pará" },
        { value: "PB", text: "Paraíba" },
        { value: "PR", text: "Paraná" },
        { value: "PE", text: "Pernambuco" },
        { value: "PI", text: "Piauí" },
        { value: "RJ", text: "Rio de Janeiro" },
        { value: "RN", text: "Rio Grande do Norte" },
        { value: "RS", text: "Rio Grande do Sul" },
        { value: "RO", text: "Rondônia" },
        { value: "RR", text: "Roraima" },
        { value: "SC", text: "Santa Catarina" },
        { value: "SP", text: "São Paulo" },
        { value: "SE", text: "Sergipe" },
        { value: "TO", text: "Tocantins" },
      ],
      
    };
  },
  methods: {
    signin() {
      api
        .post(`/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      api
        .post(`/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.endereco = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
    // shecked() {
    //   this.checked = this.checked
    // }
  },
};
</script>

<style>

.auth{
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 400px;
  padding: 35px;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  margin: 100px auto;
}

.auth-header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.auth-header hr{
    border: 0;
    width: 100%;
    height: 1px;
    background-image: -webkit-gradient(linear, left top, right top, from(rgba(120, 120, 120, 0)), color-stop(rgba(120, 120, 120, 0.75)), to(rgba(120, 120, 120, 0)));
    background-image: linear-gradient(to right, rgba(120, 120, 120, 0), rgba(120, 120, 120, 0.75), rgba(120, 120, 120, 0));
}

.auth-content{
  display: flex;
  flex-direction: column;
}

.auth-content a {
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
}

.auth-content a:hover {

  color: #FF5757;

}

.hr-signup{
  margin-bottom: 20px;
}

</style>