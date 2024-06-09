import type { UserAuth } from "~/interfaces/auth";

export const useAuthStore = defineStore("auth", () => {
  const auth = ref<UserAuth>({
    email: "",
    name: "",
    rolName: "",
  });

  const token = ref<string>("");

  const login = (userAuth: UserAuth, tokenUser: string) => {
    auth.value = userAuth;
    token.value = tokenUser;
  };

  const logout = () => {
    auth.value = {
      email: "",
      name: "",
      rolName: "",
    };
    token.value = "";
  };

  const loadToken = () => {
    token.value = useCookie("token").value ?? "";
    const userCookie: any = useCookie("user").value;

    if (userCookie) {
      auth.value.email = userCookie.email;
      auth.value.name = userCookie.name;
      auth.value.rolName = userCookie.rolName;
    }
  };

  return {
    //state
    auth,
    token,
    //actions
    logout,
    login,
    loadToken,
    //getters
    getToken: computed(() => token.value),
  };
});
