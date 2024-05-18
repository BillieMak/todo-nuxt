export default defineNuxtPlugin((nuxtApp) => {

  return {
    provide: {
      apiBase:"http://localhost:8080/api/v1",
      apiAuth:"http://localhost:8080/auth"
    },
  };
});
