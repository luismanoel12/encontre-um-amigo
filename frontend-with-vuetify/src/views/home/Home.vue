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
          <h1>Nossos Serviços</h1>
        </div>
        <v-row>
          <v-col cols="12" sm="3">
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
          <v-col cols="12" sm="3">
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
          <v-col cols="12" sm="3">
            <router-link class="router-link" to="/ongs">
              <div class="home-2-card">
                <div class="home-2-card-header">
                  <h2>ONGs</h2>
                </div>
                <div class="home-2-card-content">
                  <img src="@/assets/ongs.png" width="160" alt="" />
                </div>
              </div>
            </router-link>
          </v-col>
          <v-col cols="12" sm="3">
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

    <div class="home-3">
      <v-container>
        <div class="home-3-title">
          <h1>Ajude</h1>
            <v-divider class="home-3-divider"></v-divider>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="page-3-card">
                <h1>Adote</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  mi purus, ornare ac mi et, ultricies condimentum lacus. Etiam
                  massa sapien, tempor et sodales sed, congue vitae ipsum. Ut
                  vitae eros arcu. Sed sed hendrerit metus, et placerat lacus.
                  Duis fermentum eros eget risus lacinia lacinia. Donec
                  hendrerit nibh lectus, at mollis risus pellentesque id
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  mi purus, ornare ac mi et, ultricies condimentum lacus. Etiam
                </p>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="page-3-card">
                <h1>Faça uma Doação</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  mi purus, ornare ac mi et, ultricies condimentum lacus. Etiam
                  massa sapien, tempor et sodales sed, congue vitae ipsum. Ut
                  vitae eros arcu. Sed sed hendrerit metus, et placerat lacus.
                  Duis fermentum eros eget risus lacinia lacinia. Donec
                  hendrerit nibh lectus, at mollis risus pellentesque id
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  mi purus, ornare ac mi et, ultricies condimentum lacus. Etiam
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
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
      const url = `/carouselPublic`;
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

.home-3 {
  padding-top: 50px;
  background-color: #212121;
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
  color: #212121;
  font-weight: 1;
  padding-bottom: 20px;
}

.home-3-title h1 {
  text-align: center;
  color: #fff;
  font-weight: 1;
  padding-bottom: 20px;
}

.page-3-card{
  width: 600px;
  margin: auto;
  padding-top: 20px;
}

.page-3-card > p {
  color: #fff;
  font-weight: 300;
  text-align: justify;
}

.home-3-divider{
  background-color: #fff;
}

@media only screen and (max-width: 600px) {
  .page-3-card {
    width: auto;
    padding: 20px;
  }
}

</style>
