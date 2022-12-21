<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="signin" label="Iniciar Sesión"></q-tab>
      <q-tab name="signup" label="Registro"></q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="signin">
        <UserLogin />
      </q-tab-panel>

      <q-tab-panel name="signup">
        <UserRegister />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script>
import { defineComponent, ref } from 'vue';
import UserLogin from './UserLogin.vue';
import UserRegister from './UserRegister.vue';

export default defineComponent({
  name: 'SignInSignUp',
  data:()=>({
    tab: ref('signin')
  }),
  components: {
    UserRegister,
    UserLogin,
  },
})
</script>
