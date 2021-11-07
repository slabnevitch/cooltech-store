<template>
  <v-row>
  	<v-col col="12">
    	<h2 class="text-center">Категории</h2>
    	  <v-data-table
              :headers="header"
              :items="categories"
              :items-per-page="10"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-4"
              ></v-text-field>
            </template>
            </v-data-table>
  	</v-col>
  </v-row>
</template>

<script>
export default {
  name: "Categories",
  
  data() {
    return {
      header: [
        {

           value: 'id',
          text: "id",
        },
        {

           value: 'category',
          text: "категория",
        }

      ],
      search: ''
    };
  },
  computed: {
    categories() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getCategories;
    }
    // header() {
    //   // console.log(this.$store.getters.getCategories);
    //   console.log(Object.fromEntries(this.$store.getters.getCategories))
    //   return Object.fromEntries(this.$store.getters.getCategories);
    // }
  }
};
</script>

<style lang="css" scoped>
</style>