<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <div class="footer-data">
        <v-card-title class="footer-bg">
          <strong class="subheading">Conheça nossas redes sociais</strong>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-divider>ss</v-divider>

        <v-card-title class="footer-bg">
          
          <strong class="subheading">Contato</strong>

          <v-spacer></v-spacer>

          <span>encontreumamigo@hotmail.com</span>
        </v-card-title>
      </div>

      <v-card-text class="py-2 footer-2-bg text-center">
        {{ new Date().getFullYear() }} — <strong>Encontre um Amigo</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
.footer-bg {
  background-color: #078881;
}

.footer-2-bg {
  background-color: #078881;
}

.footer-data{
  display: flex;
  flex: row;
  justify-content: center;
  justify-items: center;
}

.theme--dark.v-card {
    background-color: #078881!important;
}

.divider-footer{
  color: #fff!important;
}
</style>
