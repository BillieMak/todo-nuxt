import { useAlertStore } from "~/store/alertStore";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  const { visible } = storeToRefs(alertStore);
  const { user } = storeToRefs(authStore);

  const { $locally } = useNuxtApp();

  const token = ref($locally.getItem());

  if (!user.value.username && !token.value) {
    alertStore.addAlert({
      title: "Registro",
      message: "Registrese Primero",
      life: 2000,
      visible: true,
    });

    if (!visible.value) {
      return navigateTo("/login");
    }
  }
});
