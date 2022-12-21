<template>
  <q-page class="flex column items-center justify-start container">
    <SignInSignUp />
    <LoginGoogle />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import SignInSignUp from 'src/components/SignInSignUp.vue';
import LoginGoogle from 'src/components/LoginGoogle.vue';

export default defineComponent({
  name: 'LoginPage',
  components:{
    SignInSignUp,
    LoginGoogle,
  },
});
</script>
<style scoped>
.container{
  padding-top: 40px;
  gap: 20px;
}
</style>
