import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    authenticated: false,
    name: '',
  }),
  getters: {
    getName: (state) => state.name,
    getIsAuthenticated: (state) => state.authenticated,
  },
  actions: {
    login(name) {
      this.authenticated = true;
      this.name = name;
    },
    logout() {
      this.authenticated = false;
      this.name = '';
    },
  },
});
