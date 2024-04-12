export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // '@nuxtjs/tailwindcss',
    'nuxt-primevue',
    '@pinia/nuxt',
  ],
  primevue :{
    options:{
      ripple: true
    },
    components: {
      include:[
        'Avatar',
        'Button',
        'Column',
        'DataTable',
        'Dialog',
        'Dropdown',
        'IconField',
        'InputIcon',
        'InputText',
        'Menu',
        'Menubar',
        'Skeleton',
        'Tag',
        'Textarea',
        'Toast',
        'Panel',
      ]
    },
    composables: {
      include:['useStyle']
    },
    usePrimeVue : true
   
  },
  css: [
    'primevue/resources/themes/aura-light-pink/theme.css',
    'primeicons/primeicons.css',],
})
