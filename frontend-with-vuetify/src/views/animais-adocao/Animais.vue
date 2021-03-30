<template>
  <div class="animais-page">
    <v-container>
      <v-form class="form elevation-10">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Nome"
              v-model="animal.nome"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              :items="tipo"
              :readonly="mode === 'remove'"
              v-model="animal.tipo"
              label="Tipo"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              :items="sexo"
              :readonly="mode === 'remove'"
              v-model="animal.sexo"
              label="Sexo"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              :items="porte"
              :readonly="mode === 'remove'"
              v-model="animal.porte"
              label="Porte"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="URL da Imagem"
              v-model="animal.imagem"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="3">
            <v-checkbox
              color="green"
              v-model="animal.deficiente"
              :readonly="mode === 'remove'"
              :label="'Deficiente'"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3">
            <v-checkbox
              color="green"
              v-model="animal.vermifugado"
              :readonly="mode === 'remove'"
              :label="'Vermifugado'"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3">
            <v-checkbox
              color="green"
              v-model="animal.vacinado"
              :readonly="mode === 'remove'"
              :label="'Vacinado'"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3">
            <v-checkbox
              color="green"
              v-model="animal.castrado"
              :readonly="mode === 'remove'"
              :label="'Castrado'"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="CEP"
              v-model="animal.cep"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              :items="estados"
              :readonly="mode === 'remove'"
              v-model="animal.estado"
              label="Estado"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
             <v-text-field
              label="Cidade"
              v-model="animal.cidade"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <v-textarea
              outlined
              name="input-7-4"
              v-model="animal.descricao"
              :readonly="mode === 'remove'"
              label="Descrição"
            ></v-textarea>
          </v-col>
        </v-row>

        <div class="buttons">
          <v-btn depressed v-if="mode === 'save'" @click="save" color="success">
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
          <v-btn depressed @click="reset" class="btn-cancel" color="primary">
            Cancelar
            <v-icon dark right> mdi-close-thick </v-icon>
          </v-btn>
        </div>
      </v-form>

      <v-data-table :items="animais" :headers="headers" class="elevation-10">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="bt-actions"
            color="primary"
            fab
            elevation="0"
            small
            @click="loadAnimal(item)"
            dark
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            class="bt-actions"
            color="error"
            fab
            elevation="0"
            small
            @click="loadAnimal(item, 'remove')"
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
import { showError } from "@/global";
import api from "../../config/api";

export default {
  name: "Animais",
  data: function () {
    return {
      mode: "save",
      animal: {},
      animais: [],
      checkbox: false,
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
        { text: "Acre", value: "AC"},
        { text: "Alagoas", value: "AL"},
        { text: "Amapá", value: "AP"},
        { text: "Amazonas", value: "AM"},
        { text: "Bahia", value: "BA"},
        { text: "Ceará", value: "CE"},
        { text: "Distrito Federal", value: "DF"},
        { text: "Espírito Santo", value: "ES"},
        { text: "Goiás", value: "GO"},
        { text: "Maranhão", value: "MA"},
        { text: "Mato Grosso", value: "MT"},
        { text: "Mato Grosso do Sul", value: "MS"},
        { text: "Minas Gerais", value: "MG"},
        { text: "Pará", value: "PA"},
        { text: "Paraíba", value: "PB"},
        { text: "Paraná", value: "PR"},
        { text: "Pernambuco", value: "PE"},
        { text: "Piauí", value: "PI"},
        { text: "Rio de Janeiro", value: "RJ"},
        { text: "Rio Grande do Norte", value: "RN"},
        { text: "Rio Grande do Sul", value: "RS"},
        { text: "Rondônia", value: "RO"},
        { text: "Roraima", value: "RR"},
        { text: "Santa Catarina", value: "SC"},
        { text: "São Paulo", value: "SP"},
        { text: "Sergipe", value: "SE"},
        { text: "Tocantins", value: "TO"}
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
      const url = `/animaisUsuario`;
      api.get(url).then((res) => {
        this.animais = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.animal = {};
      this.loadAnimais();
    },
    save() {
      console.log(this.animal);
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
    },
  },
  watch: {
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
.form {
  margin-top: 50px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>