<template>
  <v-app>
    <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
      <Menu />
      <Loading v-if="validatingToken" />
      <!-- <Content v-else /> -->
      <HelpButton />
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
import HelpButton from "@/components/template/HelpButton";
import Loading from "@/components/template/Loading";

export default {
  name: "App",
  components: { Menu, Content, Footer, Loading, HelpButton },
  computed: mapState(["isMenuVisible", "user"]),
  data: function () {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
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
