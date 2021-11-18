import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default{
  state: {
  	dataLoading: false
  },
  mutations: {
  	onLoading(state){
  		state.dataLoading = true
  	},
  	offLoading(state){
  		state.dataLoading = false
  	}
  },
  actions: {
  	async fetchNewProduct({commit}, product){

  		try{
  			commit('onLoading');
  			const fetchedProduct = await firebase.database().ref(`data/goods`).push(product)
        commit('addNewProduct', product);
  			commit('offLoading');
  		} catch(e){

  			throw e //пробрасываем ошибку дальше из промиса
  			console.error(e)
  		}
  	},
    async fetchNewCategory({commit}, category){
      console.log(category)
      try{
        commit('onLoading');
        const fetchedCategory = await firebase.database().ref(`data/categories`).push(category)
        commit('addNewCategory', category);
        commit('offLoading');
      } catch(e){

        throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
    async editProduct({commit}, product){
        console.log(product.editedItem.id)

      try{
        commit('onLoading');
        const fetchedProduct = firebase.database().ref('data/goods').child(product.editedItem.id).update(product.editedItem)
        console.log(fetchedProduct)
        commit('editCurrentProduct', product);
        commit('offLoading');
      } catch(e){

        throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },

    async editCategory({commit}, category){
       try{
        commit('onLoading');
        const fetchedCategory = firebase.database().ref('data/categories').child(category.editedItem.id).update(category.editedItem)
        
        commit('editCurrentCategory', category);
        commit('offLoading');
      } catch(e){

        throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
    async removeProduct({commit}, product){
        console.log(product)

      try{
        commit('onLoading');
        // const fetchedProduct = firebase.database().ref('data/goods').child(product.editedItem.id).remove()
        console.log(fetchedProduct)
        // commit('deleteCurrentProduct', index);
        commit('offLoading');
      } catch(e){

        throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
  
  },
  getters: {

  }
}