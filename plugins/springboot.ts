export default defineNuxtPlugin((nuxtApp) => {

  const runtimeConfig = useRuntimeConfig();

  return {
    provide: {
      apiBase:runtimeConfig.public.apiBase,
      apiAuth:runtimeConfig.public.apiAuth,
    },
  };
});
