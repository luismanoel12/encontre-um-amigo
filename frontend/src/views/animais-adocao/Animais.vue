<template>
  <div class="animais-page">
    <v-container v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

    <v-container v-else>
      <div class="cadastrar-animais-form">
        <div class="cadastrar-animais-titulo">
          <h1>Olá, {{ user.name }}.</h1>
          <h2>Aqui se encontram todos os seus pets cadastrados!</h2>
        </div>

        <v-row class="mt-5 mb-2">
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <div class="novo-animal">
                <v-btn color="#036564" dark v-bind="attrs" v-on="on">
                  Cadastrar novo Animal

                  <v-icon dark right> mdi-paw </v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span
                  class="headline excluir-animal"
                  v-if="this.mode === 'remove'"
                  >Excluir o Animal: <strong> {{ animal.nome }} </strong>
                </span>
                <span class="headline salvar-animal" v-if="!animal.id"
                  >Cadastrar Novo Animal</span
                >
                <span
                  class="headline atualizar-animal"
                  v-if="animal.id && this.mode != 'remove'"
                  >Atualizar o Animal: <strong> {{ animal.nome }} </strong>
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <h1
                    v-if="this.mode === 'remove'"
                    class="text-center excluir-animal"
                  >
                    Tem certeza que deseja excluir o animal: {{ animal.nome }}
                  </h1>
                  <h2
                    v-if="this.mode === 'remove'"
                    class="text-center excluir-animal"
                  >
                    Essa ação não poderá ser desfeita!
                  </h2>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Nome"
                        v-model="animal.nome"
                        prepend-inner-icon="mdi-paw"
                        required
                        outlined
                        maxlength="20"
                        counter="20"
                        hint="Máximo de 20 caracteres"
                        v-if="this.mode === 'save'"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="tipo"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-paw"
                        v-model="animal.tipo"
                        label="Tipo"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="sexo"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-gender-male-female"
                        v-model="animal.sexo"
                        label="Sexo"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-select
                        :items="porte"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-arrow-expand"
                        v-model="animal.porte"
                        label="Porte"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="URL da Imagem"
                        v-model="animal.imagem"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-link-variant"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                      <v-checkbox
                        color="green"
                        v-model="animal.deficiente"
                        v-if="this.mode === 'save'"
                        :label="'Deficiente'"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        color="green"
                        v-model="animal.vermifugado"
                        v-if="this.mode === 'save'"
                        :label="'Vermifugado'"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        color="green"
                        v-model="animal.vacinado"
                        v-if="this.mode === 'save'"
                        :label="'Vacinado'"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        color="green"
                        v-model="animal.castrado"
                        v-if="this.mode === 'save'"
                        :label="'Castrado'"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-checkbox
                        color="green"
                        v-model="animal.desaparecido"
                        v-if="this.mode === 'save'"
                        :label="'Desaparecido'"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="CEP"
                        v-model="animal.cep"
                        v-mask="'#####-###'"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-numeric"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-select
                        :items="estados"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-sign-real-estate"
                        v-model="animal.estado"
                        label="Estado"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Cidade"
                        v-model="animal.cidade"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-city"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-textarea
                        outlined
                        name="input-7-4"
                        v-model="animal.descricao"
                        v-if="this.mode === 'save'"
                        prepend-inner-icon="mdi-card-text"
                        label="Descrição"
                        maxlength="250"
                        counter="250"
                        hint="Máximo de 250 caracteres"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
                <small v-if="this.mode === 'save'"
                  >*indicates required field</small
                >
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="buttons">
                  <v-btn
                    depressed
                    v-if="mode === 'save'"
                    @click="save"
                    color="#036564"
                    dark
                  >
                    Salvar
                    <v-icon dark right> mdi-content-save </v-icon>
                  </v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn
                    depressed
                    v-if="mode === 'remove'"
                    @click="remove"
                    color="error"
                    >Excluir
                    <v-icon dark right> mdi-delete </v-icon>
                  </v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn
                    depressed
                    @click="reset"
                    class="btn-cancel"
                    color="primary"
                  >
                    Cancelar
                    <v-icon dark right> mdi-close-thick </v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>

      <v-row>
        <v-col
          cols="12"
          xl="2"
          lg="3"
          sm="4"
          v-for="animal in animais"
          :key="animal.id"
        >
          <v-card class="mx-auto my-12 animal-card" max-width="374">
            <v-badge
              color="#036564"
              icon="mdi-dog-side"
              offset-x="78"
              offset-y="20"
              left
              :content="animal.status"
              overlap
              tile
            >
              <div class="img-card-animal">
                <img
                  v-if="animal.imagem"
                  :src="animal.imagem"
                  height="100%"
                  alt="Animais"
                />
                <img
                  v-else
                  src="@/assets/article.png"
                  height="100%"
                  alt="Animais"
                />
              </div>
            </v-badge>

            <v-card-title> {{ animal.nome }}</v-card-title>

            <v-divider></v-divider>

            <div class="meus-animais-acoes">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                outlined
                color="#036564"
                @click="adotar(animal)"
                v-if="animal.status === 'DISPONÍVEL'"
              >
                <v-icon dark> mdi-paw </v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                fab
                dark
                small
                outlined
                color="error"
                @click="adotar(animal)"
                v-else
              >
                <v-icon dark> mdi-paw </v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                fab
                dark
                small
                outlined
                color="warning"
                @click="loadAnimal(animal)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                fab
                dark
                small
                outlined
                color="error"
                @click="loadAnimal(animal, 'remove')"
              >
                <v-icon dark> mdi-delete-forever </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "../../config/api";
