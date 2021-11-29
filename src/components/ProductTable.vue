<template>
	<v-col class="col-12">
    	<h2 class="text-center">Товары</h2>
      	{{categories}}
        
      <v-data-table
        :headers="header"
        :items="productsToRenderInTable"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
        >
        <template v-slot:top>
          <div class="d-flex">
            <v-spacer> </v-spacer>
          	<v-btn class="success"
          		@click="editItem(defaultItem)">Добавить товар</v-btn>
          </div>
          editedIndex: {{editedIndex}}
        </template>
        <template v-slot:body="{items}">
          <tbody>
            <tr v-for="(item,index) in items" :key="index">
              <td>{{index + 1}}</td>
              <td>
                <a href="#"
                    @click.stop.prevent="openImgDialog(item)" 
                  >
                  <v-img
                      class="mt-2 mb-2"
                      max-height="100"
                      max-width="100"
                      :src="item.photo"
                    ></v-img>
                </a>

              </td>
              <td>
                <h4>{{item.good}}</h4>
                <p>{{item.description}}</p>
              </td>
              <td>
              	<!-- {{categories.find(cat => item.category_id === cat.id.toString()).category}} -->
              		{{category(item)}}
              </td>
              <td>{{brand(item)}}</td>
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
                      @click="editItem(item)"
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
                      @click="deleteItem(item)"
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
              <v-dialog
              v-model="imageDialog"
              >
            
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Изображение товара
              </v-card-title>

              <v-card-text>
                <v-img
                class="mt-2 mb-2"

                :src="dialogContent.photo"
                ></v-img>
                <!-- {{dialogContent.good}} -->
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="primary"
                text
                @click="imageDialog = false"
                >
                Закрыть
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="editDialog"
          
          >
          
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          	<v-card>
            <v-card-title>
              <span class="text-h5">{{formTitle}}</span>
            </v-card-title>
            <div class="text-center" v-if="preloader">
              <v-progress-circular
                indeterminate
                color="primary"
                class="pt-20 pb-20"
              ></v-progress-circular>
            </div>
            <v-card-text v-else>
              <v-container>
                <v-row>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="rules"
                      v-model="editedItem.good"
                      label="Название"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-textarea
                      label="Описание товара"
                      :rules="rules"
                      no-resize
                      rows="3"
                      v-model="editedItem.description"></v-textarea>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-file-input
                      :rules="rules"
                      type="file"
                      accept="image/*"
                      v-model="loadedImg"
                      :label="imageInputPlaceholder"
                    ></v-file-input>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <!-- <v-text-field
                      v-model="editedItem.category"
                      label="Категория"
                    ></v-text-field> -->
                    <v-select
                      :rules="rules"
                      v-model="selectedCategory"
						          :items="categories"
						          item-value="id"
						          item-text="title"
						          label="Категория"
						        ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :rules="rules"
                      v-model="selectedBrand"
                      :items="brands"
                      item-value="id"
                      item-text="title"
                      label="Бренд"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="priceRule"
                      type="number"
                      v-model="editedItem.price"
                      label="Цена"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="ratingRule"
                      type="number"
                      v-model="editedItem.rating"
                      label="Рейтинг"
                    ></v-text-field>
                    <!-- {{selectedCategory}} -->
                    <!-- loadedImg: {{loadedImg}} --> 
                    <!-- editedIndex: {{editedIndex}} -->
                    {{editedItem.category_id}}
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы действительно хотите удалить этот товар?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
  	</v-col>
</template>

<script>
  import firebase from "firebase/app";
  import 'firebase/storage';

