<template>
  <v-app>
    <div id="app" :class="{ 'hide-menu': !user }">
      <Menu />
      <Loading v-if="validatingToken" />
      <!-- <Content v-else /> -->
      <Footer />
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Loading from "@/components/template/Loading";

export default {
  name: "App",
  components: { Menu, Content, Footer, Loading },
  computed: mapState(["user"]),
  data: function () {
    return {
      validatingToken: true,
      json: null,
      userData: null,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      this.json = localStorage.getItem(userKey);
      this.userData = JSON.parse(this.json);
      this.$store.commit("setUser", null);

      if (!this.userData) {
        this.validatingToken = false;
        this.$router.push({ path: "/auth" });
        return;
      }

      const res = await axios.post(
        `${baseApiUrl}/validateToken`,
        this.userData
      );

      console.log(res.userData)

      if (res.data) {
        this.$store.commit("setUser", this.userData);
        this.$root.$emit("user-updated");
        this.$root.$emit("carousel-get");
        this.$root.$emit("metas-by-id");
        this.$root.$emit("metas-objetivos");
        this.$root.$emit("ong-by-id");
        this.$root.$emit("animal-by-id");
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>
