<template>
  <v-app> 
      <v-main>  
          <v-container
        class="fill-height"
        fluid
      >
        <v-row
          class="d-flex"
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Вход</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
               <!--  <v-alert type="warning"
                  v-if="error">
                  {{error}}
                </v-alert> -->
                <v-form v-model="valid">
                  <v-text-field
                    label="E-mail"
                    name="login"
                    prepend-icon="mdi-email"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div>{{isValid}}</div>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-main>
  </v-app>  
  
</template>

<script>
export default {
  name: "AppHeader",

  data(){
    return{
      email: '',
      password: '',
      valid: true,
      emailRules: [
      v => !!v || 'Введите E-mail',
      v => /.+@.+\..+/.test(v) || 'Неправильный E-mail',
      ],
      passwordRules: [
      v => v.length >= 6 || 'Min 6 characters',
      value => !!value || 'Введите пароль'
      ]
    }

  },
  computed:{
    isValid(){
      return this.valid
    },
      // error(){
      //   return this.$store.getters.getError
      // },
      // processing(){
      //   return this.$store.getters.getProcessing
      // },
      isAuthentificated(){
        return this.$store.getters.isAuth;
      }
    },
  methods:{
    async submit(){
      const res = await this.$store.dispatch('signIn', {email: this.email, password: this.password});
      // console.log(res)
      if(res.uid){
        this.$router.push('/admin')
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>