export default {

  name: 'ProductTable',
  props: {
  	productsToRenderInTable: {
  		type: Array,
  		require: true,
  		default() {
            return []
        }
  	},
  	products: {
  		type: Array,
  		require: true,
  		default() {
            return []
        }
  	},
  	categories: {
  		type: Array,
  		require: true,
  		default() {
            return []
        }
  	},
    brands: {
      type: Array,
      require: true,
      default() {
            return []
        }
    },
  	search: {
  		type: String,
  		require: true,
  		default: ''
  	}

  },

  data () {
    return {
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
        { text: "Действия", 
          value: "controls", 
          sortable: false 
        }
      ],
      rules: [
        value => !!value || 'Обязательное поле'
        
      ],
      validateImgInput: [
        value => (value !== null && value !== '') || 'Обязательное поле'
        // value => !value || 'required'
      ],
      priceRule: [
        value => !!value || 'Обязательное поле',
        value => (value >= 0) || 'Цена товара не может быть меньше 0',
      ],
      ratingRule: [
        value => !!value || 'Обязательное поле',
        value => (value >= 0 && value < 6) || 'Значение рейтинга должно быть в пределах 0 - 5',
      ],
      valid: true,
      dialogContent: {
        photo: 'null'
      },
      imageDialog: false,
      editDialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        good_id: '',
        photo: '',
        good: '',
        description: '',
        category_id: '',
        brand_id: '',
    		price: '',
    		rating: '',
        ext: ''
      },
      defaultItem: {
        id: '',
        good_id: '',
        photo: '',
        good: '',
        description: '',
        category_id: '',
        brand_id: '',
    		price: '',
    		rating: '',
        ext: ''
      },
      selectedCategory: 0,
      selectedBrand: 0,
      loadedImg: null
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавление товара' : 'Редактирование товара'
      },
      imageInputPlaceholder(){
        return this.editedIndex === -1 ? 'Добавить изображение товара' : 'Изменить изображение товара' || 'required'
      },
      preloader(){
        return this.$store.getters.getPreloader
      }
    },
  methods: {
    validate () {
      console.log('validate') 
      return this.$refs.form.validate()
    },
    category(item){
    	return this.categories.find(cat => item.category_id === cat.id.toString()) ? this.categories.find(cat => item.category_id === cat.id.toString()).title : '';
    },
    brand(item){
      return this.brands.find(brand => item.brand_id === brand.id.toString()) ? this.brands.find(brand => item.brand_id === brand.id.toString()).title : '';
    },
    onButtonClick(item){
      // this.$router.push('product/' + item.id)
      this.editDialog = true;
    },
    openImgDialog(item){
      this.dialogContent = item;
      this.imageDialog = true;
    },
    editItem (item) {

        this.editedIndex = this.products.indexOf(this.products.find(prod => prod.good === item.good));

        this.editedItem = Object.assign({}, item)
        console.log(typeof this.editedItem.photo )
        this.loadedImg = this.editedItem.photo 
        console.log(this.loadedImg )

        this.selectedCategory = this.categories.find(cat => cat.id === this.editedItem.category_id) ? this.categories.find(cat => cat.id === this.editedItem.category_id).id : '';
        this.editDialog = true
        // this.$refs.form.resetValidation()
      },
    deleteItem (item) {
      this.editedIndex = this.products.indexOf(this.products.find(prod => prod.good === item.good));
      this.editedItem = Object.assign({}, item)
      console.log(this.editedIndex)
      console.log(this.products)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    closeDelete () {
    	this.dialogDelete = false
    	this.$nextTick(() => {
    		this.editedItem = Object.assign({}, this.defaultItem)
    		this.editedIndex = -1
    	})
    },
    deleteItemConfirm () {

      this.$store.dispatch('removeProduct', {ind: this.editedIndex, id: this.editedItem.id});
      this.closeDelete()
    },
    close(){
      this.$refs.form.resetValidation()
    	this.editDialog = false
      
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.loadedImg = null
      })
    },
		async save(){
      if(!this.validate()){
        // this.$nextTick(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // })
        return
      } 
			this.editedItem.category_id = this.selectedCategory.toString();
      this.editedItem.brand = this.selectedBrand.toString();
      if(typeof this.loadedImg === 'object'){
        this.editedItem.photo = this.loadedImg
      }
      console.log(typeof this.editedItem.photo )
			if (this.editedIndex > -1) {

            console.log('editedIndex > -1' )
	          this.$store.dispatch('editProduct', {editedIndex: this.editedIndex, editedItem: this.editedItem});
        } else {
            console.log('editedIndex <= -1' )
      		this.editedItem.good_id = (this.products.length + 1).toString()
          await this.$store.dispatch('fetchNewProduct', this.editedItem)
        }
        
        this.close()
		}
	}
}
</script>

<style lang="css" scoped>
</style>