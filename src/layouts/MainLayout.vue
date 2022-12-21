<template>
  <q-layout view="hHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Image Uploader </q-toolbar-title>
        <q-toolbar-title>{{userState.getName}}</q-toolbar-title>
        <SignOutButton />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import SignOutButton from 'src/components/SignOutButton.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SignOutButton,
  },

  computed: {
    userState(){ return useUserStore() },
  },

});
</script>
