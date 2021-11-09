<template>
  <v-app>
    <admin-header></admin-header>
    <v-main>
      <v-container>
      	<v-row>
      		<v-col col>
      			<h4>{{products.find(prod => prod.good_id === $route.params.id).good}}</h4>
      			<!-- {{products}} -->
      			<!-- {{$store.getters.isAuth}} -->
      		</v-col>
      	</v-row>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import AdminHeader from '@/components/AdminHeader'
export default {

  name: 'Product',

  data () {
    return {
    	// products: []
    }
  },
  components: {
    AdminHeader
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