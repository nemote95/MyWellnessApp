import { defineStore } from 'pinia'

import { ref } from 'vue';
import router from '@/router'
import { useLocalStorage } from '@vueuse/core';


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userID: ref(useLocalStorage("userID", "")),
    username: ref(useLocalStorage("username", "null")),
    returnUrl: null
  }),
  getters: {
    logged_in: (state) => {
      return state.userID != "";
    }
  },
  actions: {
    logout() {
      this.userID = "";
      this.username = "";
      router.push('/login');
    }
  }
})