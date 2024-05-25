import { useAlertStore } from "~/store/alertStore";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  const { auth } = storeToRefs(authStore);


  const { $locally } = useNuxtApp();

  const token = ref($locally.getItem());

  if (!auth.value.name && !token.value) {
    alertStore.addAlert({
      title: "Session",
      message: "Inicie Sesion Primero",
      life: 2500,
      visible: true,
    });     
    return navigateTo("/");
  }
});
