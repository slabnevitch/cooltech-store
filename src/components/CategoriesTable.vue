<template>
	<v-col col="12">
		<!-- {{categories}} -->
		{{keyword}}
    	<h2 class="text-center" style="text-transform: capitalize">{{titleKeys[keyword][0]}}</h2>
			<v-data-table
		    :headers="header"
		    :items="categories"
		    :items-per-page="10"
		    :search="search"
		    class="elevation-1"
		  >
			    <template v-slot:top>
		    		editedIndex: {{editedIndex}}
		    		<div class="d-flex">
				    	<v-spacer></v-spacer>
			        <v-btn
			            color="primary"
			            dark
			            class="mb-2"
			            @click="newItem"
			          >
			            Добавить {{titleKeys[keyword][2]}}
			          </v-btn>
		    			
		    		</div>

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
					  	<td>{{item.title}}</td>
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
			  <v-form ref="form">
				  <v-card >
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
						  				v-model="editedItem.title"
						  				:label="titleKeys[keyword][3]"
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
			  	
			  </v-form>
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
  	},
	header: {
  		type: Array,
  		required: true,
  		default: () => []
  	},
  	keyword: {
  		type: String,
  		required: true
  	}
  },

  data () {
  	return {
  		titleKeys: {
  			categories: ['категории', 'категории', 'категорию', 'категория'],
  			brands: ['бренды', 'бренда', 'бренд', 'бренд']
  		},
  		search: '',
  		editDialog: false,
  		dialogDelete: false,
  		editedIndex: -1,
  		editedItem: {
  			id: '',
  			cat_id: '',
  			title: ''
  		},
  		defaultItem: {
  			id: '',
  			cat_id: '',
  			title: ''
  		},
  		rules: [
  			value => !!value || 'Обязательное поле'
  		]
  	}
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавление ' + this.titleKeys[this.keyword][1] : 'Редактирование ' + this.titleKeys[this.keyword][1];
    },
    preloader(){
    	return this.$store.getters.getPreloader
    }
  },
  methods: {
  	editItem (item) {
  		this.editedIndex = this.categories.indexOf(this.categories.find(cat => cat.id === item.id));
  		this.editedItem = Object.assign({}, item)
  		console.log(this.editedItem)
         this.editDialog = true
  		this.$refs.form.resetValidation()
      },
    newItem(){
    	this.editedItem = Object.assign({}, this.defaultItem)
        this.editDialog = true
    },
    deleteItem (item) {
    	this.editedIndex = this.categories.indexOf(this.categories.find(cat => cat.id === item.id));
    	this.editedItem = Object.assign({}, item)
  		console.log(item)

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
		this.$store.dispatch('removeCategory', {id: this.editedItem.id, ind: this.editedIndex, keyword: this.keyword});
      this.closeDelete()
    },
    close(){
    	this.$refs.form.resetValidation()
    	this.editDialog = false
    	this.$nextTick(() => {
    		this.editedItem = Object.assign({}, this.defaultItem)
    		this.editedIndex = -1
    	})
    },
	save(){
		if(!this.$refs.form.validate()){
			return
		}

		if (this.editedIndex > -1) {
  		console.log("при добавлении категории срабатывает if!")
			this.$store.dispatch('editCategory', {editedIndex: this.editedIndex, editedItem: this.editedItem, keyword: this.keyword});
		} else {
			this.editedItem.cat_id = this.categories.length + 1;
		  this.$store.dispatch('fetchNewCategory', {editedItem: this.editedItem, keyword: this.keyword})
		}
		this.close()
	}
  }
}
</script>

<style lang="css" scoped>
</style>