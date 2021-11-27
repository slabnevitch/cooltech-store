<template>
  <v-row>
    <categories-table :categories="categories"
      :header="header"
      :keyword="'categories'"></categories-table>
  </v-row>
</template>

<script>
  import CategoriesTable from '@/components/CategoriesTable'
export default {
  name: "Categories",
  
  data() {
    return {
      header: [
        {
          value: 'cat_id',
          text: "id",
        },
        {
          value: 'category',
          text: "категория",
        },
        { 
          text: "Действия", 
          value: "controls", 
          sortable: false 
        }
      ]
    }
  },
  components: {
    CategoriesTable
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