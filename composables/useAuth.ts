import { useToast } from "primevue/usetoast";
import { useAuthStore } from "~/store/authStore";
export const useAuth = () => {
  const toast = useToast();

  const authStore = useAuthStore();
  const { auth, token } = storeToRefs(authStore);

  const username = ref("");
  const password = ref("");

  const router = useRouter();

  const isLogged = computed(() => {
    return Boolean(authStore.token);
  });

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
      router.push("/");
    } catch (error:any) {
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

    router.push("/login");
  };

  return {
    // getToken,
    login,
    logout,
    isLogged,
    auth,
    username,
    password,
  };
};
