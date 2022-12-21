<template>
  <q-btn
    @click="Google"
    color="white"
    text-color="black"
    icon-right="fa-brands fa-google"
    label="Iniciar sesión con Google"
  />
</template>
<script>
import { defineComponent } from 'vue';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default defineComponent({
  name: 'LoginGoogle',
  methods: {
    Google() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.$auth, provider)
        .then((result) => {
          this.$router.push('/');
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.error({errorCode, errorMessage});
        });
    }
  }
})
</script>
