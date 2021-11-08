<template>
	<v-row>
		<v-col col>
			<h4>{{products.find(prod => prod.good_id === $route.params.id).good}}</h4>
			<!-- {{products}} -->
			<!-- {{$store.getters.isAuth}} -->
		</v-col>
	</v-row>
</template>

<script>
export default {

  name: 'Product',

  data () {
    return {
    	// products: []
    }
  },
  computed: {
  	products() {
      return this.$store.getters.getProducts;
    }
  }
}
</script>

<style lang="css" scoped>
</style>