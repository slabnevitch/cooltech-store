<template>
  <v-row>
    <categories-table :categories="brands"
      :header="header"
      :keyword="'brands'"></categories-table>
  </v-row>
</template>

<script>
export default {
  name: "Brands",

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