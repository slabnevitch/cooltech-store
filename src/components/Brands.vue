<template>
  <v-row>
  	<v-col col="12">
    	<h2 class="text-center">Бренды</h2>
      <v-data-table
        :headers="header"
        :items="brands"
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
	</div>
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