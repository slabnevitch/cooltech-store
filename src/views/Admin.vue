<template>
  <v-app>
  <!-- Must have the app property -->
    <admin-header></admin-header>
   <v-main>
    <v-container>
    <v-row>
      <v-col
        col="12">
          <!-- <h2>Панель администратора</h2> -->
          </v-btn>
          <v-tabs :v-model="tabs[comp]">
            <v-tab
              v-for="(item, i) in tabs"
              :key="i"
              
              @click="comp = i"
              >{{ item.title }}</v-tab
            >
          </v-tabs>
          <keep-alive>
            <component :is="tabs[comp].component"></component>
          </keep-alive>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">id</th>
                  <th class="text-left">Категория</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in categories">
                  <td>{{ item.id }}</td>
                  <td>{{ item.category }}</td>
                </tr>
                <tr>
                  <td colspan="2">{{ categories.lenght }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
    </v-row>
    
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
      comp: 2,
      tabs: [
        {
          title: "Категории",
          component: "categories",
        },
        {
          title: "Бренды",
          component: "brands",
        },
        {
          title: "Товары",
          component: "products",
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
    auth(){
      return this.$store.getters.isAuth;
    },
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