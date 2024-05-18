export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.BASE_URL,
    apiAuth: process.env.BASE_URL_AUTH,
    token: process.env.TOKEN,
    public: {
      apiBase: process.env.BASE_URL,
      apiAuth: process.env.BASE_URL_AUTH,
    }
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: [
    // '@nuxtjs/tailwindcss',
    "nuxt-primevue",
    "@pinia/nuxt",
  ],
  plugins: [
    '~/plugins/springboot.client.ts',
    { src: "~/plugins/locally.ts", ssr: false, mode: 'client' },
  ],
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
    "primevue/resources/themes/aura-light-noir/theme.css",
    "primeicons/primeicons.css",
  ],
});
