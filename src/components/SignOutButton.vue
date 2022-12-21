<template>
  <q-btn
    @click="handleSignOut"
    icon="logout"
    unelevated
    v-if="userState.getIsAuthenticated"
    >
      Cerrar Sesión
  </q-btn>
</template>
<script>
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { signOut } from "firebase/auth";


export default defineComponent({
  name: 'SignOutButton',

  computed:{
    userState(){return useUserStore()},
  },

  methods: {
    handleSignOut(){
      signOut(this.$auth).then(() => {
        this.$router.push('login');
      }).catch((error) => {
        console.error("something went wrong", error);
      })
    },
  },
})
</script>
