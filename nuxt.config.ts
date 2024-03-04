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
      ]
    },
   
  },
  css: ['primevue/resources/themes/aura-light-green/theme.css'],
})
