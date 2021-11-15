<template>
  <v-row>
    <categories-table :categories="categories"></categories-table>
  </v-row>
</template>

<script>
  import CategoriesTable from '@/components/CategoriesTable'
export default {
  name: "Categories",
  
  data() {
    return {
      
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