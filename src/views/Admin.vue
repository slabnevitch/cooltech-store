<template>
  <v-app>
  <!-- Must have the app property -->
    <admin-header></admin-header>
   <v-main>
    <v-container>
    <v-row>
      <v-col col="12">
          <!-- <h2>Панель администратора</h2> -->
          </v-btn>
          <v-tabs>
            <v-tab
              v-for="(item, i) in tabs"
              :key="i"
              
              @click="comp = i"
              >{{ item.title }}</v-tab
            >
          </v-tabs>
      </v-col>
    </v-row>
    <keep-alive>
      <component :is="tabs[comp].component"></component>
    </keep-alive>
    
  </v-container>
  </v-main>
</v-app>
  
</template>

<script>
import Products from "@/components/Products";
import Categories from "@/components/Categories";
import Brands from "@/components/Brands";
import AdminHeader from "@/components/AdminHeader";

export default {
  name: "Admin",

  data() {
    return {
      comp: 0,
      tabs: [
        {
          title: "Товары",
          component: "products",
        },
        {
          title: "Категории",
          component: "categories",
        },
        {
          title: "Бренды",
          component: "brands",
        },
      ],
    };
  },
  components: {
    Products,
    Categories,
    Brands,
    AdminHeader
  },
  computed: {
    selectedTab() {
      return this.tabs[this.comp];
    },
    categories() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getCategories;
    },
  },
  async created() {
    await this.$store.dispatch("fetchAllData");
  }
};
</script>

<style lang="css" scoped>
</style>