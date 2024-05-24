import { useAlertStore } from "~/store/alertStore";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  const { user } = storeToRefs(authStore);


  const { $locally } = useNuxtApp();

  const token = ref($locally.getItem());

  if (!user.value.username && !token.value) {
    alertStore.addAlert({
      title: "Session",
      message: "Inicie Sesion Primero",
      life: 2500,
      visible: true,
    });     
    return navigateTo("/");
  }
});
