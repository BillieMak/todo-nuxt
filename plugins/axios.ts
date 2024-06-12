import axios from "axios";

export default defineNuxtPlugin(async () => {
  axios.interceptors.request.use((config) => {
    const token = useCookie("token").value;
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  });

  return {
    provide: {
      axios: axios,
    },
  };
});
