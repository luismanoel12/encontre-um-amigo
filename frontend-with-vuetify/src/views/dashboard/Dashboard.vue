<template>
  <v-container>
    <div class="dashboard-page-title">
      <h1>DADOS BRUTOS</h1>
    </div>
    <div class="dashboard-1">
      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Usuários Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.usersCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Animais Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.animaisCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>ONGs Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.ongsCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Publicações</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.publicacoesCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2>Doaçoes com Metas Cadastrados</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.metasCount }}</h1>
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
          <h2>Tipos de Usuários</h2>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <apexchart
            type="pie"
            width="380"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>

      
    </div>

    <div class="dashboard-page-title">
      <h1>DADOS DO MÊS</h1>
    </div>

    <div class="dashboard-2">
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

    <div class="dashboard-page-title">
      <h1>ADMINISTRADORES</h1>
    </div>

    <div class="dashboard-3">
      <v-row>
        <v-col cols="12" sm="4" v-for="admin in admins" :key="admin.id">
          <v-card class="admin-card" color="#34a0a4" elevation="10" dark>
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-2 avatar-img" size="100" tile>
                <Gravatar :email="admin.email" :alt="admin.name" />
              </v-avatar>
              <v-divider class="divider-avatar" vertical></v-divider>
              <div>
                <v-card-title class="headline text-center">
                  {{ admin.name }}
                </v-card-title>

                <div class="card-content">
                  <p>
                    <span
                      >E-mail: <strong>{{ admin.email }}</strong>
                    </span>
                  </p>
                  <p>
                    <span
                      >Telefone: <strong>{{ admin.telefone }}</strong>
                    </span>
                  </p>
                </div>

                <v-card-actions> </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import api from "../../config/api";
import Gravatar from "vue-gravatar";

export default {
  name: "Dashboard",
  components: { Gravatar },
  data: function () {
    return {
      admins: [],
      count: [],

      series: [0, 0, 0],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Admin", "ONG", "Usuário"],
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                width: 350,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },

  methods: {
    getAdmins() {
      api(`/getAdmins`).then((res) => {
        this.admins = res.data;
      });
    },

    getCount() {
      api(`/getCount`).then((res) => {
        this.count = res.data;
        console.log(this.count)
        this.series = [
          res.data.adminsCount,
          res.data.ongsCount,
          res.data.tutoresCount,
        ];
      });
    },

  },
  watch: {
    $route(to) {
      this.admins = [];

      this.getAdmins();
      this.getCount();
    },
  },
  mounted() {

    this.getAdmins();
    this.getCount();
  },
};
</script>

<style scoped>
.dashboard-1 {
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  flex-wrap: wrap;
}

.dashboard-2 {
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  flex-wrap: wrap;
}

.dashboard-3 {
  padding: 20px;
}

.dashboard-page-title {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.dashboard-card {
  background-color: #fff;
  padding: 10px;
  width: 400px;
  border-left: 3px solid #2a9d8f;
  border-radius: 5px;
  margin-left: 50px;
  margin-top: 20px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
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

.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  padding: 0px !important;
}

.divider-avatar {
  background-color: #fff;
}

.card-content {
  padding: 10px;
}

.admin-card {
  word-break: break-all;
}

.chart {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  .dashboard-card {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>