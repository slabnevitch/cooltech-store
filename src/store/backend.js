import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/storage';

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
  	async fetchNewProduct({commit, dispatch}, product){
      console.log(product)
      if(typeof product.photo === 'string'){
    		try{
    			commit('onLoading');
    			const fetchedProduct = await firebase.database().ref(`data/goods`).push(product)
          commit('addNewProduct', product);
          await dispatch('fetchAllData');
    			commit('offLoading');
    		} catch(e){

    			// throw e //пробрасываем ошибку дальше из промиса
    			console.error(e)
    		}
      }else if(typeof product.photo === 'object'){
          commit('onLoading');
        // return dispatch('fetchNewProductWithImg', product); 
        const newProduct = {
          id: product.id,
          good_id: product.good_id,
          good: product.good,
          description: product.description,
          category_id: product.category_id,
          brand: product.brand,
          price: product.price,
          rating: product.rating,
        }
      let imageUrl
      let key
      let ext
      
      const pushResult = firebase.database().ref('data/goods').push(newProduct)
        .then(data => {
          
          key = data.key
          return key
        })
        .then(key => {
          const filename = product.photo.name
          ext = filename.slice(filename.lastIndexOf('.'))
          console.log(key + ext)
          return firebase.storage().ref('goodsImages/' + key + ext).put(product.photo)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then((pathToImg) => {
          return firebase.database().ref('data/goods').child(key).update({photo: pathToImg, id: key, ext})
        })
        .then(async() => {
          commit('addNewProduct', product);
          await dispatch('fetchAllData');
          commit('offLoading');
          return true
        })
        .catch(e => {
          commit('offLoading');
          console.error(e)
        })

      return pushResult
      }
  	},
    async fetchNewProductWithImg({commit, dispatch}, product){
      
    },
    async fetchNewCategory({commit, dispatch}, category){
      console.log(category)
      try{
        commit('onLoading');
        const fetchedCategory = await firebase.database().ref('data/' + category.keyword).push(category.editedItem)
        commit('addNewCategory', category);
        await dispatch('fetchAllData');
        commit('offLoading');
      } catch(e){
        commit('offLoading');

        // throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
    async editProduct({commit, dispatch}, product){
      console.log(product)
      if(typeof product.editedItem.photo === 'string'){
        console.log('string in editProduct')
        try{
          commit('onLoading');
          const fetchedProduct = await firebase.database().ref('data/goods').child(product.editedItem.id).update(product.editedItem)
          console.log(fetchedProduct)
          commit('editCurrentProduct', product);
          // await dispatch('fetchAllData');
          commit('offLoading');
        } catch(e){
          commit('offLoading');

            // throw e //пробрасываем ошибку дальше из промиса
            console.error(e)
          }
        }else if(typeof product.editedItem.photo === 'object'){
          commit('onLoading');
        console.log('object in editProduct')
        const newProduct = {
          id: product.editedItem.id,
          good_id: product.editedItem.good_id,
          good: product.editedItem.good,
          description: product.editedItem.description,
          category_id: product.editedItem.category_id,
          brand: product.editedItem.brand,
          price: product.editedItem.price,
          rating: product.editedItem.rating
        }
        let key = product.editedItem.id
        await firebase.storage().ref('goodsImages').child(key + product.editedItem.ext).getDownloadURL().then(onResolve, onReject);

        function onResolve(foundURL) {
          console.log(foundURL)
        }

        function onReject(error) {
            console.log(error.code);
        };
        await firebase.storage().ref('goodsImages').child(key + product.editedItem.ext).delete();

        const filename = product.editedItem.photo.name,
              ext = filename.slice(filename.lastIndexOf('.'))
      
      const pushResult = firebase.storage().ref('goodsImages/' + key + ext).put(product.editedItem.photo)
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then((pathToImg) => {
          return firebase.database().ref('data/goods').child(key).update({...newProduct, photo: pathToImg, ext})
        })
        .then(async() => {
          commit('editCurrentProduct', product);
          await dispatch('fetchAllData');
          commit('offLoading');
          return true
        })
        .catch(e => {
          commit('offLoading');
          console.error(e)
        })
      }
    },

    async editCategory({commit}, category){
        console.log(category)
       try{
        commit('onLoading');
        const fetchedCategory = firebase.database().ref('data/' + category.keyword).child(category.editedItem.id).update(category.editedItem)
        
        commit('editCurrentCategory', category);
        commit('offLoading');
      } catch(e){

        commit('offLoading');
        // throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
    async removeProduct({commit}, product){
      try{
        commit('onLoading');
        const fetchedProduct = firebase.database().ref('data/goods').child(product.id).remove()
        firebase.storage().ref('goodsImages').child(product.id+'.jpg').delete();
        commit('deleteCurrentProduct', product.ind);
        commit('offLoading');
      } catch(e){
        commit('offLoading');

        // throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
    async removeCategory({commit}, category){
        console.log(category)
       try{
        commit('onLoading');
        const fetchedCategory = firebase.database().ref('data/' + category.keyword).child(category.id).remove()
        
        commit('deleteCurrentCategory', {ind: category.ind, keyword: category.keyword});
        commit('offLoading');
      } catch(e){
        commit('offLoading');

        // throw e //пробрасываем ошибку дальше из промиса
        console.error(e)
      }
    },
  
  },
  getters: {
    getPreloader: state => state.dataLoading
  }
}