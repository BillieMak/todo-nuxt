export default defineNuxtPlugin((nuxtApp) => {

  const runtimeConfig = useRuntimeConfig();

  return {
    provide: {
      apiBase:"https://incidencias-backend-production.up.railway.app/api/v1",
      apiAuth:"https://incidencias-backend-production.up.railway.app/auth"
    },
  };
});
