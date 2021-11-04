<template>
	 <v-app-bar app>
    Cooltech - Панель администратора
    <v-spacer></v-spacer>
    <v-list-item-group
          class="d-flex"
          active-class="deep-purple--text text--accent-4">
          <v-list-item class="text-left" v-if="!auth">
            Войти
          </v-list-item>
           <v-list-item class="text-left" v-else @click="$store.dispatch('signOut')">
            Выйти
          </v-list-item>
          <v-list-item class="text-left">
            {{auth}}
          </v-list-item>
    </v-list-item-group>

  </v-app-bar>
</template>

<script>
export default {

  name: 'AdminHeader',

  data () {
    return {

    }
  },
  computed: {
  	auth(){
  		return this.$store.getters.isAuth;
  	}
  }
}
</script>

<style lang="css" scoped>
</style>