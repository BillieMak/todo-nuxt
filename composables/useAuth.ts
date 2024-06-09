import { useToast } from "primevue/usetoast";
import { useAuthStore } from "~/store/authStore";
export const useAuth = () => {
  const toast = useToast();

  const authStore = useAuthStore();
  const { auth } = storeToRefs(authStore);

  const username = ref("");
  const password = ref("");

  const login = async () => {
    try {
      const res: any = await $fetch(`/api/login`, {
        method: "POST",
        body: {
          username: username.value,
          password: password.value,
        },
      });
      authStore.login(res.auth, res.token);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Login exitoso",
        group: "tr",
        life: 3000,
      });
    } catch (error: any) {
      // console.log(error.data.data);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: `${error.data.data.message}🥹`,
        group: "tr",
        life: 4000,
      });
    }
  };

  const logout = () => {
    authStore.logout();
  };

  return {
    // getToken,
    login,
    logout,
    isLogged: computed(() => Boolean(authStore.token)),
    auth,
    username,
    password,
  };
};
