<template>
  <div class="carousel-page">
    <v-container>
      <v-form class="form elevation-10">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Responsavel"
              v-model="carousel.author"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Link"
              v-model="carousel.link"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="buttons">
          <v-btn depressed v-if="mode === 'save'" @click="save"  color="success">
            Salvar
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn
            depressed
            v-if="mode === 'remove'"
            @click="remove"
            color="error"
          >
            Excluir
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn depressed @click="reset" class="btn-cancel" color="primary"> Cancelar </v-btn>
        </div>
      </v-form>

      <v-data-table
        :items="carousels"
        :headers="headers"
        class="elevation-10"
        
      >
        <template v-slot:[`item.actions`]="{ item }">
           <v-btn
              class="bt-actions"
              color="primary"
              fab
              small
              @click="loadCarousel(item)"
              dark
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

           <v-btn
              class="bt-actions"
              color="error"
              fab
              small
              @click="loadCarousel(item, 'remove')"
              dark
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Carousel",
  data: function () {
    return {
      mode: "save",
      carousel: {},
      carousels: [],
      page: 1,
      limit: 0,
      count: 0,
      headers: [
        {
          text: "Carousel",
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
      const url = `${baseApiUrl}/carousel?page=${this.page}`;
      axios.get(url).then((res) => {
        this.carousels = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
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
      axios[method](`${baseApiUrl}/carousel${id}`, this.carousel)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.carousel.id;
      axios
        .delete(`${baseApiUrl}/carousel/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCarousel(carousel, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/carousel/${carousel.id}`)
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
</style>