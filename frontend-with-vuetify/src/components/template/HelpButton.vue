<template>
  <div class="helpbutton">
    <v-btn to="/perfil" class="mx-2" fab dark large elevation="15" color="purple">
      <v-icon dark> mdi-help </v-icon>
    </v-btn>
  </div>


</template>

<script>
export default {
  name: "HelpButton",
   data: () => ({
      dialog: false,
    }),
};
</script>

<style>
.helpbutton {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
</style>
