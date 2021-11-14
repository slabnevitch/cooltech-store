<template>
	<v-col class="col-12">
    	<h2 class="text-center">Товары</h2>
      	<!-- {{products}} -->
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
              width="500"
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
                {{dialogContent.good}}
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
          max-width="500px"
          >
          	<v-card>
            <v-card-title>
              <span class="text-h5">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.good"
                      label="Название"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.category"
                      label="Категория"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.brand"
                      label="Бренд"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
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
                      v-model="editedItem.rating"
                      label="Рейтинг"
                    ></v-text-field>
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
      dialogContent: {
        photo: 'null'
      },
      imageDialog: false,
      editDialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        photo: '',
        good: '',
        category: '',
        brand: '',
		price: '0',
		rating: '0',
      },
      defaultItem: {
        id: '',
        photo: '',
        good: 0,
        category: 0,
        brand: '',
		price: '0',
		rating: '0',
      }
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавление товара' : 'Редактирование товара'
      },
    },
  methods: {
	    onButtonClick(item){
	      console.log(item)
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
	        this.editDialog = true
        },
        deleteItem (item) {
	        this.editedIndex = this.products.indexOf(this.products.find(prod => prod.good === item.good));
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
	        this.$store.dispatch('deleteProduct', this.editedIndex);
	        this.closeDelete()
	      },
        close(){
        	this.editDialog = false
        },
		save(){
			if (this.editedIndex > -1) {
	          this.$store.dispatch('editProduct', {editedIndex: this.editedIndex, editedItem: this.editedItem});
	        } else {
	          // this.desserts.push(this.editedItem)
	        }
	        this.close()
		}
	}
}
</script>

<style lang="css" scoped>
</style>