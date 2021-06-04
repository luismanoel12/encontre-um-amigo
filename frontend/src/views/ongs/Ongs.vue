<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="ongs-page">
      <h1 class="text-center">ONGs Cadastradas no sistema</h1>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" sm="4" v-for="ong in ongs" :key="ong.id">
          <router-link
            class="router-link"
            :to="{ name: 'ongById', params: { id: ong.id } }"
          >
            <v-card class="ong-card" color="#fff" dark>
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-2 avatar-img-ongs" size="100" tile>
                  <img :src="ong.userImage" alt="" v-if="ong.userImage">
                  <Gravatar :email="ong.email" :alt="ong.name" v-else />
                </v-avatar>
                <v-divider class="divider-avatar" vertical></v-divider>
                <div>
                  <v-card-title class="headline text-center">
                    {{ ong.name }}
                  </v-card-title>

                  <div class="card-content">
                    <span
                      >Estado: <strong>{{ ong.estado }}</strong>
                    </span>
                  </div>

                  <v-card-actions> </v-card-actions>
                </div>
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination">
      <v-btn depressed class="bt-carregar-mais" elevation="24" dark v-if="loadMore" @click="getOngs">
        Carregar Mais

        <v-icon dark right> mdi-reload </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";
import Gravatar from "vue-gravatar";

export default {
  name: "Ongs",
  components: { Gravatar },
  data: function () {
    return {
      ongs: [],
      page: 1,
      loadMore: true,
      loading: true,
    };
  },

  methods: {
    getOngs() {
      api(`/ongs?page=${this.page}`).then((res) => {
        this.ongs = this.ongs.concat(res.data.data);
        this.page++;
        this.loading = false;

        if (res.data.data.length === 0) this.loadMore = false;
      });
    },
  },
  watch: {
    $route(to) {
      this.ongs = [];
      this.page = 1;
      this.loadMore = true;

      this.getOngs();
    },
  },
  mounted() {
    this.getOngs();
  },
};
</script>

<style scoped>
.ongs-page {
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

.ong-img {
  display: flex;
  justify-content: center;
  justify-items: center;
  padding-top: 20px;
}

.ong-img > img {
  max-height: 64px;
  border-radius: 50%;
}

.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  padding: 0px !important;
}

.divider-avatar {
  background-color: #52b69a;
}

.card-content {
  padding: 10px;
}

.ong-card{
  transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
  color: #52b69a;
  border-left: .25rem solid #52b69a!important;
  box-shadow: 0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important;

}

.ong-card:hover{
  transform: scale(1.03);
}

.avatar-img-ongs > img{
  object-fit: cover;
}

</style>
