<template>
  <div class="home">
    <v-container>
      <v-carousel continuous>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>

    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'
// import { baseApiUrl } from '@/global'

export default {
  name: "Home",
data () {
      return {
        items: [
          {
            src: 'https://images.wallpaperscraft.com/image/alaskan_malamute_malamute_dog_110500_1440x900.jpg',
          },
          {
            src: 'https://www.sftravel.com/sites/sftravel.prod.acquia-sites.com/files/field/image/1440X438-BringYourDog.jpg',
          },
          {
            src: 'https://www.rover.com/blog/wp-content/uploads/2020/07/SeparationAnxiety_Hero_1440x500-2.jpg',
          },
          {
            src: 'https://i1.wp.com/rruffhealingheroes.org/wp-content/uploads/2018/02/rruff-dog-park-header-1440px-1.jpg?w=1080',
          },
        ],
      }
    },
};
</script>

<style>
</style>
