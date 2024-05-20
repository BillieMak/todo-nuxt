export default defineNuxtPlugin((nuxtApp) => {

  //  const config = useRuntimeConfig()

  return {
    provide: {
      apiBase:"https://incidencias-backend-production.up.railway.app/api/v1",
      apiAuth:"https://incidencias-backend-production.up.railway.app/auth"
    },
  };
});
