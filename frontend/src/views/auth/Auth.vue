<template>
  <div class="auth">
    <div class="auth-header">
      <img src="@/assets/logo.png" width="300" alt="Logo" />
      <hr />
      <h2> Login </h2>
    </div>
    <div class="auth-content">
      <v-form>
        <div @keypress.enter.prevent="signin()">
          <v-text-field
            label="E-mail"
            prepend-inner-icon="mdi-at"
            outlined
            v-model="user.email"
            autocomplete="email"
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
        </div>
      </v-form>

      <v-btn color="#f7893b" dark @click="signin">
        <v-icon left> mdi-login </v-icon>
        Entrar
      </v-btn>

      <router-link to="/signup">
        <p>Não tem cadastro? Registre-se aqui!</p>
      </router-link>
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
      data: {},
      user: {},
      show1: false,
      dialog: false,
      resetPassword: {},
      rules: {
        required: (value) => !!value || "Required.",
      },
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
  },
};
</script>

<style>
.auth {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 400px;
  padding: 35px;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  margin: 100px auto;
}

.auth-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.auth-header hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(120, 120, 120, 0)),
    color-stop(rgba(120, 120, 120, 0.75)),
    to(rgba(120, 120, 120, 0))
  );
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}

.auth-content {
  display: flex;
  flex-direction: column;
}

.auth-content a {
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
}

.auth-content a:hover {
  color: #ff5757;
}

.hr-signup {
  margin-bottom: 20px;
}

.endereco-title {
  text-align: center;
}

.btn-cep {
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}
</style>