import { mapState } from "vuex";

export default {
  name: "Animais",
  computed: { ...mapState(["user"]) },
  data: function () {
    return {
      mode: "save",
      animal: {},
      animais: [],
      checkbox: false,
      dialog: false,
      page: 1,
      loadMore: true,
      loading: true,
      tipo: [
        { text: "Cachorro", value: "Cachorro" },
        { text: "Gato", value: "Gato" },
      ],
      porte: [
        { text: "Pequeno", value: "Pequeno" },
        { text: "Médio", value: "Médio" },
        { text: "Grande", value: "Grande" },
      ],
      sexo: [
        { text: "Macho", value: "Macho" },
        { text: "Fêmea", value: "Fêmea" },
      ],
      estados: [
        { text: "Acre", value: "AC" },
        { text: "Alagoas", value: "AL" },
        { text: "Amapá", value: "AP" },
        { text: "Amazonas", value: "AM" },
        { text: "Bahia", value: "BA" },
        { text: "Ceará", value: "CE" },
        { text: "Distrito Federal", value: "DF" },
        { text: "Espírito Santo", value: "ES" },
        { text: "Goiás", value: "GO" },
        { text: "Maranhão", value: "MA" },
        { text: "Mato Grosso", value: "MT" },
        { text: "Mato Grosso do Sul", value: "MS" },
        { text: "Minas Gerais", value: "MG" },
        { text: "Pará", value: "PA" },
        { text: "Paraíba", value: "PB" },
        { text: "Paraná", value: "PR" },
        { text: "Pernambuco", value: "PE" },
        { text: "Piauí", value: "PI" },
        { text: "Rio de Janeiro", value: "RJ" },
        { text: "Rio Grande do Norte", value: "RN" },
        { text: "Rio Grande do Sul", value: "RS" },
        { text: "Rondônia", value: "RO" },
        { text: "Roraima", value: "RR" },
        { text: "Santa Catarina", value: "SC" },
        { text: "São Paulo", value: "SP" },
        { text: "Sergipe", value: "SE" },
        { text: "Tocantins", value: "TO" },
      ],
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Código", value: "id" },
        { text: "Tipo", value: "tipo" },
        { text: "Nome", value: "nome" },
        { text: "Porte", value: "porte" },
        { text: "Sexo", value: "sexo" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
  methods: {
    loadAnimais() {
      api(`/animaisUsuario`).then((res) => {
        this.animais = res.data;
        this.loading = false;
        // this.page++;

        // if (res.data.data.length === 0) this.loadMore = false;
      });
    },
    reset() {
      this.mode = "save";
      this.animal = {};
      this.loadAnimais();
      this.dialog = false;
    },
    save() {
      const method = this.animal.id ? "put" : "post";
      const id = this.animal.id ? `/${this.animal.id}` : "";
      api[method](`/animais${id}`, this.animal)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.animal.id;
      api
        .delete(`/animais/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadAnimal(animal, mode = "save") {
      this.mode = mode;
      api.get(`/animais/${animal.id}`).then((res) => (this.animal = res.data));
      this.dialog = true;
    },
    adotar(animal) {
      if (animal.status === "DISPONÍVEL") {
        animal.status = "ADOTADO";
      } else {
        animal.status = "DISPONÍVEL";
      }

      const method = "put";
      api[method](`/animais/adotar/${animal.id}`, animal)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  watch: {
    $route(to) {
      this.animais = [];
      this.page = 1;
      this.loadMore = true;

      this.loadAnimais();
    },

    page() {
      this.loadAnimais();
    },
  },
  mounted() {
    this.loadAnimais();
  },
};
</script>

<style>
.cadastrar-animais-form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.cadastrar-animais-titulo {
  text-align: center;
}

.excluir-animal {
  color: #ef233c;
}
.salvar-animal {
  color: #44cf6c;
}
.atualizar-animal {
  color: #fad202;
}

.animal-card {
  background-color: #fff;
  width: 200px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}

.img-card-animal {
  height: 150px;
}

.img-card-animal img {
  max-width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  object-fit: cover;
}

.span-animal-card {
  background-color: #212121;
  width: 100%;
  padding: 5px;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 5px;
}

.meus-animais-acoes {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
}

.novo-animal {
  margin: auto;
}
</style>