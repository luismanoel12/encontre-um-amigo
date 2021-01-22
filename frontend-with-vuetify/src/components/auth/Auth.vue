<template>
<div class="auth">
    <div class="auth-header">
        <img src="@/assets/logo.png" width="200" alt="Logo" />
        <hr />
        <h2>{{ showSignup ? "Cadastro" : "Login" }}</h2>
    </div>
    <div class="auth-content">
    <v-form>
      <v-text-field label="Nome" outlined v-if="showSignup" v-model="user.name"></v-text-field>
      <v-text-field label="E-mail" outlined v-model="user.email"></v-text-field>
      <v-text-field label="CPF" return-masked-value v-mask="'###.###.###-##'" outlined v-if="showSignup" v-model="user.cpf"></v-text-field>
      <v-checkbox v-model="checkbox" v-if="showSignup" :input-value="user.ong" :label="'Sou uma ONG'"></v-checkbox>
      <v-text-field label="CNPJ" return-masked-value v-mask="'##.###.###/####-##'" outlined v-if="showSignup" v-model="user.cnpj"></v-text-field>
      <v-text-field label="Telefone" return-masked-value v-mask="'(##) #####-####'" outlined v-if="showSignup" v-model="user.telefone"></v-text-field>
     
      <v-text-field label="Senha" type="password" outlined v-model="user.password"></v-text-field>
      <v-text-field label="Confime sua Senha" type="password" outlined v-if="showSignup" v-model="user.confirmPassword"></v-text-field>
      <v-text-field label="Endereço" outlined v-if="showSignup" v-model="user.endereco"></v-text-field>
      <v-text-field label="Número" type="number" outlined v-if="showSignup" v-model="user.numero"></v-text-field>
      <v-text-field label="Complemento" outlined v-if="showSignup" v-model="user.complemento"></v-text-field>
      <v-text-field label="Bairro" outlined v-if="showSignup" v-model="user.bairro"></v-text-field>
      <v-text-field label="Estado" outlined v-if="showSignup" v-model="user.estado"></v-text-field>
      <v-text-field label="Cidade" outlined v-if="showSignup" v-model="user.cidade"></v-text-field>
      <v-text-field label="CEP" return-masked-value v-mask="'#####-###'" outlined v-if="showSignup" v-model="user.cep"></v-text-field>
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
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function () {
    return {
      showSignup: false,
      showCnpj: false,
      user: {},
      
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.endereco = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
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

</style>