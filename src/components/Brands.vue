<template>
  <v-row>
    <categories-table :categories="brands"
      :header="header"
      :keyword="'brands'"></categories-table>
  </v-row>
</template>

<script>
  import CategoriesTable from '@/components/CategoriesTable'
export default {
  name: "Brands",
  components: {
    CategoriesTable
  },
  data() {
    return {
      header: [
        {

           value: 'id',
          text: "id",
        },
        {

           value: 'brand',
          text: "Бренд",
        }

      ],
      search: ''
    };
  },
  computed: {
    brands() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getBrands;
    }
  }
};
</script>

<style lang="css" scoped>
</style>