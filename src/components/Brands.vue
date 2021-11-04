<template>
	<v-col col="12">
  	<h2 class="text-center">Бренды</h2>
		<pre>{{brands}}</pre>
	</v-col>
	</div>
</template>

<script>
export default {
  name: "Brands",

  data() {
    return {};
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