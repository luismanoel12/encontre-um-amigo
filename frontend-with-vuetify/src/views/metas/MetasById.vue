<template>
  <!-- <v-container>

  </v-container> -->

  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-sheet min-height="70vh" rounded="lg">

            <div class="view-page">
              <div class="metas-view">
                <div class="view-header">
                  <img
                    v-if="meta.imageUrl"
                    :src="meta.imageUrl"
                    height="400"
                    width="700"
                    alt="Article"
                  />
                  <img
                    v-else
                    src="@/assets/article.png"
                    height="800"
                    width="800"
                    alt="Article"
                  />
                  <h3>{{ meta.titulo }}</h3>
                </div>
                <div class="view-content"></div>
              </div>
            </div>

          </v-sheet>
        </v-col>

        <v-col cols="12" sm="2">
          <v-sheet rounded="lg" min-height="268">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import api from "../../config/api";

export default {
  name: "MetasById",
  data: function () {
    return {
      meta: {},
    };
  },
  methods: {
    async loadMeta() {
      const url = `/metas/${this.$route.params.id}`;
      await api.get(url).then((res) => (this.meta = res.data));
    },
  },
  mounted() {
    this.loadMeta();
    this.$root.$once("user-updated", () => {
      this.loadMeta();
    });
  },
};
</script>

<style>

.view-page{
    padding: 30px;
}

</style>