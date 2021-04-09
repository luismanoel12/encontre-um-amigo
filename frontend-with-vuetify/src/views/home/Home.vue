<template>
  <div class="home">
    <v-container>
      <v-carousel continuous>
        <v-carousel-item
          v-for="(carousel, id) in carouselData"
          :key="id"
          :src="carousel.link"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-container>

    <div class="home-2">
      <v-container>
        <div class="home-2-title">
          <h1>Sobre nós</h1>
        </div>
        <v-row>
          <v-col cols="12" sm="4">
            <router-link class="router-link" to="/animais/adocao">
              <div class="home-2-card" elevation="24">
                <div class="home-2-card-header">
                  <h2>Animais Para Adoção</h2>
                </div>
                <div class="home-2-card-content">
                  <img src="@/assets/pets.png" width="220" alt="" />
                </div>
              </div>
            </router-link>
          </v-col>
          <v-col cols="12" sm="4">
            <router-link class="router-link" to="/publicacoes">
              <div class="home-2-card">
                <div class="home-2-card-header">
                  <h2>Publicações</h2>
                </div>
                <div class="home-2-card-content">
                  <img src="@/assets/pub.png" width="150" alt="" />
                </div>
              </div>
            </router-link>
          </v-col>
          <v-col cols="12" sm="4">
            <router-link class="router-link" to="/metas">
              <div class="home-2-card">
                <div class="home-2-card-header">
                  <h2>Doações com Metas</h2>
                </div>
                <div class="home-2-card-content">
                  <img src="@/assets/donation.png" width="150" alt="" />
                </div>
              </div>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import api from "../../config/api";

export default {
  name: "Home",
  data() {
    return {
      carouselData: {},
    };
  },
  mounted() {
    this.$root.$once("carousel-get", () => {
      this.loadCarousel();
    });
  },
  methods: {
    async loadCarousel() {
      const url = `/carousel`;
      await api
        .get(url)
        .then((res) => {
          this.carouselData = res.data;
        })
        .catch((erro) => {});
    },
  },
};
</script>

<style scoped>
.home-2 {
  padding-top: 50px;
  /* background-color: #212121; */
  height: 100%;
}

.home-2-card {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
  transition: ease-out 0.3s;
  color: #212121;
  font-weight: 5px;
}

.home-2-card:hover {
  transform: scale(1.05);
}

.home-2-card-header {
  text-align: center;
}

.home-2-card-content {
  text-align: center;
  padding-top: 20px;
}

.home-2-card-content > img {
  max-width: 100%;
}

.home-2-title h1 {
  text-align: center;
  color: #fff;
  font-weight: 1;
  padding-bottom: 20px;
}
</style>
