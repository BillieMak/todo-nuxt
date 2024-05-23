import { useToast } from "primevue/usetoast";
import { useAuthStore } from "~/store/authStore";
export const useAuth = () => {
  const toast = useToast();

  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const email = ref("");
  const password = ref("");

  const { $apiAuth } = useNuxtApp();

  const router = useRouter();

  const login = async () => {
    try {
      const res: any = await $fetch(`${$apiAuth}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: email.value,
          password: password.value,
        },
      });
      authStore.login(res.user, res.token);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Login exitoso",
        group: "br",
        life: 3000,
      });
      router.push("/attendance");
    } catch (error) {
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Credenciales incorrectas",
        group: "br",
        life: 3000,
      });
    }
  };

  const logout = () => {
    authStore.logout();

    router.push("/login");
  };

  // const getToken = (): string => $locally.getItem("token") ?? "teva es traca";

  return {
    // getToken,
    login,
    logout,
    user,
    email,
    password,
  };
};
