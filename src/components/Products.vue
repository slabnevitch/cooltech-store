<template>
  <v-row>
    <v-col class="col-md-6 col-12">
      <h3>Фильтр по цене</h3>
      <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          hide-details
          class="align-center"
          >
          <template v-slot:prepend>
            <v-text-field
            :value="range[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 0, $event)"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
            :value="range[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 1, $event)"
            ></v-text-field>
          </template>
      </v-range-slider>
    </v-col>
    <v-col class="col-md-6 col-12">
      <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
          ></v-text-field>
    </v-col>
  	<v-col class="col-12">
    	<h2 class="text-center">Товары</h2>
      
      <v-data-table
        :headers="header"
        :items="productsToRenderInTable"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
        >       
      </v-data-table>
  	</v-col>
    
  </v-row>

</template>

<script>
export default {
  name: "Products",

  data() {
    return {
      header: [
        {

           value: 'id',
          text: "id",
        },
        {

           value: 'good',
          text: "Название",
        },
        {

           value: 'category',
          text: "Категория",
        },
        {

           value: 'brand',
          text: "Бренд",
        },
        {

           value: 'price',
          text: "Цена",
        },
        {

           value: 'rating',
          text: "Рейтинг",
        }
      ],

      search: '',
       min: 0,
      // max: 90,
      range: [0, 10000],
    };
  },
  computed: {
    categories() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getCategories;
    },
    products() {
      // console.log(this.$store.getters.getCategories);
      return this.$store.getters.getProducts;
    },
    productsFilterByPrice() {
      // console.log(this.$store.getters.getCategories);
      return this.products.filter(prod => parseInt(prod.price) >= this.min && parseInt(prod.price) <= this.range[1]);
    },
    productsToRenderInTable(){
      return this.productsFilterByPrice.map(prod => ({
        id: prod.good_id,
        good: prod.good,
        category: this.categories.find(cat => prod.category_id === cat.id.toString()).category,
        brand: prod.brand,
        price: prod.price,
        rating: prod.rating
      }));
    },
    miny(){
      return this.products.map(prod => parseInt(prod.price));
    },
    max(){
      return Math.max(...this.products.map(prod => parseInt(prod.price)));
    }
  }
};
</script>

<style lang="css" scoped>
</style>