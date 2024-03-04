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
        'Menubar',
        'DataTable',
        'Column',
        'Tag',
      ]
    },
   
  },
  css: ['primevue/resources/themes/lara-light-green/theme.css'],
})
