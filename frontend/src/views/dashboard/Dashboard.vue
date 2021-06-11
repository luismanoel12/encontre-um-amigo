<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>

  <v-container v-else>
    <div class="dashboard-page-title">
      <h1>DADOS BRUTOS</h1>
    </div>
    <div class="dashboard-1">
      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Usuários Cadastrados</h2>
          <span class="mdi mdi-account-multiple mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.usersCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Publicações</h2>
          <span class="mdi mdi-newspaper-variant-outline mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.publicacoesCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">ONGs Cadastrados</h2>
          <span class="mdi mdi-account-group mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.ongsCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Animais Cadastrados</h2>
          <span class="mdi mdi-dog-side mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.animaisCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Animais Adotados</h2>
          <span class="mdi mdi-dog-side mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.animaisAdotadosCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Animais Desaparecidos</h2>
          <span class="mdi mdi-dog-side mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.animaisDesaparecidosCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Metas de Doações Cadastradas</h2>
          <span class="mdi mdi-bullseye-arrow mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.metasCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias</h2>
          <span class="mdi mdi-alert mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.denunciasCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias Abertas</h2>
          <span class="mdi mdi-alert mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.denunciasAbertasCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias Finalizadas</h2>
          <span class="mdi mdi-alert-plus mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>{{ count.denunciasFinalizadasCount }}</h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Tipos de Usuários</h2>
          <span class="mdi mdi-account mdi-48px"></span>
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

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Principais interações</h2>
          <span class="mdi mdi-cursor-default-click mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <apexchart
            type="pie"
            width="380"
            :options="chartOptions2"
            :series="series2"
          ></apexchart>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias</h2>
          <span class="mdi mdi-alert mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <apexchart
            type="pie"
            width="380"
            :options="chartOptions3"
            :series="series3"
          ></apexchart>
        </div>
      </div>
    </div>

    <div class="dashboard-page-title">
      <h1>DADOS DOS ÚLTIMOS 7 DIAS</h1>
    </div>

    <div class="dashboard-2">
      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Usuários Cadastrados</h2>
          <span class="mdi mdi-account-multiple mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.usersCountWeek ? countLastWeek.usersCountWeek : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">ONGs Cadastradas</h2>
          <span class="mdi mdi-account-group mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{ countLastWeek.ongsCountWeek ? countLastWeek.ongsCountWeek : 0 }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Publicações</h2>
          <span class="mdi mdi-newspaper-variant-outline mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.publicacoesCountWeek
                ? countLastWeek.publicacoesCountWeek
                : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Animais Cadastrados</h2>
          <span class="mdi mdi-dog-side mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.animaisCountWeek
                ? countLastWeek.animaisCountWeek
                : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Animais Adotados</h2>
          <span class="mdi mdi-dog-side mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.animaisAdotadosCountWeek
                ? countLastWeek.animaisAdotadosCountWeek
                : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Animais Desaparecidos</h2>
          <span class="mdi mdi-dog-side mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.animaisDesaparecidosCountWeek
                ? countLastWeek.animaisDesaparecidosCountWeek
                : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Metas de Doações</h2>
          <span class="mdi mdi-bullseye-arrow mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.metasCountWeek ? countLastWeek.metasCountWeek : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias</h2>
          <span class="mdi mdi-alert mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.denunciasCountWeek
                ? countLastWeek.denunciasCountWeek
                : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias Abertas</h2>
          <span class="mdi mdi-alert mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <h1>
            {{
              countLastWeek.denunciasCountWeek
                ? countLastWeek.denunciasCountWeek
                : 0
            }}
          </h1>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Tipos de Usuários</h2>
          <span class="mdi mdi-account mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <apexchart
            type="pie"
            width="380"
            :options="chartOptions4"
            :series="series4"
          ></apexchart>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Principais interações</h2>
          <span class="mdi mdi-cursor-default-click mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <apexchart
            type="pie"
            width="380"
            :options="chartOptions5"
            :series="series5"
          ></apexchart>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-card-header">
          <h2 class="card-title-v1">Denúncias</h2>
          <span class="mdi mdi-alert mdi-48px"></span>
        </div>
        <v-divider></v-divider>
        <div class="dashboard-card-content">
          <apexchart
            type="pie"
            width="380"
            :options="chartOptions6"
            :series="series6"
          ></apexchart>
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
                <img :src="admin.userImage" alt="" v-if="admin.userImage" />
                <Gravatar :email="admin.email" :alt="admin.name" v-else />
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
      countLastWeek: [],
      loading: true,

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

      series2: [0, 0, 0],
      chartOptions2: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Publicações", "Animais", "Metas"],
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

      series3: [0, 0, 0],
      chartOptions3: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Abertas", "Finalizadas", "Total"],
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

      series4: [0, 0, 0],
      chartOptions4: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Usuários", "ONGs"],
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

      series5: [0, 0, 0],
      chartOptions5: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Publicações", "Animais", "Metas"],
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

      series6: [0, 0, 0],
      chartOptions6: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Abertas", "Finalizadas", "Total"],
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
        this.series = [
          res.data.adminsCount,
          res.data.ongsCount,
          res.data.tutoresCount,
        ];

        this.series2 = [
          res.data.publicacoesCount,
          res.data.animaisCount,
          res.data.metasCount,
        ];

        this.series3 = [
          res.data.denunciasAbertasCount,
          res.data.denunciasFinalizadasCount,
          res.data.denunciasCount,
        ];

         this.loading = false;
      });
    },

    getCountLastWeek() {
      api(`/getCountLastWeek`).then((res) => {
        this.countLastWeek = res.data;
        this.series4 = [res.data.usersWeekCount, res.data.ongsCountWeek];

        this.series5 = [
          res.data.publicacoesCountWeek,
          res.data.animaisCountWeek,
          res.data.metasCountWeek,
        ];

        this.series6 = [
          res.data.denunciasAbertasCountWeek,
          res.data.denunciasFinalizadasCountWeek,
          res.data.denunciasCountWeek,
        ];
      });
    },
  },

  mounted() {
    this.getAdmins();
    this.getCount();
    this.getCountLastWeek();
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
  background: linear-gradient(110deg, #036564 65%, #00171f 35%);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
}

.dashboard-page-title > h1 {
  color: #fff !important;
}

.dashboard-card {
  background-color: #fff;
  padding: 10px;
  width: 400px;
  border-left: 3px solid #2a9d8f;
  border-radius: 5px;
  margin-left: 50px;
  margin-top: 20px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.dashboard-card-header {
  text-align: center;
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

.card-title-v1 {
  color: #2a9d8f;
}

@media only screen and (max-width: 600px) {
  .dashboard-card {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>