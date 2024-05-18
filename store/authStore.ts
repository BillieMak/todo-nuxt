interface User {
  username: String;
  password: String;
  email: String;
  rol_id: Number;
  rolName: String;
  name: String;
}

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
      localStorage.setItem("tokenid", token.toString());
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
      localStorage.removeItem("tokenid");
    },

    loadToken() {
      this.token = localStorage.getItem("tokenid") ?? '';
    },
    getToken() {
      return this.token;
    },
  },
});
