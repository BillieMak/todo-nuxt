import type { User } from "~/interfaces/user";

interface AuthState {
  user: User;
  token: String;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {
      username: "",
      password: "",
      email: "",
      rol_id: 0,
      name: "",
      rolName: "",
    },
    token: "",
  }),
  actions: {
    login(user: User, token: String) {
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = {
        username: "",
        password: "",
        email: "",
        rol_id: 0,
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
        this.user.email = userCookie.email;
        this.user.name = userCookie.name;
        this.user.rol_id = userCookie.rol_id;
        this.user.rolName = userCookie.rolName;
        this.user.username = userCookie.username;
      }
    },
    getToken() {
      return this.token;
    },
  },
});
