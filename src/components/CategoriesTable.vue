<template>
	<v-col col="12">
		{{categories}}
    	<h2 class="text-center">Категории</h2>
			<v-data-table
		    :headers="header"
		    :items="categories"
		    :items-per-page="10"
		    :search="search"
		    class="elevation-1"
		  >
			    <template v-slot:top
		    		class="d-flex">
			    	<v-spacer></v-spacer>
		        <v-btn
		            color="primary"
		            dark
		            class="mb-2"
		            @click="newItem"
		          >
		            Добавить категорию
		          </v-btn>

				    <v-text-field
				      v-model="search"
				      label="Поиск"
				      class="mx-4"
				    ></v-text-field>
			  </template>
			  <template v-slot:body="{items}">
			  	<tbody>
				  	<tr v-for="(item,index) in items" :key="index">
					  	<td>{{item.cat_id}}</td>
					  	<td>{{item.category}}</td>
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
		  </v-data-table>
		  <v-dialog
			  v-model="editDialog"

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
					  				v-model="editedItem.category"
					  				label="Категория"
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
					<v-card-title class="text-h5">Вы действительно хотите удалить эту категорию?</v-card-title>
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

  name: 'CategoriesTable',

  props: {
  	categories: {
  		type: Array,
  		required: true,
  		default: () => []
  	}
  },

  data () {
    return {
    	header: [
        {
          value: 'cat_id',
          text: "id",
        },
        {
          value: 'category',
          text: "категория",
        },
        { 
        	text: "Действия", 
          value: "controls", 
          sortable: false 
        }
      ],
      search: '',
      editDialog: false,
		dialogDelete: false,
		editedIndex: -1,
		editedItem: {
			cat_id: '',
 			category: ''
		},
		defaultItem: {
			cat_id: '',
 			category: ''
		}
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавление категории' : 'Редактирование категории';
    }
  },
  methods: {
  	editItem (item) {
  		this.editedIndex = this.categories.indexOf(this.categories.find(cat => cat.id === item.id));
  		this.editedItem = Object.assign({}, item)
  		console.log(this.editedItem)
         this.editDialog = true
      },
    newItem(){
    	this.editedItem = Object.assign({}, this.defaultItem)
        this.editDialog = true
    },
    deleteItem (item) {
      this.dialogDelete = true
    },
    closeDelete () {
    	this.dialogDelete = false
    },
    deleteItemConfirm () {
		this.$store.dispatch('deleteCategory', this.editedIndex);
      this.closeDelete()
    },
    close(){
    	this.editDialog = false
    },
	save(){
		if (this.editedIndex > -1) {
			this.$store.dispatch('editCategory', {editedIndex: this.editedIndex, editedItem: this.editedItem});
		} else {
			this.editedItem.cat_id = this.categories.length + 1;
		  this.$store.dispatch('fetchNewCategory', this.editedItem)
		}
		this.close()
	}
  }
}
</script>

<style lang="css" scoped>
</style>