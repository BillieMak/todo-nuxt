import type { Auth } from "~/interfaces/auth";

interface AuthState {
  auth: Auth;
  token: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    auth: {
      email: "",
      name: "",
      rolName: "",
    },
    token: "",
  }),
  actions: {
    login(auth: Auth, token: string) {
      this.auth = auth;
      this.token = token;
    },
    logout() {
      this.auth = {
        email: "",
        name: "",
        rolName: "",
      };
      this.token = "";

      useCookie("user").value = null;
      useCookie("token").value = null;
    },

    loadToken() {
      this.token = useCookie("token").value ?? "";
      const userCookie: any = useCookie("user").value;

      if (userCookie) {
        this.auth.email = userCookie.email;
        this.auth.name = userCookie.name;
        this.auth.rolName = userCookie.rolName;
      }
    },
    getToken() {
      return this.token;
    },
  },
});
