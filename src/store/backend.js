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
  		console.log('async login')
  		try{
  			commit('onLoading');
  			const fetchedProduct= await firebase.database().ref(`data/goods`).push(product)
  			console.log(category)
  			commit('offLoading');
  		} catch(e){

  			throw e //пробрасываем ошибку дальше из промиса
  			console.error(e)
  		}
  	},
    async fetchNewCategory({commit}, category){
      console.log('async login')
      try{
        commit('onLoading');
        const fetchedCategory = await firebase.database().ref(`data/categories`).push(category)
        console.log(fetchedCategory)
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