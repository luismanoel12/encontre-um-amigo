<template>
  <v-app id="inspire">
    <v-navigation-drawer  v-model="drawer" app color="#001D2E" v-if="user">
      <v-list-item>
        <v-list-item-content>
          <div class="user-dropdown-img">
            <Gravatar :email="user.email" alt="User" />
            <v-badge v-if="user.admin" color='blue' icon="mdi-check-bold" bottom overlap></v-badge>
          </div>
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
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="navegar(item.link)" :key="item.title">{{ item.title }}</v-list-item-title>
            
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="#00A879">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Encontre um amigo</v-toolbar-title>

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

export default {
  name: "Menu",
  components: { Gravatar },
  computed: mapState(["user"]),
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home", link: '/' },
        { title: "Perfil", icon: "mdi-account", link: '/' },
        { title: "Carousel", icon: "mdi-image", link: '/carousel' },
        { title: "Animais para adoção", icon: "mdi-paw", link: '/' },
        { title: "Publicações", icon: "mdi-newspaper", link: '/' },
        { title: "Doações", icon: "mdi-cash-multiple", link: '/' }
      ],
      right: null,
    };
  },

  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },

    navegar(link){
      this.$router.push({path: link})
    }
  },
};
</script>

<style>
.main-body {
  background-color: #efefef;
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
</style>