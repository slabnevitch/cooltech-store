import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import backend from './backend'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: [],
    brands: [],
    categories: [],
    user: {
      isAuthentificated: false,
      uid: null
    }
  },
  mutations: {
    setAllData(state, payload) {
       state.categories = Object.keys(payload.categories).map(key => ({...payload.categories[key], id: key})) ;
      state.brands = payload.brands;
      state.products = Object.keys(payload.goods).map(key => ({...payload.goods[key], good_id: key}));
    },
    setUser(state, userId) {
      state.user.isAuthentificated = true;
      state.user.uid = userId;
    },
    unsetUser(state){
      state.user.isAuthentificated = false,
      state.user.uid = null
    },
    editCurrentProduct(state, payload){
      Object.assign(state.products[payload.editedIndex], payload.editedItem)
    },
    editCurrentCategory(state, payload){
      Object.assign(state.categories[payload.editedIndex], payload.editedItem)
    },
    deleteCurrentProduct(state, payload){
      state.products.splice(payload, 1)
    },
    deleteCurrentCategory(state, payload){
      state.categories.splice(payload, 1)
    },
    addNewCategory(state, payload){
      state.categories.push(payload)
    },
    addNewProduct(state, payload){
      state.products.push(payload)
    }
  },
  actions: {
    stateChange({ commit }, payload) {
      if (payload) {
        commit("setUser", payload.uid);
      } else {
        commit("unsetUser");
      }
    },
    async signOut({commit}){
      const res = await firebase.auth().signOut();
      commit('unsetUser');
    },
    async fetchAllData({ commit }) {
      try {
        const info = (await firebase.database().ref(`data`).once("value")).val();
        commit("setAllData", info);
      } catch (e) {
        console.log(e);
      }
    },
    async signIn({ commit }, user) {
      // ctx.commit('setProcessing', true) //устанавливаем processing = true для блокировки кнопки на время запроса к серверу

     return await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((objUser) => {
          // console.log(objUser.user.uid)
          // ctx.commit('setUser', objUser.uid) //не надо вызывать setUser, т.к. он автоматически вызывается
          // в stateChange() при каждом срабатывании firebase.auth().onAuthStateChanged()
          // ctx.commit("setProcessing", false);
          return objUser.user;
        })
        .catch(function (error) {
          // ctx.commit('setProcessing', false)

          console.log(error);
          var errorCode = error.code;
          var errorMessage = error.message;

          // ctx.commit('setError', errorMessage)
          // ...
        });
    },

    
    deleteProduct({commit}, index){
      commit('deleteCurrentProduct', index);
    },
    deleteCategory({commit}, index){
      commit('deleteCurrentCategory', index);
    },
    addProduct({commit}, prod){
      console.log(prod)
      commit('addNewProduct', prod);
    }
  },
  getters: {
    getProducts: (state) => state.products,
    getBrands: (state) => state.brands,
    getCategories: (state) => state.categories,
    isAuth: (state) => state.user.isAuthentificated
  },
  modules: {
    backend
  }
});
