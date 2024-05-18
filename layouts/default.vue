import { useAuthStore } from '../store/authStore';
<template>
  <header>
    <NavBar :base-id="'menu'" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <Footer />
  </footer>
  <LazyAlert />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';


const authStore = useAuthStore()

onMounted(() => {
    authStore.loadToken()
})
</script>