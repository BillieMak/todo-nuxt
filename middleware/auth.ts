import { useAlertStore } from "~/store/alertStore";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  const { $locally } = useNuxtApp();

  const token = ref($locally.getItem());

  if (!authStore.auth.name && !token.value) {
    alertStore.addAlert({
      title: "Session",
      message: "Inicie Sesion Primero",
      life: 2500,
    });     
    return navigateTo("/");
  }
});
