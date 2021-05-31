<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#00171f" v-if="user">
      <v-list-item v-if="user">
        <v-list-item-content>
          <v-avatar class="ma-2 perfil-avatar-img" size="84" tile>
            <img :src="user.userImage" alt="" v-if="user.userImage">
            <Gravatar :email="user.email" alt="User" v-else />
            <v-badge
              v-if="user.admin"
              color="blue"
              icon="mdi-check-bold"
              bottom
              overlap
            ></v-badge>
          </v-avatar>
          <v-list-item-title class="title">
            <h3>Bem-vindo</h3>
          </v-list-item-title>
          <v-list-item-subtitle>
            <h3 class="subtext">{{ user.name }}</h3>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="divider-menu"></v-divider>

      <v-list dense nav dark>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon> mdi-home </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="user"
          :to="{ name: 'perfil', params: { id: user.id } }"
        >
          <v-list-item-icon>
            <v-icon> mdi-account </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Meus dados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/ongs">
          <v-list-item-icon>
            <v-icon> mdi-account-group </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>ONG's cadastradas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group no-action prepend-icon="mdi-dog-side">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Animais</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            to="/animais/cadastrar"
            v-if="(user && user.ong == true) || user.admin == true"
          >
            <v-list-item-icon>
              <v-icon> mdi-paw </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Cadastrar animais</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/animais/adocao">
            <v-list-item-icon>
              <v-icon> mdi-paw </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Animais para adoção</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/animais/desaparecidos">
            <v-list-item-icon>
              <v-icon> mdi-dog-side-off </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Animais desaparecidos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action prepend-icon="mdi-bullseye-arrow">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Metas</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            to="/minhas-metas"
            v-if="(user && user.ong == true) || user.admin == true"
          >
            <v-list-item-icon>
              <v-icon> mdi-bullseye </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Minhas Metas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/metas">
            <v-list-item-icon>
              <v-icon> mdi-bullseye </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Doações com Metas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action prepend-icon="mdi-newspaper">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Publicações</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            to="/publicacao/cadastrar"
            v-if="(user && user.admin) || user.ong"
          >
            <v-list-item-icon>
              <v-icon> mdi-newspaper-plus </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Minhas Publicações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/publicacoes">
            <v-list-item-icon>
              <v-icon> mdi-newspaper-variant-multiple-outline </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Publicações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item to="/doacoes">
          <v-list-item-icon>
            <v-icon> mdi-cash-multiple </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Doações</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider color="#fff" v-if="user && user.admin"></v-divider>

        <v-list-group
          no-action
          prepend-icon="mdi-account-lock"
          v-if="user && user.admin"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item to="/dashboard">
            <v-list-item-icon>
              <v-icon> mdi-chart-bar </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/users">
            <v-list-item-icon>
              <v-icon> mdi-account-multiple </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/carousel">
            <v-list-item-icon>
              <v-icon> mdi-image </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Carousel</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/denuncia">
            <v-list-item-icon>
              <v-icon> mdi-alert </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Denúncias</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark class="menu-bg" v-if="!user || user">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <router-link to="/home" class="home-router">
        <v-toolbar-title class="logo-title">
          <img
            src="@/assets/logo.png"
            class="logo mr-4"
            width="40px"
            alt="Logo"
          />
          Encontre um amigo</v-toolbar-title
        >
      </router-link>

      <v-btn
        v-if="user"
        fixed
        outlined
        color="#fffff"
        class="logout-button"
        @click.prevent="logout"
      >
        <v-icon>mdi-logout</v-icon>
        Sair
      </v-btn>

      <v-btn
        v-else
        outlined
        fixed
        color="#fffff"
        class="logout-button"
        to="/auth"
      >
        <v-icon>mdi-logout</v-icon>
        Login
      </v-btn>
    </v-app-bar>

    <v-main class="main-body">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";
import api from "../../config/api";

export default {
  name: "Menu",
  components: { Gravatar },
  computed: { ...mapState(["user"]) },
  data() {
    return {
      drawer: null,
      right: null,
      userImage: {},
    };
  },

  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
    navegar(link) {
      this.$router.push({ path: link });
    },
  },
};
</script>

<style>
.main-body {
  background-color: #dce1e3;
}

.title {
  color: #ffff;
  margin-top: 20px;
  text-align: center;
}

.subtext {
  color: #ffff;
  text-align: center;
  margin-top: 5px;
}

.user-dropdown-img {
  display: flex;
  justify-content: center;
  justify-items: center;
}

.user-dropdown-img > img {
  max-height: 64px;
  border-radius: 50%;
}

.divider-menu {
  background-color: #ffff;
}

.logout-button {
  right: 0;
  margin-right: 30px;
}

.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 25px !important;
}

.v-list-item__title,
.v-list-item__subtitle {
  flex: 1 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: none !important;
}

.home-router {
  text-decoration: none;
  color: #fff !important;
  margin-left: 20px;
}

.logo-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.menu-bg {
  background: linear-gradient(110deg, #00171f 30%, #036564 60%);
}

.perfil-avatar-img > img{
  border-radius: 50%!important;
  object-fit: cover;
}

@media (max-width: 600px) {
  .logo {
    display: none;
  }
}
</style>