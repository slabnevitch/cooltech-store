<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Catalog from "./views/Catalog";

export default {
  name: "App",
  components: {
    Catalog
  },
  async created() {
    await this.$store.dispatch("fetchAllData");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
