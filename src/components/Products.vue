<template>
	<v-col col="12">
  	<h2 class="text-center">Товары</h2>
		{{products}}
	</v-col>
</template>

<script>
export default {
  name: "Products",

  data() {
    return {};
  },
  computed: {
    products() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getProducts;
    }
  }
};
</script>

<style lang="css" scoped>
</style>