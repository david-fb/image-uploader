<template>
  <q-page class="flex flex-center">
    <h1>Login</h1>
    <button @click="Google">Log in</button>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default defineComponent({
  name: 'LoginPage',
  methods: {
    Google() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.$auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          this.$router.push('/');
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          const email = err.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(err);
        });
    }
  }
});
</script>
