<template>
  <v-container>
    <div class="dashboard-1">
      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Usuários Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>50</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Animais Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>50</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Animais Adotados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>50</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Publicações</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>50</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Doaçoes com Metas Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>50</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Usuários Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>50</h1>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.dashboard-1 {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  flex-wrap: wrap;
}

.dashboard-card {
  background-color: #fff;
  padding: 10px;
  width: 400px;
  border-left: 3px solid #4361ee;
  border-radius: 5px;
  margin-left: 50px;
  margin-top: 20px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
}

.dashboard-card-header {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.dashboard-card-content {
  margin-top: 10px;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .dashboard-card {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>