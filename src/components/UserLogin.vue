<template>
  <q-form class="form" @submit="login">
    <q-input
      name="email"
      v-model="email"
      type="email"
      label="E-mail"
      hint="Correo electrónico"
      required
      :error=isLoginError
    >
      <template v-slot:error>
        {{ errorLoginMessage }}
      </template>
    </q-input>

    <q-input
      name="password"
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Contraseña"
      required
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-btn unelevated label="Entrar" type="submit" color="primary"/>
  </q-form>
</template>
<script>
import { defineComponent } from 'vue';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  name: 'UserLogin',
  data:()=>({
    email: null,
    password: null,
    errorLogin: false,
    errorLoginMessage: '',
    isPwd: true,
  }),
  computed: {
    userState(){return useUserStore()},
    isLoginError(){return this.errorLogin}
  },
  methods: {
    login(){
      this.errorLogin = false;

      signInWithEmailAndPassword(this.$auth, this.email, this.password)
        .then((userCredential) => {
          this.error = '';
          this.$router.push('/');
        }).catch(err => {
          const errorCode = err.code;
          const errorMessage = err.message;
          this.errorLogin = true;
          if(errorCode === 'auth/wrong-password'){
            this.errorLoginMessage = 'Usuario y/o contraseña incorrectos';
          }
          if(errorCode === 'auth/user-not-found'){
            // this.errorLoginMessage = 'Usuario no registrado'
            this.errorLoginMessage = 'Usuario y/o contraseña incorrectos';
          }
        })
    },
  }
})
</script>
<style lang="scss" scoped>
.form{
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
