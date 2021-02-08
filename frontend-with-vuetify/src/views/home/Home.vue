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
    // this.loadCarousel();
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

<style>
</style>
