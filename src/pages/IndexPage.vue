<template>
  <q-page class="flex flex-center">
    <button @click="handleSignOut">Log out</button>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { signOut } from "firebase/auth";

export default defineComponent({
  name: 'IndexPage',
  methods: {
    handleSignOut(){
      signOut(this.$auth).then(() => {
        this.$router.push('login');
        console.log("Logged Out ok");
      }).catch((error) => {
        console.error("something went wrong", error);
      })
    },
  }
});
</script>
