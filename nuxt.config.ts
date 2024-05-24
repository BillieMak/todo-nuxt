export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.BASE_URL,
    apiAuth: process.env.BASE_URL_AUTH,
    public: {
      apiBase: process.env.BASE_URL,
      apiAuth: process.env.BASE_URL_AUTH,
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/supabase"],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false
  },
  primevue: {
    options: {
      ripple: true,
      inputStyle: "outlined",
    },
    cssLayerOrder: "reset,primevue",
    components: {
      include: [
        "Avatar",
        "Button",
        "Badge",
        "Column",
        "DataTable",
        "Dialog",
        "Dropdown",
        "FileUpload",
        "IconField",
        "InputIcon",
        "InputText",
        "Menu",
        "Menubar",
        "Panel",
        "Password",
        "Skeleton",
        "Sidebar",
        "Tag",
        "Textarea",
        "Toast",
      ],
    },
    composables: {
      include: ["useStyle"],
    },
    usePrimeVue: true,
  },
  css: [
    "primevue/resources/themes/aura-light-blue/theme.css",
    "primeicons/primeicons.css",
  ],
});
