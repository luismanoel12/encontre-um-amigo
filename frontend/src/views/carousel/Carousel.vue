<template>
  <div class="carousel-page">
    <v-container>
      <v-form class="form elevation-10">
        <h2 class="atencao">ATENÇÃO: O tamanho da imagem deve ser 1440 x 500</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Responsavel"
              v-model="carousel.author"
              :readonly="mode === 'remove'"
              required
              color="#f7893b"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Link"
              v-model="carousel.link"
              color="#f7893b"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="buttons">
          <v-btn depressed v-if="mode === 'save'" @click="save" dark color="#f7893b">
            Salvar
            <v-icon dark right> mdi-content-save </v-icon>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn
            depressed
            v-if="mode === 'remove'"
            @click="remove"
            color="error"
          >
            Excluir
             <v-icon dark right> mdi-delete </v-icon>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn depressed @click="reset" class="btn-cancel" color="primary"> 
            Cancelar 
            <v-icon dark right> mdi-close-thick </v-icon>
            </v-btn>
        </div>
      </v-form>

      <v-data-table
        :items="carousels"
        :headers="headers"
        class="elevation-10"
        
      >
        <template v-slot:[`item.actions`]="{ item }">
                    <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="#f7893b" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn
                    class="bt-actions"
                    color="warning"
                    text
                    elevation="0"
                    small
                    @click="loadCarousel(item)"
                    dark
                  >
                    Editar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <v-btn
                    class="bt-actions"
                    color="error"
                    text
                    elevation="0"
                    small
                    @click="loadCarousel(item, 'remove')"
                    dark
                  >
                    Deletar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";

export default {
  name: "Carousel",
  data: function () {
    return {
      mode: "save",
      carousel: {},
      carousels: [],
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Código", value: "id" },
        { text: "Responsavel", value: "author" },
        { text: "Link", value: "link" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadCarousels() {
      const url = `/carousel`;
      api.get(url).then((res) => {
        this.carousels = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.carousel = {};
      this.loadCarousels();
    },
    save() {
      const method = this.carousel.id ? "put" : "post";
      const id = this.carousel.id ? `/${this.carousel.id}` : "";
      api[method](`/carousel${id}`, this.carousel)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.carousel.id;
      api
        .delete(`/carousel/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCarousel(carousel, mode = "save") {
      this.mode = mode;
      api
        .get(`/carousel/${carousel.id}`)
        .then((res) => (this.carousel = res.data));
    },
  },
  watch: {
    page() {
      this.loadCarousels();
    },
  },
  mounted() {
    this.loadCarousels();
  },
};
</script>

<style>
.form {
  margin-top: 50px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.bt-actions{
    margin-left: 5px;
}

.bt-actions:hover{
    transform: scale(1.1);
}

.btn-cancel{
    margin-left: 10px;
}

.atencao{
  text-align: center;
  color: #FF1D23;
  margin-bottom: 20px;
}
</style>