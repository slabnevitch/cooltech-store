<template>
	<v-col col="12">
  	<h2 class="text-center">Категории</h2>
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
  			</tbody>
  		</template>
  	</v-simple-table>
	</v-col>
</template>

<script>
export default {
  name: "Categories",
  // props: {
  // 	categories: {
  // 		type: Object,
  // 		default: {},
  // 		require: true
  // 	}
  // }
  data() {
    return {};
  },
  computed: {
    categories() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getCategories;
    }
  }
};
</script>

<style lang="css" scoped>
</style>