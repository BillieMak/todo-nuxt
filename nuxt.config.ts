export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue'
  ],
  primevue :{
    options:{
      ripple: true
    },
    components: {
      include:[
        'Button',
        'Menubar'
      ]
    },
   
  },
  css: ['primevue/resources/themes/lara-light-green/theme.css'],
})
