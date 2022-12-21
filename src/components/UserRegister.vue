<template>
  <q-form class="form" @submit="userRegister">
    <q-input
      name="name"
      v-model="name"
      type="text"
      label="Nombre"
      required
      :rules="[val => val.length >= 1 || 'Por favor ingrese su nombre']"
    />
    <q-input
      name="email"
      v-model="email"
      type="email"
      label="E-mail"
      hint="Correo electrónico"
      :rules="[val => val.length || 'Por favor ingrese su e-mail']"
      required
      :error=isValid
    >
      <template v-slot:error>
        {{ emailErrorMessage }}
      </template>
    </q-input>
    <q-input
      name="password"
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Contraseña"
      required
      :rules="[val => val.length>= 6 || 'Debe tener minimo 6 caracteres']"
      hint="Min 6 caracteres"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-btn unelevated label="Registrarse" type="submit" color="primary"/>

  </q-form>
</template>
<script>
import { defineComponent } from 'vue';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  name: 'UserRegister',
  data: () => ({
    name: '',
    email: '',
    password: '',
    isPwd: true,
    emailError: false,
    emailErrorMessage: ''
  }),
  computed: {
    userState(){return useUserStore()},
    isValid(){return this.emailError}
  },
  methods: {
    userRegister(){
      this.emailError = false;
      createUserWithEmailAndPassword(this.$auth, this.email, this.password)
        .then((userCredential) => {
          const user = this.$auth.currentUser;
          updateProfile(user, {
            displayName: this.name,
          })
          .then(() => {
            this.userState.login(this.name);
            this.$router.push('/');
          })
          .catch(err => {
            console.error(err);
          })
        }).catch(err => {
          const errorCode = err.code;
          const errorMessage = err.message;
          if(errorCode === 'auth/email-already-in-use'){
            this.emailError = true;
            this.emailErrorMessage = 'E-mail ya está registrado';
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
  gap: 10px;
}
</style>
