<template>
  <div class="BtnDenunciar">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          class="btn-new-password"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> mdi-alert </v-icon>
          Denunciar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Denunciar: {{ name }} </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="tiposDenuncias"
                  prepend-inner-icon="mdi-sign-real-estate"
                  label="Tipo da Denúncia"
                  v-model="denuncia.tipoDenuncia"
                  :rules="[rules.required]"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Descrição da Denúncia"
                  v-model="denuncia.descricao"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>* indica campo necessário</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="red darken-1" text @click="denunciar">
            Enviar Denúncia
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "../../config/api";
import { showError } from "@/global";

export default {
  name: "BtnDenunciar",
   props: ['name', 'id'],
  data: function () {
    return {
      denuncia: {},
      dialog: false,
      rules: {
        required: (value) => !!value || "Requerido.",
      },
      tiposDenuncias: [
        { text: "Violência animal", value: "VA" },
        { text: "Venda de animais", value: "VDA" },
        { text: "Abusos", value: "AS" },
        { text: "Outros", value: "OS" },
      ],
    };
  },
  methods: {

    denunciar() {
      this.denuncia.userId = this.id;

      api
        .post(`/denuncia`, this.denuncia)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.denuncia = {};
          this.dialog = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
</style>
