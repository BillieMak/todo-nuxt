import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => [
    ..._routes,
    {
      name: 'admin',
      path: '/products/admin',
      component: () => import('~/pages/modules/admin/view/index.vue').then(r => r.default || r),
      alias: '/admin',
      meta:{
        layout: 'login'
      }
      
    }
  ],
}