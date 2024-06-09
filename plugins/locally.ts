import { useAuthStore } from "~/store/authStore";

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  return {
    provide: {
      locally: {
        getItem() {
          return authStore.token;
        },
      },
    },
  };
});
