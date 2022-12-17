<template>
  <q-layout view="hHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Image Uploader </q-toolbar-title>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Iniciar Sesión',
    icon: 'login',
    link: '/login',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    return {
      essentialLinks: linksList,
    };
  },
});
</script>
