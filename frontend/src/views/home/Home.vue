<template>
  <div class="home">
    <v-container>
      <v-carousel cycle>
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
                  <img src="@/assets/pets.png" width="150" alt="" />
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
                  <img src="@/assets/ongs.png" width="150" alt="" />
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

    <div class="home-4">
      <v-container>
        <div class="home-4-title">
          <h1>Veja os últimos animais cadastrados</h1>
        </div>
        <v-sheet class="mx-auto sheet-home-animais" max-width="80%">
          <v-slide-group class="pa-4" show-arrows>
            <v-slide-item v-for="animal in animais" :key="animal.id">
              <router-link
                class="router-link"
                :to="{ name: 'animaisById', params: { id: animal.id } }"
              >
                <div class="animais-home-card">
                  <v-avatar
                    bordered
                    class="ma-2 home-avatar-img"
                    size="128"
                    tile
                  >
                    <img :src="animal.imagem" :alt="animal.nome" />
                  </v-avatar>
                  <span class="animal-nome-badge">{{ animal.nome }}</span>
                </div>
              </router-link>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
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
                  hendrerit nibh lectus, at mollis risus pellentesque id Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Proin mi
                  purus, ornare ac mi et, ultricies condimentum lacus. Etiam
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
                  hendrerit nibh lectus, at mollis risus pellentesque id Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Proin mi
                  purus, ornare ac mi et, ultricies condimentum lacus. Etiam
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
      model: null,
      animais: {},
    };
  },
  mounted() {
    this.loadCarousel();
    // this.$root.$once("carousel-get", () => {
    //   this.loadCarousel();
    // });
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

    getAnimais() {
      api(`/getRandom`).then((res) => {
        this.animais = res.data;
      });
    },
  },
  mounted() {
    this.getAnimais();
    this.loadCarousel();
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
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  transition: ease-out 0.3s;
  color: #212121;
  font-weight: 5px;
  border-left: 3px solid #43aa8b;
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

.page-3-card {
  width: auto;
  margin: auto;
  padding-top: 20px;
}

.page-3-card > p {
  color: #fff;
  font-weight: 300;
  text-align: justify;
}

.home-3-divider {
  background-color: #fff;
}

.animais-home-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img-animais-home > img {
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.sheet-home-animais {
  background-color: transparent !important;
}

.home-4-title {
  text-align: center;
  margin-top: 70px;
}

.home-avatar-img > img {
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #52b69a;
}

.animal-nome-badge {
  background-color: #52b69a;
  padding: 10px;
  color: #fff;
  border-radius: 50px;
}

@media only screen and (max-width: 600px) {
  .page-3-card {
    width: auto;
    padding: 20px;
  }
}
</style>
