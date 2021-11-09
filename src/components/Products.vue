<template>
  <v-row>
    <v-col class="col-md-6 col-12">
      <h3>Фильтр по цене</h3>
      <div class="d-flex justify-space-between">
        <v-text-field
              :value="range[0]"
              class="mt-0 pt-0 flex-grow-0"
                          single-line
              type="number"
              style="width: 60px"
              @change="$set(range, 0, $event)"
              ></v-text-field>
        <v-text-field
          :value="range[1]"
          class="mt-0 pt-0 flex-grow-0"
                      single-line
          type="number"
          style="width: 60px"
          @change="$set(range, 1, $event)"
          ></v-text-field>
        
      </div>
      <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          hide-details
          class="align-center"
          >
          <template v-slot:prepend>
            
          </template>
          <template v-slot:append>
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
            <!-- {{bransCheckboxes}}
            <p></p>
            {{checkedByBrands}} -->
        </v-row>
      </v-container>
    </v-col>
    <v-col class="col-md-6 col-12 text-right">
      <v-btn class="success">Добавить товар</v-btn>
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
        <template v-slot:body="{items}">
          <tbody>
            <tr v-for="(item,index) in items" :key="index">
              <td>{{item.id}}</td>
              <td>
                <v-img
                  class="mt-2 mb-2"
                  max-height="100"
                  max-width="100"
                  :src="item.photo"
                ></v-img>
              </td>
              <td>{{item.good}}</td>
              <td>{{item.category}}</td>
              <td>{{item.brand}}</td>
              <td>{{item.price}}</td>
              <td>{{item.rating}}</td>
              <td>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      small
                      fab
                      dark
                      color="cyan"
                      @click="onButtonClick(item)"
                      v-bind="attrs"
                      v-on="on"
                       >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>

                  </template>
                  <span>Редактировать</span>
                </v-tooltip>

                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      small
                      fab
                      dark
                      color="red"
                      @click="onButtonClick(item)"
                      v-bind="attrs"
                      v-on="on"
                      >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
                    </v-btn>

                  </template>
                  <span>Удалить</span>
                </v-tooltip>
              </td>
            </tr>
           </tbody>
        </template>
        <!-- <template v-slot:item.controls="props">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                fab
                dark
                color="cyan"
                @click="onButtonClick(props.item)"
                v-bind="attrs"
                v-on="on"
                >
                <v-icon dark>
                  mdi-pencil
                </v-icon>
            </v-btn>

          </template>
          <span>Редактировать</span>
        </v-tooltip>
        <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                fab
                dark
                color="red"
                @click="onButtonClick(props.item)"
                v-bind="attrs"
                v-on="on"
                >
                <v-icon dark>
                  mdi-delete
                </v-icon>
            </v-btn>

          </template>
          <span>Удалить</span>
        </v-tooltip>
      </template>    -->    
      </v-data-table>
  	</v-col>
    
  </v-row>

</template>

<script>
export default {
  name: "Products",

  data() {
    return {
      bransCheckboxes: [],
      header: [
        {

           value: 'id',
          text: "id",
        },
        {

           value: 'photo',
          text: "Изображение",
          sortable: false
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
        },
        { text: "Действия", value: "controls", sortable: false }
      ],

      search: '',
       min: 0,
      // max: 90,
      range: [0, 10000],
    };
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
    productsToRenderInTable(){
      return this.checkedByBrands.map(prod => ({
        id: prod.good_id,
        photo: prod.photo,
        good: prod.good,
        category: this.categories.find(cat => prod.category_id === cat.id.toString()).category,
        brand: prod.brand,
        price: prod.price,
        rating: prod.rating
      }));
    },
    max(){
      return Math.max(...this.products.map(prod => parseInt(prod.price)));
    }
  },
  methods: {
    onButtonClick(item){
      console.log(item)
      this.$router.push('product/' + item.id)
    }
  },
  async created(){
    this.bransCheckboxes = await this.$store.getters.getBrands.map(brand => ({
        title: brand.brand,
        state: false
      })); 
  }
};
</script>

<style lang="css" scoped>
</style>