<template>
  <v-row>
    <v-col class="col-md-6 col-12">
      <pre>{{products}}</pre>
      <h3>Фильтр по цене</h3>
      <div class="d-flex justify-space-between">
        <v-text-field
              :value="range[0]"
              class="mt-0 pt-0 flex-grow-0"
                          single-line
              type="number"
              
              @change="$set(range, 0, $event)"
              ></v-text-field>
        <v-text-field
          :value="range[1]"
          class="mt-0 pt-0 flex-grow-0"
                      single-line
          type="number"
          
          @change="$set(range, 1, $event)"
          ></v-text-field>
      </div>
      <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          class="align-center"
          :key="sliderKey"
          >
      </v-range-slider>
    </v-col>
    <v-col class="col-md-6 col-12">
      <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
          ></v-text-field>
    </v-col>
    <v-col class="col-md-6 col-12">
      <h3>Бренды</h3>
      <v-container fluid>
        <v-row class="light--text">
          <v-col class="d-flex">
           <v-checkbox class="ml-2 mr-2" v-for="(box, i) in bransCheckboxes" :key="i"
              v-model="bransCheckboxes[i].state"
              :label="bransCheckboxes[i].title"
              :value="bransCheckboxes[i].title"
            ></v-checkbox>

          </v-col>
        </v-row>
      </v-container>
    </v-col>
  	<product-table 
      :productsToRenderInTable="checkedByBrands"
      :products="products"
      :categories="categories"
      :search="search"></product-table>
    
  </v-row>

</template>

<script>
  import ProductTable from '@/components/ProductTable'
export default {
  name: "Products",

  data() {
    return {
      bransCheckboxes: [],
      search: '',
      min: 0,
      range: [0, 50000],
      sliderKey: 0
    }
  },
  components: {
    ProductTable
  },
  watch: {
  	products(){
  		console.log('max change! = ' + this.max)
  		this.range[1] = this.max
      this.sliderKey += 1 //принудиткльное обновление слайдера через аттрибут :key
  	}
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    brands() {
      return this.$store.getters.getBrands;
    },
    products() {
      return this.$store.getters.getProducts;
    },
    productsFilterByPrice() {
      return this.products.filter(prod => parseInt(prod.price) >= this.range[0] && parseInt(prod.price) <= this.range[1]);
    },
    checkedByBrands(){
      if(this.bransCheckboxes.some(brand => brand.state)){
        return this.productsFilterByPrice.filter(prod => {
          const checkTrue = this.bransCheckboxes.filter(brand => brand.state)
            .map(brand => brand.title);
          return checkTrue.find(name => name === prod.brand)
        });
      }
      return this.productsFilterByPrice;
    },
    // productsToRenderInTable(){
    //   return this.checkedByBrands.map(prod => ({
    //     id: prod.id,
    //     photo: prod.photo,
    //     good: prod.good,
    //     category_id: prod.category_id,
    //     brand: prod.brand,
    //     price: prod.price,
    //     rating: prod.rating
    //   }));
    // },
    max(){
      return Math.max(...this.products.map(prod => parseInt(prod.price)));
    }
  },
  methods: {
    onButtonClick(item){
      console.log(item)
      this.$router.push('product/' + item.id)
    },
    openImgDialog(item){
      this.dialogContent = item;
      this.dialog = true;
    }
  },
  async created(){
    await this.$store.dispatch("fetchAllData");
    this.bransCheckboxes = await this.$store.getters.getBrands.map(brand => ({
        title: brand.title,
        state: false
      })); 
      this.range = [0, this.max];
  }
};
</script>

<style lang="css" scoped>
</style>