<template>
  <div class="animais-page">
    <v-container>
      <v-form class="form elevation-10">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Título"
              v-model="publicacao.titulo"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="URL da imagem"
              v-model="publicacao.imageUrl"
              :readonly="mode === 'remove'"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <VueEditor
              v-model="publicacao.descricao"
              placeholder="Informe o conteúdo da publicação"
              :readonly="mode === 'remove'"
            />
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
export default {};
</script>

<style>
</style>