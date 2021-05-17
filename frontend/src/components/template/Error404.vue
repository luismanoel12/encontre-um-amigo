<template>
  <div class="error404">
    <v-container>
      <div class="e404">
        <div class="e404-header">
          <h1>404</h1>
          <h2>página não encontrada</h2>
          <h3>Parece que a página que você está procurando não existe!</h3>
        </div>
        <div class="e404-content">
          <v-btn elevation="15" color="#fffff" class="e404-button" to="/home">
            <v-icon>mdi-home</v-icon>
             Voltar ao início
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Error404",
};
</script>

<style>
.error404 {
  background-color: #efefef;
}

.e404 {
  background-color: #ff5757;
  width: 800px;
  border-radius: 5px;
  margin: 100px auto;
  padding: 30px;
}

.e404-header{
  color: #ffff;
  text-align: center;
}

.e404 h1{
  font-size: 140px;
}

.e404 h2 {
  font-size: 32pt;
}
.e404 h3 {
  font-size: 16pt;
}

.e404-content{
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-top: 30px;
}



@media only screen and (max-width: 600px) {
  .e404 {
    width: auto;
  }
}
</style>
