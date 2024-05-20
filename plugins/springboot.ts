export default defineNuxtPlugin((nuxtApp) => {

   const config = useRuntimeConfig()

  return {
    provide: {
      apiBase: config.public.apiBase,
      apiAuth: config.public.apiAuth
    },
  };
});
