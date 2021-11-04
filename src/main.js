import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import vuetify from "@/plugins/vuetify";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3O5sLFic-DhPWrxOtOnEdRwmpMm4ccRU",
  authDomain: "podcast--app-43aa6.firebaseapp.com",
  databaseURL: "https://podcast--app-43aa6.firebaseio.com",
  projectId: "podcast--app-43aa6",
  storageBucket: "podcast--app-43aa6.appspot.com",
  messagingSenderId: "427653917967",
  appId: "1:427653917967:web:bcf833b9e1c47745fd227a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  store,
  router,
  vuetify,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged!')
      if(user) {
        this.$store.dispatch("stateChange", user);
      }
    });
  },
  render: (h) => h(App)
}).$mount("#app");
